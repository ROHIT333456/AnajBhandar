import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';

function Home() {
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState([]);
  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("https://anajbhandar-backend.onrender.com/api/hero");
        const data = await res.json();
        setHeroData(data);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === heroData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    <div className='overflow-x-hidden relative top-[70px]'>

      {/* Hero Section */}
      <div className='w-full bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 py-10">

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-5 text-white animate-fadeIn px-4 md:px-10">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="text-[#46d1f7]">{heroData[heroCount]?.text1?.split(' ')[0]}</span>{" "}
              {heroData[heroCount]?.text1?.split(' ').slice(1).join(' ')}
            </h2>
            <p className="text-base md:text-lg text-gray-300 tracking-wide">
              {heroData[heroCount]?.text2}
            </p>
            <button
              className="bg-[#46d1f7] text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#2cb5d4] hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/Collection")}
            >
              Shop Now
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center h-[300px] md:h-[400px] overflow-hidden">
            {heroData[heroCount]?.image ? (
              <img
                src={heroData[heroCount]?.image}
                alt="hero"
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="w-full bg-[#f9f9f9] dark:bg-[#0c2025] py-12 min-h-[400px]">
        <Product />
      </section>

      {/* Policy Section */}
      <section className="w-full bg-[#ecfafa] py-12 min-h-[300px]">
        <OurPolicy />
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-[#d0eff2] py-12 min-h-[250px]">
        <NewLetterBox />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
