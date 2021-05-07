import React from "react";
import "./RTmain.css";
import fbHelper from "../../../cofig/FireBaseHelper";

export default class RTmain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      userList: [],
      files: null,
      title: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.pushDataToFirebase = this.pushDataToFirebase.bind(this);
  }

  componentDidMount() {
    this.getProjectList();
    this.getUserList();
  }

  getUserList() {
    fbHelper
      .database()
      .ref("employee")
      .on("value", (snap) => {
        let newUserState = [];
        snap.forEach((data) => {
          const dataVal = data.val();
          newUserState.push({
            id: dataVal.uid,
            name: dataVal.firstname + " " + dataVal.lastname,
          });
        });
        this.setState({ userList: newUserState });
      });
  }

  getProjectList() {
    fbHelper
      .database()
      .ref("projects")
      .on("value", (snap) => {
        let newprojectState = [];
        snap.forEach((data) => {
          const dataVal = data.val();
          newprojectState.push({
            id: dataVal.id,
            name: dataVal.projectName,
          });
        });
        this.setState({ projectList: newprojectState });
      });
  }
  handleFileChange = (files) => {
    this.setState({
      files: files,
    });
  };
  handleChange(e) {
    if (e.target.name == "title") {
      this.setState({
        title: e.target.value,
      });
    }

    if (e.target.name == "description") {
      this.setState({
        description: e.target.value,
      });
    }
  }

  //herre we will upload image if present
  uploadPhoto() {
    let photoUrl = "";
    let bucketName = "TaskImages";
    let file = this.state.files[0];
    let storageRef = fbHelper.storage().ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask
      .then((snap) => {
        return snap.ref.getDownloadURL();
      })
      .then((url) => {
        photoUrl = url;
        this.pushDataToFirebase(photoUrl);
      });
  }

  //here we will upload data to firebase
  pushDataToFirebase(url) {
    const taskData = {
      title: this.state.title,
      description: this.state.description,
      project: document.getElementById("project").value,
      priority: document.getElementById("priority").value,
      assingedTo: document.getElementById("employee").value,
      imageUrl: url,
      assinedID: this.state.userList[
        document.getElementById("employee").selectedIndex
      ].id,
      created_At: Date().toLocaleString(),
      editor_ID: fbHelper.auth().currentUser.uid,
    };
    fbHelper.database().ref("tasks").push(taskData);

    this.setState({
      files: null,
      title: "",
      description: "",
    });
    document.getElementById("file_name").innerHTML = "";
    document.getElementById("input").value = null;
  }

  //on button click we will call this function
  submitTask() {
    if (this.state.files != null) {
      this.uploadPhoto();
    } else {
      this.pushDataToFirebase("");
    }
  }

  render() {
    if (this.state.files != null) {
      document.getElementById("file_name").innerHTML = this.state.files[0].name;
    }

    return (
      <main className="RT_main">
        <table className="RT_table Rtable">
          <th className="RT_th Rth">Enter Issue Details</th>
          <tr>
            <td className="RT_TD_left Rtd">Project</td>
            <td className="RT_right_dropdown Rtd">
              <label for="project"></label>
              <select name="project" id="project" className="RT_right_dropdown">
                {this.state.projectList.map((value) => (
                  <option value={value.name} selected>
                    {value.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td className="RT_TD_left Rtd">Priority</td>
            <td className="RT_right_dropdown Rtd">
              <lable for="priority"></lable>
              <select
                name="priority"
                id="priority"
                className="RT_right_dropdown"
              >
                <option value="Normal">Normal</option>
                <option value="Medium">Medium    </option>
                <option value="Urgent">Urgent</option>
              </select>
            </td>
          </tr>

          <tr>
            <td className="RT_TD_left Rtd">Assign To</td>
            <td className="RT_right_dropdown Rtd">
              <lable for="employee"></lable>
              <select
                name="employee"
                id="employee"
                className="RT_right_dropdown"
              >
                {this.state.userList.map((value) => (
                  <option value={value.name} selected>
                    {value.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td className="RT_TD_left Rtd">Title</td>
            <td className="Rtd">
              <textarea
                id="title"
                value={this.state.title}
                name="title"
                className="RT_textarea"
                placeholder="Enter Task"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </td>
          </tr>

          <tr>
            <td className="RT_TD_left Rtd">Description</td>
            <td className="Rtd">
              <textarea
                id="description"
                value={this.state.description}
                name="description"
                className="RT_textarea"
                placeholder="Describe the Task"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </td>
          </tr>

          <tr>
            <td className="RT_TD_left Rtd">Upload files</td>
            <td className="Rtd" align="center">
              <h5 id="file_name">No File choosen</h5>
              <label for="input" className="RT_label">
                Choose a File
              </label>
              <input
                type="file"
                id="input"
                className="RT_input_file RT_input"
                onChange={(e) => {
                  this.handleFileChange(e.target.files);
                }}
              />
            </td>
          </tr>
        </table>

        <button className="RT_button_decor" onClick={this.submitTask}>
          Submit
        </button>
      </main>
    );
  }
}
