import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { products, cartItem, currency, delivery_fee } = useContext(shopDataContext);

  // Custom total logic based on weight (size) and quantity
  const getCartAmount = () => {
    let total = 0;

    for (const productId in cartItem) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        const kg = parseInt(size.replace("kg", ""));
        total += kg * product.price * quantity;
      }
    }

    return total;
  };

  const cartAmount = getCartAmount();
  const finalTotal = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full lg:ml-[30px]">
      <div className="text-xl py-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-3 mt-2 text-sm p-6 border-2 border-[#4d8890] bg-[#ffffff08] rounded-md shadow-md">
        <div className="flex justify-between text-white text-lg">
          <p>Subtotal (Rice)</p>
          <p>{currency} {cartAmount.toFixed(2)}</p>
        </div>

        <hr className="border-[#4d8890]" />

        <div className="flex justify-between text-white text-lg">
          <p>Shipping Fee</p>
          <p>{currency} {cartAmount === 0 ? '0.00' : delivery_fee.toFixed(2)}</p>
        </div>

        <hr className="border-[#4d8890]" />

        <div className="flex justify-between text-white text-lg font-bold">
          <p>Total (incl. delivery)</p>
          <p>{currency} {finalTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
