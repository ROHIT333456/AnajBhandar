import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

function EditProduct() {
  const { id } = useParams()
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    bestseller: false,
    sizes: [],
  })

  // Fetch previous item details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/product/${id}`)
        const data = res.data

        setProduct({
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          category: data.category || '',
          subCategory: data.subCategory || '',
          bestseller: data.bestseller || false,
          sizes: data.sizes || [],
        })
      } catch (error) {
        console.log("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [id, serverUrl])

  // Handle changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Update product
  const handleUpdate = async () => {
    try {
      await axios.put(`${serverUrl}/api/product/update/${id}`, product, {
        withCredentials: true,
      })
      alert("Product updated successfully!")
      navigate('/lists')
    } catch (err) {
      console.error("Update failed:", err)
      alert("Failed to update product.")
    }
  }

  return (
    <div className='min-h-screen p-10 text-white bg-[#0c2025]'>
      <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>

      <div className='flex flex-col gap-4 max-w-xl'>
        <input
          className='p-2 rounded text-black'
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className='p-2 rounded text-black'
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          className='p-2 rounded text-black'
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          className='p-2 rounded text-black'
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          className='p-2 rounded text-black'
          type="text"
          name="subCategory"
          value={product.subCategory}
          onChange={handleChange}
          placeholder="Subcategory"
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="bestseller"
            checked={product.bestseller}
            onChange={handleChange}
          />
          <span>Bestseller</span>
        </label>

        <input
          className='p-2 rounded text-black'
          type="text"
          name="sizes"
          value={product.sizes.join(', ')}
          onChange={(e) =>
            setProduct(prev => ({
              ...prev,
              sizes: e.target.value.split(',').map(s => s.trim())
            }))
          }
          placeholder="Sizes (comma-separated)"
        />

        <button
          onClick={handleUpdate}
          className='bg-green-500 px-4 py-2 rounded hover:bg-green-600'
        >
          Update Product
        </button>
      </div>
    </div>
  )
}

export default EditProduct
