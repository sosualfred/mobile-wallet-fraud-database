// src/components/submitreport.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip, Send, ThumbsDown } from "lucide-react";
import Navbar from "./Navbar";
import { searchFraudReport, submitNewReport } from "../services/api";

const SubmitReport = () => {
  const { phoneNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [newReport, setNewReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state?.reportData) {
        setReportData(location.state.reportData);
      } else if (phoneNumber) {
        try {
          const data = await searchFraudReport(phoneNumber);
          setReportData(data);
        } catch (error) {
          console.error("Error fetching report:", error);
          alert("Failed to fetch report data. Please try again.");
          navigate("/");
        }
      }
    };

    fetchData();
  }, [phoneNumber, location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReport.trim()) {
      alert("Please enter a report before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitNewReport(phoneNumber, newReport);
      alert("Report submitted successfully!");
      setNewReport("");
      // Refresh the report data
      const updatedData = await searchFraudReport(phoneNumber);
      setReportData(updatedData);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!reportData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-5 mb-6">
          <button onClick={() => navigate("/")} className="text-blue-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Search Results</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-500 mb-2">Profile</p>
            {reportData.fraudImage ? (
              <img
                src={reportData.fraudImage}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover mb-2"
              />
            ) : (
              <div className="rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-bold mb-2">
                {reportData.fraudFirstName[0]}
                {reportData.fraudLastName[0]}
              </div>
            )}
            <p className="text-xl font-semibold">
              {reportData.fraudFirstName} {reportData.fraudLastName}
            </p>
            <p className="text-gray-600">
              {reportData.mobileMoneyProvider} {reportData.fraudPhoneNumber}
            </p>
            <div className="flex gap-3 mt-4">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                Date Reported:{" "}
                <span className="font-semibold">
                  {new Date(reportData.dateReported).toLocaleDateString()}
                </span>
              </span>
              <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm flex items-center">
                <ThumbsDown className="w-4 h-4 mr-1" /> 10 votes
              </span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-600 mb-2">
              Reported by: Isaac Osei
            </h3>
            <p className="text-gray-700">{reportData.fraudDescription}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <textarea
              value={newReport}
              onChange={(e) => setNewReport(e.target.value)}
              placeholder="Write your report here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
              <Paperclip className="text-gray-500 cursor-pointer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitReport;
