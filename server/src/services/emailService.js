import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { fileURLToPath } from 'url';

import { EnvConfig } from '../config/env.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const resend = new Resend(EnvConfig.RESEND_API_KEY);

const COMPANY_NAME = EnvConfig.APP_NAME || 'Cravo';
const COMPANY_LOGO_URL =
  EnvConfig.COMPANY_LOGO_URL ||
  'https://placehold.co/180x60/81C784/FFFFFF?text=YOUR+LOGO';
const PRIVACY_POLICY_URL = EnvConfig.PRIVACY_POLICY_URL || '#';
const TERMS_OF_SERVICE_URL = EnvConfig.TERMS_OF_SERVICE_URL || '#';

// Test connection on startup
(async () => {
  try {
    await resend.apiKeys.list();
    console.log('✅ Resend email service connected successfully');
  } catch (error) {
    console.error('❌ Resend connection error:', error.message);
  }
})();

// FUNCTION (OTP Verification)
const sendVerificationOTP = async (userEmail, otp) => {
  try {
    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      'otpVerification.html'
    );
    let emailHtmlBody = fs.readFileSync(templatePath, 'utf8');

    emailHtmlBody = emailHtmlBody.replace(/{{COMPANY_NAME}}/g, COMPANY_NAME);
    emailHtmlBody = emailHtmlBody.replace(
      /{{COMPANY_LOGO_URL}}/g,
      COMPANY_LOGO_URL
    );
    emailHtmlBody = emailHtmlBody.replace(/{{OTP_CODE}}/g, otp);
    emailHtmlBody = emailHtmlBody.replace(
      /\[Link to your privacy policy\]/g,
      PRIVACY_POLICY_URL
    );
    emailHtmlBody = emailHtmlBody.replace(
      /\[Link to your terms of service\]/g,
      TERMS_OF_SERVICE_URL
    );

    const { data, error } = await resend.emails.send({
      from: 'Cravo <noreply@cravo.online>',
      to: userEmail,
      subject: `Your ${COMPANY_NAME} Verification Code`,
      html: emailHtmlBody,
    });

    if (error) {
      console.error(`Error sending OTP to ${userEmail}:`, error);
      throw error;
    }

    console.log(`✅ Verification OTP sent to ${userEmail} (ID: ${data.id})`);
    return data;
  } catch (error) {
    console.error(`❌ Error sending OTP to ${userEmail}:`, error);
    throw error;
  }
};

// FUNCTTION (for Verification Email)
const sendVerificationEmail = async (userEmail, verificationLink) => {
  try {
    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      'emailVerification.html'
    );
    let emailHtmlBody = fs.readFileSync(templatePath, 'utf8');

    emailHtmlBody = emailHtmlBody.replace(/{{COMPANY_NAME}}/g, COMPANY_NAME);
    emailHtmlBody = emailHtmlBody.replace(
      /{{COMPANY_LOGO_URL}}/g,
      COMPANY_LOGO_URL
    );
    emailHtmlBody = emailHtmlBody.replace(
      /{{VERIFICATION_LINK}}/g,
      verificationLink
    );
    emailHtmlBody = emailHtmlBody.replace(
      /\[Link to your privacy policy\]/g,
      PRIVACY_POLICY_URL
    );
    emailHtmlBody = emailHtmlBody.replace(
      /\[Link to your terms of service\]/g,
      TERMS_OF_SERVICE_URL
    );

    const mailOptions = {
      from: EnvConfig.EMAIL_USER,
      to: userEmail,
      subject: `Verify Your Account for ${COMPANY_NAME}!`,
      html: emailHtmlBody,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending verification email to ${userEmail}:`, error);
    throw error;
  }
};

export { sendVerificationOTP, sendVerificationEmail };
