// /src/components/OTPVerification.tsx
import React, { useState } from 'react';
import { sendOTP } from '../firebase/cloudFunctions';

const OTPVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleOTPRequest = async () => {
    await sendOTP({ email });
    // Notify user to check email for OTP
  };

  const handleVerifyOTP = () => {
    // Check OTP with backend logic
    if (otp === 'expectedOTP') {
      setIsVerified(true);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleOTPRequest}>Send OTP</button>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {isVerified && <p>OTP Verified</p>}
    </div>
  );
};

export default OTPVerification;
