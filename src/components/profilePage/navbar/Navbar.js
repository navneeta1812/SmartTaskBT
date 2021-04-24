import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import fbHelper from "../../../cofig/FireBaseHelper";

export default class Navbar extends React.Component{


    constructor(props){

        super(props);
        this.state={

        }
    }

    logout(){

        fbHelper.auth().signOut();

    }


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
                        <a onClick={this.logout}>Log Out</a>
                    </div>
                    </div>
                </span>
                </div>
                

            </div>
        </nav>
    );

    }
    
}

