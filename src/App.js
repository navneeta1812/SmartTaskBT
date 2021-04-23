import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import loginPage from "./components/loginPage";
import  ProfilePage  from "./components/profilePage/ProfilePage";
import signUp from "./components/signUpPage/signUpPage";

export default class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route exact path="/" component={loginPage}/>
        <Route exact path="/signup" component={signUp}/>
        <Route exact path="/profile" component={ProfilePage}/>
      </BrowserRouter>

    );
  }
}