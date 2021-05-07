import React from "react";
import Navbar from "../../profilePage/navbar/Navbar";
import Sidebar from "../../profilePage/sidebar/Sidebar";
import MTmain from "../mtMain/Mtmain";

const Mytask = () => {
  return (
    <div className="container">
      <Navbar />
      <MTmain />
      <Sidebar />
    </div>
  );
};

export default Mytask;
