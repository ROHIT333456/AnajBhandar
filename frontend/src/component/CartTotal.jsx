import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { products, cartItem, currency } = useContext(shopDataContext);

  // Calculate cart subtotal and total quantity
  const getCartDetails = () => {
    let subtotal = 0;
    let totalQuantity = 0;

    for (const productId in cartItem) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        const kg = parseInt(size.replace("kg", ""));
        subtotal += kg * product.price * quantity;
        totalQuantity += quantity;
      }
    }

    return { subtotal, totalQuantity };
  };

  const { subtotal, totalQuantity } = getCartDetails();

  // Apply delivery rule: 1 item → ₹40, more → ₹30 * qty
  let deliveryFee = 0;
  let deliveryMessage = '';
  if (subtotal > 0) {
    if (totalQuantity === 1) {
      deliveryFee = 40;
      deliveryMessage = "₹40 delivery charge for 1 item";
    } else if (totalQuantity > 1) {
      deliveryFee = totalQuantity * 30;
      deliveryMessage = `₹30 delivery charge per item (${totalQuantity} items)`;
    }
  }

  const finalTotal = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className="w-full lg:ml-[30px]">
      <div className="text-xl py-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-3 mt-2 text-sm p-6 border-2 border-[#4d8890] bg-[#ffffff08] rounded-md shadow-md">
        {/* Subtotal */}
        <div className="flex justify-between text-white text-lg">
          <p>Subtotal (Rice)</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>

        <hr className="border-[#4d8890]" />

        {/* Shipping Fee */}
        <div className="flex justify-between text-white text-lg">
          <p>Shipping Fee</p>
          <p>{currency} {subtotal === 0 ? '0.00' : deliveryFee.toFixed(2)}</p>
        </div>

        {/* Delivery Logic Message */}
        {subtotal > 0 && (
          <p className="text-xs text-gray-300 mt-[-8px] mb-2 italic text-right">
            {deliveryMessage}
          </p>
        )}

        <hr className="border-[#4d8890]" />

        {/* Total */}
        <div className="flex justify-between text-white text-lg font-bold">
          <p>Total (incl. delivery)</p>
          <p>{currency} {finalTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
