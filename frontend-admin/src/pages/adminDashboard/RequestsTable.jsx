import React, { useEffect, useState } from 'react';

const RequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Clear this dammy data when the API is ready to be fetched
    const fetchedRequests = [
      { id: 'R1', name: 'Odoh Craig', phone: '09069784163', type: 'Fraud report', requestedBy: 'Isaac Osei', date: 'Apr 23, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Removal', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Removal', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Removal', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Fraud report', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Removal', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Fraud report', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Removal', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Fraud report', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
      { id: 'R2', name: 'Odoh Craig', phone: '09069784163', type: 'Fraud report', requestedBy: 'Isaac Osei', date: 'Apr 15, 2021', comment: 'Duped someone of GHS2000. Sent him the money and he ghosted me' },
    ];
    setRequests(fetchedRequests);
  }, []);

  //Call API here when its ready from the backend
  // const RequestsTable = () => {
  //   const [requests, setRequests] = useState([]);
  
  //   useEffect(() => {
  //     const fetchRequests = async () => {
  //       try {
  //         const response = await axios.get('YOUR_API_ENDPOINT_HERE');  // Replace this URL with your actual API endpoint
  //         setRequests(response.data);
  //       } catch (error) {
  //         console.error('Error fetching requests:', error);
  //       }
  //     };
  
  //     fetchRequests();
  //   }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">100 requests</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Report fraudulent number
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Request Type</th>
              <th className="px-6 py-3">Requested By</th>
              <th className="px-6 py-3">Date Requested</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{request.name}</td>
                <td className="px-6 py-4">{request.phone}</td>
                <td className="px-6 py-4">
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      color: 'white',
                      backgroundColor: request.type === 'Fraud report' ? '#FF6347' : '#FFD700',
                    }}
                  >
                    {request.type}
                  </span>
                </td>
                <td className="px-6 py-4">{request.requestedBy}</td>
                <td className="px-6 py-4">{request.date}</td>
                <td className="px-6 py-4">{request.comment}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <span>Showing 1–10 of 1000</span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">1</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">2</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">3</button>
          <span>...</span>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">100</button>
        </div>
      </div>
    </div>
  );
};

export default RequestsTable;
