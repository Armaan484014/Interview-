import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import * as os from 'os';

admin.initializeApp();
const bucket = admin.storage().bucket();

export const generateCertificate = functions.https.onCall(async (data, context) => {
  const { name, college, workshop, date } = data;
  const tmpFilePath = path.join(os.tmpdir(), `${name}-certificate.pdf`);

  const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  const writeStream = fs.createWriteStream(tmpFilePath);
  doc.pipe(writeStream);

  // Background template (optional)
  // doc.image('template.png', 0, 0, { width: 842 }); // Uncomment if using static template

  doc.fontSize(26).text(`Certificate of Participation`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text(`This is to certify that ${name}`, { align: 'center' });
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
