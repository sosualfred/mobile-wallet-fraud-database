import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import Button from '../../components/button';
import Navbar from '../../components/Navbar';

function Verification() {
  const [otp, setOtp] = useState('');

  const handleVerification = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
  };

  return (
    <div>
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Verification</h2>
          <p className="mb-4">We have sent an OTP to <span className="font-semibold">malikkolade@gmail.com</span>.</p>
          <form onSubmit={handleVerification}>
            <TextInput
              label="OTP"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            <div className="flex justify-center mb-4">
              <Button className="bg-blue-700  hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full" type="submit">Verify</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verification;
