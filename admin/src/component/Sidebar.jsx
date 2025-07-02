import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegListAlt } from 'react-icons/fa'
import { SiTicktick } from 'react-icons/si'
import { MdSlideshow } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="w-[18%] min-h-screen border-r border-gray-300 py-20 fixed left-0 top-0 bg-white z-10">
      <div className="flex flex-col gap-4 pt-10 pl-[20%] text-sm text-gray-800">
        {/* Add Items */}
        <div
          className="flex items-center gap-3 px-3 py-2 border border-gray-200 border-r-0 cursor-pointer hover:bg-[#2c7b89] hover:text-white rounded-r-lg"
          onClick={() => navigate('/add')}
        >
          <IoIosAddCircleOutline className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </div>

        {/* List Items */}
        <div
          className="flex items-center gap-3 px-3 py-2 border border-gray-200 border-r-0 cursor-pointer hover:bg-[#2c7b89] hover:text-white rounded-r-lg"
          onClick={() => navigate('/lists')}
        >
          <FaRegListAlt className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </div>

        {/* View Orders */}
        <div
          className="flex items-center gap-3 px-3 py-2 border border-gray-200 border-r-0 cursor-pointer hover:bg-[#2c7b89] hover:text-white rounded-r-lg"
          onClick={() => navigate('/orders')}
        >
          <SiTicktick className="w-5 h-5" />
          <p className="hidden md:block">View Orders</p>
        </div>

        {/* Hero Manager */}
        <div
          className="flex items-center gap-3 px-3 py-2 border border-gray-200 border-r-0 cursor-pointer hover:bg-[#2c7b89] hover:text-white rounded-r-lg"
          onClick={() => navigate('/admin/hero')}
        >
          <MdSlideshow className="w-5 h-5" />
          <p className="hidden md:block">Hero Manager</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar