import React from 'react';
import './RTmain.css';
import fbHelper from "../../../cofig/FireBaseHelper";


export default class RTmain extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projectList:[],
            userList:[]
        }
    }

    componentDidMount(){
        this.getProjectList();
        this.getUserList();


    }

    getUserList(){
        fbHelper.database().ref("employee").on("value",snap =>{
            let newUserState = [];
            snap.forEach(data => {
                const dataVal = data.val()
                newUserState.push({
                  id: dataVal.uid,
                  name: dataVal.firstname+ " "+dataVal.lastname,

                })
            })
            this.setState({userList:newUserState})

        })
    }


    getProjectList(){

        fbHelper.database().ref("projects").on("value",snap =>{
            let newprojectState = [];
            snap.forEach(data => {
                const dataVal = data.val()
                newprojectState.push({
                  id: dataVal.id,
                  name: dataVal.projectName
                  
                })
            })
            this.setState({projectList:newprojectState})

        })

        
    
    }
       

    render(){

        return(
            <main>
                <table>
                    <th>Enter Issue Details</th>
                    <tr>
                        <td className="TD_left">Project</td>
                        <td className="right_dropdown"> 
                            <label for="project"></label>
                            <select name="project" id="project"  className="right_dropdown">
                                {
                                    this.state.projectList.map((value)=>
                                        <option value={value.name} selected>{value.name}</option>)
                                  }
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="TD_left">Priority</td>
                        <td className="right_dropdown" >
                            <lable for="priority"></lable>
                            <select name="priority" id="priority" className="right_dropdown">
                            <option value="normal">Normal</option>
                                <option value="veryUrgent">Very Urgent</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="TD_left">Assign To</td>
                        <td className="right_dropdown" >
                            <lable for="employee"></lable>
                            <select name="employee" id="employee" className="right_dropdown">
                                {
                                    this.state.userList.map((value)=>
                                    <option value={value.name} selected>{value.name}</option>)
                                  }
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="TD_left">Title</td>
                        <td ><textarea className="textarea" placeholder="Enter Task"/></td>
                    </tr>

                    <tr>
                        <td className="TD_left">Description</td>
                        <td  ><textarea className="textarea" placeholder="Describe the Task"/></td>
                    </tr>

                    <tr>
                        <td className="TD_left" >Upload files</td>
                        <td align="center">
                            <label for="input" className="label">Choose a File</label>
                            <input type="file"  id="input" className="input_file" /></td>
                    </tr>

                </table>

                <button className="RTbutton_decor">Submit</button>
            </main>
    
        );
    }

}

