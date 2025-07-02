import React, { useContext, useEffect, useState } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { SiEbox } from "react-icons/si";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/status`, {
        orderId,
        status: e.target.value
      }, { withCredentials: true });

      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrderHandler = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const result = await axios.delete(`${serverUrl}/api/order/delete/${orderId}`, {
        withCredentials: true
      });

      if (result.data.success) {
        await fetchAllOrders();
      } else {
        alert(result.data.message || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order", error);
      alert("Server error while deleting order.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='w-full h-full flex items-center lg:justify-start justify-center'>
        <Sidebar />
        <div className='lg:w-[85%] md:w-[70%] h-full lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-8 overflow-x-hidden py-[50px] ml-[100px]'>
          <h2 className='text-[28px] md:text-[40px] mb-[20px] text-white'>All Orders List</h2>

          {orders.map((order, index) => (
            <div key={index} className='w-[90%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-4 md:px-6 gap-4'>
              <SiEbox className='w-[60px] h-[60px] text-black p-2 rounded-lg bg-white' />

              {/* Order Items */}
              <div>
                <div className='flex flex-col gap-1 text-sm md:text-base text-[#56dbfc]'>
                  {order.items.map((item, idx) => {
                    const unitPrice = item.price || 0;
                    const totalPrice = item.quantity * unitPrice;
                    const itemName = (item.name || 'Unnamed Product').toUpperCase();
                    return (
                      <p key={idx} className='text-white'>
                        {itemName} × {item.quantity} ({item.size}) = ₹{totalPrice}
                      </p>
                    );
                  })}
                </div>

                {/* Customer Address */}
                <div className='text-[14px] text-green-100 mt-3'>
                  <p>{(order.address?.firstName || '') + " " + (order.address?.lastName || '')}</p>
                  <p>{order.address?.street || ''}</p>
                  <p>{`${order.address?.city || ''}, ${order.address?.state || ''}, ${order.address?.country || ''}, ${order.address?.pinCode || ''}`}</p>
                  <p>{order.address?.phone || ''}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className='text-[14px] text-green-100 flex flex-col gap-1'>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod || 'N/A'}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                <p className='text-lg text-white font-semibold'>Total: ₹{order.amount || 0}</p>
              </div>

              {/* Status + Delete */}
              <div className='flex flex-col gap-2 items-start'>
                <select
                  value={order.status}
                  className='px-3 py-2 bg-slate-500 rounded-lg border border-[#96eef3]'
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

                {order.status === "Order Placed" && (
                  <button
                    onClick={() => deleteOrderHandler(order._id)}
                    className='mt-2 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700'
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
