import React from "react";
import "./MyVTmain.css";
import fbHelper from "../../../cofig/FireBaseHelper";
import loader from "../../../assets/loadergif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default class VTmain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      isLoading: true,
      searchText: ""
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
        this.setState({ isLoading: false });

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
            assinedID: task.assinedID,
            submittedBy: task.editor_ID,
          });
        });

        this.setState({
          taskList: newTaskState,
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
    if (!this.state.isLoading) {
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

        <div className="VT_main">

          {this.state.taskList.length > 0 ? (
            this.state.taskList.map((task) => (
              <div className="VT_task_card">
                <h4 className="VT_h4">{task.title}</h4>
                <h5 className="VT_h5">{task.description}</h5>
                {task.url.length > 1 ? (
                  <img
                    className="VT_task_img VT_img"
                    width="150"
                    height="100"
                    src={task.url}
                  ></img>
                ) : (
                  ""
                )}
                <p>
                  Created at <strong>{task.created.slice(0, 16)}</strong>
                </p>
                <p>
                  Project :<strong> {task.project}</strong>
                </p>
                <p>
                  Assinged to <strong>{task.assingedTo}</strong>
                </p>
                <p>
                  Priority : <strong>{task.priority}</strong>
                </p>
                {
                  task.assinedID ===fbHelper.auth().currentUser.uid || task.submittedBy ===fbHelper.auth().currentUser.uid ?
                  <div>
                  <Link to={`/taskPage/${task.id}`} className="VT_link">
                    <button className="button_decorVT">View Task</button>
                  </Link>
                  </div>:''
                }
                
                {/* <p>submitted by {task.submittedBy}</p> */}
              </div>
            ))
          ) : (
            <h3 className="h3task"> No Task Found</h3>
          )}

        </div>
        </main>
      );
    } else {
      return (
        <div className="PP_loading">
          <img src={loader} width="200" height="200" />
          <h4>loading...</h4>
        </div>
      );
    }
  }
}
