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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="flex items-center gap-5 pl-28 pt-8">
        <button onClick={() => navigate("/")}>
          <ArrowLeft className="text-blue-900" />
        </button>
        <h1 className="text-[23px] font-semibold">Search Results</h1>
      </div>

      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="border border-gray-300 outline-none w-[45vw] h-auto flex flex-col gap-5 rounded-lg p-4 bg-white shadow-lg">
          <div className="flex flex-col justify-center items-center pt-4">
            <p className="text-gray-500 mb-2">Profile</p>
            {reportData.fraudImage ? (
              <img
                src={reportData.fraudImage}
                alt="Profile"
                className="rounded-full w-[90px] h-[90px] object-cover"
              />
            ) : (
              <div className="rounded-full w-[90px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-bold">
                {reportData.fraudFirstName[0]}
                {reportData.fraudLastName[0]}
              </div>
            )}
            <p className="text-black text-xl font-semibold mt-2">
              {reportData.fraudFirstName} {reportData.fraudLastName}
            </p>
            <p>
              {reportData.mobileMoneyProvider} {reportData.fraudPhoneNumber}
            </p>
            <div className="flex gap-3 mt-4">
              <span className="border outline-none flex justify-center items-center gap-2 bg-slate-200 w-60 rounded-md">
                Date Reported:{" "}
                <p className="font-semibold">
                  {new Date(reportData.dateReported).toLocaleDateString()}
                </p>
              </span>
              <span className="border flex gap-2 outline-none bg-red-300 w-24 text-red-900 rounded-md">
                <ThumbsDown className="w-5" /> 10 votes
              </span>
            </div>
          </div>

          <h1 className="text-gray-400 text-[18px]">Comments</h1>
          <h2 className="text-[#4881F4] text-[18px]">
            Reported by: Isaac Osei
          </h2>
          <p className="text-gray-400">{reportData.fraudDescription}</p>

          <form
            onSubmit={handleSubmit}
            className="w-full h-[30vh] mx-auto rounded relative"
          >
            <div className="relative h-full">
              <textarea
                name="report"
                value={newReport}
                onChange={(e) => setNewReport(e.target.value)}
                placeholder="Write reasons here, attach evidence if available...."
                className="h-[calc(100%-56px)] bg-gray-100 rounded-lg border border-gray-300 outline-none w-full p-2 pt-6 pb-16 relative"
                required
              />

              <div className="absolute bottom-6 bg-gray-100 left-0 w-full h-20 flex items-center justify-between px-2 py-2 border border-gray-300 rounded-b-lg">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isSubmitting}
                >
                  <Send className="text-white" />{" "}
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
                <Paperclip className="text-gray-500" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitReport;
