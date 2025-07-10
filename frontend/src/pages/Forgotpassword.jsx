import React, { useState, useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/auth/forgot-password`, { email });
      toast.success("Password reset link sent to your email!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center pt-[80px]'>
      <div className='text-center'>
        <h2 className='text-[28px] font-bold'>Forgot Password</h2>
        <p className='text-gray-300'>Enter your email to reset your password</p>
      </div>

      <form
        onSubmit={handleReset}
        className='mt-6 max-w-[500px] w-[90%] bg-[#ffffff0a] border border-[#ffffff25] p-6 rounded-xl shadow-md flex flex-col gap-4'
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className='bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder:text-gray-300'
        />

        <button
          type="submit"
          disabled={loading}
          className='bg-[#518ef8] py-2 rounded-md hover:bg-blue-600 transition font-semibold'
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default Forgotpassword;
