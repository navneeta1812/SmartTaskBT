import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component{

    render() {
        return (
        <nav className="navbar">
            <div>
            <h2 className="heading">SmartTask-BT</h2>
            </div>
            
            <div className="navbar__right">
                <Link to={"/reportTask"}>Report Task</Link>
                <a href="#">Project</a>
                <div>
               
                
            
                <span className="color">
                <div className="dropdown">
                    <FontAwesomeIcon icon={faUser} className="nav_icon"/>
                    <button className="dropbtn">User Name</button>
                    <div className="dropdown-content">
                        <Link to={"/profile"}>Profile Page</Link>
                        <Link to={"/"}>Log Out</Link>
                    </div>
                    </div>
                </span>
                </div>
                

            </div>
        </nav>
    );

    }
    
}

