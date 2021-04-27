import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import fbHelper from "../../../cofig/FireBaseHelper";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends React.Component{

    constructor(props){

        super(props);
        this.state={
            file: null,
        }
    }

    componentDidMount(){
        fbHelper.auth().onAuthStateChanged(user => {
            if(user){
                this.getUserDetails();
            }
        });
    }

    getUserDetails() {
        
        fbHelper.database().ref("employee").child(fbHelper.auth().currentUser.uid).on("value",snapshot => {
           
            let employee = snapshot.val();
            document.getElementById("username").innerHTML = 
            employee.firstname+" "+employee.lastname
            document.getElementById("logout").innerHTML = 
            "Logout("+employee.firstname[0]+employee.lastname[0]+")"
        })
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
                <div className="dropdown">
                    <button className="dropbtn">Project</button>
                    <div className="dropdown-content">
                        <a href="">Link 1</a>
                        <a href="">Link 2</a>
                    </div>
                </div>

                <div>
                <span className="color">
                <div className="dropdown">
                    <FontAwesomeIcon icon={faUser} className="nav_icon"/>
                    <button id="username" className="dropbtn">User Name</button>
                    <div className="dropdown-content">
                        <Link to={"/profile"}>Profile Page</Link>
                        <a id="logout" onClick={this.logout}>
                        <FontAwesomeIcon icon={faPowerOff} className="logout_icon"/>
                        </a>
                    </div>
                </div>
                </span>
                </div>
                

            </div>
        </nav>
    );

    }
    
}

