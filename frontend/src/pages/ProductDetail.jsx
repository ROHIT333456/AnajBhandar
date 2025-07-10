import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { userDataContext } from '../context/UserContext';
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart, loading } = useContext(shopDataContext);
  const { userData } = useContext(userDataContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image1);
    }
  }, [productId, products]);

  useEffect(() => {
    if (size && productData) {
      const weight = parseInt(size.replace('kg', ''));
      const total = weight * parseFloat(productData.price);
      setCalculatedPrice(total);
    } else {
      setCalculatedPrice(0);
    }
  }, [size, productData]);

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div>
      {/* Top Section */}
      <div className='w-full min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center gap-5'>
        {/* Images */}
        <div className='lg:w-[50%] w-[90%] mt-[70px] flex flex-col lg:flex-row gap-6 items-center'>
          <div className='flex lg:flex-col gap-4'>
            {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, i) => (
              <div key={i} className='w-[60px] md:w-[100px] h-[60px] md:h-[110px] border rounded-md bg-slate-300 cursor-pointer'>
                <img src={img} alt={`Thumb-${i}`} className='w-full h-full rounded-md' onClick={() => setSelectedImage(img)} />
              </div>
            ))}
          </div>
          <div className='w-[80%] lg:w-[60%] border rounded-md overflow-hidden'>
            <img src={selectedImage} alt="Product" className='w-full h-full object-fill rounded-md' />
          </div>
        </div>

        {/* Details */}
        <div className='lg:w-[50%] w-full px-6 py-6 text-white'>
          <h1 className='text-2xl md:text-4xl font-bold'>{productData.name.toUpperCase()}</h1>

          {/* Price */}
          <p className='text-2xl font-semibold mt-3'>
            {currency} {calculatedPrice > 0 ? calculatedPrice.toFixed(2) : `${productData.price} (Per KG)`}
          </p>

          <p className='mt-2 text-base md:text-lg'>{productData.description}</p>

          {/* Size Selection */}
          <div className='mt-4'>
            <p className='text-lg font-semibold'>Select Size</p>
            <div className='flex gap-3 mt-2'>
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  className={`py-2 px-4 rounded-md bg-slate-300 border ${size === s ? 'bg-black text-blue-300 text-lg' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button with login check */}
          <button
            className={`mt-6 py-2 px-6 rounded-xl transition border ${
              size ? 'bg-[#4d8890] hover:bg-[#2d5860]' : 'bg-gray-500 cursor-not-allowed'
            }`}
            onClick={() => {
              if (!userData) {
                navigate('/login', { state: { from: location.pathname } });
                return;
              }
              if (size) {
                addtoCart(productData._id, size);
              }
            }}
            disabled={!size}
          >
            {loading ? <Loading /> : "Add to Cart"}
          </button>

          {/* Info */}
          <div className='mt-6 text-sm space-y-1'>
            <p>✅ 100% Original Product</p>
            <p>✅ Cash on Delivery Available</p>
            <p>✅ Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Related */}
      <div className='w-full bg-gradient-to-l from-[#141414] to-[#0c2025] px-6 md:px-[80px] mt-20'>
        <div className='flex gap-4 mb-4 text-white'>
          <p className='border px-5 py-2'>Description</p>
          <p className='border px-5 py-2'>Reviews</p>
        </div>
        <div className='bg-[#3336397c] text-white p-6 rounded-lg mb-10'>
          <p>
            Upgrade your rice pantry with our premium variety, directly sourced from trusted farms. Hygienically packed,
            organically processed, and rich in flavor — perfect for biryani, pulao, or daily meals.
          </p>
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
