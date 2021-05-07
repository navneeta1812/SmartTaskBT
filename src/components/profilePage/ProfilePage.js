import React from "react";
import Navbar from "./navbar/Navbar.js";
import Main from "./main/Main.js";
import Sidebar from "./sidebar/Sidebar.js";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <Main />
        <Sidebar />
      </div>
    );
  }
}
export default ProfilePage;
