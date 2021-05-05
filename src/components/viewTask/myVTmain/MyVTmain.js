import React from 'react';
import  "./MyVTmain.css";
import fbHelper from "../../../cofig/FireBaseHelper";
import loader from '../../../assets/Circle-Loading.svg'


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
                    <p>Created at {task.created}</p>
                    <p>Project : {task.project}</p>
                    <p>Assinged to {task.assingedTo}</p>
                    <p>Priority : {task.priority}</p>
                    <button className="button_decorVT">Open Task</button>
                    {/* <p>submitted by {task.submittedBy}</p> */}
      
                  </div>
              )  : 
                <h3>NO  TASK  YET</h3>
              }
            
          </main>  
        );

      }

      else {
        return(
          <div className="PP_loading">
             <img src={loader} /><br/>
                    <h4>loading......</h4> 
          </div>
        );
        
      }
       
    }

}