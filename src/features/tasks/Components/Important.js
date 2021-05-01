import React, { useEffect, useState, useRef } from "react"
import styles from "./Important.module.css"

import {useDispatch} from "react-redux"

import {moveToSection, prioritiseTask} from "../tasksSlice"

export default function Delete (props) {

  const firstRender = useRef(true);
  const [important, setImportant] = useState(props.important);

  const dispatch = useDispatch()

  function handleClick () {
    setImportant(!important)
    dispatch(prioritiseTask([props.id, !important, props.section]))
  }

  useEffect(() => {
    if(!firstRender.current){
      if(important) {      
        dispatch(moveToSection([props.id, props.section, "importantTasks"]));
      }
      else {
        dispatch(moveToSection([props.id, props.section, "tasks"]))
      }
    }
  }, [important, props.section, dispatch, props.id])

  useEffect (() => {
    firstRender.current = false
  }, [])

  var color = (important ? "red" : "#999")

  return (
    <div className={styles.icImportant} onClick={handleClick} style={{color: color}}>
      !
    </div>
  )
} 