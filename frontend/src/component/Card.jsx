import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export default function Card({ name, image, id, price, selectedKg, totalPrice }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/productdetail/${id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/productdetail/${id}`)}
      className="
        w-full sm:w-[280px] md:w-[300px] lg:w-[320px]
        bg-[#ffffff0a]
        rounded-xl
        cursor-pointer
        border border-[#80808049]
        flex flex-col
        hover:scale-105 hover:shadow-lg hover:border-[#80808080]
        active:scale-95
        transition-all duration-300 ease-in-out
        overflow-hidden
        backdrop-blur-sm
        group
        mx-auto
      "
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name || 'Product Image'}
          className="
            w-full h-full
            object-cover
            group-hover:scale-110 group-active:scale-110
            transition-transform duration-500 ease-out
          "
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-rice.jpg';
          }}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 group-active:opacity-100 
          transition-opacity duration-300" />

        {/* Price Badge */}
        <div className="absolute top-2 right-2 bg-[#c3f6fa] text-black px-2 py-1 rounded-full text-xs font-semibold 
          opacity-0 group-hover:opacity-100 group-active:opacity-100 
          transition-opacity duration-300">
          {currency} {price}/kg
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4 
        bg-[#ffffff05] 
        group-hover:bg-[#ffffff08] group-active:bg-[#ffffff0a] 
        transition-colors duration-300"
      >
        <h2 className="text-[#c3f6fa] text-base sm:text-lg font-semibold mb-2 line-clamp-2 
          group-hover:text-[#e0f8fb] group-active:text-[#e0f8fb] transition-colors duration-300"
        >
          {name}
        </h2>

        {selectedKg && totalPrice ? (
          <div className="space-y-1">
            <p className="text-[#f3fafa] text-sm">
              {selectedKg} kg × {currency} {price}
            </p>
            <p className="text-[#c3f6fa] text-base font-bold">
              Total: {currency} {totalPrice}
            </p>
          </div>
        ) : (
          <p className="text-[#f3fafa] text-sm font-medium">
            {currency} {price} <span className="text-xs opacity-80">Per KG</span>
          </p>
        )}

        {/* CTA */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-1 text-[#c3f6fa] text-xs">
            <span>Click to view details</span>
            <svg className="w-3 h-3 transform group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-150" />
      </div>
    </div>
  );
}
