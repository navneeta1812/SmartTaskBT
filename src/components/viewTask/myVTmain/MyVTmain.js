import React from 'react';
import  "./MyVTmain.css";
import fbHelper from "../../../cofig/FireBaseHelper"
import loader from '../../../assets/loadergif.gif'
import { Link } from 'react-router-dom'


export default class VTmain extends React.Component {

    constructor(props){
        super(props);
        this.state={
            taskList : [],
            isLoading : true
        }

    }

    componentDidMount(){
        this.getTaskReport();
    }

    getTaskReport(){
        fbHelper.database().ref("tasks").on("value",snap=>{

            let newTaskState=[];
            this.setState( {isLoading : false})

            snap.forEach(data => {
                const task = data.val()
                newTaskState.push({
                  id:data.key,
                  title: task.title,
                  description: task.description,
                  assingedTo:task.assingedTo,
                  created:task.created_At,
                  url:task.imageUrl,
                  project:task.project,
                  priority: task.priority,
                  assinedID:task.assinedID,
                  submittedBy:task.editor_ID
                  
                })
            })

          this.setState({
              taskList:newTaskState
      
          })
      })

    }

    render(){
 
      if(!this.state.isLoading) {

        return (

          <main className="VT_main">

              {this.state.taskList.length > 0 ?
              this.state.taskList.map((task) =>
                  <div className="VT_task_card">
                    <h4 className="VT_h4">{task.title}</h4>
                    <h5 className="VT_h5">{task.description}</h5>
                    {
                      task.url.length>1?<img className="VT_task_img VT_img" width="150" height = "100" src={task.url}></img>:''
                    }
                    <p>Created at <strong>{task.created.slice(0,16)}</strong></p>
                    <p>Project :<strong> {task.project}</strong></p>
                    <p>Assinged to <strong>{task.assingedTo}</strong></p>
                    <p>Priority : <strong>{task.priority}</strong></p>
                    <Link to={"/taskPage"} className="VT_link"><button className="button_decorVT">View Task</button></Link>
                    {/* <p>submitted by {task.submittedBy}</p> */}
      
                  </div>
              )  : 
              <h3> No Task Yet</h3>

              }
            
          </main>  
        );

      }

      else {
        return(
          <div className="PP_loading">
             <img src={loader} width="200" height="200"/>
             <h4>loading...</h4> 
          </div>
        );
        
      }
       
    }

}