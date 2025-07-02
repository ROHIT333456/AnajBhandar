import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter(item => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4)); // Show top 4 best sellers
  }, [products]);

  return (
    <div className="py-10 px-4">
      <div className="text-center mb-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-sm md:text-lg text-blue-100 mt-2">
          Pure Taste, Trusted Quality – Our Most Loved Rice Varieties.
        </p>
      </div>

      {bestSeller.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {bestSeller.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-blue-200 text-sm">
          No best seller rice available at the moment.
        </div>
      )}
    </div>
  );
}

export default BestSeller;
