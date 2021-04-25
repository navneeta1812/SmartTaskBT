import React from 'react';
import "./signUpPage.css";
import { Link } from "react-router-dom";
import fbHelper from "../../cofig/FireBaseHelper";


export default class signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDisabled:true
        }
        this.submitForm = this.submitForm.bind(this);
    }

    validateEmail(emailId) {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/;
        const result = pattern.test(emailId);
        if(result===true){
            this.setState({
                emailError:false,
                email:emailId
            })
        }else{
            this.setState({
                emailError:true
            }) 
        }
    }

    handleChange(c){
        const target = c.target;
        const value = target.type ==='checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });


        if(c.target.name === 'firstName'){
            if(c.target.value === '' || c.target.value == null ){
                this.setState({
                    firstNameError:true,
                    lastNameError:true
                })
            }else{
                this.setState({
                    firstNameError:false,
                    firstName:c.target.value
                })
            }
        }

        if(c.target.name === 'lastName'){
            if(c.target.value === '' || c.target.value == null ){
                this.setState({
                    lastNameError:true,
                    firstNameError:true
                })
            }else{
                this.setState({
                    lastNameError:false,
                    lastName:c.target.value
                })
            }
        }

        if(c.target.name === 'emailId'){
            this.validateEmail(c.target.value);
        }

        if(c.target.name === 'password'){
            if(c.target.value === '' || c.target.value == null || c.target.value.length < 7){
                this.setState({
                    passwordError:true
                })
            }else{
                this.setState({
                    passwordError:false,
                    password:c.target.value
                })
            }
        }

        if(c.target.name === 'confirmPassword'){
            if(c.target.value === this.state.password){
                this.setState({
                    confirmPasswordError:false,
                    confirmPassword: c.target.value
                })
            }else{
                this.setState({
                    confirmPasswordError:true
                })
            }
        }
    }

    submitForm(c){
        c.preventDefault();
    
        

        // Do signup in firebase/
        // for signup u need email and pass word
        if(!this.state.confirmPasswordError && this.state.checkbox){
           
            fbHelper.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(data=>{
                //now we have to save the data(fname ,lname ,email,uid) in database
                const employee = {
                    firstname:this.state.firstName,
                    lastname: this.state.lastName,
                    email:this.state.email,
                    uid:data.user.uid
                }

                fbHelper.database().ref("employee").child(data.user.uid).set(employee);

            }).catch((err)=>{
                console.log(err);
            })
            
        }
    
    
    }

    render() {
        return (

            <div className="form_body">
                <form className="form_set">
                    <h1 className="form_title">Sign Up</h1>                    
                    <div className="form_div_">
                        <input type="text" name="firstName" className="form_input_" autoComplete="off" placeholder=" " onChange={(c)=>{this.handleChange(c)}} />
                        <label for="firstName" className="form_label" >First Name</label>
                
                        <input type="text" name="lastName" className="form_input_" autoComplete="off" placeholder=" " onChange={(c)=>{this.handleChange(c)}} />
                        <label for="lastName" className="form_label_">Last Name</label>

                    </div>
                    {this.state.lastNameError || this.state.firstNameError ? <span style={{color: "red",fontSize:12, fontWeight:"bold"}}> Name should not be empty</span> : ''}

                    <div className="form_div">

                        <input type="email" name="emailId" className="form_input" autoComplete="off" placeholder=" " onChange={(c)=>{this.handleChange(c)}} />
                        <label for="emailId" className="form_label">Email</label>
                        <br />
                        <br />
                        {this.state.emailError ? <span style={{color: "red",fontSize:12, marginLeft: 5.0, fontWeight:"bold"}}> Please enter a valid email address</span> : ''}

                    </div>
                    <div className="form_div">
                        <input type="password" name="password"  className="form_input" autoComplete="off" placeholder=" " onChange={(c)=>{this.handleChange(c)}} />
                        <label for="password" className="form_label">Password</label>
                        <br />
                        <br />
                        {this.state.passwordError ? <span style={{color: "red",fontSize:12, marginLeft: 5.0, fontWeight:"bold"}}> Value should be above 6</span> : ''}


                    </div>    
                    <div className="form_div">
                        <input type="password" name="confirmPassword" className="form_input" autoComplete="off" placeholder=" " onChange={(c)=>{this.handleChange(c)}} />
                        <label for="confirmPassword" className="form_label">Confirm Password</label>
                        <br />
                        <br />
                        {this.state.confirmPasswordError ? <span style={{color: "red",fontSize:12, marginLeft: 5.0, fontWeight:"bold"}}> Password did not match</span> : ''}



                    </div>
                    <div >
                        <p><input type="checkbox" name="checkbox" onChange={(c)=>{this.handleChange(c)}} />I accept all the Terms of Use and Privicy Policy </p>
                        {this.state.name ? <span style={{color:"red", fontSize: 12, fontWeight:"bold"}}>PLease accept terms and condition</span> : '' }
                    </div>
                    <button className="button_decor" onClick={this.submitForm}>Sign Up</button>
                    <p>Already a user?<Link to={"/"}>Log In</Link></p>    

                </form>
                
            </div>
        )
    }
}