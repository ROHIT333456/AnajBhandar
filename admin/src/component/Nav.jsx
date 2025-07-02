import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      })
      toast.success('Logout Successful')
      getAdmin() // Reset admin context
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout Failed')
    }
  }

  return (
    <nav className="w-full h-[70px] fixed top-0 z-10 bg-[#dcdbdbf8] flex items-center justify-between px-6 shadow-md shadow-black overflow-x-hidden">
      {/* Logo + App Name */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="OneCart Logo" className="w-[30px]" />
        <h1 className="text-xl font-semibold text-black">OneCart</h1>
      </div>

      {/* Buttons: Home + Logout */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate('/')}
          className="text-sm px-5 py-2 rounded-2xl bg-white text-black border border-black hover:bg-[#89daea]"
        >
          Home
        </button>
        <button
          onClick={logOut}
          className="text-sm px-5 py-2 rounded-2xl bg-black bg-opacity-80 text-white hover:border-2 border-[#89daea]"
        >
          Log Out
        </button>
      </div>
    </nav>
  )
}

export default Nav
