import React,{useState,useEffect} from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../../assets/app_logo.png';
import fbHelper from "../../../cofig/FireBaseHelper";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state={
            projectList:[],
        }
    }

    componentDidMount(){
        fbHelper.auth().onAuthStateChanged(user => {
            if(user){
                
                this.getUserDetails();

                this.getProjectList();
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

    getProjectList(){

        fbHelper.database().ref("projects").on("value",snap =>{
            
            let newprojectState = [];
            snap.forEach(data => {
                const dataVal = data.val()
                newprojectState.push({
                  id: data.id,
                  name: dataVal.projectName
                  
                })
            })
            this.setState({projectList:newprojectState})

            this.setProject();
        })
    }
       
    setProject(){
        document.getElementById("projects").innerHTML = "#"+this.state.projectList[0].name
    }
            
    logout(){
        fbHelper.auth().signOut();
    }




    render() {
        return (
        <nav className="navbar">
            <div className="div-header">
                <img  className="logoApp" src={logo} width='45' height='45' alt="logo"></img>
                <h2 className="heading">SmartTask-BT</h2>
            </div>
            
            <div className="navbar__right">
                <Link to={"/reportTask"}>Report Task</Link>
                <div className="dropdown">
                    <button id="projects" className="dropbtn">Project</button>
                    <div className="dropdown-content">
                        {
                        this.state.projectList.map((value)=><a href="#">{value.name}</a>)
                            }

                    </div>
                </div>

                <div>
                <span className="color">
                <div className="dropdown">
                    <FontAwesomeIcon icon={faUser} className="nav_icon"/>
                    <button id="username" className="dropbtn">User Name</button>

                    <div className="dropdown-content">
                        <Link to={"/profile"}>Profile Page</Link>
                       
                       <div className="logdiv">
                       <FontAwesomeIcon icon={faPowerOff} className="logout_icon"/>
                        <a id="logout" onClick={this.logout}/>
                       </div>
                           
                    </div>
                </div>
                </span>
                </div>
                

            </div>
        </nav>
    );

    }
    
}

