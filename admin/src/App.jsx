import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './pages/Login';
import AdminHeroManager from './pages/AdminHeroManager'; // ✅ Import added
import { adminDataContext } from './context/AdminContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Don't forget to import styles

function App() {
  const { adminData } = useContext(adminDataContext);

  return (
    <>
      <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/editproduct/:id" element={<Add />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/hero" element={<AdminHeroManager />} />
            <Route path="/admin/hero/:id" element={<AdminHeroManager />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
