import React from 'react';
import './MyViewTask';
import Navbar from '../../profilePage/navbar/Navbar';
import Sidebar from '../../profilePage/sidebar/Sidebar';

const MyViewTask = () => {
  return(
    <div className="container">
      <Navbar />
      My view Task
      <Sidebar /> 
    </div>
  );
}

export default MyViewTask;