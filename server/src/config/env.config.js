import dotenv from 'dotenv';

dotenv.config();

export const EnvConfig = {
  // Application

  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // URLs

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  CLIENT_URL: process.env.CLIENT_URL,
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  API_BASE_URL: process.env.API_BASE_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,

  // Database & Cache

  MONGO_URI: process.env.MONGO_URI,

  //  Authentication & Security

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,

  // OAuth

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // Cloudinary

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Email

  // EMAIL_USER: process.env.EMAIL_USER,
  // EMAIL_PASS: process.env.EMAIL_PASS,
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  // Payments

  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET_ID: process.env.RAZORPAY_KEY_SECRET_ID,

  // Company / Admin

  COMPANY_NAME: process.env.COMPANY_NAME,
  COMPANY_LOGO_URL: process.env.COMPANY_LOGO_URL,
};
