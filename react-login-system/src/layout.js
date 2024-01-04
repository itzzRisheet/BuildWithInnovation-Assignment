import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function layout() {
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Outlet />
    </div>
  );
}

export default layout;
