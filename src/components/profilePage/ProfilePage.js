import React from 'react';
import './ProfilePage.css';
import Navbar from "./navbar/Navbar.js"; 
import Main from "./main/Main.js";
import Sidebar from './sidebar/Sidebar.js';


export default class ProfilePage extends React.Component{

  render() {
    return ( 
      <div className="container">
        <Navbar  /> 
         <Main />
         <Sidebar  />
  
      </div>
    );
  }
}

