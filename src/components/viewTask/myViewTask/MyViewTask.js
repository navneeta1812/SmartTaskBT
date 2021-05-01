import React from 'react';
import './MyViewTask';
import Navbar from '../../profilePage/navbar/Navbar';
import Sidebar from '../../profilePage/sidebar/Sidebar';
import VTmain from '../myVTmain/MyVTmain';

const MyViewTask = () => {
  return(
    <div className="container">
      <Navbar />
      <VTmain/>
      <Sidebar /> 
    </div>
  );
}

export default MyViewTask;