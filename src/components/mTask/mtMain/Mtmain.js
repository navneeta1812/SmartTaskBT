import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Mtmain.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import fbHelper from '../../../cofig/FireBaseHelper';

export default class MTmain extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskList : []
    }
  }

  componentDidMount() {
    this.getTaskReport();
  }

  getTaskReport() {

    fbHelper.database().ref("tasks").on("value",snap => {
      let newTaskState = [];
      snap.forEach (data => {
        const task = data.val()
        if ( task.assignedID  === fbHelper.auth().currentUser.uid ) {

          newTaskState.push ({
            title: task.title,
            description: task.description,
            assignedTo: task.assignedTo,
            created: task.created_AT,
            url: task.imageUrl,
            project: task.project,
            priority: task.priority,
            assignedID: task.assignedID,
            submittedBy: task.editor_ID
             
          })
        }

        this.setState({
          taskList: newTaskState
        })
          
      })
    })
  }

  render(){
    return(
      <main className="MT_main">
      <div className="search">
        <label for="search"></label>
        <input type="text" id="search" placeholder="Search Issue Id/Task Id" className="search_input" />
        <button className="search_button"> <FontAwesomeIcon icon={faSearch}  id="search" className="search_icon" /></button>
      </div>
      <br/><br/><br/>
      { this.state.taskList.length > 0 ? this.state.taskList.map((task) => 
        <table className="MT_table">
        <th>My Task</th>
        <tr>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{ task.url.length > 1 ? <img width="150" height="100" src={task.url}></img> : '' }</td>
          <td>Created at {task.created}</td>
          <td>Project : {task.project}</td>
          <td>Assinged to {task.assingedTo}</td>
          <td>Priority : {task.priority}</td>
        </tr>
        
        </table>
      ) :

      <h3> No Task Yet</h3>

      }

      </main>
  
    );
  }



  
}

