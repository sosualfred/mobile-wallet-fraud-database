import React from "react";
import TextInput from "./TextInput";

const AdminResetPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <form>
        <p className="text-center text-2xl font-bold mb-8">
          <span className="text-blue-500 mr-2">
            {" "}
            Mobile Wallet Fraud Database
          </span>{" "}
          Admin
        </p>

        <div className="border-2">
          <div className="p-4 mx-4">
            <h1 className="my-2 font-bold">Set new password</h1>
            <TextInput label="New password" type="text" name="New password" />
            <TextInput
              label="confirm new Password"
              type="password"
              name="Confirm new password"
            />

            <button
              variant="solid"
              type="submit"
              className="mt-4 py-3 px-8 w-96 bg-blue-600 text-white rounded-md "
            >
              Set password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminResetPassword;
