import React, {useState, useRef, useEffect} from "react";
import {GiCheckMark} from "react-icons/gi"
import {useDispatch} from "react-redux"
import {completeTask, readdTask} from "../tasksSlice"
import styles from "./Checkbox.module.css"

export default function Checkbox (props) {
    
  const firstRender = useRef(true);
  const dispatch = useDispatch();
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
       if(checked) {
         dispatch(completeTask(props.id));
       }
       else{
         dispatch(readdTask(props.id));
       }
    }
  }, [checked])

  useEffect (() => {
    firstRender.current = false
  }, [])

  var clrIcon = checked ? "#fff" : "#4caf50";
  var clrBackground = checked ? "#4caf50" : "#fff";
  var visIcon = checked || hovering ? "visible" : "hidden";

  return (
    <div className={styles.checkbox} onClick={handleClick} style={{backgroundColor: clrBackground}} onMouseEnter={initHover} onMouseLeave={endHover}>
      <GiCheckMark className={styles.icCheckbox} style={{color: clrIcon, visibility: visIcon, "&:hover": "visible"}}/>
    </div>
  )    
} 