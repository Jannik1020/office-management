import React, { useEffect, useState, useRef } from "react"
import styles from "./Important.module.css"

import {useDispatch} from "react-redux"

import {dePrioritizeTask, prioritizeTask} from "../tasksSlice"

export default function Delete (props) {

  const firstRender = useRef(true);
  const [important, setImportant] = useState(props.important);

  const dispatch = useDispatch()

  function handleClick () {
    setImportant(!important)
  }

  useEffect(() => {
    if(!firstRender.current){
      if(important) {      
        dispatch(prioritizeTask(props.id));
      }
      else {
        dispatch(dePrioritizeTask(props.id))
      }
    }
  }, [important, dispatch, props.id])

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