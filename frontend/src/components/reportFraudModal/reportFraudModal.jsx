// src/components/reportFraudModal/reportFraudModal.jsx

import React, { useState } from "react";
import Step1UserInfo from "./step1";
import Step2FraudReport from "./step2";
import { submitFraudReport } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const FraudReportModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadyReported, setIsAlreadyReported] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleSubmit = async (step2Data) => {
    try {
      setError(null);
      let finalSubmissionData;

      if (isAuthenticated && user) {
        // If authenticated, use user data for reporter info
        finalSubmissionData = {
          ...step2Data,
          reporterFirstName: user.firstName,
          reporterLastName: user.lastName,
          reporterEmail: user.email,
          reporterPhoneNumber: user.phoneNumber,
        };
      } else {
        // If not authenticated, combine Step 1 and Step 2 data
        finalSubmissionData = {
          ...step2Data,
          reporterFirstName: formData.firstName,
          reporterLastName: formData.lastName,
          reporterEmail: formData.email,
          reporterPhoneNumber: formData.phoneNumber,
        };
      }

      // Remove the user field if it exists
      delete finalSubmissionData.user;

      const response = await submitFraudReport(finalSubmissionData);
      console.log("Form submitted:", response);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "An error occurred while submitting the report");
    }
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg h-50 shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Report Fraudulent Number</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            {/* Add an X icon here if needed */}
          </button>
        </div>
        <div className="p-6">
          {!isSubmitted ? (
            <>
              {currentStep === 1 && (
                <Step1UserInfo
                  formData={formData}
                  updateFormData={updateFormData}
                  nextStep={handleNext}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              )}
              {currentStep === 2 && (
                <Step2FraudReport
                  formData={formData}
                  updateFormData={updateFormData}
                  prevStep={handlePrevious}
                  onSubmit={handleSubmit}
                  isAlreadyReported={isAlreadyReported}
                  setIsAlreadyReported={setIsAlreadyReported}
                />
              )}
            </>
          ) : (
            <div className="text-center mt-8">
              <div className="flex flex-col items-center mt-4">
                {/* Add an success icon here if needed */}
                <p className="mb-6 text-lg text-gray-700">
                  Your fraud report has been submitted successfully. When proper
                  vetting has been done, this person's profile will become
                  public.
                </p>
                <button
                  onClick={onClose}
                  className="border border-gray-400 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FraudReportModal;
