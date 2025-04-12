import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();
const db = admin.firestore();

// Email Transporter (use Gmail or SMTP service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

// OTP Generator
export const sendEmailOTP = functions.https.onCall(async (data, context) => {
  const { email } = data;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await db.collection('otp').doc(email).set({
    otp,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  const mailOptions = {
    from: 'Workshop Team <your-email@gmail.com>',
    to: email,
    subject: 'Your Verification OTP',
    text: `Your OTP is ${otp}`
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
});

export const verifyEmailOTP = functions.https.onCall(async (data, context) => {
  const { email, enteredOtp } = data;
  const doc = await db.collection('otp').doc(email).get();

  if (!doc.exists || doc.data()?.otp !== enteredOtp) {
    throw new functions.https.HttpsError('invalid-argument', 'Incorrect OTP');
  }
  return { verified: true };
});

// Placeholder for WhatsApp Certificate sending function
export const sendWhatsAppCertificate = functions.https.onCall(async (data, context) => {
  const { phoneNumber, message } = data;
  console.log(`Pretend we're sending WhatsApp message to ${phoneNumber}: ${message}`);
  return { sent: true };
});
