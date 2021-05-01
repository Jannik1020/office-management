import {useSelector, useDispatch} from "react-redux"
import {selectTasks} from "../tasksSlice"
import styles from "./TaskView.module.css"
import {ImArrowDown} from "react-icons/im"
import {RiArrowDownSLine} from "react-icons/ri"
import { useState } from "react"
  

  function SectionHeader(props) {

    function handleClick (){
      props.onClick()
    }

    return (
      <div className={`${styles.sectionHeader} ${styles[props.section]}`} onClick={handleClick}>
        <div className={styles.icSectionWrapper}>
          {props.collapsed ? <RiArrowDownSLine className={styles.icSection} style={{transform: "rotate(-90deg)"}} /> : <RiArrowDownSLine className={styles.icSection}  />}
        </div>
        <div className={styles.headerTitle}>
          {props.header}
        </div>
      </div>
   )
  }

  function Section(props) { //props: section, header, content, collapsed, class
    
    const [collapsed, setCollapsed] = useState(props.collapsed)

    function handleCollapse () {
      setCollapsed(!collapsed)
    }
    
    return (
      <div className={styles.taskSection}>
        <SectionHeader header={props.header} section={props.section} /*onClick={handleCollapse}*/ onClick={handleCollapse} collapsed={collapsed}/>
        {!collapsed &&
        <ul className={`${styles.taskList}`}>
            {props.content}
        </ul>}
      </div>
    )
  }

  export default function TaskView () { 
    /*const defaultSections = ["completedTasks", "tasks", "importantTasks", "anotherSection"]
    defaultSections.forEach(section => dispatch(addSection(section)))*/

    var taskSections = useSelector(selectTasks) //{tasks, header}

    const [sections, setSections] = useState({"tasks": true, "completedTasks": true, "importantTasks": true})

    function handleCollapse (section) {
      var sectionsChanged = sections;
      sectionsChanged[section] = !sectionsChanged[section];
      setSections({...sectionsChanged});
    }

    // {section: {tasks: [], header:""}}
    // [[section, {tasks: [], header:""}]]

    return (
      <div>
        {(Object.entries(taskSections).filter(section => section[1].tasks.length !== 0).length === 0) ? 
          <div className={styles.defaultText}>
            Füge eine Aufgabe hinzu!
            <ImArrowDown className={styles.defaultIcon}></ImArrowDown>
          </div>:
          <div className={styles.sections}>
            {Object.keys(taskSections).map((sectionName) => taskSections[sectionName].tasks.length > 0 && <Section key={sectionName} section={sectionName} header={taskSections[sectionName].header} content={taskSections[sectionName].tasks} collapsed={false} />)}
          </div>
        }
      </div>
    )

    /*
    return (
      
      <div>
        {(tasks.length === 0 && completedTask.length === 0 && importantTasks.length === 0) && (
          
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