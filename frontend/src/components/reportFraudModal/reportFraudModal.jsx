import React, { useState } from "react";
import Step1UserInfo from "./step1";
import Step2FraudReport from "./step2";
import { X, AlertCircle } from "lucide-react";

const FraudReportModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadyReported, setIsAlreadyReported] = useState(false);

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (step2Data) => {
    console.log("Form submitted:", { ...formData, ...step2Data });
    setIsSubmitted(true);
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold">
            Report Fraudulent Number
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
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
                  prevStep={onClose}
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
                <AlertCircle className="h-12 w-12 text-green-400 mb-4" />
                <p className="mb-6 text-lg text-gray-700">
                  Your fraud report has been submitted successfully. When proper
                  vetting has been done, this person's profile will become
                  public.
                </p>
                <button
                  onClick={onClose}
                  className="border border-gray-400 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-200"
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