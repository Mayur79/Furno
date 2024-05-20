import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";


const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className=" mt-10 md:mt-[4.4rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
