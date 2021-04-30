import {useSelector} from "react-redux"
import {selectTasks, selectCompletedTasks} from "../tasksSlice"
import styles from "./TaskView.module.css"
import {ImArrowDown} from "react-icons/im"
import {RiArrowDownSLine} from "react-icons/ri"
import { useState } from "react"
  

  function SectionHeader(props) {

    const [collapsed, setCollapsed] = useState(props.collapsed)

    function handleClick (){
      setCollapsed(!collapsed);
      props.onClick(props.section)
    }

    return (
      <div className={`${styles.sectionHeader} ${styles[props.section]}`} onClick={handleClick}>
        <div className={styles.icSectionWrapper}>
          {collapsed ? <RiArrowDownSLine className={styles.icSection} style={{transform: "rotate(-90deg)"}} /> : <RiArrowDownSLine className={styles.icSection}  />}
        </div>
        <div className={styles.headerTitle}>
          {props.header}
        </div>
      </div>
   )
  }


  export default function TaskView () { 
    var tasks = useSelector(selectTasks)
    var completedTask = useSelector(selectCompletedTasks)

    const [sections, setSections] = useState({"tasks": true, "completedTasks": true})

    function handleCollapse (section) {
      var sectionsChanged = sections;
      sectionsChanged[section] = !sectionsChanged[section];
      setSections({...sectionsChanged});
    }

    return (
      <div>
        {(tasks.length === 0 && completedTask.length === 0) && (
          <div className={styles.defaultText}>
            Füge eine Aufgabe hinzu!
            <ImArrowDown className={styles.defaultIcon}></ImArrowDown>
          </div>
        )}        
        {(tasks.length > 0 || completedTask.length > 0) && <SectionHeader header="Ausstehende Aufgaben" section="tasks" onClick={handleCollapse} collapsed={!sections["tasks"]} />}
        {(tasks.length === 0 && completedTask.length > 0) && <div className={styles.completedText}>Super! Du hast alle Aufgaben erledigt</div>}
        {sections["tasks"] &&
          <ul className={styles.taskList}>
            {tasks}
          </ul>
        }
        {/*completedTask.length !== 0 && <hr className={styles.taskListDivider}/>*/}
        {(completedTask.length > 0) && <SectionHeader header="Erledigte Aufgaben" section="completedTasks" onClick={handleCollapse} collapsed={!sections["completedTasks"]}/>}
        {sections["completedTasks"] &&
          <ul className={`${styles.taskList} ${styles.done}`}>
            {completedTask}
          </ul>
        }
      </div>
    )  
  }