import React, {useEffect, useRef, useState} from "react"
import Task from "./Task.js"
import styles from "./TaskView.module.css"
  
  export default function TaskView () {

    const createTask = (index, title, callback, checked) => <Task key={index} id={index} title={title} callback={callback} checked={checked}/>
  
    const handleCheckboxClick = (doneTask) => { // doneTask=[checked, id]
      var changedTask;
      var taskIndex;

      var newTasks = tasks;
      var newTasksDone = tasksDone;        

      if(doneTask.checked){
        
        changedTask = tasks.find(cTask => cTask.props.id === doneTask.id);
        taskIndex = tasks.findIndex(cTask => cTask.props.id === doneTask.id);

        newTasks.splice(taskIndex,1);
       
        changedTask = createTask(changedTask.props.id, changedTask.props.title, handleCheckboxClick, true)//<Task key={task.props.id} id={task.props.id} title={task.props.title} callback={this.handleCheckboxClick} checked={true}/>
        newTasksDone.unshift(changedTask)
  
      } else {
        

        changedTask = tasksDone.find(cTask => cTask.props.id === doneTask.id);
        taskIndex = tasksDone.findIndex(cTask => cTask.props.id === doneTask.id);
        
        newTasksDone.splice(taskIndex,1);
  
        changedTask = createTask(changedTask.props.id, changedTask.props.title, handleCheckboxClick, false)
        newTasks.push(changedTask)
        
        
      }

      changeTasks([...newTasks]);
      changeTasksDone((newTasksDone !== undefined ? [...newTasksDone]: []));
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