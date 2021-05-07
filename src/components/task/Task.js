import { EmojiFlags } from "@material-ui/icons";
import React from "react";
import Navbar from "../profilePage/navbar/Navbar";
import Sidebar from "../profilePage/sidebar/Sidebar";
import TaskMain from "./taskMain/TaskMain";

class Task extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div className="container">
        <Navbar />
        <TaskMain id={id} />
        <Sidebar />
      </div>
    );
  }
}
export default Task;
