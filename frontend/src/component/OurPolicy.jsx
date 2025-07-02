import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-screen md:h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 px-4 py-10'>
      
      {/* Section Title */}
      <div className='text-center mt-4'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-blue-100 text-sm md:text-lg mt-2'>
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className='w-full flex flex-wrap items-center justify-center gap-10 md:gap-14'>
        
        {/* Easy Exchange */}
        <div className='w-[300px] h-auto flex flex-col items-center text-center gap-3'>
          <RiExchangeFundsLine className='text-[#90b9ff] w-10 h-10 md:w-16 md:h-16' />
          <p className='text-[#a5e8f7] font-semibold text-lg md:text-2xl'>Easy Exchange Policy</p>
          <p className='text-[aliceblue] text-xs md:text-base font-medium'>
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* 7 Days Return */}
        <div className='w-[300px] h-auto flex flex-col items-center text-center gap-3'>
          <TbRosetteDiscountCheckFilled className='text-[#90b9ff] w-10 h-10 md:w-16 md:h-16' />
          <p className='text-[#a5e8f7] font-semibold text-lg md:text-2xl'>7 Days Return Policy</p>
          <p className='text-[aliceblue] text-xs md:text-base font-medium'>
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Customer Support */}
        <div className='w-[300px] h-auto flex flex-col items-center text-center gap-3'>
          <BiSupport className='text-[#90b9ff] w-10 h-10 md:w-16 md:h-16' />
          <p className='text-[#a5e8f7] font-semibold text-lg md:text-2xl'>Best Customer Support</p>
          <p className='text-[aliceblue] text-xs md:text-base font-medium'>
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
