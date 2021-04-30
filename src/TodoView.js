import React, {useEffect, useRef, useState} from "react"
import {BiCalendarEvent} from "react-icons/bi"
import {BsBell} from "react-icons/bs"
import {GiCheckMark} from "react-icons/gi"
import "./TodoView.css"

 
  function TaskDescription (props){
    return (
      <div className="task-desc">
        <div className="task-title">
          <p className="text">
            {props.title}
          </p>
        </div>
        <div className="task-extras">
          <BsBell className="ic-extra ic-bell"/>
          <BiCalendarEvent className="ic-extra ic-calendar"/>
          bis 07.02.23
        </div>
      </div>
    )
  }
  
  function Checkbox (props) {
    
    const firstRender = useRef(true)
    const callback = props.callback;
    const [checked, setChecked] = useState(props.checked);
    const [hovering, setHovering] = useState(false);
  
    function initHover (){
      setHovering(true)
    }
  
    function endHover (){
      setHovering(false)
    }
  
    function handleClick(){   
      setChecked(!checked);
    }

    useEffect (() => {      
      if(!firstRender.current){
        callback(checked);  
      }
    }, [checked, callback])

    useEffect (() => {
      firstRender.current = false
    }, [])

    var clrIcon = checked ? "#fff" : "#4caf50";
    var clrBackground = checked ? "#4caf50" : "#fff";
    var visIcon = checked || hovering ? "visible" : "hidden";

    return (
      <div className="checkbox" onClick={handleClick} style={{backgroundColor: clrBackground}} onMouseEnter={initHover} onMouseLeave={endHover}>
        <GiCheckMark className="ic-checkbox" style={{color: clrIcon, visibility: visIcon, "&:hover": "visible"}}/>
      </div>
    )    
  } 
  
  function Task(props) {
    function handleDone (checked){
      props.callback({checked: checked, id: props.id});
    }
  
    return (
      <li className="task">
        <div className="checkbox-wrapper">
          <Checkbox callback={handleDone} checked={props.checked}/>
        </div>
        <TaskDescription title={props.title} />
      </li>
    )
  }
  
  export default function TaskList () {

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
        <ul className="task-list">
          {tasks}
        </ul>
        {tasksDone.length !== 0 && <hr className="task-list-divider"/>}
        <ul className="task-list done">
          {tasksDone}
        </ul>
      </div>
    )
  
  }