import React from "react"
import styles from "./Delete.module.css"

import {IoRemove} from "react-icons/io5"
import {VscRemove} from "react-icons/vsc"

export default function Delete () {
  return (
    <VscRemove className={styles.icDelete} />
  )
} 