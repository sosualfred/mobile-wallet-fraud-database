import {  ExternalLink, Trash2,  Home, Database, Users, ClipboardList, } from 'lucide-react';
import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const admins = [
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
  {
    firstName: "Odoh Craig",
    lastName: "Odoh Craig",
    email: "isaac@gmail.com",
    phone: "0905978463",
    dateAdded: "Apr 23, 2021",
    permissions: "3 permissions"
  },
 
];

const AdminList = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4">
        <div className="flex justify-between items-center p-1">
          <div className="flex space-x-6">
            
            <button
              className={`flex items-center ${activeTab === 'Overview' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleTabClick('Overview')}
            >
              <Home size={18} />
              <span>Overview</span>
            </button>
            <button
              className={`flex items-center ${activeTab === 'Reported numbers' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleTabClick('Reported numbers')}
            >
              <Database size={18} />
              <span>Reported numbers</span>
            </button>
            <button
              className={`flex items-center ${activeTab === 'Users' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleTabClick('Users')}
            >
              <Users size={18} />
              <span>Users</span>
            </button>
            <button
              className={`flex items-center ${activeTab === 'Requests' ? 'text-blue-500' : 'text-gray-700'}`}
              onClick={() => handleTabClick('Requests')}
            >
              <ClipboardList size={18} />
              <span>Requests</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-red-100 px-2 py-2 rounded text-red-500 text-sm">
              New fraudulent number request - <a href="#" className="text-red-500 hover:underline font-bold">View</a>
            </span>
          
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex gap-3"> <ArrowLeft className='text-[#1D4ED8]' />Admins</h2>
        <Link to="/new-admin-modal"> <button className="bg-[#1D4ED8] text-white px-4 py-2 rounded hover:bg-blue-600">Add new admin</button> </Link> 
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-2 text-left font-semibold text-gray-600">FIRST NAME</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">LAST NAME</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">EMAIL ADDRESS</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">PHONE NUMBER</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">DATE ADDED</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">PERMISSIONS</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{admin.firstName}</td>
                  <td className="px-4 py-2">{admin.lastName}</td>
                  <td className="px-4 py-2">{admin.email}</td>
                  <td className="px-4 py-2">{admin.phone}</td>
                  <td className="px-4 py-2">{admin.dateAdded}</td>
                  <td className="px-4 py-2">
                    <span className="text-[#1D4ED8]">{admin.permissions.split(" ")[0]}</span>
                    <span> {admin.permissions.split(" ")[1]}</span>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button className="text-[#1D4ED8] hover:text-blue-600">
                      <ExternalLink />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
