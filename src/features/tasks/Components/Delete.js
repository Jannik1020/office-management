import React from "react"
import styles from "./Delete.module.css"

import {IoRemove} from "react-icons/io5"

import {useDispatch} from "react-redux"

import {removeTask} from "../tasksSlice"

export default function Delete (props) {
  const dispatch = useDispatch()

  function handleClick () {
    console.log("Hello")
    dispatch(removeTask(props.id));
  }

  return (
    <IoRemove onClick={handleClick} className={styles.icDelete} />
  )
} 