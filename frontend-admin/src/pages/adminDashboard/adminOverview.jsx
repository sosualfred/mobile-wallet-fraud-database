import React, { useState, useEffect } from 'react';
import { UserGroupIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Archive, ArrowUp, Database, FilePenLine, ThumbsDown, Trash2, X } from 'lucide-react';
import GitPull from '../../assets/git-pull-request.svg';
import BarChart from '../../components/BarChart';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const data = [
  { name: 'GitHub Key Integration', calls: '23k', domain: 'Restricted - 10 domains', activity: '1 hour ago' },
  { name: 'GitHub Key Integration', calls: '23k', domain: 'Unrestricted - 20 Domains', activity: '4 hours ago' },
  { name: 'GitHub Key Integration', calls: '2k', domain: 'Unrestricted - 20 Domains', activity: 'Apr 24, 2024' },
  { name: 'GitHub Key Integration', calls: '200', domain: 'Restricted - 10 domains', activity: 'June 23, 2024' },
  { name: 'GitHub Key Integration', calls: '200', domain: 'Unrestricted - 20 Domains', activity: '3 hours ago' },
  { name: 'GitHub Key Integration', calls: '200', domain: 'Restricted - 10 domains', activity: '2 hours ago' },
  { name: 'GitHub Key Integration', calls: '200', domain: 'Restricted - 10 domains', activity: 'June 23, 2024' },
  { name: 'GitHub Key Integration', calls: '200', domain: 'Unrestricted - 20 Domains', activity: '2 hours ago' },
  { name: 'GitHub Key Integration', calls: '200', domain: 'Unrestricted - 20 Domains', activity: 'May 24, 2023' },
  { name: 'GitHub Key Integration', calls: '89', domain: 'Restricted - 10 domains', activity: 'May 24, 2023' },
];

// Modal Component
const Modal = ({ onClose, chartData }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">GitHub Key Integration</h2>
          <X className="cursor-pointer text-gray-400" onClick={onClose} />
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-9">
            <h1 className='text-blue-600 underline'>Set usage limit</h1>
            <h1 className='text-blue-600 underline'>View user account</h1>
          </div>
          <div className="flex space-x-4">

            <Trash2 className="cursor-pointer text-red-600" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-md p-2">
          <div className="flex justify-between items-center">
            <span>All time API calls:</span>
            <span className="flex gap-2 font-bold">23K API calls<span className="text-blue-600" /></span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span >Last call activity :</span>
            <span className='font-bold'>1 hour ago</span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span>Date Created :</span>
            <span>Apr23,2024</span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span>Status :</span>
            <span className="text-sm bg-green-200 text-green-800 px-1 font-bold rounded-md flex items-center ml-2">Active</span>
          </div>
        </div>
        <div className="mt-6 bg-gray-100 rounded-md p-2">
         <span  className='flex justify-between'><h1>Domain restriction</h1> <span className='text-blue-600 underline'>Set Restriction</span></span> 
          <div className="flex gap-5 mt-2">
            <h1 className="bg-gray-200 rounded-md p-2">https://copianto.ai</h1>
            <h1 className="bg-gray-200 rounded-md p-2">https://sanwo.ai</h1>
          </div>
        </div>

        <div className="mt-6 bg-gray-100 rounded-md p-2">
          <div className="flex items-center mb-2 border-b pb-4">
            <img src={GitPull} alt="Git Pull" className="w-11 h-11 mr-2 rounded-md bg-gray-100 text-gray-400" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">3.4k</span>
                <span className="text-sm bg-green-200 text-green-800 px-1 font-bold rounded-md flex items-center ml-2">
                  <ArrowUp className="w-4 h-4 mr-0.5" /> 25%
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Number of API calls</p>
            </div>
            <div className="ml-auto">
              <div className="relative inline-block">
                <select className="appearance-none bg-gray-100 border border-gray-300 rounded px-3 py-1 pr-8 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>All time</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white mt-4">
            <BarChart data={chartData} />
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Component for displaying the overview content
const OverviewContent = () => {
  const [chartData, setChartData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("");
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExternalLinkClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-gray-200 h-[120vh] p-6">
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard icon={<Database className="w-7 h-7" />} value={0} title="Reported numbers" />
        <StatCard icon={<Archive className="w-7 h-7" />} value={0} title="Removed reports" />
        <StatCard icon={<ThumbsDown className="w-7 h-7" />} value={0} title="Total votes" />
        <StatCard icon={<UserGroupIcon className="w-7 h-7" />} value={0} title="Total users" />
        <StatCard icon={<img src={GitPull} alt="Git Pull" className="w-7 h-7" />} value={0} title="Total API calls" />
      </div>

      <div className="pt-4">
        <div className="grid grid-cols-5 h-[70vh] gap-4">
          <div className="col-span-2 flex">
            <ApiCallsCard chartData={chartData} />
          </div>
          <div className="col-span-3 flex">
            <TopApiKeyUsageCard handleExternalLinkClick={handleExternalLinkClick} />
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal} chartData={chartData} />}
    </div>
  );
};

