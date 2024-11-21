import React, { useState, useEffect } from "react";
import { Delete, ExternalLink, Plus, Trash2, X, Copy, PlusIcon, FilePenLine, ChevronDownIcon, ArrowUp } from "lucide-react";
import Button from "./button";
import { useAuth } from "../hooks/useAuth";
import { createAPIKey, fetchAPIKeys, updateAPIKey, deleteAPIKey } from "../services/api";
import { Link } from "react-router-dom";
import BarChart from "../components/BarCharts";
import GitPull from "../assets/git-pull-request.svg";

const ApiKeyModal = ({ onClose, onCreate, apiKey }) => {
  const isEditMode = apiKey !== null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[450px] h-[64vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{isEditMode ? "Edit API Key" : "Create new API Key"}</h2>
          <X className="cursor-pointer text-gray-400" onClick={onClose} />
        </div>
        <hr className="border-gray-300 my-4" />
        <form onSubmit={onCreate}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">API Key name</label>
            <input
              name="apiKeyName"
              type="text"
              defaultValue={isEditMode ? apiKey.apiKeyName : ""}
              placeholder="e.g. MWFD integration"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">Domain restriction</label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-md overflow-hidden">
              <span className="text-gray-500 bg-gray-100 px-3 py-2 border-r border-gray-300 flex items-center">
                https://
              </span>
              <input
                name="domain"
                type="text"
                defaultValue={isEditMode ? apiKey.domain[0] : ""}
                placeholder="e.g. jas.com"
                className="flex-1 py-2 px-3 bg-gray-100 focus:outline-none"
              />
              <span className="text-white bg-blue-700 px-3 py-2 border-l border-gray-300 flex items-center">
                <PlusIcon />
              </span>
            </div>
            <span className="text-gray-500 mt-4 leading-none text-xs bg-gray-100 rounded-md block p-2 whitespace-nowrap">
              When you leave this empty, any domain will be able to use this API key.
            </span>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-center items-center">
            <button className="bg-blue-600 rounded-lg py-3 px-4 w-[45vw] text-white">
              {isEditMode ? "Update Key" : "Create Key"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExternalLinkModal = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [chartData, setChartData] = useState(null);

  const handleToggle = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">GitHub Key Integration</h2>
          <X className="cursor-pointer text-gray-400" onClick={onClose} />
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <h1 className={`font-medium ${isChecked ? 'text-blue-600' : 'text-gray-600'}`}>Inactive</h1>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div className="relative">
                <div className={`block w-14 h-8 rounded-full transition-all ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-0'}`}
                ></div>
              </div>
            </label>
            <h1 className={`font-medium ${!isChecked ? 'text-blue-600' : 'text-gray-600'}`}>Active</h1>
          </div>

          <div className="flex space-x-4">
            <FilePenLine className="cursor-pointer text-blue-600" />
            <Trash2 className="cursor-pointer text-red-600" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-md p-2">
          <div class="flex justify-between items-center">
            <span>API Key:</span>
            <span class="api-key" className="flex gap-2">gjabhdh72868983anmbahngaj79369716<span className="text-blue-600" /></span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span>Date Created :</span>
            <span class="api-key">Apr23,2024</span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span>Status :</span>
            <span class="api-key" className="text-sm bg-green-200 text-green-800 px-1 font-bold rounded-md flex items-center ml-2">Active</span>
          </div>
        </div>
        {isChecked ? (
          <div className="mt-6 bg-gray-100 rounded-md p-2">
            <h1>Domain Restriction</h1>
            <div className="flex gap-5 mt-2">
              <h1 className="bg-gray-200 rounded-md p-2">https://copianto.ai</h1>
              <h1 className="bg-gray-200 rounded-md p-2">https://sanwo.ai</h1>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-gray-100 rounded-md p-2">
            <h1>You have not restricted this API to any domain yet</h1>
          </div>
        )}

        <div className="mt-6 bg-gray-100 rounded-md p-2">
          <div className="flex items-center mb-2 border-b pb-4">
            <img src={GitPull} alt="Git Pull" className="w-11 h-11 mr-2 rounded-md bg-gray-100 text-gray-400" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">3.4k</span>
                <span className="text-sm bg-green-200 text-green-800 px-1 font-bold rounded-md flex items-center ml-2">
                  <ArrowUp className="w-4 h-4 mr-0.5" /> 25%
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Number of API calls</p>
            </div>
            <div className="ml-auto">
              <div className="relative inline-block">
                <select className="appearance-none bg-gray-100 border border-gray-300 rounded px-3 py-1 pr-8 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>All time</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {isChecked && (
            <div className="flex items-center justify-center bg-white mt-4">
              <BarChart data={chartData} />
            </div>
          )}

          {!isChecked && (
            <div className="mt-4 text-center text-gray-500">
              <h2>You have no API call analysis yet</h2>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ApiCard = () => {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState(null);
  const [isExternalLinkModalOpen, setIsExternalLinkModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const keysPerPage = 5;
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(apiKeys.length / keysPerPage);
  const displayedKeys = apiKeys.slice(
    (currentPage - 1) * keysPerPage,
    currentPage * keysPerPage
  );

  const handleCreateApiKey = () => {
    setCurrentApiKey(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentApiKey(null);
  };

  const handleCloseExternalLinkModal = () => {
    setIsExternalLinkModalOpen(false);
  };

  const handleCreateOrUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const apiKeyName = formData.get('apiKeyName');
    const domainInput = formData.get('domain');
    const domain = domainInput ? [domainInput] : [];

    try {
      if (currentApiKey) {
        const updatedKey = await updateAPIKey(currentApiKey.id, { apiKeyName, domain });
        setApiKeys((prevKeys) =>
          prevKeys.map((key) => (key.id === updatedKey.id ? updatedKey : key))
        );
      } else {
        const newApiKey = await createAPIKey({ apiKeyName, domain });
        setApiKeys((prevKeys) => [...prevKeys, newApiKey]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving API key:", error);
    }
  };

  const handleEdit = (key) => {
    setCurrentApiKey(key);
    setIsModalOpen(true);
  };

  const handleDelete = async (keyId) => {
    try {
      await deleteAPIKey(keyId);
      setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== keyId));
    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  const handleOpenExternalLinkModal = () => {
    setIsExternalLinkModalOpen(true);
  };

  useEffect(() => {
    const loadAPIKeys = async () => {
      if (user) {
        setLoading(true);
        try {
          const keys = await fetchAPIKeys();
          console.log("Fetched keys:", keys);
  
          // Sort keys by createdAt in descending order
          const sortedKeys = Array.isArray(keys)
            ? keys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : [];
  
          setApiKeys(sortedKeys);
        } catch (error) {
          console.error("Error fetching API keys:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    loadAPIKeys();
  }, [user]);

  return (
    <div className="bg-white shadow-md rounded-lg mx-auto pr-11 p-4 w-[80vw]">
      <div >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">API Keys</h2>
          {user && (
            <Button
              onClick={handleCreateApiKey}
              variant="outline"
              className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Create API Key
            </Button>
          )}
        </div>

        {
          user ? (
            apiKeys.length > 0 ? (
              <table className="w-full table-auto text-sm">
                <thead className="bg-gray-100">
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 text-gray-700 font-medium">API KEYS</th>
                    <th className="py-3 px-4 text-gray-700 font-medium">API KEY NAME</th>
                    <th className="py-3 px-4 text-gray-700 font-medium">DATE CREATED</th>
                    <th className="py-3 px-4 text-gray-700 font-medium">STATUS</th>
                    <th className="py-3 px-4 text-gray-700 font-medium text-right">

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedKeys.map((key) => (
                    <tr key={key.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600 truncate">{key.apiKey}</td>
                      <td className="py-3 px-4 text-gray-600 truncate">{key.apiKeyName}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {key.createdAt
                          ? new Date(key.createdAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${key.status
                              ? key.status === "active"
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-200 text-gray-500"
                              : "bg-gray-200 text-gray-500"
                            }`}
                        >
                          {key.status || "inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex justify-end items-center space-x-3">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            navigator.clipboard.writeText(key.apiKey || key.key)
                          }
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={handleOpenExternalLinkModal}
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(key.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">
                No API keys found. Create one to get started.
              </p>
            )
          ) : (
            <div className="text-center">
              <p className="mb-4">
                Login or sign up to create and manage API Keys for third-party integration.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="solid">Sign up</Button>
                </Link>
              </div>
            </div>
          )}
        <div className="flex justify-between items-center bg-gray-100 p-4 border-t">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-3 py-1 text-sm font-medium rounded ${currentPage === 1
                  ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                  : "text-blue-500 bg-blue-100 hover:bg-blue-200"
                }`}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-3 py-1 text-sm font-medium rounded ${currentPage === totalPages
                  ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                  : "text-blue-500 bg-blue-100 hover:bg-blue-200"
                }`}
            >
              Next
            </button>
          </div>
        </div>
        {isModalOpen && (
          <ApiKeyModal
            onClose={handleCloseModal}
            onCreate={handleCreateOrUpdate}
            apiKey={currentApiKey}
          />
        )}
        {isExternalLinkModalOpen && (
          <ExternalLinkModal onClose={handleCloseExternalLinkModal} />
        )}
      </div>
    </div>
  );
};

export default ApiCard;