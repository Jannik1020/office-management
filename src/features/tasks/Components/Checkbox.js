import React, {useState, useRef, useEffect} from "react";
import {GiCheckMark} from "react-icons/gi"
import {useDispatch} from "react-redux"
import {moveToSection, checkTask} from "../tasksSlice"
import styles from "./Checkbox.module.css"

export default function Checkbox (props) { //checked, id, section
    
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
    dispatch(checkTask([props.id, !checked, props.section]));
  }

  useEffect (() => {      
    if(!firstRender.current){
       if(checked) {
         dispatch(moveToSection([props.id, props.section, "completedTasks"]));
       }
       else{
         dispatch(moveToSection([props.id, props.section, "tasks"]));
       }
    }
  }, [checked, props.id, props.section, dispatch])

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