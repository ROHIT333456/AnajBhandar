import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products); // ✅ show all products (removed slice)
  }, [products]);

  return (
    <div className="py-10 px-4">
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-[13px] md:text-[20px] text-blue-100 mt-2">
          Freshly Harvested – Discover Our Newest Rice Arrivals!
        </p>
      </div>

      {latestProducts.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-[50px]">
          {latestProducts.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-200">No rice products available yet.</p>
      )}
    </div>
  );
}

export default LatestCollection;
