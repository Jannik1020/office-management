import {createSlice} from "@reduxjs/toolkit";
import {createTask} from "./util"

const initialState = {"completedTasks": [], "tasks": [], "importantTasks": []}; // section: tasks, collapsed, header

export const tasksSlice = createSlice({
  name:"tasks",
  initialState,
  reducers: {
    addSection: (state, action) => { //action.payload: section name
      const sectionName = action.payload
      state[sectionName] = []
    },
    addTask: (state, action) => { // action.payload: title, section
      const title = action.payload[0];
      const section = action.payload[1];

      state[section].unshift(createTask({title: title}));
    },
    removeTask: (state, action) => { //action.payload: id, section
      const id = action.payload[0];
      const section = action.payload[1];

      state[section] = state[section].filter(task => task.props.id !== id)
    },
    moveToSection: (state, action) => { //action.payload: id, sectionFrom, sectionTo
      const id = action.payload[0];
      const sectionFrom = action.payload[1];
      const sectionTo = action.payload[2];

      const taskToMove = state[sectionFrom].filter((task) => task.props.id === id)[0];
      state[sectionFrom] = state[sectionFrom].filter((task) => task.props.id !== id);

      taskToMove.props.section = sectionTo;
      
      console.log(state[sectionTo])
      state[sectionTo].unshift(taskToMove);

    },
    checkTask: (state, action) => { // action.payload: id, checked, section
      const [id, checked, section] = action.payload

      const taskToCheck = state[section].filter((task) => task.props.id === id)[0];
      const indexTaskToCheck = state[section].findIndex((task) => task.props.id === id);

      taskToCheck.props.checked = checked

      state[section][indexTaskToCheck] = taskToCheck
    },
    prioritiseTask: (state, action) => { // action.payload: id, important, section
      const [id, important, section] = action.payload
  
      const importantTask = state[section].filter((task) => task.props.id === id)[0];
      const indexImportantTask = state[section].findIndex((task) => task.props.id === id);
  
      importantTask.props.important = important;
  
      state[section][indexImportantTask] = importantTask;
    }
  }
})

export const {addSection, addTask, removeTask, moveToSection, checkTask, prioritiseTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;