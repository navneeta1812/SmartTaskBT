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
            userD:null
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

            if(employee!=null){
                this.setState({
                    userD:employee
                })
            }
        
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

        })
    }
       
       
    logout(){
        fbHelper.auth().signOut();
    }




    render() {
        return (
        <nav className="navbar">
            <div className="nav_header">
                <img  className="logoApp" src={logo} width='45' height='45' alt="logo"></img>
                <h2 className="nav_heading">SmartTask-BT</h2>
            </div>
            
            <div className="navbar__right">
                <Link to={"/reportTask"}>Report Task</Link>
                <div className="nav_dropdown">
                    <button id="projects" className="nav_dropbtn">
                        {
                            this.state.projectList.length>0?`#${this.state.projectList[0].name}`:"Project"
                        }
                    </button>
                    <div className="nav_dropdown-content">
                        {
                        this.state.projectList.map((value)=><a href="#">{value.name}</a>)
                            }

                    </div>
                </div>

                <div>
                <span className="color">
                <div className="nav_dropdown">
                    <FontAwesomeIcon icon={faUser} className="nav_icon"/>
                    <button id="username" className="nav_dropbtn">
                    {
                        this.state.userD!=null?this.state.userD.firstname+" "+this.state.userD.lastname:"Name"
                    }
                    </button>

                    <div className="nav_dropdown-content">
                        <Link to={"/profile"}>Profile Page</Link>
                       
                       <div className="logdiv">
                       <FontAwesomeIcon icon={faPowerOff} className="logout_icon"/>
                        <a id="logout" onClick={this.logout}>
                        {
                        this.state.userD!=null?"Logout("+this.state.userD.firstname[0]+this.state.userD.lastname[0]+")":"Logout"
                    }
                        </a>
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

