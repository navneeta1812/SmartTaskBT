import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react' 
import propic from '../../../assets/profilepic.jpg'
import fbHelper from '../../../cofig/FireBaseHelper'
import './Main.css'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import loader from '../../../assets/loadergif.gif'


export default class Main extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            file: null,
            isLoading : true,
            employee:null
           
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        fbHelper.auth().onAuthStateChanged(user => {
            if(user){
                this.getUserDetails();
            }
        });
    }

    getUserDetails(){

        fbHelper.database().ref("employee").child(fbHelper.auth().currentUser.uid).on("value",snapshot=>{
            
            let employee = snapshot.val();
            this.setState({isLoading:false,employee:employee})
          
        })
    }

    handleChange=(files)=> {
        this.setState({
            file: files
        })
        
    }

    uploadPhotoToDatabase = ()=>{

            let bucketName= "ProfileImages"
            let file = this.state.file[0]
            let storageRef = fbHelper.storage().ref(`${bucketName}/${file.name}`);
            let uploadTask = storageRef.put(file);
            uploadTask.then(snap =>{
                return snap.ref.getDownloadURL();
            }).then(url  => {
    
                fbHelper.database().ref("employee").child(fbHelper.auth().currentUser.uid)
                .update({"profile_pic":url});
        
            }); 
    }
        
   
    render() {

        if(this.state.file!=null && !this.state.isLoading){
            document.getElementById("propic").src=URL.createObjectURL(this.state.file[0])
        }

        return(
            <main className="PP_main">
                { !this.state.isLoading ? 
                <div className="PP_div"> 
                    <div className="card">
                        <h1 className="main_heading">Profile Page</h1>
                        <img id="propic" className="propic" src=
                        {
                            this.state.employee!=null && this.state.employee.profile_pic!=undefined?
                            this.state.employee.profile_pic:propic
                        }  alt="profilePic" width="200px" height="200px" className="PP_img" />

                        <div className="icon_hover">
                            <label for="fileInput">
                                <FontAwesomeIcon icon={faCameraRetro} className="PP_icon" />
                            </label>
                            <input type="file" id="fileInput" className="file_input" onChange={(e)=>{this.handleChange(e.target.files)}}/>    
                        </div>

                        <div className=" ">
                            <div className="emp_name" ><h4><b id="name">
                                {
                                    this.state.employee!=null?this.state.employee.firstname+" "+this.state.employee.lastname
                                    :''
                                }
                                </b></h4></div>  

                            <div><h3>Employee</h3></div>  

                            <a href="" id="email" className="PP_email">
                            {
                                    this.state.employee!=null?this.state.employee.email
                                    :''
                                }
                            </a><br />
                            <button onClick={this.uploadPhotoToDatabase} className="button_decor">Update Profile</button>
                           
                        </div> 
                    </div> 
                
            
                    
                </div>  
                :
                <div className="PP_loading">
                    
                    <img src={loader}  width="200" height="200" />
                    <h4>loading...</h4> 
                </div>
                 
            }
    
            </main>

    
        );

    }

    
}
