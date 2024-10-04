// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { AlignJustify, User } from "lucide-react";
import Button from "./button";
import FraudReportModal from "./reportFraudModal/reportFraudModal";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getUserInitials = () => {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <Link to="/" className="text-blue-700 text-xl font-semibold">
        FraudWatch
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="solid" onClick={handleOpenModal}>
          Report fraudulent number
        </Button>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300">
            {user ? (
              <span className="text-sm font-medium">{getUserInitials()}</span>
            ) : (
              <AlignJustify className="w-5 h-5 text-gray-600" />
            )}
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {user ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/account"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      My Account
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Login
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/signup"
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Sign up
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Menu>
      </div>
      <FraudReportModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};

export default Navbar;
