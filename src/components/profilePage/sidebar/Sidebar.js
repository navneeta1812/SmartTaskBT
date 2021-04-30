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
                    <Link to={"/myTask"} className="sidebar_decor" >
                        <FontAwesomeIcon className="icon_decor" icon={faFile} /><br/>
                        My Task</Link>
                </div>
               
                <div className="divbar">
                    <Link to={"/viewTask"} className="sidebar_decor">
                        <FontAwesomeIcon className="icon_decor" icon={faNewspaper} /><br/>
                        View Task</Link>
                </div>
                
                <div className="divbar">
                    <Link  to={"/reportTask"} className="sidebar_decor" >
                        <FontAwesomeIcon className="icon_decor" icon={faPenSquare} /><br />
                        Report Issue</Link>
                </div>

            </div>
            
        </sidebar>
        


    );
}

export default Sidebar;