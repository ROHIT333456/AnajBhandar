import React from 'react';
import LatestCollection from '../component/LatestCollection';
import BestSeller from '../component/BestSeller';

function Product() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-16 py-10 gap-16'>

      {/* Latest Collection Section */}
      <section className='w-full flex flex-col items-center'>
        <h2 className='text-white text-2xl font-semibold mb-6'>Latest Collection</h2>
        <LatestCollection />
      </section>

      {/* Best Seller Section */}
      <section className='w-full flex flex-col items-center'>
        <h2 className='text-white text-2xl font-semibold mb-6'>Best Sellers</h2>
        <BestSeller />
      </section>

    </div>
  );
}

export default Product;
