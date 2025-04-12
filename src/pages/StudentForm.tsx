import React, { useState } from 'react';
import './StudentForm.css';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    phone: '',
    email: '',
    feedback: '',
    phoneVerified: false,
    emailVerified: false,
  });

  const [otpPhone, setOtpPhone] = useState('');
  const [otpEmail, setOtpEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendPhoneOTP = async () => {
    // Call Firebase Function
    alert('OTP sent to phone (mocked)');
  };

  const verifyPhoneOTP = () => {
    if (otpPhone === '1234') {
      setFormData({ ...formData, phoneVerified: true });
    } else {
      alert('Invalid phone OTP');
    }
  };

  const sendEmailOTP = async () => {
    alert('OTP sent to email (mocked)');
  };

  const verifyEmailOTP = () => {
    if (otpEmail === '1234') {
      setFormData({ ...formData, emailVerified: true });
    } else {
      alert('Invalid email OTP');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phoneVerified || !formData.emailVerified) {
      alert('Please verify your phone and email.');
      return;
    }

    // Save to Firestore and trigger certificate function
    alert('Submitted and certificate generation triggered!');
  };

  return (
    <div className="student-form-container">
      <h2>Workshop Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="course" placeholder="Course" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        {!formData.phoneVerified && (
          <div className="otp-group">
            <button type="button" onClick={sendPhoneOTP}>Send OTP</button>
            <input value={otpPhone} onChange={(e) => setOtpPhone(e.target.value)} placeholder="Enter OTP" />
            <button type="button" onClick={verifyPhoneOTP}>Verify</button>
          </div>
        )}
        <input name="email" placeholder="Email" onChange={handleChange} required />
        {!formData.emailVerified && (
          <div className="otp-group">
            <button type="button" onClick={sendEmailOTP}>Send OTP</button>
            <input value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)} placeholder="Enter OTP" />
            <button type="button" onClick={verifyEmailOTP}>Verify</button>
          </div>
        )}
        <textarea name="feedback" placeholder="Your Feedback" onChange={handleChange} required></textarea>
        <button type="submit" disabled={!formData.emailVerified || !formData.phoneVerified}>Submit</button>
      </form>
    </div>
  );
}

export default StudentForm;
