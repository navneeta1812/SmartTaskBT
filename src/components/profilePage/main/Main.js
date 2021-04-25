import React from 'react';
import propic from '../../../assets/profilepic.jpg';
import './Main.css';


export default class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    render() {
        return(
            <main>
                <div className="main_div">
                    
                    <div className="card">
                        <h2>Profile</h2>
                        <img src={propic}  alt="profilePic" />
                        
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.file} />
                        <div>
                            <div>
                                <h4><b>John Doe</b></h4> 
                            </div>  
                            <div>
                                <p>Software Engineer</p> 
                            </div>  
                            <p>email@gmail.com</p>
                        <button className="button_decor">Edit Profile</button>
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
