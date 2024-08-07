import React from "react";
import TextInput from "./TextInput";
import { EyeOff, Eye } from "lucide-react";

const AdminLogin = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <form>
        <p className="text-center text-2xl font-bold mb-8">
          <span className="text-blue-500 mr-4">
            {" "}
            Mobile Wallet Fraud Database
          </span>{" "}
          Admin
        </p>

        <div className=" flex border-2 mt-4 ">
          <div className="p-6 mx-4">
            <h3 className="my-1 font-bold">Login</h3>
            <TextInput label="Email address" type="text" name="Email address" />
            <TextInput label="Password" type="password" name="password" />

            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    className="mr-2"
                  />
                  
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-medium text-gray-700 mr-40"
                    >
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="text-blue-400 justify-items-end flex"
                    >
                    Lost Password?
                    </a>
                </div>
              </div>
            </div>
            <button
              variant="solid"
              type="submit"
              className="mt-4 py-3 px-8 w-96 bg-blue-600 text-white rounded-md "
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
