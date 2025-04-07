import * as functions from "firebase-functions";

const OTP_STORE = new Map<string, string>();

export const sendOtp = async (data: any) => {
  const { contact } = data;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  OTP_STORE.set(contact, otp);
  console.log("OTP for", contact, "is", otp); // Replace with real SMS/Email send
  return { success: true };
};

export const verifyOtp = async (data: any) => {
  const { contact, otp } = data;
  return { verified: OTP_STORE.get(contact) === otp };
};
