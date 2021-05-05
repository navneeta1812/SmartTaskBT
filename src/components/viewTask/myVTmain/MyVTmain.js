import React from 'react';
import  "./MyVTmain.css";
import fbHelper from "../../../cofig/FireBaseHelper";


export default class VTmain extends React.Component {

    constructor(props){
        super(props);
        this.state={
            taskList : [],
        }

    }

    componentDidMount(){
        this.getTaskReport();
    }

    getTaskReport(){
        fbHelper.database().ref("tasks").on("value",snap=>{
            let newTaskState=[];
            snap.forEach(data => {
                const task = data.val()
                newTaskState.push({
                  title: task.title,
                  description: task.description,
                  assingedTo:task.assingedTo,
                  created:task.created_At,
                  url:task.imageUrl,
                  project:task.project,
                  priority: task.priority,
                  assinedID:task.assinedID,
                  submittedBy:task.editor_ID
                  
                })
            })

          this.setState({
              taskList:newTaskState
          })
      })

    }

    render(){
        return (
          <div className="main_div">
            {this.state.taskList.length > 0 ?
            this.state.taskList.map((task) =>
                <div className="task_card">
                  <h4>{task.title}</h4>
                  <h5>{task.description}</h5>
                  {
                     task.url.length>1?<img className="task_img" width="150" height = "100" src={task.url}></img>:''
                  }
                 <p>Created at: <strong> {task.created.slice(0,16)}</strong></p>
                <p>Project :<strong>{task.project}</strong> </p>
                <p>Priority : <strong>{task.priority}</strong></p>
                  <p>Priority : {task.priority}</p>
                  <button className="button_decorVT">Open Task</button>
                  {/* <p>submitted by {task.submittedBy}</p> */}
    
              </div>
            )  : 
              <h3>NO  TASK  YET</h3>
            }
          </div>
        );
    }

}