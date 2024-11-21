import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, X } from "lucide-react";
import Button from "./button";
import FraudReportModal from "./reportFraudModal/reportFraudModal";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getUserInitials = () => {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md">
      {/* Logo and Hamburger Icon */}
      <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
        <Link to="/" className="text-blue-700 text-xl font-semibold">
          FraudWatch
        </Link>
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <AlignJustify className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto`}
      >
        <Button
          variant="solid"
          onClick={handleOpenModal}
          className="w-full md:w-auto"
        >
          Report fraudulent number
        </Button>




        {/* User Profile Dropdown */}
        <div className="relative w-full md:w-auto">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-full md:w-10 h-10 rounded-lg border border-gray-300"
          >
            {user ? (
              <span className="text-sm font-medium">{getUserInitials()}</span>
            ) : (
              <AlignJustify className="w-5 h-5 text-gray-600" />
            )}
          </button>


             {/* Added UI to Nav Dropdown here */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ring-1 ring-black ring-opacity-5 z-50">
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fraud Report Modal */}
      <FraudReportModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};

export default Navbar;
