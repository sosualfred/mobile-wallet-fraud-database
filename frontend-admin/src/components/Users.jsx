import React, { useState } from 'react';
import Navbar from './navbar';
import OverviewContent from '../pages/adminDashboard/adminOverview';
import RequestsContent from '../pages/adminDashboard/requestContents';
import ReportedNumbersContent from '../pages/adminDashboard/reportedNumbers';
import { Archive, ArrowUp, Database, CodeXml, ExternalLink, Trash2, CalendarIcon, ChevronDown } from 'lucide-react';
import GitPull from "../assets/git-pull-request.svg";

import { Search } from 'lucide-react';

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

  const apiData = [
    {
      id: 1,
      apiKeyName: 'GitHub key Integration',
      numberOfCalls: "23k",
      dateCreated: 'Apr23,2021',
      domainUsed: 'Restricted-10 domains',
      lastCallActivity: '1 hour ago',
      status: "Active"

    },
    {
      id: 1,
      apiKeyName: 'GitHub key Integration',
      numberOfCalls: "23k",
      dateCreated: 'Apr23,2021',
      domainUsed: 'Unrestricted-20 domains',
      lastCallActivity: '4 hours ago',
      status: "Active"
    },
    {
      id: 1,
      apiKeyName: 'GitHub key Integration',
      numberOfCalls: 200,
      dateCreated: 'Apr15,2021',
      domainUsed: 'Restricted-10 domains',
      lastCallActivity: 'June23,2023',
      status: "Inactive"
    },
    {
      id: 1,
      apiKeyName: 'GitHub key Integration',
      numberOfCalls: 89,
      dateCreated: 'Apr11,2021',
      domainUsed: 'Restricted-10 domains',
      lastCallActivity: 'May24,2023',
      status: "Deleted"
    },

  ];


  const data = [
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Public", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Public", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000,Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Public", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Public", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000,Sent him the money and he ghos..." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000,Sent him the money and he ghos..." },
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const [activeTab, setActiveTab] = useState('Users');
  const [subTab, setSubTab] = useState('API Keys'); // Added subTab state for nested tabs to handle switching between the tabs

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
              <div className="bg-white p-8 rounded-lg text-center text-gray-600">
                {subTab === 'API Keys' ? (
                  <div className="overflow-x-auto">
                    <div><h1 className='font-bold text-2xl mb-6 flex justify-start mt-1'>4 API Keys</h1></div>
                    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden box-border shadow-md">
  <table className="w-full">
    <thead className="bg-[#e5e7eb]">
      <tr>
        <th className="border-b border-gray-300 px-4 py-2 text-left">API Key Name</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">NUMBER OF CALLS</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">DATE CREATED</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">DOMAIN USED</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">LAST CALL ACTIVITY</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">STATUS</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left"></th>
      </tr>
    </thead>
    <tbody>
      {apiData.map((item, index) => (
        <tr key={item.id} className="border-b border-gray-300 last:border-b-0">
          <td className="px-4 py-2 text-left">{item.apiKeyName}</td>
          <td className="px-4 py-2 text-left">{item.numberOfCalls}</td>
          <td className="px-4 py-2 text-left">{item.dateCreated}</td>
          <td className="border-b border-gray-300 px-4 py-2 text-left">
          <span className={`${item.domainUsed.includes('Unrestricted') ? 'text-green-800' : item.domainUsed.includes('Restricted') ? 'text-red-800' : 'text-gray-800'}`}>
            {item.domainUsed.split('-')[0]}
          </span>
          {` -${item.domainUsed.split('-')[1]}`}
        </td>
          <td className="px-4 py-2 text-left">{item.lastCallActivity}</td>
          <td className="px-4 py-2 text-center">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium w-16 rounded-lg
                ${item.status === 'Active' ? 'bg-[#def7ec] text-black' : ''}
                ${item.status === 'Inactive' ? 'bg-[#f3f4f6] text-black' : ''}
                ${item.status === 'Deleted' ? 'bg-[#fde8e8] text-red-600' : ''}`}
            >
              {item.status}
            </span>
          </td>
          <td className="px-4 py-2 text-left">
            <div className="flex items-center space-x-4">
              <span className="whitespace-nowrap">{item.comment}</span>
              <ExternalLink className="text-blue-600 w-5" />
              <Trash2 className="text-red-700 w-5" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="border-t border-gray-300"></div>
</div>



                  </div>

                ) : (
                  <div>
                    <div className="flex justify-between items-center pt-6 px-10">
                      <div className="font-semibold text-xl flex justify-start">
                        100 Reported Cases
                      </div>

                      <div className="font-medium flex items-center space-x-2 mx-auto">
                        <input type="checkbox" name="checkbox" id="checkbox" className="w-5 h-5 border" />
                        <label htmlFor="checkbox" className="text-sm">Show reported reports</label>
                      </div>

                      <div className="flex items-center gap-4 ml-auto">
                        <div className="relative w-[20vw] max-w-sm">
                          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="text-gray-500 w-5 h-5" />
                          </span>
                          <input
                            type="text"
                            placeholder="Search phone number"
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <select className="border border-gray-400 w-28 h-10 rounded-md shadow-sm" name="category" id="category">
                          <option>All Status</option>
                          <option>Pending</option>
                          <option>Public</option>
                        </select>

                        <div className="relative w-[9vw] flex justify-end">
                          <select className="appearance-none border flex items-center w-full h-10 border-gray-400 rounded-md shadow-sm pl-10 pr-4" name="time" id="time">
                            <option>All time</option>
                            <option>Today</option>
                            <option>Last 7 days</option>
                            <option>Last Month</option>
                          </select>

                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                            <CalendarIcon className="w-5 h-5 text-black" />
                          </div>

                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
                            <ChevronDown className="w-5 h-5 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>


                      <div className=" mx-auto mt-9">
                        <table className="w-[80%] bg-white border-l-1 border-r-1 border border-gray-300 rounded-lg overflow-hidden box-border shadow-md">
                          <thead className='h-12 flex-1 gap-6 '>

                            <tr>
                              <th className="py-2 px-2 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 whitespace-nowrap">
                                <input type="checkbox" name="checkbox" id="checkbox" className="w-4 h-4 mr-2 inline-block" />
                                NAME
                              </th>
                              <th className="py-2 px-2 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 whitespace-nowrap">
                                PHONE NUMBER
                              </th>
                              <th className="py-2 px-2 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 whitespace-nowrap">
                                NETWORK
                              </th>
                              <th className="py-2 px-2 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 whitespace-nowrap">
                                DATE REPORTED
                              </th>
                              <th className="py-2 px-2 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 whitespace-nowrap">
                                STATUS
                              </th>
                              <th className="py-2 px-2 bg-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300 whitespace-nowrap">
                                COMMENT
                              </th>
                            </tr>


                          </thead>
                          <tbody>
                            {currentData.map((item, index) => (
                              <tr key={index} className="border-b border-gray-300">
                                <td className="py-2 px-2 border-b border-gray-300 text-left">
                                  <input type="checkbox" name="checkbox" id="checkbox" className="w-4 h-4 mr-2 inline-block" />
                                  {item.name}
                                </td>
                                <td className="py-2 px-2 border-b border-gray-300 text-left">{item.phone}</td>
                                <td className="py-2 px-2 border-b border-gray-300 text-left">{item.network}</td>
                                <td className="py-2 px-2 border-b border-gray-300 text-left">{item.date}</td>
                                <td className="py-2 px-2 border-b border-gray-300 text-left">
                                  <span className={`inline-block px-2 py-1 text-xs font-medium w-16 text-center rounded-lg ${item.status === 'Pending' ? 'text-black bg-[#FDF7B2]' : 'text-green-800 bg-green-100'}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-2 px-2 border-b border-gray-300 text-left">
                                  <div className="flex items-center space-x-4">
                                    <span className="whitespace-nowrap">{item.comment}</span>
                                    <ExternalLink className="text-blue-600 w-5" />
                                    <Trash2 className="text-red-700 w-5" />
                                  </div>
                                </td>
                              </tr>

                            ))}
                            <tr>
                              <td colSpan="6" className="py-2  px-4 pt-4 text-center flex justify-center items-center ">
                                <button
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  disabled={currentPage === 1}
                                  className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                                >
                                  &lt;
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                  >
                                    {index + 1}
                                  </button>
                                ))}
                                <button
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  disabled={currentPage === totalPages}
                                  className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                                >
                                  &gt;
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>


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
