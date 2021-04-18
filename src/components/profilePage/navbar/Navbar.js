import React from 'react';
import "./Navbar.css";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div onClick={() => openSidebar()}>

      </div>
    </nav>
  )
}

export default Navbar;

