import dotenv from "dotenv"
import nodemailer from "nodemailer"
import fs from "fs" ; 
import path from "path";

import { fileURLToPath } from 'url'; 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 


dotenv.config() 

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // 'smtp.gmail.com' or 'smtp.sendgrid.net'
    port: process.env.EMAIL_PORT, // 587 for TLS, 465 for SSL
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },

    connectionTimeout: 5000, 
});

const COMPANY_NAME = process.env.APP_NAME || "Cravo";
const COMPANY_LOGO_URL = process.env.COMPANY_LOGO_URL || 'https://placehold.co/180x60/81C784/FFFFFF?text=YOUR+LOGO';
const PRIVACY_POLICY_URL = process.env.PRIVACY_POLICY_URL || '#'; 
const TERMS_OF_SERVICE_URL = process.env.TERMS_OF_SERVICE_URL || '#'; 


transporter.verify(function (error, success) {
    if (error) {
        console.error('Email transporter connection error:', error);
    } else {
        // console.log('Email transporter ready to send messages');
    }
});

// function to send the email to the user 
const sendVerificationEmail = async (userEmail, verificationLink) => {
  
    try {

        const templatePath = path.join(__dirname, '..', 'templates', 'emailVerification.html');
        let emailHtmlBody = fs.readFileSync(templatePath, 'utf8');

        emailHtmlBody = emailHtmlBody.replace(/{{COMPANY_NAME}}/g, COMPANY_NAME);
        emailHtmlBody = emailHtmlBody.replace(/{{COMPANY_LOGO_URL}}/g, COMPANY_LOGO_URL);
        emailHtmlBody = emailHtmlBody.replace(/{{VERIFICATION_LINK}}/g, verificationLink);
        emailHtmlBody = emailHtmlBody.replace(/\[Link to your privacy policy\]/g, PRIVACY_POLICY_URL);
        emailHtmlBody = emailHtmlBody.replace(/\[Link to your terms of service\]/g, TERMS_OF_SERVICE_URL); 


        const mailOptions = {
            from: process.env.EMAIL_USER,
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

export {
    sendVerificationEmail,

};