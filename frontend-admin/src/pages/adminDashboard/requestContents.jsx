import React from 'react'
import RequestsTable from './RequestsTable';

const RequestsContent = () => (
    <div className='bg-gray-100 min-h-screen'>
      <h2 className="text-xl font-bold mb-4">Requests</h2>
        <RequestsTable />
      
    </div>
  );

export default RequestsContent