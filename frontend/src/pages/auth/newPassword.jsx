import React, { useState } from 'react';
import PasswordInput from '../../components/passwordInput';
import Button from '../../components/button';
import Navbar from '../../components/Navbar';

function SetNewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    // Handle set new password logic here
  };

  return (
    <div>
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
          <form onSubmit={handleSetNewPassword}>
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            <div className="flex justify-center mb-4">
              <Button className="bg-blue-700  hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full" type="submit">Set New Password</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
