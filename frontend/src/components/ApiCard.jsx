// src/components/ApiCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Copy, Edit, Trash2 } from "lucide-react";
import Button from "./button";
import { useAuth } from "../hooks/useAuth";

const ApiCard = () => {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState([]);

  const handleCreateApiKey = () => {
    // Implement API key creation logic here
    console.log("Create API key");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">API Keys</h2>
        {user && (
          <Button onClick={handleCreateApiKey} variant="solid">
            <Plus className="w-4 h-4 mr-2" /> Create API Key
          </Button>
        )}
      </div>
      {user ? (
        apiKeys.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Key</th>
                <th className="text-left py-2">Created</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{key.name}</td>
                  <td className="py-2">{key.key}</td>
                  <td className="py-2">{key.created}</td>
                  <td className="py-2 flex space-x-2">
                    <Copy className="cursor-pointer text-gray-500 hover:text-gray-700" />
                    <Edit className="cursor-pointer text-blue-500 hover:text-blue-700" />
                    <Trash2 className="cursor-pointer text-red-500 hover:text-red-700" />
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
            Login or sign up to create and manage API Keys for third party
            integration
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
    </div>
  );
};

export default ApiCard;
