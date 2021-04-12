import React from 'react';
import "./signUpPage.css";
import { Link } from "react-router-dom";



export default class signup extends React.Component {
    render() {
        return (

            <div className="form_body">
                <form className="form_set">
                    <h1 className="form_title">Sign Up</h1>
                        <p>Please fill in this form to create an accout!</p>
                    
                    <div className="form_div_">
                        <input type="text" name="firstName" className="form_input_" autoComplete="off" placeholder=" " />
                        <label for="firstName" className="form_label" >First Name</label>
                        <input type="text" name="lastName" className="form_input_" autoComplete="off" placeholder=" "  />
                        <label for="lastName" className="form_label_">Last Name</label>

                    </div>
                    <div className="form_div">
                        <input type="email" name="emailId" className="form_input" autoComplete="off" placeholder=" "  />
                        <label for="emailId" className="form_label">Email</label>

                    </div>
                    <div className="form_div">
                        <input type="password" name="password"  className="form_input" autoComplete="off" placeholder=" "  />
                        <label for="password" className="form_label">Password</label>

                    </div>    
                    <div className="form_div">
                        <input type="password" name="password" className="form_input" autoComplete="off" placeholder=" "  />
                        <label for="password" className="form_label">Confirm Password</label>

                    </div>
                    <div >
                        <p><input type="checkbox" />I accept all the Terms of Use and Privicy Policy </p>
                    </div>
                    <button className="button_decor">Sign Up</button>
                    <p>Already a user?<Link to={"/"}>Log In</Link></p>    

                </form>
                    
                   
            


                
            </div>
        )
    }
}