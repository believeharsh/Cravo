import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Get keys from environment variables
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET_ID;

if (!keyId || !keySecret) {
  console.error(
    'RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not defined in environment variables.'
  );
  // In a real production app, we may want to stop the server here
  // throw new Error("Razorpay keys are missing.");
}

// Creating and exporting the Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export default razorpayInstance;
