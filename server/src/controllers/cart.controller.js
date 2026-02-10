import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { apiError } from '../services/apiError.js';
import { apiResponse } from '../services/apiResponse.js';
import { asyncHandler } from '../services/asyncHandler.js';

// A utility function to recalculate cart totals.
const recalculateCartTotals = cart => {
  let newTotalPrice = 0;
  let newTotalQuantity = 0;

  // The 'item' object here will have 'price' and 'quantity' directly.
  for (const item of cart.items) {
    // We check if the price is coming from the populated product or the stored price.
    const price = item.product?.price || item.price;
    newTotalPrice += price * item.quantity;
    newTotalQuantity += item.quantity;
  }

  cart.totalPrice = newTotalPrice;
  cart.totalQuantity = newTotalQuantity;
};

const getAllCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.product',
    populate: {
      path: 'restaurant',
      select: 'name',
    },
  });

  if (!cart) {
    return res.status(200).json(
      new apiResponse(
        200,
        {
          items: [],
          totalPrice: 0,
          totalQuantity: 0,
        },
        'Cart is empty'
      )
    );
  }

  res
    .status(200)
    .json(new apiResponse(200, cart, 'Cart items retrieved successfully'));
});

const addItemToTheCart = asyncHandler(async (req, res) => {
  // 1. Get user ID and item details from the request
  const userId = req.user._id;
  const { productId, quantity = 1, customizations = [] } = req.body;

  // 2. Validate incoming data
  if (!productId) {
    throw new apiError(400, 'Product ID is required');
  }

  if (quantity < 1) {
    throw new apiError(400, 'Quantity must be at least 1');
  }

  // 3. Find the product and its price
  const product = await Product.findById(productId);
  if (!product) {
    throw new apiError(404, 'Product not found');
  }

  // 4. Find or create the user's cart
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  // 5. Check if the item already exists in the cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // If item exists, update its quantity
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].customizations = customizations; // Update customizations
  } else {
    // If item doesn't exist, add it to the cart
    cart.items.push({
      product: productId,
      quantity,
      price: product.price, // Store the current price for order history
      customizations,
    });
  }

  // 6. Recalculate cart totals and save
  recalculateCartTotals(cart);
  await cart.save();

  // 7. Get the updated cart and populate it before sending.
  const populatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    populate: {
      path: 'restaurant',
      select: 'name',
    },
  });

  // 8. Send a successful response with the updated, populated cart.
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        populatedCart,
        'Item added/updated in cart successfully'
      )
    );
});

const updateItemQuantityInCart = asyncHandler(async (req, res) => {
  // 1. Get user and item IDs, and the new quantity from the request
  const userId = req.user._id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  // 2. Validate input
  if (typeof quantity !== 'number' || quantity < 0) {
    throw new apiError(400, 'A valid non-negative quantity is required');
  }

  // 3. Find the user's cart
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new apiError(404, 'Cart not found');
  }

  // 4. Find the item in the cart's items array
  const itemToUpdate = cart.items.find(item => item._id.toString() === itemId);
  if (!itemToUpdate) {
    throw new apiError(404, 'Item not found in cart');
  }

  // 5. Handle the quantity update logic
  if (quantity === 0) {
    // If quantity is 0, remove the item entirely
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  } else {
    // Otherwise, update the quantity
    itemToUpdate.quantity = quantity;
  }

  // 6. Recalculate cart totals and save the changes
  recalculateCartTotals(cart);
  await cart.save();

  // 7. Get the updated cart and populate it before sending.
  const populatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    populate: {
      path: 'restaurant',
      select: 'name',
    },
  });

  // 8. Send the updated, populated cart in the response.
  res
    .status(200)
    .json(
      new apiResponse(200, populatedCart, 'Item quantity updated successfully')
    );
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  // 1. Get user ID and item ID from the request
  const userId = req.user._id;
  const { itemId } = req.params;

  // 2. Find the user's cart
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new apiError(404, 'Cart not found');
  }

  // 3. Find the index of the item to remove
  const itemIndex = cart.items.findIndex(
    item => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    throw new apiError(404, 'Item not found in cart');
  }

  // 4. Remove the item using splice
  cart.items.splice(itemIndex, 1);

  // 5. Recalculate cart totals and save
  recalculateCartTotals(cart);
  await cart.save();

  // 6. Get the updated cart and populate it before sending.
  const populatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product',
    populate: {
      path: 'restaurant',
      select: 'name',
    },
  });

  // 7. Send a successful response with the updated, populated cart.
  res
    .status(200)
    .json(
      new apiResponse(200, populatedCart, 'Item removed from cart successfully')
    );
});

const clearTheEntireCart = asyncHandler(async (req, res) => {
  // 1. Get the user ID
  const userId = req.user._id;

  // 2. Find and update the cart to clear all items
  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [], totalPrice: 0, totalQuantity: 0 } },
    { new: true } // Return the updated document
  ).populate({
    // Populate the updated document before returning it.
    path: 'items.product',
    populate: {
      path: 'restaurant',
      select: 'name',
    },
  });

  // 3. Handle case where cart doesn't exist
  if (!updatedCart) {
    throw new apiError(404, 'Cart not found');
  }

  // 4. Send a successful response
  res
    .status(200)
    .json(new apiResponse(200, updatedCart, 'Cart cleared successfully'));
});

export {
  getAllCartItems,
  addItemToTheCart,
  updateItemQuantityInCart,
  removeItemFromCart,
  clearTheEntireCart,
};
