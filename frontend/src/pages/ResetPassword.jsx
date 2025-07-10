import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { authDataContext } from '../context/AuthContext'
import { useContext } from 'react'

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/reset-password/${token}`, { password })
      toast.success("Password reset successful!")
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error("Reset link is invalid or expired")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center pt-[80px]'>
      <h2 className='text-[28px] font-bold mb-4'>Reset Your Password</h2>
      <form
        onSubmit={handleSubmit}
        className='max-w-[400px] w-[90%] bg-[#ffffff0a] border border-[#ffffff25] p-6 rounded-xl shadow-md flex flex-col gap-4'
      >
        <input
          type="password"
          required
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder:text-gray-300'
        />
        <button
          type="submit"
          className='bg-[#518ef8] py-2 rounded-md hover:bg-blue-600 transition font-semibold'
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
