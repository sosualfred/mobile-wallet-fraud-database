import React from 'react';

const RemovedReportModal = ({ onClose }) => {
  const report = {
    name: "Nana Ofori Clement",
    phone: "0586483898",
    network: "MTN",
    date: "April 2, 2024",
    status: "Removed",
    removalComment: "With less than a month to go...",
    reportedByName: "Isaac Osei",
    reportedByEmail: "jamesbond@gmail.com",
    reportedByPhone: "09059784613",
    userAccountLink: "#",
    userImage: "https://via.placeholder.com/150",
    evidence: [
      { name: "image-screenshot.png", url: "#" },
      { name: "image-screenshot.png", url: "#" },
      { name: "image-screenshot.png", url: "#" },
    ],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Report Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl font-semibold">&times;</button>
        </div>
        <div className="mt-4 flex items-center">
          <img src={report.userImage} alt={report.name} className="w-16 h-16 rounded-full mr-4" />
          <div>
            <p className="text-lg font-semibold">{report.name}</p>
            <p className="text-gray-500">{report.network} - {report.phone}</p>
          </div>
        </div>
        <p className="text-gray-400 mt-2">Date reported: {report.date}</p>
        <p className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded inline-block mt-2">Removed</p>

        <div className="mt-4">
          <p><strong>Removal comment:</strong> {report.removalComment}</p>
          <p><strong>Reported by:</strong> {report.reportedByName} - {report.reportedByEmail} - {report.reportedByPhone}</p>
          <a href={report.userAccountLink} className="text-blue-600 hover:underline">View user account</a>
        </div>

        {/* Display attachments if they exist */}
        {report.evidence && report.evidence.length > 0 ? (
          <div className="mt-4">
            <strong>Evidence:</strong>
            <ul className="list-disc list-inside mt-2">
              {report.evidence.map((attachment, index) => (
                <li key={index}>
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {attachment.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4"><strong>Evidence:</strong> No attachments available.</p>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemovedReportModal;
