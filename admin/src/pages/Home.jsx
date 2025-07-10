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
      const productsRes = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(productsRes.data.length);

      const ordersRes = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      const orders = ordersRes.data;
      setTotalOrders(orders.length);

      let revenue = 0;
      let totalKg = 0;

      orders.forEach(order => {
        revenue += order.amount || 0;

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
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='flex flex-col md:flex-row'>
        <Sidebar />

        {/* Dashboard content */}
        <div className='w-full md:ml-[250px] lg:ml-[310px] mt-[80px] p-4 pb-32 flex flex-col gap-10'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#afe2f2]'>
            Anaj Bhandar Admin Panel
          </h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {/* Cards */}
            <StatCard title="Total Products" value={totalProducts} />
            <StatCard title="Total Orders" value={totalOrders} />
            <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
            <StatCard title="Total Rice Sold" value={`${totalKgSold} kg`} />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className='bg-[#0000002e] text-[#dcfafd] h-[160px] flex flex-col justify-center items-center gap-4 rounded-lg shadow-md border border-[#969595]'>
    <div className='text-base sm:text-lg font-medium'>{title}</div>
    <span className='px-5 py-2 bg-[#030e11] rounded-lg border border-[#969595] text-lg font-bold'>
      {value}
    </span>
  </div>
);

export default Home;
