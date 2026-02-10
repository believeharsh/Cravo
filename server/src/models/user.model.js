import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';

import {
  createAccessToken,
  createRefreshToken,
} from '../services/userTokens.js';

const UserSchema = new Schema(
  {
    // User Authentication & Profile
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true, lowercase: true },
    email: {
      type: String,
      required: function () {
        // Email is required if there is no googleId
        return !this.googleId;
      },
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        // Password is required if there is no googleId
        return !this.googleId;
      },
    },
    phone: { type: String },
    profilePicture: { type: String },

    // Social Logins
    googleId: { type: String, unique: true, sparse: true },

    // User Roles
    role: {
      type: String,
      enum: ['customer', 'admin', 'delivery_partner'],
      default: 'customer',
    },

    // User Preferences & Settings
    preferredLanguage: { type: String, default: 'en' },
    preferredCurrency: { type: String, default: 'USD' },

    // Linked Data (References to other collections)
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    paymentMethods: [
      {
        cardType: { type: String },
        last4: { type: String },
        token: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
    // wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'List',
      },
    ],

    restaurantLists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RestaurantList',
      },
    ],

    recentlyViewed: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

    // Account Status
    isActive: { type: Boolean, default: true },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationOTP: { type: String },
    verificationOTPExpires: { type: Date },

    refreshTokens: [
      {
        token: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.password === undefined) {
    return next();
  }

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next(); // Proceed with the save operation
});

// Instance method to check password correctness
UserSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// --- START: New Instance Method for Google Login ---
// This method is called on an individual user instance to generate tokens.
UserSchema.methods.generateAccessAndRefreshToken = async function () {
  try {
    const accessToken = createAccessToken(this);
    const refreshToken = createRefreshToken(this._id);

    // Update the user document with the new refresh token
    this.refreshToken = refreshToken;
    await this.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Could not generate tokens: ' + error.message);
  }
};

// Static method to match password and generate tokens
UserSchema.statics.matchPassAndGenTokens = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found!');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Incorrect Password');

  // Generating tokens
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user._id);

  // Storing refresh token in DB
  await this.updateOne({ _id: user._id }, { refreshToken });

  return { accessToken, refreshToken };
};

const User = model('User', UserSchema);

export default User;
