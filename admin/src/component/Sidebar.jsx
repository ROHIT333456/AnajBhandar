import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegListAlt } from 'react-icons/fa'
import { SiTicktick } from 'react-icons/si'
import { MdSlideshow } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[18%] min-h-screen border-r border-gray-300 py-20 fixed left-0 top-0 bg-white z-10 text-sm text-gray-800">
        <div className="flex flex-col gap-4 pt-10 pl-[20%]">
          <SidebarItem icon={<IoIosAddCircleOutline />} label="Add Items" onClick={() => navigate('/add')} />
          <SidebarItem icon={<FaRegListAlt />} label="List Items" onClick={() => navigate('/lists')} />
          <SidebarItem icon={<SiTicktick />} label="View Orders" onClick={() => navigate('/orders')} />
          <SidebarItem icon={<MdSlideshow />} label="Hero Manager" onClick={() => navigate('/admin/hero')} />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-10 flex justify-around items-center py-4">
        <MobileItem icon={<IoIosAddCircleOutline />} label="Add" onClick={() => navigate('/add')} />
        <MobileItem icon={<FaRegListAlt />} label="List" onClick={() => navigate('/lists')} />
        <MobileItem icon={<SiTicktick />} label="Orders" onClick={() => navigate('/orders')} />
        <MobileItem icon={<MdSlideshow />} label="Hero" onClick={() => navigate('/admin/hero')} />
      </nav>
    </>
  )
}

// Reusable desktop item
const SidebarItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 border border-gray-200 border-r-0 cursor-pointer hover:bg-[#2c7b89] hover:text-white rounded-r-lg"
  >
    {icon}
    <p className="hidden md:block">{label}</p>
  </div>
)

// Reusable mobile icon button with label
const MobileItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:text-[#2c7b89] flex flex-col items-center text-2xl"
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
)

export default Sidebar