// Component for displaying a single stat card
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
        <ArrowUp className='w-4 h-4' /> 0%
      </span>
    </div>
  </div>
);

// Component for displaying the API calls card
const ApiCallsCard = ({ chartData }) => (
  <div className="bg-white p-4 rounded-lg shadow flex-1 mb-14">
    <h3 className="text-lg font-semibold mb-4">API calls</h3>
    <div className="flex items-center mb-6 border-b pb-4">
      <label className="flex items-center cursor-pointer mr-6">
        <input type="checkbox" className="form-checkbox text-blue-600 mr-2 h-4 w-4" readOnly />
        <span className="text-sm">Successful calls</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input type="checkbox" className="form-checkbox border-gray-300 mr-2 h-4 w-4" />
        <span className="text-sm">Failed calls</span>
      </label>
    </div>
    <div className="flex items-center mb-2 border-b pb-4">
      <img src={GitPull} alt="Git Pull" className="w-11 h-11 mr-2 rounded-md bg-gray-100 text-gray-400" />
      <div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">0</span>
          <span className="text-sm bg-green-200 text-green-800 px-1 font-bold rounded-md flex items-center ml-2">
            <ArrowUp className="w-4 h-4 mr-0.5" /> 0%
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Number of API calls</p>
      </div>
      <div className="ml-auto">
        <TimeFilter />
      </div>
    </div>
    <div className="flex items-center justify-center bg-white mt-4 ">
      <BarChart data={chartData} />
    </div>
  </div>
);

// Component for displaying the time filter dropdown
const TimeFilter = () => (
  <div className="relative inline-block">
    <select className="appearance-none bg-gray-100 border border-gray-300 rounded px-3 py-1 pr-8 text-sm">
      <option>Last 7 days</option>
      <option>Last 30 days</option>
      <option>Last 6 months</option>
      <option>Last year</option>
      <option>All time</option>
    </select>
    <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

// Component for displaying the top API key usage card
const TopApiKeyUsageCard = ({ handleExternalLinkClick }) => (
  <div className="bg-white p-4 rounded-lg shadow flex-1 w-[57vw] overflow-x-auto mb-14">
    <div className="flex justify-between">
      <h3 className="text-base font-semibold">Top 10 API Key usage</h3>
      <TimeFilter />
    </div>
    <div className="text-center pt-5" />
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead>
          <tr>
            <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 whitespace-nowrap">API KEY NAME</th>
            <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 whitespace-nowrap">NUMBER OF CALLS</th>
            <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 whitespace-nowrap">DOMAIN USED</th>
            <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 whitespace-nowrap">LAST CALL ACTIVITY</th>
            <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-600 whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-xs">{item.name}</td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-xs">{item.calls}</td>
              <td className="px-4 py-3 whitespace-nowrap text-xs">
                <span className={`font-semibold ${item.domain.includes('Restricted') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.domain.split(' - ')[0]}
                </span> - {item.domain.split(' - ')[1]}
              </td>
              <td className="px-4 py-3 text-gray-700 flex items-center whitespace-nowrap text-xs">
                {item.activity}
                <Link className="ml-2 text-blue-500 hover:text-blue-700"></Link>
              </td>
              <td>
                <ExternalLink
                  className="text-blue-600 w-4 text-xs cursor-pointer"
                  onClick={handleExternalLinkClick}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OverviewContent;