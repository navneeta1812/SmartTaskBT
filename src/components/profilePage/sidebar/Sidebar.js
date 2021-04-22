import React from 'react';
import './Sidebar.css';


const Sidebar = () => {
    return(
        <sidebar>
            <div className="content">
                <div><a href="#">My Task</a></div>
                <div><a href ="#">View Task</a></div>
                <div><a href="#">Report Issue</a></div>
            </div>
            
        </sidebar>
        


    );
}

export default Sidebar;