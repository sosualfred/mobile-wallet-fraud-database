import React, { useState } from 'react';
import Button from "./button";
import { AlignJustify } from 'lucide-react';
import FraudReportModal from './reportFraudModal/reportFraudModal'; 

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <p className='text-blue-700'>Mobile Wallet Fraud Database</p>
      <div className='flex gap-4'>
        <Button variant="solid" onClick={handleOpenModal}>Report fraudulent number</Button>
        <div className='flex items-center gap-2 py-2 px-2 border rounded-lg'>
          <AlignJustify />
          <p>MK</p>
        </div>
      </div>

      <FraudReportModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Navbar;
