import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import Button from '../../components/button';
import Navbar from '../../components/Navbar';

function RecoverPassword() {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    // Handle recover password logic here
  };

  return (
    <div className="login-page">
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recover Password</h2>
          <form onSubmit={handleRecoverPassword}>
            <TextInput
              label="Email address"
              type="email"
              placeholder="e.g isaacosei@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            <div className="flex justify-center mb-4">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full" type="submit">Send recovery email</Button>
            </div>
            <p className="pt-2">Back to <a href="/login" className="text-blue-700">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;
