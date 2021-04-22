import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends React.Component{

    render() {
        return (
        <nav className="navbar">
            <div>
            <h2>SmartTask-BT</h2>
            </div>
           
            <div className="navbar__right">
            <a href="#">Report Task</a>
                <a href="#">Project</a>
                <div>
                <a href="#">
                <FontAwesomeIcon icon={faUser} className="nav_icon"/>
                </a>
                <span>User Name</span>
                </div>
                

            </div>
        </nav>
    );

    }
    
}

