// src/pages/auth/login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput";
import Button from "../../components/button";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setApiError(null);
      await login(data);
      window.location.reload(); // Force a refresh after successful login
    } catch (error) {
      console.error("Login error:", error);
      setApiError(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="login-page">
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
          {apiError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{apiError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email address"
              type="email"
              placeholder="e.g isaacosei@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-blue-600">
                Lost Password?
              </a>
            </div>
            <div className="flex justify-center mb-4">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full"
                type="submit"
              >
                Login
              </Button>
            </div>
            <p className="pt-2">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
