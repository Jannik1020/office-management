import React, {useEffect, useRef, useState} from "react"
import {BiCalendarEvent} from "react-icons/bi"
import {BsBell} from "react-icons/bs"
import {GiCheckMark} from "react-icons/gi"
import "./TodoView.css"

function TaskTitle (props) {
    return (
      <div className="task-title">
        <p className="text">
          {props.title}
        </p>
      </div>
    )
  }
  
  function TaskExtras () {
    return (
      <div className="task-extras">
        <BsBell className="ic-extra ic-bell"/>
        <BiCalendarEvent className="ic-extra ic-calendar"/>
        bis 07.02.23
      </div>
    )
  }
  
  function TaskDescription (props){
    return (
      <div className="task-desc">
        <TaskTitle title={props.title}/>
        <TaskExtras />
      </div>
    )
  }
  
  function Checkbox (props) {
    
    const firstRender = useRef(true)
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
        props.callback(checked);  
      }
    }, [checked])

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
  
  export default class TaskList extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        tasks: ["Brötchen backen", "Brötchen verkaufen", "Geld aus der Kasse nehmen", "Feierabend"].map((taskTitle, index) => {
          return this.createTask(index, taskTitle, this.handleCheckboxClick, false)//<Task key={index} id={index} title={taskTitle} callback={this.handleCheckboxClick} checked={false}/>
        }
        ),
        tasksDone: []
      }
    }  
  
    createTask = (index, title, callback, checked) => <Task key={index} id={index} title={title} callback={callback} checked={checked}/>
  
    handleCheckboxClick = (doneTask) => { // doneTask=[checked, id]
      if(doneTask.checked){
        var task = this.state.tasks.find(cTask => cTask.props.id === doneTask.id);
        const taskIndex = this.state.tasks.findIndex(cTask => cTask.props.id === doneTask.id);
       
        var tasks = this.state.tasks;
        tasks.splice(taskIndex,1);
       
        var tasksDone = this.state.tasksDone;
        task = this.createTask(task.props.id, task.props.title, this.handleCheckboxClick, true)//<Task key={task.props.id} id={task.props.id} title={task.props.title} callback={this.handleCheckboxClick} checked={true}/>
        tasksDone.unshift(task)
  
        this.setState((state) => ({
          tasks: tasks,
          tasksDone: tasksDone
        }));
      } else {
        

        var task = this.state.tasksDone.find(cTask => cTask.props.id === doneTask.id);
        const taskIndex = this.state.tasksDone.findIndex(cTask => cTask.props.id === doneTask.id);
        
        var tasksDone = this.state.tasksDone;
        tasksDone.splice(taskIndex,1);
  
        var tasks = this.state.tasks;
        task = this.createTask(task.props.id, task.props.title, this.handleCheckboxClick, false)
        tasks.push(task)
        
        this.setState(state => ({
          tasks: tasks,
          tasksDone: tasksDone
        }));
      }
    }
  
    render () {
      return (
        <div>
          <ul className="task-list">
            {this.state.tasks}
          </ul>
          {this.state.tasksDone.length != 0 && <hr className="task-list-divider"/>}
          <ul className="task-list done">
            {this.state.tasksDone}
          </ul>
        </div>
      )
    }
  }