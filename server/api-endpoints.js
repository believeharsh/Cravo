// Authentication:

// POST /api/v1/auth/register - Register a new user
// POST /api/v1/auth/login - Log in user
// POST /api/v1/auth/forgot-password - Initiate password reset
// POST /api/v1/auth/reset-password - Complete password reset

// Users:

// GET /api/v1/users/{id} - Get a specific user's profile
// PATCH /api/v1/users/{id} - Update user profile
// GET /api/v1/users/me - Get current authenticated user's profile (often a convenient shortcut)

// Products (Menu Items):

// GET /api/v1/products - Get all products (with optional filters, sorting, pagination)
// e.g., GET /api/v1/products?category=pizza&minPrice=10&sortBy=popularity&page=1
// GET /api/v1/products/{id} - Get a specific product
// (Admin) POST /api/v1/products - Create a new product
// (Admin) PUT /api/v1/products/{id} - Update a product (full replacement)
// (Admin) PATCH /api/v1/products/{id} - Partially update a product
// (Admin) DELETE /api/v1/products/{id} - Delete a product

// Categories:

// GET /api/v1/categories - Get all categories
// GET /api/v1/categories/{id} - Get a specific category
// (Admin) POST /api/v1/categories - Create a new category
// (Admin) PUT /api/v1/categories/{id} - Update a category

// Orders:

// POST /api/v1/orders - Place a new order
// GET /api/v1/orders - Get all orders for the authenticated user
// GET /api/v1/orders/{id} - Get a specific order details
// PATCH /api/v1/orders/{id}/status - Update order status (for admin/delivery partner)
// POST /api/v1/orders/{id}/cancel - Request to cancel an order (user initiated)

// Shopping Cart:

// GET /api/v1/cart - Get the current user's cart
// POST /api/v1/cart/items - Add item to cart
// PUT /api/v1/cart/items/{productId} - Update quantity of item in cart (or use PATCH)
// DELETE /api/v1/cart/items/{productId} - Remove item from cart
// DELETE /api/v1/cart - Clear the entire cart

// Reviews:

// GET /api/v1/products/{productId}/reviews - Get reviews for a specific product
// POST /api/v1/products/{productId}/reviews - Submit a review for a product
// GET /api/v1/reviews/{id} - Get a specific review
// PUT /api/v1/reviews/{id} - Update a review (only by owner)
// DELETE /api/v1/reviews/{id} - Delete a review (by owner or admin)

// Coupons:

// GET /api/v1/coupons - Get available coupons
// POST /api/v1/coupons/apply - Apply a coupon (e.g., to a cart or during checkout)
