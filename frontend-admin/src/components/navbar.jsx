import React, { useState } from 'react';
import Button from "../components/button"; 
import { AlignJustify } from 'lucide-react'; 
import { UserIcon } from '@heroicons/react/24/outline'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Toggle the popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 relative">
      <p className='text-blue-700 font-medium'>
        Mobile Wallet Fraud Database
      </p>
      <div className='flex gap-4'>
        <Button variant="solid">Report fraudulent number</Button>


        <div className='bg-gray-100 flex items-center gap-2 py-2 px-2 border rounded-lg cursor-pointer' onClick={togglePopover}>
          <AlignJustify />
          {/* Render the AlignJustify icon */}
          <UserIcon className='w-5 h-5'/>
          {/* Render the UserIcon icon */}
        </div>

        {/* Popover */}
        {popoverOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 w-48 z-10">
            <div className="border-b pb-2 mb-2">
              <p className="font-semibold text-gray-700">Isaac Osei</p>
              <p className="text-gray-500 text-sm">isaac@example.com</p>
            </div>
            <ul className="space-y-2">
              <li> 
                <button className="text-gray-700 hover:text-blue-500 w-full text-left">
                <Link to='/my-account'>My account</Link>  
                </button>
              </li>
              <li>
                <button className="text-gray-700 hover:text-blue-500 w-full text-left">
                  Admins
                </button>
              </li>
              <li>
                <button className="text-gray-700 hover:text-blue-500 w-full text-left">
                  Configurations
                </button>
              </li>
              <li>
                <button className="text-red-500 hover:text-red-700 w-full text-left">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
