import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
} from "../services/userTokens.js";

const UserSchema = new Schema(
  {
    // User Authentication & Profile
    name: { type: String, required: true },
    username: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    profilePicture: { type: String },

    // Social Logins
    googleId: { type: String, unique: true, sparse: true },

    // User Roles
    role: {
      type: String,
      enum: ["customer", "admin", "delivery_partner"],
      default: "customer",
    },

    // User Preferences & Settings
    preferredLanguage: { type: String, default: "en" },
    preferredCurrency: { type: String, default: "USD" },

    // Linked Data (References to other collections)
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    paymentMethods: [
      {
        cardType: { type: String },
        last4: { type: String },
        token: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    recentlyViewed: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    // Account Status
    isActive: { type: Boolean, default: true },

    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next(); // Proceed with the save operation
});

UserSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.static("matchPassAndGenTokens", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found!");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Incorrect Password");

  // Generating tokens
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user._id);

  // Storing refresh token in DB
  await this.updateOne({ _id: user._id }, { refreshToken });

  return { accessToken, refreshToken };
});

const User = model("User", UserSchema);

export default User;
