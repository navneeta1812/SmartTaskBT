import React from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faNewspaper, faPenSquare } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    return(
        <sidebar className="sidebar">
            <div className="content">
                <p className="icon_decor"><FontAwesomeIcon icon={faFile}  /></p>
                <div><a href="#">My Task</a></div>
                <p className="icon_decor"><FontAwesomeIcon icon={faNewspaper}  /></p>
                <div><a href ="#">View Task</a></div>
                <p className="icon_decor"><FontAwesomeIcon icon={faPenSquare}  /></p>
                <div><Link to={"/reportTask"}>Report Issue</Link></div>

            </div>
            
        </sidebar>
        


    );
}

export default Sidebar;