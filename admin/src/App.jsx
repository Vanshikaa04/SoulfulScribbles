import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Add from "./pages/Add";
import ProductList from "./pages/ProductList";
import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./components/AdminLogin";
import { ToastContainer } from "react-toastify";
import WorkshopList from "./pages/WorkshopList";
import AddWorkshop from "./pages/AddWorkshop";

// eslint-disable-next-line react-refresh/only-export-components
export const backendurl = import.meta.env.VITE_backendurl 
export const currency ="₹";

const App = () => {
  const [token,setToken] =useState(localStorage.getItem("token")? localStorage.getItem("token"): "");

  useEffect(()=>{
    localStorage.setItem("token" ,token)    //refresh krne per logout nhi honge localstorage m rhega save
  // console.log("TOKEN:",token)

  },[token])
  return (
    <>
    <ToastContainer  autoClose={2000}/>
    {
      token ==="" ?
       <AdminLogin setToken={setToken}/>:
       <>
      <Routes>
      {/* Use Layout as a wrapper for all routes */}
      <Route path="/" element={<Layout  setToken ={setToken}/>}>
        <Route path="add" element={<Add  token ={token}/>} />
        <Route path="list" element={<ProductList  token ={token}/>} />
        <Route path="orders" element={<AdminOrders  token ={token}/>} />
        <Route path="addworkshop" element={<AddWorkshop  token ={token}/>} />
        <Route path="listworkshops" element={<WorkshopList  token ={token}/>} />

      </Route>
    </Routes>
    </>
    }
    </>
  );
};

export default App;
