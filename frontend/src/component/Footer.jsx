import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';

function Footer() {
  const navigate = useNavigate();

  // Dynamic contact info (you can pass props or use context instead)
  const supportPhone = '+91-8789159033';
  const supportEmail = 'support@AnajBhandar.com';

  return (
    <footer className="w-full bg-[#dbfcfcec] text-[#1e2223]">
      {/* Main Footer Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-16 py-8 gap-6">

        {/* Logo & Description */}
        <div className="md:w-[30%] w-full">
          <div className="flex items-center gap-2 mb-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="OneCart Logo" className="w-[30px] md:w-[40px]" />
            <h1 className="text-xl md:text-2xl font-semibold">Anaj Bhandar</h1>
          </div>
          <p className="text-sm md:text-base">
            Delivering premium rice — Basmati, Brown, Sona Masoori, and more — straight from farms to your kitchen. Trusted quality, farm-fresh flavor.
          </p>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}?text=Hi%20AnajBhandar%2C%20I%20am%20interested%20in%20buying%20your%20rice%20products!`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Company Links */}
        <div className="md:w-[20%] w-full text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2">Company</h2>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:underline" onClick={() => navigate('/')}>Home</li>
            <li className="cursor-pointer hover:underline" onClick={() => navigate('/products')}>Our Rice</li>
            <li className="cursor-pointer hover:underline" onClick={() => navigate('/farming-process')}>Farming Process</li>
            <li className="cursor-pointer hover:underline" onClick={() => navigate('/privacy')}>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-[25%] w-full text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2">Get in Touch</h2>
          <ul className="space-y-1 text-sm">
            <li>📞 {supportPhone}</li>
            <li>📧 {supportEmail}</li>
            <li className="hidden md:block">📞 +91 6207035060</li>
            <li className="hidden md:block">📧 info@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-400"></div>

      {/* Bottom Footer Section */}
      <div className="w-full py-3 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 bg-[#dbfcfcec]">
        <p>© 2025 Anaj Bhandar – All Rights Reserved</p>
        <p className="mt-1 md:mt-0">Website created by <span className="font-semibold text-black">Rohit Keshri</span></p>
      </div>
    </footer>
  );
}

export default Footer;
