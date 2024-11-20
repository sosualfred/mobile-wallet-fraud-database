import React, { useState } from "react";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../services/auth";
const AdminLogin = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiLogin({ email, password });
      if (response.status === 200) {
        const { userId, accessToken } = response.data;
        localStorage.setItem("userID", userId);
        localStorage.setItem("token", accessToken);
        
        setTimeout(() => {
          navigate('/reported');
        }, 2000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
        <p className="text-center text-2xl font-bold mb-8">
          <span className="text-blue-500 mr-4">Mobile Wallet Fraud Database</span> Admin
        </p>

        <div className="flex border-2 mt-4">
          <div className="p-6 mx-4">
            <h3 className="my-1 font-bold">Login</h3>
            <TextInput label="Email address" type="text" name="email" />
            <TextInput label="Password" type="password" name="password" />

            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="mr-2"
                />
                <label htmlFor="remember-me" className="text-sm font-medium text-gray-700 mr-40">
                  Remember me
                </label>
                <a href="#" className="text-blue-400 justify-items-end flex">
                  Lost Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className={`mt-4 py-3 px-8 w-96 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-md`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;