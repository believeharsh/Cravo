import User from "../models/user.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js";
import { generateUsername } from "../services/generateUserName.js";
import { apiError } from "../services/ApiError.js";

import { sendVerificationEmail } from "../services/emailService.js";
import crypto from "crypto";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required");
  }

  // Checking if user already exists or not
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.isVerified) {
      // Case 1: User exists and is already verified
      throw new apiError(
        409,
        "User already exists with this email. Please login."
      );
    } else {
      // Case 2: User exists but is NOT verified

      if (
        existingUser.verificationTokenExpires &&
        existingUser.verificationTokenExpires < Date.now()
      ) {
        console.log(
          `Detected expired unverified account for ${email}. Deleting old record.`
        );
        await User.deleteOne({ _id: existingUser._id });
      } else {
        throw new apiError(
          409,
          "An account with this email already exists but is not verified. Please check your email for the verification link or try again after the link expires."
        );
      }
    }
  }

  // Generating username
  const generatedUsername = generateUsername(email);
  if (!generatedUsername) {
    throw new apiError(
      500,
      "Error occurred while generating the username for the user"
    );
  }

  // Generating Verification Token and Expiry
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token valid for 24 hours from now

  //  Creating New User in DB
  const newUser = await User.create({
    username: generatedUsername,
    name,
    email,
    password,
    isVerified: false, // User is NOT verified upon creation
    verificationToken, // Storing the verification token
    verificationTokenExpires, // Storing the token expiry
  });

  // Retrieving created user (existing logic)
  const createdUser = await User.findById(newUser._id).select(
    "-password -verificationToken -verificationTokenExpires -__v"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while creating new user");
  }

  // Constructing the Verification Link

  const verificationLink = `${
    process.env.FRONTEND_URL
  }/verify-account?token=${verificationToken}&email=${encodeURIComponent(
    email
  )}`;

  // Sending the Verification Email
  try {
    await sendVerificationEmail(email, verificationLink);
    console.log(`Verification email sent to ${email}`);
  } catch (emailError) {
    console.error(
      "FAILED TO SEND VERIFICATION EMAIL for user:",
      email,
      emailError
    );
  }

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        { user: createdUser },
        "User registered successfully! Please check your email to verify your account and then login."
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not found with this email");
  }

  // Checking if user is verified or not
  if (!user.isVerified) {
    throw new apiError(
      403,
      "Account not verified. Please check your email for a verification link."
    );
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid credentials");
  }

  // generating the tokens as the user is authenticated and verified
  const { accessToken, refreshToken } = await User.matchPassAndGenTokens(
    email,
    password
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
          },
          accessToken: accessToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  };

  res
    .status(200)
    .cookie("accessToken", "", { ...options, expires: new Date(0) })
    .cookie("refreshToken", "", { ...options, expires: new Date(0) })
    .json(new apiResponse(200, {}, "User is logged out now"));
});

const getAuthStatus = asyncHandler(async (req, res) => {
  // Check if req.user exists. If it does, the user is authenticated.
  if (req.user) {
    res.status(200).json({
      status: 'authenticated',
      user: {
        id: req.user._id, 
        email: req.user.email,
        role: req.user.role,
        name: req.user.name,
      }
    });
  } else {
    // If req.user doesn't exist, the user is not authenticated (guest access).
    res.status(200).json({
      status: 'unauthenticated',
      user: null
    });
  }
});

const changePassword = () => {};

const verifyUser = asyncHandler(async (req, res) => {
  console.log("verify user controller is firing now");
  const { token, email } = req.query; // Get token and email from query parameters

  if (!token || !email) {
    throw new apiError(400, "Verification link is incomplete.");
  }

  const user = await User.findOne({
    email: email,
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() }, // Check if token is not expired
  });

  if (!user) {
    // It's good practice not to reveal if the email exists but the token is wrong/expired
    return res.redirect(
      `${
        process.env.FRONTEND_URL
      }/verification-failed?message=${encodeURIComponent(
        "Verification link is invalid or has expired. Please request a new one."
      )}`
    );
  }

  // Mark user as verified and clear token fields
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save({ validateBeforeSave: false }); // Do not re-hash password on save

  // Redirect to a success page on your frontend
  return res.redirect(
    `${
      process.env.FRONTEND_URL
    }/verification-success?message=${encodeURIComponent(
      "Your email has been successfully verified! You can now log in."
    )}`
  );
});

export { loginUser, registerUser, logoutUser, getAuthStatus,  changePassword, verifyUser };
