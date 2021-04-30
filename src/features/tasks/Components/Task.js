import React from "react"
import Checkbox from "./Checkbox.js"
import {BiCalendarEvent} from "react-icons/bi"
import {BsBell} from "react-icons/bs"
import styles from "./Task.module.css"

export default function Task(props) {  
    return (
      <li className={styles.task}>
        <div className={styles.checkboxWrapper}>
          <Checkbox id={props.id} checked={props.checked}/>
        </div>
        <div className={styles.taskDesc}>
          <div className={styles.taskTitle}>
            <p className={styles.text}>
              {props.title}
            </p>
          </div>
          <div className={styles.taskExtras}>
            <BsBell className={`${styles.icExtra} ${styles.icBell}`}/>
            <BiCalendarEvent className={`${styles.icExtra} ${styles.icCalendar}`}/>
            bis 07.02.23
          </div>
        </div>
      </li>
    )
  }