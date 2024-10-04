import React from "react";
import { Link } from "react-router-dom";
import Button from "./button";

const ApiCard = () => {
  return (
    <div className="text-center mt-8">
      <h2 className="text-lg mb-6">
        Login or sign up to create and manage API Keys for third party
        integration
      </h2>
      <div className="flex justify-center space-x-4">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="solid">Sign up</Button>
        </Link>
      </div>
    </div>
  );
};

export default ApiCard;
