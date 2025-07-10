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
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='w-full flex flex-col md:flex-row'>
        <Sidebar />

        <div className='w-full md:ml-[250px] lg:ml-[310px] mt-[70px] px-4 sm:px-6 py-8 flex flex-col gap-8 pb-32 md:pb-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>All Orders List</h2>

          {orders.length === 0 ? (
            <p className='text-lg'>No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                className='w-full bg-slate-600 rounded-xl flex flex-col lg:flex-row gap-4 p-4 shadow-md'
              >
                <div className='flex-shrink-0'>
                  <SiEbox className='w-[60px] h-[60px] text-black p-2 rounded-lg bg-white' />
                </div>

                {/* Order Info */}
                <div className='flex-1 flex flex-col gap-3'>
                  {/* Order Items */}
                  <div className='flex flex-col gap-1 text-sm sm:text-base text-[#56dbfc]'>
                    {order.items.map((item, idx) => {
                      const unitPrice = item.price || 0;
                      const totalPrice = item.quantity * unitPrice;
                      const itemName = (item.name || 'Unnamed Product').toUpperCase();
                      return (
                        <p key={idx} className='text-white break-words'>
                          {itemName} × {item.quantity} ({item.size}) = ₹{totalPrice}
                        </p>
                      );
                    })}
                  </div>

                  {/* Customer Address */}
                  <div className='text-[14px] text-green-100'>
                    <p>{(order.address?.firstName || '') + " " + (order.address?.lastName || '')}</p>
                    <p>{order.address?.street || ''}</p>
                    <p>{`${order.address?.city || ''}, ${order.address?.state || ''}, ${order.address?.country || ''}, ${order.address?.pinCode || ''}`}</p>
                    <p>{order.address?.phone || ''}</p>
                  </div>
                </div>

                {/* Summary + Actions */}
                <div className='flex flex-col gap-2 sm:text-sm text-xs min-w-[160px]'>
                  <div className='text-green-100'>
                    <p>Items: {order.items.length}</p>
                    <p>Method: {order.paymentMethod || 'N/A'}</p>
                    <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                    <p>Date: {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                    <p className='text-white text-base font-semibold'>Total: ₹{order.amount || 0}</p>
                  </div>

                  {/* Status dropdown */}
                  <select
                    value={order.status}
                    className='px-3 py-1 bg-slate-500 rounded-md border border-[#96eef3] mt-2'
                    onChange={(e) => statusHandler(e, order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  {/* Delete button */}
                  {order.status === "Order Placed" && (
                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
