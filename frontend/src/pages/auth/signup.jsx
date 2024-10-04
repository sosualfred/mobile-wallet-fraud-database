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
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setApiError(null);
      await signup(data);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setApiError(error.message || "An error occurred during signup");
    }
  };

  return (
    <div>
      <Navbar title="Mobile Wallet Fraud Database" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border-2 border-gray-400 rounded-lg ">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
          {apiError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{apiError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 mb-4">
              <TextInput
                label="First name"
                placeholder="e.g Isaac"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <TextInput
                label="Last name"
                placeholder="e.g Osei"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
            <TextInput
              label="Email address"
              type="email"
              placeholder="e.g isaacosei@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <TextInput
              label="Phone number"
              placeholder="e.g 02345xxxxx"
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex justify-center mb-4">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-md h-10 w-full"
                type="submit"
              >
                Sign up
              </Button>
            </div>
            <p className="">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
