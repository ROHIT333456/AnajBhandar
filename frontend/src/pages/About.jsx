import React from 'react';
import Title from '../component/Title';
import about from '../assets/about.jpg';
import NewLetterBox from '../component/NewLetterBox';

function About() {
  return (
    <div className='w-[99vw] min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>

      {/* About Title */}
      <Title text1={'ABOUT'} text2={'US'} />

      {/* About Content */}
      <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-[40px] px-[20px]'>

        {/* About Image */}
        <div className='lg:w-[50%] w-full flex justify-center'>
          <img src={about} alt="About OneCart" className='lg:w-[65%] w-[80%] rounded shadow-md shadow-black' />
        </div>

        {/* About Text */}
        <div className='lg:w-[50%] w-[90%] flex flex-col gap-[20px] text-white'>
          <p className='text-[13px] md:text-[16px]'>
            Anaj Bhandar was born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, Anaj Bhandar makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='text-[13px] md:text-[16px]'>
            We serve modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          <p className='text-[15px] lg:text-[18px] font-bold'>Our Mission</p>
          <p className='text-[13px] md:text-[16px]'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. Anaj Bhandar connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='w-full flex flex-col items-center gap-[10px] px-[20px]'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-[30px] py-[40px]'>

          {/* Box 1 */}
          <div className='lg:w-[30%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[20px] text-white px-[30px] py-[20px] backdrop-blur-[2px] bg-[#ffffff0b] text-center'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p className='text-sm'>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>

          {/* Box 2 */}
          <div className='lg:w-[30%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[20px] text-white px-[30px] py-[20px] backdrop-blur-[2px] bg-[#ffffff0b] text-center'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Convenience</b>
            <p className='text-sm'>
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>

          {/* Box 3 */}
          <div className='lg:w-[30%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[20px] text-white px-[30px] py-[20px] backdrop-blur-[2px] bg-[#ffffff0b] text-center'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Exceptional Customer Service</b>
            <p className='text-sm'>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewLetterBox />
    </div>
  );
}

export default About;
