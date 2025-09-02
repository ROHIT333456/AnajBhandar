import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  const [orderData, setOrderData] = useState([])
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })

        // ✅ Filter: keep only orders within last 7 days
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const recentOrders = allOrdersItem.filter((item) => new Date(item.date) >= sevenDaysAgo)

        setOrderData(recentOrders.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {orderData.map((item, index) => (
          <div key={index} className='w-[100%] border-t border-b border-gray-600'>
            <div className='w-full flex items-start gap-6 bg-[#51808048] py-4 px-5 rounded-2xl relative'>
              <img src={item.image1} alt={item.name} className='w-[130px] h-[130px] rounded-md object-cover' />
              <div className='flex flex-col gap-2 w-full'>
                <p className='text-white text-[20px] md:text-[25px] font-semibold'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-5 text-[#aaf4e7] text-[12px] md:text-[16px]'>
                  <p>{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='text-[#aaf4e7] text-[12px] md:text-[16px]'>Date: <span className='text-[#e4fbff]'>{new Date(item.date).toDateString()}</span></p>
                <p className='text-[#aaf4e7] text-[12px] md:text-[16px]'>Payment Method: {item.paymentMethod}</p>
                <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%] flex items-center gap-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <p className='text-[#f3f9fc] text-[10px] md:text-[17px]'>{item.status}</p>
                </div>
                <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'>
                  <button
                    className='px-[10px] md:px-[15px] py-[5px] md:py-[7px] bg-[#101919] text-white rounded-md text-[12px] md:text-[16px] active:bg-slate-600'
                    onClick={loadOrderData}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {orderData.length === 0 && (
          <div className='w-full text-center text-white text-[18px] mt-10'>No orders found.</div>
        )}
      </div>
    </div>
  )
}

export default Order
