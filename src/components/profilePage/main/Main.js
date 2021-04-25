import React from 'react';
import propic from '../../../assets/profilepic.jpg';
import fbHelper from '../../../cofig/FireBaseHelper';
import './Main.css';


export default class Main extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            file: null,
           
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        fbHelper.auth().onAuthStateChanged(user =>{
            if(user){
                this.getUserDetails();
            }
        });
    }

    getUserDetails(){

        fbHelper.database().ref("employee").child(fbHelper.auth().currentUser.uid).on("value",snapshot=>{
            
            let employee = snapshot.val();
        
            if(employee.profile_pic!=undefined ||employee.profile_pic!=undefined ){
                document.getElementById("propic").src = employee.profile_pic

            }
            document.getElementById("name").innerHTML = "Name :"+employee.firstname+" "+employee.lastname
            document.getElementById("email").innerHTML = "Email :"+employee.email
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

        if(this.state.file!=null){
            document.getElementById("propic").src=URL.createObjectURL(this.state.file[0])

        }

        return(
            <main>
                <div className="main_div">
                    
                    <div className="card">
                        <h2>Profile</h2>
                        
                        <img id="propic" className="propic" src={propic}  alt="profilePic" width="200px" height="200px"/>
                        <div>
                        <input type="file"  onChange={(e)=>{this.handleChange(e.target.files)}}/>

                        </div>
                        <div>
                    
                            <div>
                                
                                <h4 >
                                    <b id="name">Employee name</b>
                                    </h4> 
                            </div>  
                            <div>
                                <p>Employee</p> 
                            </div>  
                            <p id="email">employee email</p>
                        <button onClick={this.uploadPhotoToDatabase} className="button_decor">Edit Profile</button>
                        <p>Active Task 23</p>
                        <p>Task Completed 103</p>
                        </div> 
                    </div> 
                
                    
                    <div className="card3">
                        <h3>Assigned Project</h3>
                        <p>Project Name</p>
                        <p>Recent Issue</p>
                    </div>
    
                    <div className="card4">
                        <h3>Task History</h3>
                        <textarea />
                    </div>
                
                    
                </div>    
    
            </main>
    
        );

    }

    
}
