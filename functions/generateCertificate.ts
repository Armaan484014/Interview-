import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PDFDocument, rgb } from "pdf-lib";

admin.initializeApp();

export const generateCertificate = async (data: any) => {
  const { name, workshop } = data;

  const templateFile = await admin.storage().bucket().file("templates/template.pdf").download();
  const pdfDoc = await PDFDocument.load(templateFile[0]);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText(name, { x: 250, y: 300, size: 24, color: rgb(0, 0, 0) });
  firstPage.drawText(workshop, { x: 250, y: 270, size: 18, color: rgb(0, 0, 0) });

  const pdfBytes = await pdfDoc.save();

  const fileName = `certificates/${name}_${Date.now()}.pdf`;
  const file = admin.storage().bucket().file(fileName);
  await file.save(pdfBytes, { contentType: "application/pdf" });

  return { success: true, url: file.publicUrl() };
};
