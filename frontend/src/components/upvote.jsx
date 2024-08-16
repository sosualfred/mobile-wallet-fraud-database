import Navbar from '../components/Navbar'
import Jeff from '../assets/images/jeff.webp'
import { ArrowLeft, Paperclip, Send, ThumbsDown, X, } from 'lucide-react'
import { useState } from 'react';

const UpVote = () => {
  
  const [report, setReport] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Report submitted:', report);
  };
  return (
    <div>
      <Navbar />

      <div className='flex items-center gap-5 pl-28 pt-8'>
      <a href="/"><ArrowLeft className=' text-blue-900' /></a>
        <a href="/"><h1 className='text-[23px] font-semibold'>Search Results</h1></a>
      </div>

      <div className="flex justify-center items-center min-h-screen pt-20">

        <div className='border border-gray-300 outline-none w-[40vw] h-[150vh] flex flex-col gap-5 rounded-lg p-4 bg-white shadow-lg'>
          <div className='flex flex-col justify-center items-center pt-4'>
            <img className='rounded-full w-[90px]' src={Jeff} alt="Nana Ofori Clement" />
            <p className='text-black text-xl font-semibold'>Nana Ofori Clement</p>
            <p>MTN 0556785432</p>
            <div className='flex gap-3 mt-4'>
              <span className='border outline-none flex justify-center items-center gap-2 bg-slate-200 w-60 rounded-md'>
                Date Reported: <p className='font-semibold'>April 3, 2024</p>
              </span>
              <span className='border flex gap-2 outline-none bg-red-300 w-24 text-red-900 rounded-md'>
                <ThumbsDown className='w-5' /> 10 votes
              </span>
            </div>

          </div>
          <h1 className='text-gray-400 text-[18px]'>Comments</h1>
          <h2 className='text-[#4881F4] text-[18px]'>Reported by: Isaac Osei</h2>
          <p className='text-gray-400'>With less than a month to go before European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agrrements to comply</p>

          <div className='flex justify-between'>
          <a href="/upvote"><h1 className='font-semibold text-[17px] text-blue-700 '>Flag number</h1></a>
            <X className='text-black text-5xl' />
          </div>

        

<form className="flex flex-col gap-4" >

         <div className='flex gap-6'>
         <div className="flex flex-col gap-2">
            <label className='text-[17px] font-semibold pl-2'>First name</label>
            <input
              type="name"
              id="firstName"
              placeholder="First name"
              className="w-[273px] px-4 py-2 border-2 bg-[#F9FAFB] border-gray-300 text-gray-600 rounded-lg outline-none"
            />  
          </div>

          <div className="flex flex-col gap-2">
            <label className='text-[17px] font-semibold pl-2'>Last name</label>
            <input
              type="name"
              id="lastName"
              placeholder="Last name"
              className="w-[273px] px-4 py-2 border-2 bg-[#F9FAFB] border-gray-300 text-gray-600 rounded-lg outline-none"
            />  
          </div>
         </div>

         <div className="flex flex-col gap-2">
         <label className='text-[17px] font-semibold pl-2'>Email address</label>
            <input
              type="text"
              id="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border-2 bg-[#F9FAFB] border-gray-300 text-gray-600 rounded-lg outline-none"
            />
          </div>


          <div onSubmit={handleSubmit} className='w-full  flex flex-col gap-3 h-[55vh] mx-auto rounded relative'>
          <label className='text-[17px] font-semibold pl-2'>Why are you upvoting?</label>
            <div className='relative  h-full'>
              <textarea
                name="report"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder='Write reasons here, attach evidence if available....'
                className='h-[calc(100%-56px)] bg-gray-100 rounded-lg border border-gray-300 outline-none w-full p-2 pt-6 pb-16 relative'
               
              />

              <div className='absolute bottom-6 bg-gray-100  left-0 w-full h-20 flex items-center justify-between px-2 py-2 border border-gray-300  rounded-b-lg'>
                <button
                  type='submit'
                  className='flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  <Send className='text-white' /> Upvote
                </button>
                <Paperclip className='text-gray-500' />
              </div>
            </div>
          </div>

          
</form>



        </div>

      </div>

    </div>
  )
}

export default UpVote