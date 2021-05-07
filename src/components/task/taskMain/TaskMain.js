import React from "react";
import "./TaskMain.css";
import fbHelper from "../../../cofig/FireBaseHelper";
import loader from "../../../assets/loadergif.gif";
import { Redirect ,Link } from "react-router-dom";

export default class TaskMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      task: null,
      editorName: "",
      note: "",
      assignBack: false,
      status: "",
      redirect: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.getTaskDetails(id);
  }

  getTaskDetails(taskID) {
    fbHelper
      .database()
      .ref("tasks")
      .child(taskID)
      .on("value", (snapshot) => {
        let taskData = snapshot.val();

        if (taskData.status !== undefined && taskData.notes !== undefined) {
          this.setState({
            status: taskData.status,
            note: taskData.notes,
          });
        }

        this.setState({ isLoading: false, task: taskData });
        this.getEditorName(taskData.editor_ID);
      });
  }
  getEditorName(editorId) {
    fbHelper
      .database()
      .ref("employee")
      .child(editorId)
      .once("value", (snap) => {
        this.setState({
          editorName: snap.val().firstname + " " + snap.val().lastname,
        });
      });
  }

  handleChange(e) {
    if (e.target.name === "addnote") {
      this.setState({ note: e.target.value });
    }

    if (e.target.name === "status") {
      this.setState({ status: e.target.value });
    }

    if (e.target.type === "checkbox") {
      this.setState({ assignBack: e.target.checked });
    }
  }

  submitTask() {
    var ref = fbHelper.database().ref("tasks").child(this.props.id);
    var uid = fbHelper.auth().currentUser.uid;
    if (this.state.assignBack) {
      ref.update({
        status: this.state.status,
        notes: this.state.note,
        assinedID: this.state.task.editor_ID,
        editor_ID: uid,
      });
    } else {
      ref.update({
        status: this.state.status,
        notes: this.state.note,
      });
    }
    this.setState({ redirect: <Redirect to="/myTask" /> });
  }

  render() {
    return (
      <main className="task_main">
        {this.state.isLoading ? (
          <div className="PP_loading">
            <img src={loader} width="200" height="200" />
            <h4>loading...</h4>
          </div>
        ) : (
          <div>
            <div className="task_data">
              <h2>{this.state.task.title} </h2>
              <h5>{this.state.task.description}</h5>
              {this.state.task.imageUrl.length > 1 ? (
                <a target="_blank" href={this.state.task.imageUrl}>
                  <img
                    className="task_img"
                    src={this.state.task.imageUrl}
                  ></img>
                </a>
              ) : (
                ""
              )}

              <p>
                Priority :{" "}
                <strong style={{ color: "#fa0505" }}>
                  {this.state.task.priority.toUpperCase()}
                </strong>
              </p>
              <p>
                Created At :{" "}
                <strong>{this.state.task.created_At.slice(0, 16)}</strong>
              </p>
              <p>
                Assigned to : <strong>{this.state.task.assingedTo}</strong>
              </p>
              <p>
                Status :
                {this.state.task.status !== undefined ? (
                  <strong>{this.state.task.status}</strong>
                ) : (
                  "_____"
                )}
              </p>
              <p>
                Notes :
                {this.state.task.notes !== undefined ? (
                  <strong>{this.state.task.notes}</strong>
                ) : (
                  "______"
                )}
              </p>
              <p>
                Submitted by :
                <strong>
                  {this.state.editorName ? this.state.editorName : ""}
                </strong>
              </p>
              <br />
              <textarea
                name="addnote"
                placeholder="Add Notes"
                className="task_textarea"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              ></textarea>
            </div>

            <div className="task_bottom">
              <div className="task_select">
                <h5>Status : </h5>

                <div className="task_dropdown">
                  <label
                    for="taskStatus"
                    className="task_dropdown-content"
                  ></label>
                  <select
                    name="status"
                    className="taskselcte"
                    id="taskStatus"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  >
                    <option selected disabled>
                      Choose Task Status
                    </option>
                    <option value="completed" className="task_option">
                      Completed
                    </option>
                    <option value="working" className="task_option">
                      Working
                    </option>
                    <option value="Under Review" className="task_option">
                      Under Review
                    </option>
                    <option value="Resolved" className="task_option">
                      Resolved
                    </option>
                  </select>
                </div>
              </div>

              <div className="task_input">
                <p>
                  <input
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    type="checkbox"
                  />
                  <strong>
                    {this.state.editorName
                      ? "Assign Back To " + this.state.editorName
                      : ""}
                  </strong>
                </p>
                <button
                  className="task_button_decor"
                  onClick={this.submitTask.bind(this)}
                >
                  Update
                </button>
                <Link to={"/myTask/"}><button className="task_button_decor_discard" >Discard</button></Link>
                <br />
                <br />
              </div>
            </div>
          </div>
        )}

        {this.state.redirect}
      </main>
    );
  }
}
