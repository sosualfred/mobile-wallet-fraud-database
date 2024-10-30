import React, { useState } from 'react';
import Navbar from './navbar';
import OverviewContent from '../pages/adminDashboard/adminOverview';
import RequestsContent from '../pages/adminDashboard/requestContents';
import ReportedNumbersContent from '../pages/adminDashboard/reportedNumbers';
import { Archive, ArrowUp, Database, CodeXml } from 'lucide-react';
import GitPull from "../assets/git-pull-request.svg";

const StatCard = ({ icon, value, title }) => (
  <div className="bg-white p-3 rounded-lg shadow flex items-center justify-between">
    <div className="flex items-center">
      <div className="bg-gray-100 p-2 rounded-md mr-3">{icon}</div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
    <div className="flex pb-5">
      <span className="bg-green-200 flex px-1 rounded-md font-bold text-green-800 text-sm items-center justify-between">
        <ArrowUp className="w-4 h-4 flex space-between" /> 0%
      </span>
    </div>
  </div>
);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [subTab, setSubTab] = useState('API Keys'); // Added subTab state for nested tabs 

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <p className="text-gray-600"><OverviewContent /></p>;
      case 'Reported numbers':
        return <p className="text-gray-600"><ReportedNumbersContent /></p>;
      case 'Users':
        return (
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Odoh Craig - odohcraig@gmail.com - 09059784163</h2>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Deactivate user</button>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-6">
                <StatCard icon={<Database className="w-7 h-7" />} value={4} title="Reported numbers" />
                <StatCard icon={<img src={GitPull} alt="Git Pull" className="w-7 h-7" />} value={0} title="Total API calls" />
                <StatCard icon={<Archive className="w-7 h-7" />} value={0} title="Removed reports" />
              </div>

              {/* Sub Tabs for API Keys and Reported Numbers  */}

              <div className="flex justify-center items-center border-b mb-4">
                <button
                  onClick={() => setSubTab('API Keys')}
                  className={`flex items-center px-4 py-2 ${subTab === 'API Keys' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  <CodeXml className="w-5 h-5 mr-1" />
                  API Keys
                </button>
                <button
                  onClick={() => setSubTab('Reported numbers')}
                  className={`flex items-center px-4 py-2 ${subTab === 'Reported numbers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  <Database className="w-5 h-5 mr-1" />
                  Reported numbers
                </button>
              </div>

              {/* Sub Tab Content */}
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
                {subTab === 'API Keys' ? (
                  <div>
                    <p className="text-xl font-semibold">0 API Keys</p>
                    <p className="mt-2 text-gray-400">User has not created any API key.</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-400">No reported numbers available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'Requests':
        return <p className="text-gray-600"><RequestsContent /></p>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />


      <div className="flex items-center justify-between mb-6">
     
        <div className="flex space-x-4">
          {['Overview', 'Reported numbers', 'Users', 'Requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>


        <button className="bg-[#fde8e8] text-red-500 px-4 py-2 rounded">
          New fraudulent number request - View
        </button>
      </div>


      <div>{renderContent()}</div>
    </div>
  );
};

export default UserDashboard;
