
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import * as otpGenerator from 'otp-generator';

admin.initializeApp();

export const sendOTP = functions.https.onCall(async (data) => {
  const { email, phone } = data;
  const otp = otpGenerator.generate(6, { digits: true, specialChars: false });

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-email-password' },
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'OTP for Workshop Feedback',
    text: `Your OTP is: ${otp}`,
  });

  // Store OTP in Firestore
  await admin.firestore().collection('otps').add({ phone, email, otp });
  return { success: true };
});

export const generateCertificate = functions.https.onCall(async (data) => {
  const { name, workshop, college, date } = data;
  const doc = new PDFDocument();
  const tmpPath = `/tmp/${name}-certificate.pdf`;

  doc.pipe(fs.createWriteStream(tmpPath));
  doc.fontSize(20).text(`Certificate of Participation for ${name}`);
  doc.text(`Workshop: ${workshop}`);
  doc.text(`College: ${college}`);
  doc.text(`Date: ${date}`);
  doc.end();

  await admin.storage().bucket().upload(tmpPath, {
    destination: `certificates/${name}.pdf`,
  });

  return { success: true };
});
