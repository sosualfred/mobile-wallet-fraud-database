import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { DatabaseIcon, HomeIcon, ClipboardListIcon, ChevronDown, CalendarIcon } from 'lucide-react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

// Importing the content components for the different tabs
import UsersContent from '../adminDashboard/usersContent';
import ReportedNumbersContent from '../adminDashboard/reportedNumbers';
import RequestsContent from '../adminDashboard/requestContents';

const ConfigPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeFilter, setTimeFilter] = useState('All time');

  // Function to handle tab click and update the active tab state
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(item => item !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };
  const isSectionExpanded = (section) => expandedSections.includes(section);


  return (
    <div>
      <Navbar />
      <div>
        <div className="px-4">
          {/* Rendering the navigation bar */}
          <div className="flex justify-between items-center p-1">
            <div className="flex space-x-6">
              {/* Rendering the nav items */}
              <NavItem
                icon={<HomeIcon size={18} />}
                text="Overview"
                active={activeTab === 'Overview'}
                onClick={() => handleTabClick('Overview')}
              />
              <NavItem
                icon={<DatabaseIcon size={18} />}
                text="Reported numbers"
                active={activeTab === 'Reported numbers'}
                onClick={() => handleTabClick('Reported numbers')}
              />
              <NavItem
                icon={<UserGroupIcon className='w-[28px] h-[20px]' />}
                text="Users"
                active={activeTab === 'Users'}
                onClick={() => handleTabClick('Users')}
              />
              <NavItem
                icon={<ClipboardListIcon size={18} />}
                text="Requests"
                active={activeTab === 'Requests'}
                onClick={() => handleTabClick('Requests')}
              />
            </div>
            <div className="flex items-center space-x-4">
              {/* Rendering the notification badge */}
              <span className="bg-red-100 px-2 py-2 rounded text-red-500 text-sm">
                New fraudulent number request - <a href="#" className="text-red-500 hover:underline font-bold">View</a>
              </span>
              <div className="relative ">
                {/* Rendering the time filter dropdown */}
                <div className="pointer-events-none absolute  inset-y-0 left-0 flex items-center px-2 text-gray-700 ">
                  <CalendarIcon className="w-4 h-4 text-gray-500 mr-2" />
                </div>
                <select
                  className="bg-white appearance-none border-gray-600 rounded pl-8 py-2 text-sm"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option>All time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rendering the content based on the active tab */}
        <div>
          {/* {activeTab === 'Overview' && <OverviewContent />} */}
          {activeTab === 'Reported numbers' && <ReportedNumbersContent />}
          {activeTab === 'Users' && <UsersContent />}
          {activeTab === 'Requests' && <RequestsContent />}
        </div>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Configuration Page */}
        <div className="flex items-center mb-4">
          <button className="text-blue-600 hover:text-blue-800" onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1 className="ml-4 text-2xl font-semibold">Configurations</h1>
        </div>
        {['API key usage', 'Number flagging threshold'].map((section, index) => (
          <div key={index} className="mb-4 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center font-bold">
              <h2 className="text-lg font-semibold">{section}</h2>
              <span className="text-sm text-gray-500">{isSectionExpanded(section) ? '2 configurations set' : '0 configurations set'}</span>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => toggleSection(section)}
              >
                {isSectionExpanded(section) ? 'Hide configurations' : 'Show configurations'}
              </button>
            </div>
            {isSectionExpanded(section) && (
              <div className="mt-4 space-y-2">
                {section === 'API key usage' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Set alert for maximum API key usage
                      </label>
                      <button className="text-sm text-blue-600 hover:underline">1500 API calls - Set maximum usage</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Set alert for maximum API keys usage by a single user
                      </label>
                      <button className="text-sm text-blue-600 hover:underline">0 API calls - Set maximum usage</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Deactivate API key when it reaches maximum usage
                      </label>
                      <button className="text-sm text-blue-600 hover:underline">2000 API calls - Set maximum usage</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Threshold for flagging number as Fraudulent
                      </label>
                      <button className="text-sm text-blue-600 hover:underline">4 fraud reports - Set threshold</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Set alert for user account review after reaching threshold for removed reports
                      </label>
                      <button className="text-sm text-blue-600 hover:underline">0 removed reports - Set threshold</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
// Component for rendering a single nav item
const NavItem = ({ icon, text, active, onClick }) => (
  <div
    className={`flex items-center space-x-1 cursor-pointer relative ${active ? 'text-blue-600' : 'text-gray-600'}`}
    onClick={onClick}
  >
    {icon}
    <span className="text-sm">{text}</span>
    {active && <div className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-blue-600"></div>}
  </div>
);

export default ConfigPage;
