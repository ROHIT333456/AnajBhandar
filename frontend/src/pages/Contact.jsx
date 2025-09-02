import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  const phoneNumber = '+91-8789159033'
  const emailAddress = 'manishkeshri547@gmail.com'

  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
      <Title text1={'CONTACT'} text2={'US'} />
      
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src={contact} alt="Rice Farm" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm' />
        </div>

        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-white font-bold lg:text-[18px] text-[15px]'>Our Rice Store</p>
          <div className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>Anaj Bhandar Rice Traders</p>
            <p>Bajar samiti, Garhwa, Jharkhand, India</p>
            {/* Hindi line added here */}
            <p className="mt-2 font-semibold text-yellow-300">ज़्यादा मात्रा में लेने के लिए संपर्क करें</p>
          </div>

          <div className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>
              Phone: <a href={`tel:${phoneNumber}`} className="text-blue-400 underline">{phoneNumber}</a>
            </p>
            <p>
              Email: <a href={`mailto:${emailAddress}`} className="text-blue-400 underline">{emailAddress}</a>
            </p>
          </div>

          <p className='lg:w-[80%] w-[100%] text-white text-[15px] lg:text-[18px] mt-[10px] font-bold'>Work With Us</p>
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            We're growing! Join our passionate team of rice experts and logistics professionals.
          </p>
          <button className='px-[30px] py-[20px] flex items-center justify-center text-white bg-transparent border border-white active:bg-slate-600 rounded-md'>
            Explore Careers
          </button>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default Contact
