import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Mtmain.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import fbHelper from "../../../cofig/FireBaseHelper";
import { Link } from 'react-router-dom';

export default class MTmain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    };

  }

  componentDidMount() {
    this.getTaskReport();
  }


  getTaskReport() {
    fbHelper
      .database()
      .ref("tasks")
      .on("value", (snap) => {
        let newTaskState = [];
        snap.forEach((data) => {
          const task = data.val();
          if (task.assinedID === fbHelper.auth().currentUser.uid) {
            newTaskState.push({
              id: data.key,
              title: task.title,
              description: task.description,
              assingedTo: task.assingedTo,
              created: task.created_At,
              url: task.imageUrl,
              project: task.project,
              priority: task.priority,
              assignedID: task.assinedID,
              submittedBy: task.editor_ID,
            });
          }

          this.setState({
            taskList: newTaskState,
          });
        });
      });
  }


  removeTask(taskID){
    var ref = fbHelper.database().ref("tasks").child(taskID);
    ref.remove();
  }

  render() {
    return (
      <main className="MT_main">
        
        {this.state.taskList.length > 0 ? (
          this.state.taskList.map((task) => (
            <div className="MT_task_card">
              <h4>{task.title}</h4>
              <h5>{task.description}</h5>
              {task.url.length > 1 ? (
                <img
                  className="MT_task_img"
                  width="150"
                  height="100"
                  src={task.url}
                ></img>
              ) : (
                ""
              )}
              <p>
                Created at: <strong> {task.created.slice(0, 16)}</strong>
              </p>
              <p>
                Project :<strong>{task.project}</strong>{" "}
              </p>
              <p>
                Priority : <strong>{task.priority}</strong>
              </p>
              {
                  task.assignedID === fbHelper.auth().currentUser.uid || task.submittedBy ===fbHelper.auth().currentUser.uid ?
                  <div>
                  <Link to={`/taskPage/${task.id}`} className="VT_link">
                    <button className="button_decorMT">View Task</button>
                  </Link>
                  </div>:''
                }

              <button className="button_remove" onClick={()=>{
                const confirmBox = window.confirm(
                  "Do you really want to delete this Task?"
                )
                if (confirmBox === true) {
                  this.removeTask(task.id)
                }
              }
              }>Remove</button>

              
              {/* <p>submitted by {task.submittedBy}</p> */}
            </div>
          ))
        ) : (
          <h3 className="h3task"> You have not been assinged any task yet.</h3>
        )}
      </main>
    );
  }
}
