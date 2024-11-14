import React from 'react'
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
const ReportedNumber = () => {
  return (

   <div>
    <Navbar/>
     <div className=' bg-white border border-gray-200 h-[90vh]'>
      <div className='flex items-center gap-3 mt-6 ml-8'>
      <ArrowLeft className='text-blue-600 font-bold'/>
      <h1 className='font-bold'>Reported number</h1>
      </div>
      <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-10 mb-3">
        {/* Profile Image */}
        <div className="flex justify-center ">
          <img
            src="https://via.placeholder.com/100" // replace with actual image 
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
          />
        </div>


        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold text-gray-900">Nana Ofori Clement</h2>
          <p className="text-gray-600">MTN - 0586489369</p>
        </div>

        <div className="flex items-center justify-center mt-4 space-x-2">
          <span className="text-gray-500 text-sm font-bold bg-[#cddaf55b] rounded-md px-4 py-2">
            Date reported: <span className="text-gray-900 font-semibold">April 2, 2024</span>
          </span>
          <span className="bg-red-100 text-red-500 text-xs font-bold px-4 py-2 rounded-md">Private</span>
        </div>
        <div><h1 className='text-gray-500 mt-5 mb-4 font-bold'>Comment</h1>
          <h1 className='text-blue-600 mb-4 font-bold'>Reported By: Isaac Osei</h1>
          <p className='text-gray-500'>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
        </div>
      </div>
    </div>
   </div>
  )
}

export default ReportedNumber