import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { step1Schema } from "../../utils/validationSchemas";

const Step1UserInfo = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  const [createAccount, setCreateAccount] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      updateFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [isAuthenticated, user, updateFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCreateAccount(checked);
    } else {
      updateFormData({ [name]: value });
    }
  };

  const validateForm = async () => {
    try {
      await step1Schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateForm();
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Report fraudulent number</h2>
      <div className="flex items-center mb-6">
        <div className="flex items-center w-1/2">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
            1
          </div>
          <span className="text-blue-500 font-medium">Your info</span>
        </div>
        <div className="flex items-center w-1/2">
          <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center mr-2">
            2
          </div>
          <span className="text-gray-500">Fraud report</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Your details are required to submit a fraud report
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              placeholder="e.g Isaac"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder="e.g Osei"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="e.g isaacosei@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="e.g 02345xxxxx"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {!isAuthenticated && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="createAccount"
              name="createAccount"
              checked={createAccount}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="createAccount"
              className="ml-2 block text-sm text-gray-900"
            >
              Create an account for me
            </label>
          </div>
        )}
        {createAccount && (
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1UserInfo;