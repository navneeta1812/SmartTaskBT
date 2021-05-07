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
      searchText: "",
    };

    this.searchTask = this.searchTask.bind(this);
  }

  componentDidMount() {
    this.getTaskReport();
  }

  handlechange(e) {
    if (e.target.name === "search") {
      if (e.target.value.length < 1) {
        this.getTaskReport();
      }
      this.setState({
        searchText: e.target.value,
      });
    }
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

  searchTask() {
    var ref = fbHelper.database().ref("tasks");
    var query = ref.orderByChild("title").startAt(this.state.searchText);
    query.once("value", (snap) => {
      let newTaskState = [];
      snap.forEach((data) => {
        const task = data.val();
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
      });
      this.setState({
        taskList: newTaskState,
      });
    });
  }

  render() {
    return (
      <main className="MT_main">
        <div className="MT_search">
          <label for="search"></label>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => {
              this.handlechange(e);
            }}
            placeholder="Search by Title"
            className="MT_search_input"
          />
          <button className="MT_search_button" onClick={this.searchTask}>
            {" "}
            <FontAwesomeIcon
              icon={faSearch}
              id="search"
              className="MT_search_icon"
            />{" "}
            <strong>Search</strong>
          </button>
        </div>
        <br />
        <br />
        <br />
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
              <Link to={`/taskPage/${task.id}`} className="VT_link">
              <button className="button_decorVT">View Task</button>
              </Link>
              
              {/* <p>submitted by {task.submittedBy}</p> */}
            </div>
          ))
        ) : (
          <h3> No Task Yet</h3>
        )}
      </main>
    );
  }
}
