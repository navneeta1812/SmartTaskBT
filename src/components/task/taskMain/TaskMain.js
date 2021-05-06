import React from 'react'
import './TaskMain.css'




export default class TaskMain extends React.Component {
  render() {
    return(
      <main className="task_main">
        <div className="task_data">
          <h2>Task tittle : </h2>
          <img className="task_img"></img>
          <h4>Description : </h4>
          
          <p>Priority : </p>
          <p>Created At : </p>
          <p>Assigned to : </p>
          <p>Submitted by : </p>
          <textarea placeholder="Add Notes" className="task_textarea"></textarea>
          
        </div>

        <div className="task_bottom">
          <div className="task_select">
          <h5>Status : </h5>

          <div className="task_dropdown">
          <label for="taskStatus" className="task_dropdown-content"></label>
          <select name="status" id="taskStatus">
            <option selected disabled>Choose Task Status</option>
            <option value="completed" className="task_option">Completed</option>
            <option value="working" className="task_option">Working</option>
            <option value="notDone" className="task_option">Not Done</option>
          </select>
          </div>
          </div>

        

        
        <div className="task_input">
          <p><input type="checkbox" />Assign Back</p>
          <button className="task_button_decor">Discard</button><br/><br/>
          <button className="task_button_decor">Submit</button>
        </div>  
        </div>  
          

      </main>
     

    );
  }
}