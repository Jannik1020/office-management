import {useSelector} from "react-redux"
import {selectTasks, selectCompletedTasks} from "../tasksSlice"
import styles from "./TaskView.module.css"
  
  export default function TaskView () { 
    var tasks = useSelector(selectTasks)
    var completedTask = useSelector(selectCompletedTasks)
    return (
      <div>
        {(tasks.length === 0 && completedTask.length === 0) && <div className={styles.defaultText}>Füge eine Aufgabe hinzu!</div>}        
        {(tasks.length === 0 && completedTask.length > 0) && <div className={styles.completedText}>Super! Du hast alle Aufgaben erledigt</div>}
        <ul className={styles.taskList}>
          {tasks}
        </ul>
        {completedTask.length !== 0 && <hr className={styles.taskListDivider}/>}
        <ul className={`${styles.taskList} ${styles.done}`}>
          {completedTask}
        </ul>
      </div>
    )  
  }