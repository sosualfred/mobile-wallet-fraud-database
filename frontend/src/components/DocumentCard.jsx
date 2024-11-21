// src/components/DocumentCard.jsx
import React from "react";

const DocumentCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">How to Use FraudWatch</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          1. Searching for a Number
        </h3>
        <p>
          Enter a phone number in the search bar on the home page to check if it
          has been reported for fraud.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          2. Reporting a Fraudulent Number
        </h3>
        <p>
          Click on the "Report fraudulent number" button in the navigation bar.
          You'll need to provide details about the fraudulent activity.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. Viewing Your Reports</h3>
        <p>
          After logging in, you can view all reported numbers under the
          "Reported numbers" tab.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">4. API Integration</h3>
        <p>
          For developers: You can integrate FraudWatch into your own
          applications using our API. Create an API key in the "API keys"
          section after logging in.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">5. Account Management</h3>
        <p>
          Update your account details or change your password by clicking on
          your profile icon and selecting "My Account".
        </p>
      </section>
    </div>
  );
};

export default DocumentCard;
