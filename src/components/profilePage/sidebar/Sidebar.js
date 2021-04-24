import React from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";


const Sidebar = () => {
    return(
        <sidebar className="sidebar">
            <div className="content">

                <div><a href="#">My Task</a></div>
                <div><a href ="#">View Task</a></div>
                <div><Link to={"/reportTask"}>Report Issue</Link></div>

            </div>
            
        </sidebar>
        


    );
}

export default Sidebar;