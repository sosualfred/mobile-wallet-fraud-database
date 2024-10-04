import React, { useState, useRef } from "react";
import { step2Schema } from "../../utils/validationSchemas";
import { checkExistingReport } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const Step2FraudReport = ({
  formData,
  updateFormData,
  prevStep,
  onSubmit,
  isAlreadyReported,
  setIsAlreadyReported,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [errors, setErrors] = useState({});
  const evidenceInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    if (name === "fraudPhoneNumber") {
      // Validate phone number format before making API call
      const phoneRegex = /^0\d{9}$/;
      if (phoneRegex.test(value)) {
        try {
          const existingReport = await checkExistingReport(value);
          setIsAlreadyReported(!!existingReport);
        } catch (error) {
          console.error("Error checking existing report:", error);
        }
      } else {
        setIsAlreadyReported(false);
      }
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ [type]: file });
    }
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  const validateForm = async () => {
    try {
      await step2Schema.validate(formData, { abortEarly: false });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      // Create a new object with only the relevant fields for Step 2
      const submissionData = {
        fraudPhoneNumber: formData.fraudPhoneNumber,
        mobileMoneyProvider: formData.mobileMoneyProvider,
        fraudFirstName: formData.fraudFirstName,
        fraudLastName: formData.fraudLastName,
        fraudDescription: formData.fraudDescription,
        fraudImage: formData.fraudImage,
        fraudEvidence: formData.fraudEvidence,
      };

      onSubmit(submissionData);
    }
  };

  return (
    <div className="w-full bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h2 className="text-2xl font-bold">Report fraudulent number</h2>
        </div>
        <div className="flex items-center mb-4 pb-2">
          <div className="flex items-center w-1/2">
            <div className="w-9 h-9 border border-gray-600 text-gray-600 rounded-full flex items-center justify-center mr-2 text-lg">
              1
            </div>
            <span className="ml-2 text-gray-600 text-lg">Your info</span>
          </div>
          <div className="flex items-center w-1/2 pl-5">
            <div className="w-9 h-9 border border-blue-600 text-blue-600 rounded-full flex items-center justify-center mr-2 text-lg">
              2
            </div>
            <span className="text-blue-700 ml-2 text-lg">Fraud report</span>
          </div>
        </div>
        {isAlreadyReported && (
          <div
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Just so you know!</p>
            <p>
              This phone number has been submitted by someone else and is
              currently under review.
            </p>
          </div>
        )}

        <p className="text-lg text-gray-600 mb-4">
          Details of the person and about the fraud.
        </p>

        <div className="mb-4">
          <div className="flex flex-col">
            <label htmlFor="fraudPhoneNumber" className="mb-1 text-gray-700">
              Phone number
            </label>
            <input
              type="tel"
              id="fraudPhoneNumber"
              name="fraudPhoneNumber"
              value={formData.fraudPhoneNumber || ""}
              onChange={handleChange}
              placeholder="e.g 02345xxxxxx"
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            {errors.fraudPhoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fraudPhoneNumber}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col">
            <label htmlFor="mobileMoneyProvider" className="mb-1 text-gray-700">
              Mobile money provider
            </label>
            <select
              id="mobileMoneyProvider"
              name="mobileMoneyProvider"
              value={formData.mobileMoneyProvider || ""}
              onChange={handleChange}
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            >
              <option value="">Select network</option>
              <option value="MTN">MTN</option>
              <option value="Vodafone">Telecel</option>
              <option value="AirtelTigo">AirtelTigo</option>
            </select>
            {errors.mobileMoneyProvider && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileMoneyProvider}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="fraudFirstName" className="mb-1 text-gray-700">
              First name
            </label>
            <input
              type="text"
              id="fraudFirstName"
              name="fraudFirstName"
              value={formData.fraudFirstName || ""}
              onChange={handleChange}
              placeholder="e.g James"
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            {errors.fraudFirstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fraudFirstName}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="fraudLastName" className="mb-1 text-gray-700">
              Last name
            </label>
            <input
              type="text"
              id="fraudLastName"
              name="fraudLastName"
              value={formData.fraudLastName || ""}
              onChange={handleChange}
              placeholder="e.g Bond"
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full"
            />
            {errors.fraudLastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fraudLastName}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Image of fraud person (Optional)
          </label>
          <div className="flex items-center border border-gray-300 rounded-md bg-gray-100 w-full">
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => handleFileChange(e, "fraudImage")}
              className="hidden"
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => triggerFileInput(imageInputRef)}
              className="bg-gray-800 text-white px-4 rounded-sm py-2 text-sm h-full"
            >
              Choose file
            </button>
            <span className="text-gray-700 ml-2 text-sm flex-grow">
              {formData.fraudImage
                ? formData.fraudImage.name
                : "No file chosen"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col">
            <label htmlFor="fraudDescription" className="mb-1 text-gray-700">
              Description of fraud
            </label>
            <textarea
              id="fraudDescription"
              name="fraudDescription"
              value={formData.fraudDescription || ""}
              onChange={handleChange}
              placeholder="Describe the fraud..."
              className="border p-2 rounded-md bg-gray-100 border-gray-300 w-full h-24"
            />
            {errors.fraudDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fraudDescription}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Evidence of fraud</label>
          <div className="flex items-center border border-gray-300 rounded-md bg-gray-100 w-full">
            <input
              type="file"
              ref={evidenceInputRef}
              onChange={(e) => handleFileChange(e, "fraudEvidence")}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => triggerFileInput(evidenceInputRef)}
              className="bg-gray-800 text-white px-4 rounded-sm py-2 text-sm h-full"
            >
              Choose file
            </button>
            <span className="text-gray-700 ml-2 text-sm flex-grow">
              {formData.fraudEvidence
                ? formData.fraudEvidence.name
                : "No file chosen"}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 pb-4">File types: all file types</p>
        <div className="flex justify-between p-4 border-t">
          <button
            type="button"
            onClick={prevStep}
            className="text-gray-600 border border-gray-400 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-200"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit fraud report
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2FraudReport;
