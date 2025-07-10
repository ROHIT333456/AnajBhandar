import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import razorpay from '../assets/Razorpay.jpg';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { cartItem, setCartItem, delivery_fee, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Rice Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
          if (data) {
            document.body.style.overflow = 'auto';
            setCartItem({});
            navigate("/order");
            toast.success("Payment Successful");
          }
        } catch (err) {
          console.error("Verification failed:", err);
          toast.error("Payment verification failed");
          document.body.style.overflow = 'auto';
        }
      },
      modal: {
        ondismiss: () => {
          document.body.style.overflow = 'auto';
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    document.body.style.overflow = 'hidden';
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          const quantity = cartItem[productId][size];
          if (quantity > 0) {
            orderItems.push({
              _id: productId,
              size,
              quantity
            });
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems
      };

      if (orderItems.length === 0) {
        toast.error("Cart is empty!");
        setLoading(false);
        return;
      }

      if (method === 'cod') {
        const codResult = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true });
        if (codResult.data) {
          setCartItem({});
          toast.success("Order Placed");
          navigate("/order");
        } else {
          toast.error("Order Placement Failed");
        }
      } else if (method === 'razorpay') {
        const razorpayResult = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true });
        if (razorpayResult.data) {
          initPay(razorpayResult.data);
        } else {
          toast.error("Razorpay order failed");
        }
      } else {
        toast.error("Select a valid payment method");
      }

    } catch (error) {
      console.log("Submit Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-[50px] pb-[120px] mt-[90px]'>

      {/* Form Side */}
      <div className='lg:w-[50%] w-full flex items-center justify-center'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%]'>
          <div className='py-[10px]'>
            <Title text1='DELIVERY' text2='INFORMATION' />
          </div>

          {/* Form Inputs */}
          <div className='flex justify-between px-[10px] mb-3'>
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} required placeholder='First name' className='w-[48%] h-[50px] bg-slate-700 text-white rounded-md px-4' />
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} required placeholder='Last name' className='w-[48%] h-[50px] bg-slate-700 text-white rounded-md px-4' />
          </div>

          <div className='px-[10px] mb-3'>
            <input type="email" name="email" value={formData.email} onChange={onChangeHandler} required placeholder='Email address' className='w-full h-[50px] bg-slate-700 text-white rounded-md px-4' />
          </div>

          <div className='px-[10px] mb-3'>
            <input type="text" name="street" value={formData.street} onChange={onChangeHandler} required placeholder='Street' className='w-full h-[50px] bg-slate-700 text-white rounded-md px-4' />
          </div>

          <div className='flex justify-between px-[10px] mb-3'>
            <input type="text" name="city" value={formData.city} onChange={onChangeHandler} required placeholder='City' className='w-[48%] h-[50px] bg-slate-700 text-white rounded-md px-4' />
            <input type="text" name="state" value={formData.state} onChange={onChangeHandler} required placeholder='State' className='w-[48%] h-[50px] bg-slate-700 text-white rounded-md px-4' />
          </div>

          <div className='flex justify-between px-[10px] mb-3'>
            <input type="text" name="pinCode" value={formData.pinCode} onChange={onChangeHandler} required placeholder='Pincode' className='w-[48%] h-[50px] bg-slate-700 text-white rounded-md px-4' />
            <input type="text" name="country" value={formData.country} onChange={onChangeHandler} required placeholder='Country' className='w-[48%] h-[50px] bg-slate-700 text-white rounded-md px-4' />
          </div>

          <div className='px-[10px] mb-3'>
            <input type="text" name="phone" value={formData.phone} onChange={onChangeHandler} required placeholder='Phone' className='w-full h-[50px] bg-slate-700 text-white rounded-md px-4' />
          </div>

          <div className='flex justify-center'>
            <button type='submit' className='bg-[#3bcee848] border border-[#80808049] text-white text-[18px] px-[50px] py-[10px] rounded-2xl mt-[20px] mb-[80px]'>
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>

      {/* Cart Total & Payment */}
      <div className='lg:w-[50%] w-full flex flex-col items-center gap-[30px] px-4'>

        {/* Payment Method FIRST */}
        <div className='py-[10px]'><Title text1='PAYMENT' text2='METHOD' /></div>
        <div className='flex justify-center gap-[30px] flex-wrap'>
          <button onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] ${method === 'razorpay' ? 'border-[5px] border-blue-900' : ''}`}>
            <img src={razorpay} alt="razorpay" className='w-full h-full object-fill rounded-sm' />
          </button>
          <button onClick={() => setMethod('cod')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900' : ''}`}>
            CASH ON DELIVERY
          </button>
        </div>

        {/* Cart Total NEXT */}
        <div className='w-[90%] lg:w-[70%]'><CartTotal /></div>
      </div>
    </div>
  );
}

export default PlaceOrder;
