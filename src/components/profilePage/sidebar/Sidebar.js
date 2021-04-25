import React from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faNewspaper, faPenSquare } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    return(
        <sidebar className="sidebar">
            <div className="content">
               
                <div className="divbar">
                <FontAwesomeIcon className="icon_decor" icon={faFile} /><br/>
                    <a href="#">My Task</a>
                    </div>
               
                <div className="divbar"><FontAwesomeIcon className="icon_decor" icon={faNewspaper}  /><br/><a href ="#">View Task</a></div>
                
                <div className="divbar">
                    <Link className="linke" to={"/reportTask"}>
                        <FontAwesomeIcon className="icon_decor" icon={faPenSquare}  />
                        <br/>
                        Report Issue
                        </Link>
                        </div>

            </div>
            
        </sidebar>
        


    );
}

export default Sidebar;