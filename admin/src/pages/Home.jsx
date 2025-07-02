import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalKgSold, setTotalKgSold] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      // Fetch products for count only
      const productsRes = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(productsRes.data.length);

      // Fetch orders
      const ordersRes = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      const orders = ordersRes.data;
      setTotalOrders(orders.length);

      let revenue = 0;
      let totalKg = 0;

      // Loop through all orders
      orders.forEach(order => {
        revenue += order.amount || 0;

        // Calculate total rice sold in kg
        order.items.forEach(item => {
          const quantity = parseFloat(item.quantity) || 0;
          const weightStr = item.size?.toLowerCase().replace('kg', '');
          const weight = parseFloat(weightStr);
          if (!isNaN(weight)) {
            totalKg += weight * quantity;
          }
        });
      });

      setTotalRevenue(revenue.toFixed(2));
      setTotalKgSold(totalKg.toFixed(2));

    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative'>
      <Nav />
      <Sidebar />

      <div className='w-[70vw] h-[100vh] absolute left-[25%] flex flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[35px] text-[#afe2f2]'>Anaj Bhandar Admin Panel</h1>

        <div className='flex flex-wrap gap-[50px]'>

          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex flex-col justify-center items-center gap-[20px] rounded-lg shadow-md border-[1px] border-[#969595]'>
            Total Products
            <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg border-[1px] border-[#969595]'>
              {totalProducts}
            </span>
          </div>

          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex flex-col justify-center items-center gap-[20px] rounded-lg shadow-md border-[1px] border-[#969595]'>
            Total Orders
            <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg border-[1px] border-[#969595]'>
              {totalOrders}
            </span>
          </div>

          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex flex-col justify-center items-center gap-[20px] rounded-lg shadow-md border-[1px] border-[#969595]'>
            Total Revenue
            <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg border-[1px] border-[#969595]'>
              ₹{totalRevenue}
            </span>
          </div>

          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex flex-col justify-center items-center gap-[20px] rounded-lg shadow-md border-[1px] border-[#969595]'>
            Total Rice Sold
            <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg border-[1px] border-[#969595]'>
              {totalKgSold} kg
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
