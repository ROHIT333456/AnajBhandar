import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Nav from "./component/Nav";
import { userDataContext } from "./context/UserContext";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <Nav />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={userData ? <Navigate to="/" /> : <Forgotpassword />}
        />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
