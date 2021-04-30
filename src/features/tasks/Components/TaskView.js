import React, {useEffect, useRef, useState} from "react"
import {nanoid} from "@reduxjs/toolkit"
import Task from "./Task.js"
import styles from "./TaskView.module.css"
  
  export default function TaskView () {
    //nanoid: random Id
    const createTask = (title, callback, checked) => <Task key={nanoid()} id={nanoid()} title={title} callback={callback} checked={checked}/>
  
    const handleCheckboxClick = (doneTask) => { // doneTask=[checked, id]
      if(doneTask.checked){
                
      } else {
      
        
      }
    }

    const [tasks, changeTasks] = useState(["Brötchen backen", "Brötchen verkaufen", "Geld aus der Kasse nehmen", "Feierabend"].map((taskTitle, index) => {
      return createTask(index, taskTitle, handleCheckboxClick, false)//<Task key={index} id={index} title={taskTitle} callback={this.handleCheckboxClick} checked={false}/>
    }));
    const [tasksDone, changeTasksDone] = useState([])
    
    return (
      <div>
        <ul className={styles.taskList}>
          {tasks}
        </ul>
        {tasksDone.length !== 0 && <hr className={styles.taskListDivider}/>}
        <ul className={styles.taskList, styles.done}>
          {tasksDone}
        </ul>
      </div>
    )
  
  }