import {useSelector, useDispatch} from "react-redux"
import {selectTasks, addSection} from "../tasksSlice"
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

  function Section(props) { //props: section, header, content, collapsed, class
    return (
      <div className={styles.taskSection}>
        <SectionHeader header={props.header} section={props.section} /*onClick={handleCollapse}*/ collapsed={props.collapsed} />
        <ul className={`${styles.taskList}`}>
            {props.content}
        </ul>
      </div>
    )
  }

  export default function TaskView () { 
  
    const dispatch = useDispatch()

    /*const defaultSections = ["completedTasks", "tasks", "importantTasks", "anotherSection"]
    defaultSections.forEach(section => dispatch(addSection(section)))*/

    var taskSections = useSelector(selectTasks)

    const [sections, setSections] = useState({"tasks": true, "completedTasks": true, "importantTasks": true})

    function handleCollapse (section) {
      var sectionsChanged = sections;
      sectionsChanged[section] = !sectionsChanged[section];
      setSections({...sectionsChanged});
    }

    return (
      <div>
        {Object.keys(taskSections).map(sectionName => <Section section={sectionName} header="Section" content={taskSections[sectionName]} collapsed={false} />)}
      </div>
    )

    /*
    return (
      
      <div>
        {(tasks.length === 0 && completedTask.length === 0 && importantTasks.length === 0) && (
          <div className={styles.defaultText}>
            Füge eine Aufgabe hinzu!
            <ImArrowDown className={styles.defaultIcon}></ImArrowDown>
          </div>
        )} 
        <Section section={Object.keys(taskSections)[0]} header="Erledigte Aufgaben" content={taskSections}
        {(tasks.length > 0 || completedTask.length > 0) && <SectionHeader header="Ausstehende Aufgaben" section="tasks" onClick={handleCollapse} collapsed={!sections["tasks"]} />}
        {(tasks.length === 0 && importantTasks.length === 0 &&completedTask.length > 0) && <div className={styles.completedText}>Super! Du hast alle Aufgaben erledigt</div>}
        {sections["tasks"] &&
          <ul className={styles.taskList}>
            {tasks}
          </ul>
        }
        {completedTask.length !== 0 && <hr className={styles.taskListDivider}/>}
        {(completedTask.length > 0) && <SectionHeader header="Erledigte Aufgaben" section="completedTasks" onClick={handleCollapse} collapsed={!sections["completedTasks"]}/>}
        {sections["completedTasks"] &&
          <ul className={`${styles.taskList} ${styles.done}`}>
            {completedTask}
          </ul>
        }
      </div>
    
    )
    */
  }