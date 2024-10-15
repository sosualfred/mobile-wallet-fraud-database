import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CodeXml, FileCode, Database } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { searchFraudReport } from "../services/api";
import SearchInput from "../components/SearchInput";
import Navbar from "../components/Navbar";
import Button from "../components/button";
import ReportedCard from "../components/ReportedCard";
import ApiCard from "../components/ApiCard";
import DocumentCard from "../components/DocumentCard";

const Home = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("reported");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Please enter a phone number to search.");
      return;
    }
    try {
      const result = await searchFraudReport(searchTerm);
      if (result) {
        navigate(`/submit/${searchTerm}`, { state: { reportData: result } });
      } else {
        alert("No report found for this number.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "api":
        return user ? (
          <ApiCard />
        ) : (
          <div className="text-center mt-8">
            <h2 className="text-lg mb-6">
              Login or sign up to create and manage API Keys for third party
              integration
            </h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login">
                <Button variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="solid" className="w-full sm:w-auto">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        );
      case "reported":
        return user ? (
          <ReportedCard />
        ) : (
          <div className="text-center mt-8">
            <h2 className="text-lg mb-6">
              Login or sign up to view fraudulent numbers that you have reported
            </h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/login">
                <Button variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="solid" className="w-full sm:w-auto">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        );
      case "documentation":
        return <DocumentCard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center px-4 pt-8">
        <h1 className="text-center text-3xl md:text-4xl font-semibold mb-8">
          Real-time database to curb
          <br />
          mobile money fraud.
        </h1>

        <div className="w-full max-w-2xl mb-12 px-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for fraudulent mobile money number"
              className="flex-grow mb-4 sm:mb-0 sm:mr-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>

        <div className="w-full max-w-4xl px-4">
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 md:space-x-16 mb-8">
            <button
              className={`flex items-center text-gray-500 mb-4 ${
                activeTab === "api"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
              onClick={() => setActiveTab("api")}
            >
              <CodeXml size={24} className="mr-2" />
              <span>API keys</span>
            </button>
            <button
              className={`flex items-center text-gray-500 mb-4 ${
                activeTab === "reported"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
              onClick={() => setActiveTab("reported")}
            >
              <Database size={24} className="mr-2" />
              <span>Reported numbers</span>
            </button>
            <button
              className={`flex items-center text-gray-500 mb-4 ${
                activeTab === "documentation"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
              onClick={() => setActiveTab("documentation")}
            >
              <FileCode size={24} className="mr-2" />
              <span>Documentation</span>
            </button>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Home;
