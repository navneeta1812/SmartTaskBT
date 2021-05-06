import { EmojiFlags } from '@material-ui/icons'
import React from 'react'
import Navbar from '../profilePage/navbar/Navbar'
import Sidebar from '../profilePage/sidebar/Sidebar'
import TaskMain from './taskMain/TaskMain'


const Task = () => {
  return(
    <div className="container">
      <Navbar />
      <TaskMain />
      <Sidebar />
    </div>
  )
}
export default Task;