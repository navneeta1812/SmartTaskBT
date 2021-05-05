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
        if ( task.assinedID  === fbHelper.auth().currentUser.uid ) {
          newTaskState.push ({
            title: task.title,
            description: task.description,
            assingedTo: task.assingedTo,
            created: task.created_At,
            url: task.imageUrl,
            project: task.project,
            priority: task.priority,
            assignedID: task.assinedID,
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
        <button className="search_button"> <FontAwesomeIcon icon={faSearch}  id="search" className="search_icon" /> <strong>Search</strong></button>
      </div>
      <br/><br/><br/>
      { this.state.taskList.length > 0 ? this.state.taskList.map((task) => 
        <div className="task_card">
        <h4>{task.title}</h4>
        <h5>{task.description}</h5>
        {
           task.url.length>1?<img className="task_img" width="150" height = "100" src={task.url}></img>:''
        }
        <p>Created at: <strong> {task.created.slice(0,16)}</strong></p>
        <p>Project :<strong>{task.project}</strong> </p>
        <p>Priority : <strong>{task.priority}</strong></p>
        <button className="button_decorVT">Task Complete!</button>
        {/* <p>submitted by {task.submittedBy}</p> */}

    </div>
      ) :

      <h3> No Task Yet</h3>

      }

      </main>
  
    );
  }



  
}

