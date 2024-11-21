import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import PublishFraudReportModal from './PublishFraudReportModal';  
import DeleteNumberModal from './DeleteNumberModal';  
import RemovedReportModal from './RemovedReportModal';

const ReportedNumbersContent = () => {
  const data = [
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent......." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent......." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent......." },
  ];

  const [selectedReport, setSelectedReport] = useState(null);
  const [isPublishFraudReportModalOpen, setIsPublishFraudReportModalOpen] = useState(false);
  const [isDeleteNumberModalOpen, setIsDeleteNumberModalOpen] = useState(false);
  const [isRemovedReportModalOpen, setIsRemovedReportModalOpen] = useState(false); 
  const [checkedRows, setCheckedRows] = useState({});

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setIsPublishFraudReportModalOpen(true); 
  };

  const handleRemoveClick = (report) => {
    setSelectedReport(report);
    setIsDeleteNumberModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteNumberModalOpen(false);
    setIsRemovedReportModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
    setIsPublishFraudReportModalOpen(false);
    setIsDeleteNumberModalOpen(false);
    setIsRemovedReportModalOpen(false);
  };

  const handleCheckboxChange = (index) => {
    setCheckedRows(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">
                <input 
                  type="checkbox" 
                  onChange={() => {}} 
                />
              </th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Network</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    checked={checkedRows[index] || false} 
                    onChange={() => handleCheckboxChange(index)} 
                  />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.network}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4 flex space-x-4">
                  <button 
                    onClick={() => handleReportClick(item)} 
                    className="text-blue-500 hover:underline"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => handleRemoveClick(item)} 
                    className="text-red-500 hover:underline"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <PublishFraudReportModal 
        isOpen={isPublishFraudReportModalOpen} 
        onClose={handleCloseModal} 
        report={selectedReport}  
      />
      <DeleteNumberModal 
        isOpen={isDeleteNumberModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleDelete} 
      />
      {isRemovedReportModalOpen && (
        <RemovedReportModal
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReportedNumbersContent;
