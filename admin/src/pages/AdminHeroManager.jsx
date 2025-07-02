import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from '../context/AuthContext';

export default function AdminHeroManager() {
  const [heros, setHeros] = useState([]);
  const [formData, setFormData] = useState({ text1: '', text2: '', image: null });
  const { serverUrl } = useContext(authDataContext);

  const fetchHeroes = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/hero`);
      setHeros(res.data);
    } catch (err) {
      console.error('Failed to fetch heroes', err);
      alert('Could not load hero slides');
    }
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    if (!formData.text1 || !formData.text2 || !formData.image) {
      alert("Please fill all fields");
      return;
    }
    try {
      const data = new FormData();
      data.append("text1", formData.text1);
      data.append("text2", formData.text2);
      data.append("image", formData.image);
      await axios.post(`${serverUrl}/api/hero`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ text1: '', text2: '', image: null });
      fetchHeroes();
    } catch (err) {
      console.error('Error creating hero', err);
      alert('Image or data upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${serverUrl}/api/hero/${id}`);
      setHeros(prev => prev.filter(h => h._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete slide');
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-black relative overflow-x-hidden">
      <Nav />
      <Sidebar />

      {/* add top padding equal to header height */}
      <div className="pt-[80px] w-full md:w-[82%] ml-auto px-4 sm:px-6 md:px-16 pb-20">
        <h2 className="text-3xl font-bold text-[#0b2f3a] mb-6">Manage Hero Slides</h2>

        {/* Form */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            className="w-full md:w-[30%] p-2 rounded border border-gray-300"
            placeholder="Enter Text 1"
            value={formData.text1}
            onChange={e => setFormData({ ...formData, text1: e.target.value })}
          />
          <input
            type="text"
            className="w-full md:w-[30%] p-2 rounded border border-gray-300"
            placeholder="Enter Text 2"
            value={formData.text2}
            onChange={e => setFormData({ ...formData, text2: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full md:w-[30%] p-2 rounded border border-gray-300"
            onChange={handleImageUpload}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Add Hero Slide
        </button>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {heros.map(hero => (
            <div key={hero._id} className="bg-gray-100 p-4 rounded border border-gray-300">
              <h3 className="text-xl font-semibold">{hero.text1}</h3>
              <p>{hero.text2}</p>
              <img
                src={hero.image.startsWith('http') ? hero.image : `${serverUrl}/${hero.image}`}
                alt="hero"
                className="w-full h-40 object-contain rounded mt-2"
              />
              <button
                onClick={() => handleDelete(hero._id)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
