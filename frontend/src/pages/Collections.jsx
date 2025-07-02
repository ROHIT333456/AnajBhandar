import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
  const { products } = useContext(shopDataContext);
  const [sortType, setSortType] = useState("relavent");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Sort logic
  const sortProducts = (productsToSort) => {
    const sorted = [...productsToSort];
    if (sortType === "low-high") sorted.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  };

  // On products or sortType change, update display
  useEffect(() => {
    const sortedProducts = sortProducts(products);
    setFilteredProducts(sortedProducts);
  }, [products, sortType]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col pt-[70px] pb-[110px] px-5 md:px-8 lg:px-12'>

      {/* Title & Sort Option */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 gap-4'>
        <Title text1={"ALL"} text2={"COLLECTIONS"} />
        <select
          className='bg-slate-600 max-w-[200px] h-[45px] px-3 text-white rounded border border-[#46d1f7]'
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
        >
          <option value="relavent">Sort By: Relevance</option>
          <option value="low-high">Sort By: Low to High</option>
          <option value="high-low">Sort By: High to Low</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className='w-full mt-6 flex flex-wrap justify-center gap-5 min-h-[50vh]'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))
        ) : (
          <p className='text-white text-lg mt-10'>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Collections;
