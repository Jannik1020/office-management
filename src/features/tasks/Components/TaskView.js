import {useSelector} from "react-redux"
import {selectTasks, selectCompletedTasks} from "../tasksSlice"
import styles from "./TaskView.module.css"
  
  export default function TaskView () { 
    var tasks = useSelector(selectTasks)
    var completedTask = useSelector(selectCompletedTasks)
    return (
      <div>
        <ul className={styles.taskList}>
          {tasks}
        </ul>
        {completedTask.length !== 0 && <hr className={styles.taskListDivider}/>}
        <ul className={styles.taskList, styles.done}>
          {completedTask}
        </ul>
      </div>
    )  
  }