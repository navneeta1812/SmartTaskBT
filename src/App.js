import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import loginPage from "./components/loginPage";
import ProfilePage from "./components/profilePage/ProfilePage";
import signUp from "./components/signUpPage/signUpPage";
import ReportTask from "./components/reportTask/ReportTask";
import fbHelper from "./cofig/FireBaseHelper";
import MyTask from "./components/mTask/myTask/MyTask";
import MyViewTask from "./components/viewTask/myViewTask/MyViewTask";
import Task from "./components/task/Task";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListner();
  }

  authListner() {
    fbHelper.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    let redirect;
    if (this.state.user != null) {
      redirect = <Redirect to="/myTask" />;
    } else {
      redirect = <Redirect to="/" />;
    }

    return (
      <BrowserRouter>
        <Route exact path="/" component={loginPage} />
        <Route exact path="/signup" component={signUp} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/reportTask" component={ReportTask} />
        <Route exact path="/myTask" component={MyTask} />
        <Route exact path="/viewTask" component={MyViewTask} />
        <Route exact path="/taskPage/:id" component={Task} />
        {redirect}
      </BrowserRouter>
    );
  }
}
