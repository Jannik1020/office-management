import React from "react"
import styles from "./Delete.module.css"

import {VscRemove} from "react-icons/vsc"

import {useDispatch} from "react-redux"

import {removeTask} from "../tasksSlice"

export default function Delete (props) {
  const dispatch = useDispatch()

  function handleClick () {
    console.log("Hello")
    dispatch(removeTask(props.id));
  }

  return (
    <VscRemove onClick={handleClick} className={styles.icDelete} />
  )
} 