import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Basmati")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("Long Grain")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  const calculateTotal = (basePrice, selectedSizes) => {
    const weights = selectedSizes.map(size => parseInt(size.replace("kg", "")))
    return weights.reduce((acc, w) => acc + w * parseFloat(basePrice || 0), 0)
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!image1 || !image2 || !image3 || !image4) {
      toast.error("Please upload all 4 images.")
      setLoading(false)
      return
    }
    if (sizes.length === 0) {
      toast.error("Select at least one size.")
      setLoading(false)
      return
    }
    if (!price || parseFloat(price) <= 0) {
      toast.error("Enter a valid price greater than 0.")
      setLoading(false)
      return
    }

    try {
      const total = calculateTotal(price, sizes)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("totalPrice", total)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      const result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true })

      toast.success("Product added successfully")
      setName("")
      setDescription("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice("")
      setBestSeller(false)
      setCategory("Basmati")
      setSubCategory("Long Grain")
      setSizes([])
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
      <Nav />
      <Sidebar />

      <div className='w-full md:w-[82%] h-full flex items-start justify-start absolute right-0 top-[80px] px-4 sm:px-6 md:px-10'>
        <form onSubmit={handleAddProduct} className='w-full flex flex-col gap-8 pb-32 md:pb-8'>
          <h1 className='text-2xl md:text-4xl font-semibold'>Add Rice Product</h1>

          <div className='flex flex-col gap-3'>
            <label className='text-xl font-semibold'>Upload Images</label>
            <div className='flex gap-3 flex-wrap'>
              {[image1, image2, image3, image4].map((img, idx) => (
                <label key={idx} htmlFor={`image${idx + 1}`} className='w-20 h-20 md:w-24 md:h-24 cursor-pointer'>
                  <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    alt='upload-preview'
                    className='w-full h-full object-cover rounded-lg border-2 transition-transform duration-300 hover:scale-110'
                  />
                  <input
                    type='file'
                    id={`image${idx + 1}`}
                    hidden
                    onChange={(e) => {
                      const setter = [setImage1, setImage2, setImage3, setImage4][idx]
                      setter(e.target.files[0])
                    }}
                    required
                  />
                </label>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xl font-semibold'>Product Name</label>
            <input type='text' placeholder='e.g. India Gate Basmati' className='w-full md:w-[600px] h-10 rounded-lg border-2 bg-slate-600 px-4' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xl font-semibold'>Product Description</label>
            <textarea placeholder='Describe the rice product' className='w-full md:w-[600px] h-24 rounded-lg border-2 bg-slate-600 px-4 py-2' value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className='flex flex-col sm:flex-row gap-8'>
            <div className='flex flex-col gap-2'>
              <label className='text-xl font-semibold'>Category</label>
              <select className='bg-slate-600 px-4 py-2 rounded-lg border-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Basmati">Basmati</option>
                <option value="Non-Basmati">Non-Basmati</option>
                <option value="Brown">Brown Rice</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-xl font-semibold'>Sub-Category</label>
              <select className='bg-slate-600 px-4 py-2 rounded-lg border-2' value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option value="Long Grain">Long Grain</option>
                <option value="Short Grain">Short Grain</option>
                <option value="Organic">Organic</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xl font-semibold'>Product Price (Per KG)</label>
            <input type='number' placeholder='e.g. ₹1500' className='w-full md:w-[600px] h-10 rounded-lg border-2 bg-slate-600 px-4' value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>

          <div className='flex flex-col gap-3'>
            <label className='text-xl font-semibold'>Available Packages</label>
            <div className='flex gap-3 flex-wrap'>
              {["1kg", "5kg", "10kg", "26kg", "50kg"].map(size => (
                <div
                  key={size}
                  className={`px-5 py-2 rounded-lg border-2 bg-slate-600 cursor-pointer ${sizes.includes(size) ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}
                  onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xl font-semibold'>Total Price</label>
            <div className='text-lg font-medium text-[#46d1f7]'>
              {sizes.length > 0 ? `Total: ₹${calculateTotal(price, sizes)}` : "Select sizes to calculate total"}
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <input type='checkbox' id='bestseller' className='w-6 h-6' checked={bestseller} onChange={() => setBestSeller(prev => !prev)} />
            <label htmlFor='bestseller' className='text-xl font-semibold'>Mark as Bestseller</label>
          </div>

          <button className='w-[160px] px-5 py-3 rounded-xl bg-[#65d8f7] text-black font-semibold flex justify-center items-center border-white border-2 active:bg-slate-700 active:text-white'>
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
