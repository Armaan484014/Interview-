import * as functions from "firebase-functions";
import { generateCertificate } from "./generateCertificate";
import { sendOtp, verifyOtp } from "./otp";

export const createCertificate = functions.https.onCall(generateCertificate);
export const requestOtp = functions.https.onCall(sendOtp);
export const checkOtp = functions.https.onCall(verifyOtp);
