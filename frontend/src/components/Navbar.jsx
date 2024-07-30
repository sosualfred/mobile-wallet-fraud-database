import React from 'react'
import Button from "./button"
import { AlignJustify } from 'lucide-react'


const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 ">
      <p className='text-blue-700'>Mobile Wallet Fraud Database</p>
      <div className='flex gap-4'>
      <Button variant="solid">Report fraudulent number </Button>
      <div className='flex items-center gap-2 py-2 px-2 border rounded-lg'>
      <AlignJustify/>
      <p>MK</p>
      </div>
        </div>      
      
    </div>
  )
}

export default Navbar