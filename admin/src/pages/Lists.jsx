import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`)
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
      else console.log("Failed to remove product")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='w-full flex flex-col md:flex-row'>
        <Sidebar />

        <div className='w-full md:ml-[230px] lg:ml-[320px] mt-[70px] p-4 sm:p-6 flex flex-col gap-6 pb-32 md:pb-0'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl mb-2 font-bold text-white'>
            All Listed Rice Products
          </h2>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className='w-full bg-slate-700 rounded-xl p-4 flex flex-col gap-4 shadow-md'
              >
                {/* Product Images */}
                <div className='flex gap-2 overflow-x-auto'>
                  {[item.image1, item.image2, item.image3, item.image4].filter(Boolean).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt='product'
                      className='w-[60px] h-[60px] rounded-lg object-cover border-2 shrink-0'
                    />
                  ))}
                </div>

                {/* Product Details */}
                <div className='flex flex-col sm:flex-row justify-between gap-4 text-sm md:text-base'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-lg text-[#bef0f3]'>{item.name}</h3>
                    <p className='text-[#bef3da] break-all'>
                      Category: {item.category} ({item.subCategory})
                    </p>
                    {item.bestseller && (
                      <p className='text-yellow-300 font-semibold'>🔥 Bestseller</p>
                    )}
                    <p className='text-[#bef3da]'>Sizes: {item.sizes?.join(', ')}</p>
                  </div>

                  {/* Price + Buttons */}
                  <div className='flex flex-col sm:items-end sm:justify-between'>
                    <p className='text-[#afffff] font-bold text-lg'>₹{item.price}</p>
                    <div className='flex gap-2 mt-2'>
                      <button
                        onClick={() => navigate(`/Editproduct/${item._id}`)}
                        className='text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeList(item._id)}
                        className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-white text-lg'>No products available.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lists
