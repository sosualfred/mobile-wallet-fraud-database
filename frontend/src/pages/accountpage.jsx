import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/button";
import PasswordInput from "../components/passwordInput";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

const AccountPage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/me");
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <a href="/" className="text-blue-900">
            <ArrowLeft className="w-6 h-6" />
          </a>
          <h1 className="text-2xl font-bold">My account</h1>
        </div>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstname"
              >
                First name
              </label>
              <input
                type="text"
                id="firstname"
                value={userData?.firstName || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastname"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                value={userData?.lastName || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={userData?.email || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={userData?.phoneNumber || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
              />
            </div>
          </div>

          <div className="mb-6">
            <Button variant="solid">Update details</Button>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <PasswordInput id="oldPassword" />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <PasswordInput id="newPassword" />
            </div>
          </div>

          <div>
            <Button variant="solid">Change Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
