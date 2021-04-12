import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import loginPage from "./components/loginPage";
import signUp from "./components/signUpPage/signUpPage";

export default class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route exact path="/" component={loginPage}/>
        <Route exact path="/signup" component={signUp}/>
      </BrowserRouter>

    );
  }
}