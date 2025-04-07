import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: "",
    course: "",
    phone: "",
    email: "",
    feedback: "",
    otpVerified: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    setForm({ ...form, otpVerified: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.otpVerified) return alert("OTP not verified");
    await addDoc(collection(db, "submissions"), form);
    alert("Submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="course" placeholder="Course" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <textarea name="feedback" placeholder="Feedback" onChange={handleChange} required />
      {!form.otpVerified && <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>}
      <button type="submit" disabled={!form.otpVerified}>Submit</button>
    </form>
  );
};

export default FeedbackForm;
