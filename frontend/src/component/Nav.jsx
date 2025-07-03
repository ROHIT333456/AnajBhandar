import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoSearchCircleOutline, IoSearchCircleSharp } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io'; // ✅ Fixed import
import { FaCircleUser } from 'react-icons/fa6';
import { MdOutlineShoppingCart, MdContacts } from 'react-icons/md';
import { HiOutlineCollection } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
  const { getCurrentUser, userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      setUserData(null);
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-[70px] bg-[#ecfafaec] fixed top-0 z-10 flex items-center justify-between px-6 shadow-md'>

      {/* Logo */}
      <div className='w-[20%] lg:w-[30%] flex items-center gap-2'>
        <img src={logo} alt="RiceCart Logo" className='w-[30px]' />
        <h1 className='text-[25px] text-black font-serif font-bold tracking-wide'>Anaj Bhandar</h1>
      </div>

      {/* Desktop Navigation */}
      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
        <ul className='flex gap-5 text-white'>
          <li className='text-sm bg-[#000000c9] px-5 py-2 rounded-2xl hover:bg-slate-500 cursor-pointer' onClick={() => navigate("/")}>HOME</li>
          <li className='text-sm bg-[#000000c9] px-5 py-2 rounded-2xl hover:bg-slate-500 cursor-pointer' onClick={() => navigate("/collection")}>COLLECTIONS</li>
          <li className='text-sm bg-[#000000c9] px-5 py-2 rounded-2xl hover:bg-slate-500 cursor-pointer' onClick={() => navigate("/about")}>ABOUT</li>
          <li className='text-sm bg-[#000000c9] px-5 py-2 rounded-2xl hover:bg-slate-500 cursor-pointer' onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      {/* Right Controls */}
      <div className='w-[30%] flex items-center justify-end gap-5 relative'>
        {!showSearch ? (
          <IoSearchCircleOutline className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection"); }} />
        ) : (
          <IoSearchCircleSharp className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />
        )}

        {!userData ? (
          <FaCircleUser className='w-[29px] h-[29px] text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
        ) : (
          <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>
            {userData?.name?.charAt(0)}
          </div>
        )}

        <MdOutlineShoppingCart className='w-[30px] h-[30px] text-black cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] top-[10px] right-[20px] hidden-md:flex'>
          {getCartCount()}
        </p>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-full left-0 flex items-center justify-center z-10'>
          <input
            type="text"
            className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px] outline-none'
            placeholder='Search for Basmati, Brown, Organic...'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-gray-400 rounded-[10px] z-10'>
          <ul className='flex flex-col justify-around text-white text-[17px] p-3'>
            {!userData && (
              <li className='hover:bg-[#2f2f2f] px-3 py-2 cursor-pointer' onClick={() => {
                navigate("/login");
                setShowProfile(false);
              }}>Login</li>
            )}
            {userData && (
              <li className='hover:bg-[#2f2f2f] px-3 py-2 cursor-pointer' onClick={handleLogout}>Logout</li>
            )}
            <li className='hover:bg-[#2f2f2f] px-3 py-2 cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false); }}>Orders</li>
            <li className='hover:bg-[#2f2f2f] px-3 py-2 cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
          </ul>
        </div>
      )}

      {/* Bottom Mobile Nav */}
      <div className='w-full h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-white flex flex-col items-center gap-1' onClick={() => navigate("/")}><IoMdHome className='w-[28px] h-[28px]' />Home</button>
        <button className='text-white flex flex-col items-center gap-1' onClick={() => navigate("/collection")}><HiOutlineCollection className='w-[28px] h-[28px]' />Collections</button>
        <button className='text-white flex flex-col items-center gap-1' onClick={() => navigate("/contact")}><MdContacts className='w-[28px] h-[28px]' />Contact</button>
        <button className='text-white flex flex-col items-center gap-1' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[28px] h-[28px]' />Cart</button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>
          {getCartCount()}
        </p>
      </div>
    </div>
  );
}

export default Nav;
