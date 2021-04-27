import React from 'react';
import './MyTask.css';
import Navbar from '../../profilePage/navbar/Navbar';
import Sidebar from '../../profilePage/sidebar/Sidebar';

const Mytask = () => {
  return(
    <div className="container">
      <Navbar />
      Main page
      <Sidebar />
    </div>
  )
}

export default Mytask;