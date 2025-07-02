import React from 'react';
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="w-[40%] h-full relative">
      
      {/* Hero Text */}
      <div className="absolute text-[#88d9ee] font-bold text-[20px] md:text-[40px] lg:text-[55px] left-[10%] top-[10px] md:top-[90px] lg:top-[130px]">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      {/* Pagination Dots */}
      <div className="absolute flex items-center justify-center gap-3 left-[10%] top-[160px] md:top-[400px] lg:top-[500px]">
        {[0, 1, 2, 3].map((num) => (
          <FaCircle
            key={num}
            role="button"
            aria-label={`Show hero ${num + 1}`}
            onClick={() => setHeroCount(num)}
            className={`w-[14px] h-[14px] transition-transform duration-200 ease-in-out cursor-pointer p-20${
              heroCount === num ? 'fill-orange-400 scale-110' : 'fill-white'
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Hero;
