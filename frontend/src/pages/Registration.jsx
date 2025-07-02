import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import google from '../assets/google.png';
import Logo from '../assets/logo.png';
import Loading from '../component/Loading';

function Registration() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, phone, password },
        { withCredentials: true }
      );
      toast.success("Registration Successful!");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName;
      const email = user.email;

      await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email, phone },
        { withCredentials: true }
      );

      toast.success("Google Signup Successful!");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Signup Failed!");
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center'>

      {/* Logo */}
      <div className='w-full h-[80px] flex items-center px-[30px] gap-3 cursor-pointer' onClick={() => navigate("/")}>
        <img src={Logo} alt="OneCart Logo" className='w-[40px]' />
        <h1 className='text-[22px] font-semibold'>OneCart</h1>
      </div>

      {/* Title */}
      <div className='mt-4 text-center'>
        <h2 className='text-[28px] font-bold'>Create Account</h2>
        <p className='text-gray-300'>Join OneCart and start ordering fresh rice</p>
      </div>

      {/* Form */}
      <div className='mt-6 max-w-[500px] w-[90%] bg-[#ffffff0a] border border-[#ffffff25] p-6 rounded-xl shadow-md'>
        <form onSubmit={handleSignup} className='flex flex-col gap-4'>

          {/* Google Signup */}
          <div
            onClick={googleSignup}
            className='flex items-center gap-3 justify-center w-full bg-[#ffffff15] py-3 rounded-md cursor-pointer hover:bg-[#ffffff20]'
          >
            <img src={google} alt="Google" className='w-5 h-5' />
            <span>Sign up with Google</span>
          </div>

          {/* Divider */}
          <div className='flex items-center gap-4 text-gray-400 text-sm'>
            <hr className='w-full border-[#555]' /> OR <hr className='w-full border-[#555]' />
          </div>

          {/* Inputs */}
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className='bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder:text-gray-300'
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className='bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder:text-gray-300'
          />
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className='bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder:text-gray-300'
          />
          <div className='relative'>
            <input
              type={show ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className='bg-transparent border border-gray-600 rounded-md px-4 py-2 w-full placeholder:text-gray-300'
            />
            <div
              className='absolute right-3 top-3 cursor-pointer text-gray-400'
              onClick={() => setShow(!show)}
            >
              {show ? <IoEye /> : <IoEyeOutline />}
            </div>
          </div>

          {/* Submit Button with Centered Spinner */}
          <button
            type="submit"
            className='bg-[#518ef8] py-2 rounded-md hover:bg-blue-600 transition font-semibold flex items-center justify-center'
          >
            {loading ? <Loading /> : "Create Account"}
          </button>

          {/* Login Link */}
          <p className='text-center text-sm text-gray-400'>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className='text-blue-400 cursor-pointer hover:underline'
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
