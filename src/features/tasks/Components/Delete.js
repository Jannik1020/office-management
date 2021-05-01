import React from "react"
import styles from "./Delete.module.css"

import {IoRemove} from "react-icons/io5"

import {useDispatch} from "react-redux"

import {removeTask} from "../tasksSlice"

export default function Delete (props) {
  const dispatch = useDispatch()

  function handleClick () {
    dispatch(removeTask([props.id, props.section]));
  }

  return (
    <IoRemove onClick={handleClick} className={styles.icDelete} />
  )
} 