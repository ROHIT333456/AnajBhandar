import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-full min-h-screen p-5 bg-gradient-to-l from-[#141414] to-[#0c2025] pb-[120px] md:pb-[50px]'>

      {/* Title */}
      <div className='text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className='w-full flex flex-col gap-[20px] mt-[40px]'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          const sizeInKg = parseInt(item.size.replace("kg", ""));
          const unitPrice = parseFloat(productData.price);
          const totalPrice = sizeInKg * unitPrice * item.quantity;

          return (
            <div key={index} className='w-full border-t border-b py-[10px] px-[10px] rounded-lg bg-[#51808048] relative'>
              <div className='flex flex-col md:flex-row items-start gap-4'>

                {/* Image */}
                <img className='w-[100px] h-[100px] rounded-md' src={productData.image1} alt={productData.name} />

                {/* Product Info */}
                <div className='flex flex-col justify-start gap-2'>
                  <p className='text-[20px] md:text-[25px] text-[#f3f9fc]'>{productData.name}</p>
                  <div className='flex gap-4 items-center'>
                    <p className='text-[18px] text-[#aaf4e7]'>
                      {currency} {unitPrice} × {item.size} × {item.quantity} = <span className='font-bold'>{currency} {totalPrice.toFixed(2)}</span>
                    </p>
                    <p className='w-[40px] h-[40px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]'>{item.size}</p>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className='absolute right-[60px] top-[50%] md:top-[40%] md:right-[120px] w-[50px] md:w-[70px] px-2 py-1 bg-[#518080b4] text-white text-[18px] rounded-md border border-[#9ff9f9]'
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) updateQuantity(item._id, item.size, value);
                  }}
                />

                {/* Delete Icon */}
                <RiDeleteBin6Line
                  className='absolute right-[15px] top-[50%] md:top-[40%] w-[25px] h-[25px] text-[#9ff9f9] cursor-pointer'
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary + Checkout */}
      <div className='flex justify-start items-end my-[50px]'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            className='text-[18px] mt-[20px] ml-[30px] px-[50px] py-[10px] bg-[#51808048] border border-[#80808049] text-white rounded-2xl hover:bg-slate-500'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
