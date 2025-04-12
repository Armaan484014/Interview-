import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';
import * as otpGenerator from 'otp-generator';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

admin.initializeApp();

const bucket = admin.storage().bucket();
const db = admin.firestore();

// OTP generation and email verification function
export const sendOTP = functions.https.onCall(async (data) => {
  const { phone, email } = data;

  const otp = otpGenerator.generate(6, { digits: true, specialChars: false, upperCase: false, lowerCase: false });

  // Save OTP in Firestore
  await db.collection('otps').add({ phone, email, otp, timestamp: admin.firestore.FieldValue.serverTimestamp() });

  // Send OTP via email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP for Workshop Feedback',
    text: `Your OTP is: ${otp}`,
  });

  return { success: true };
});

// Certificate Generation function
export const generateCertificate = functions.https.onCall(async (data) => {
  const { name, college, workshop, date } = data;
  const tmpFilePath = path.join(os.tmpdir(), `${name}-certificate.pdf`);

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(tmpFilePath);
  doc.pipe(writeStream);

  doc.fontSize(26).text(`Certificate of Participation`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text(`This certifies that ${name}`, { align: 'center' });
  doc.text(`from ${college} participated in the workshop: ${workshop}`, { align: 'center' });
  doc.text(`held on ${date}`, { align: 'center' });

  doc.end();

  await new Promise(resolve => writeStream.on('finish', resolve));

  const destination = `certificates/${name}-${Date.now()}.pdf`;
  await bucket.upload(tmpFilePath, { destination });

  const file = bucket.file(destination);
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: '03-01-2030'
  });

  return { success: true, certificateUrl: url };
});
