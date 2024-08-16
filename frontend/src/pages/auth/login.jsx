import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import PasswordInput from '../../components/passwordInput';
import Button from '../../components/button';
import Navbar from '../../components/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-page">
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
          <form onSubmit={handleLogin}>
            <TextInput
              label="Email address"
              type="email"
              placeholder="e.g malikkolade@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full pr-10"
            />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-blue-600">Lost Password?</a>
            </div>
            <div className="flex justify-center mb-4">
              <button className="bg-blue-700  hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full" type="submit">Login</button>
            </div>
            <p className="pt-2">Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
