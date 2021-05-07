import React from "react";
import "./loginPage.css";
import { Link } from "react-router-dom";
import fbHelper from "../cofig/FireBaseHelper";

export default class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
    this.submitForm = this.submitForm.bind(this);
  }

  validateEmail(email) {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/;
    const result = pattern.test(email);
    if (result === true) {
      this.setState({
        emailError: false,
        email: email,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });

    if (e.target.name === "email") {
      this.validateEmail(e.target.value);
    }
    if (e.target.name === "password") {
      if (
        e.target.value === "" ||
        e.target.value == null ||
        e.target.value.length < 7
      ) {
        this.setState({
          passwordError: true,
        });
      } else {
        this.setState({
          passwordError: false,
          password: e.target.value,
        });
      }
    }
  }

  submitForm(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    // DO login in firebase
    if (!this.state.passwordError) {
      fbHelper
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
         
        })

        .catch((err) => {
          alert("WRONG CREDENTIALS\n"+err);
          
        });
    }
  }

  render() {
    return (
      <div className="form__body">
        <form className="form">
          <h1 className="form__title">Login Page</h1>

          <div className="form__div">
            <input
              type="email"
              name="email"
              id="email"
              className="form__input"
              autoComplete="off"
              placeholder=" "
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <label for="email" className="form__label">
              Email
            </label>
            <br />
            <br />
            {this.state.emailError ? (
              <span
                style={{
                  color: "red",
                  fontSize: 12,
                  marginLeft: 5.0,
                  fontWeight: "bold",
                }}
              >
                {" "}
                Please Enter valid email address
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="form__div">
            <input
              type="password"
              name="password"
              id="password"
              className="form__input"
              autoComplete="off"
              placeholder=" "
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <label for="password" className="form__label">
              Password
            </label>
            <br />
            <br />
            {this.state.passwordError ? (
              <span
                style={{
                  color: "red",
                  fontSize: 12,
                  marginLeft: 5.0,
                  fontWeight: "bold",
                }}
              >
                {" "}
                Value should be above 6
              </span>
            ) : (
              ""
            )}
          </div>

          {this.state.loginErr ? (
            <span
              style={{
                color: "red",
                fontSize: 12,
                marginLeft: 5.0,
                fontWeight: "bold",
              }}
            >
              {" "}
              Invalid Credentials
            </span>
          ) : (
            ""
          )}
          <button className="form__button" onClick={this.submitForm}>
            Login
          </button>
          <p>
            Not a user??<Link to={"/signup"}>Sign up </Link>
          </p>
        </form>
      </div>
    );
  }
}
