import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import google from '../assets/google.png';
import Loading from '../component/Loading';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      await getCurrentUser();
      navigate(redirectPath);
    } catch (error) {
      console.error(error);
      toast.error("Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );

      toast.success("Google login successful!");
      await getCurrentUser();
      navigate(redirectPath);
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center pt-[80px]'>
      <div className='text-center'>
        <h2 className='text-[28px] font-bold'>Login to Anaj Bhandar</h2>
        <p className='text-gray-300'>Buy premium rice and essentials</p>
      </div>

      <div className='mt-4 max-w-[500px] w-[90%] bg-[#ffffff0a] border border-[#ffffff25] p-6 rounded-xl shadow-md'>
        <form onSubmit={handleLogin} className='flex flex-col gap-4'>

          <div
            onClick={googleLogin}
            className='flex items-center gap-3 justify-center w-full bg-[#ffffff15] py-3 rounded-md cursor-pointer hover:bg-[#ffffff20]'
          >
            <img src={google} alt="Google" className='w-5 h-5' />
            <span>Login with Google</span>
          </div>

          <div className='flex items-center gap-4 text-gray-400 text-sm'>
            <hr className='w-full border-[#555]' /> OR <hr className='w-full border-[#555]' />
          </div>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
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

          {/* ✅ Forgot Password Link */}
          <p
            onClick={() => navigate('/forgot-password')}
            className='text-right text-sm text-blue-400 hover:underline cursor-pointer -mt-2'
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className='bg-[#518ef8] py-2 rounded-md hover:bg-blue-600 transition font-semibold'
          >
            {loading ? <Loading /> : "Login"}
          </button>

          <p className='text-center text-sm text-gray-400'>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className='text-blue-400 cursor-pointer hover:underline'
            >
              Create New Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
