import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import PasswordInput from '../../components/passwordInput';
import Button from '../../components/button';
import Navbar from '../../components/Navbar';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div>
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">

      <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg ">
        <h2 className="text-2xl font-bold mb-4">Sign up</h2>
        <form onSubmit={handleSignup}>
          <div className="flex gap-4 mb-4">
            <TextInput
              label="First name"
              placeholder="e.g Isaac"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            <TextInput
              label="Last name"
              placeholder="e.g Osei"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
          </div>
          <TextInput
            label="Email address"
            type="email"
            placeholder="e.g isaacosei@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
          />
          <TextInput
            label="Phone number"
            placeholder="e.g 02345xxxxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full pr-10"
          />
          <div className="flex justify-center mb-4">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full" type="submit">Sign up</Button>
          </div>
          <p className="">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
