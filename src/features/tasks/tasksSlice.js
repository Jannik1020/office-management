import {createSlice} from "@reduxjs/toolkit";
import {createTask} from "./util"

const initialState = {tasks: [], completedTasks: [], importantTasks: []};

export const tasksSlice = createSlice({
  name:"tasks",
  initialState,
  reducers: {
    addTask: (state, action) => { // action.payload: title
      const title = action.payload;
      state.tasks.unshift(createTask(title));
    },
    removeTask: (state, action) => { //action.payload: id
      const id = action.payload;
      const completed = state.completedTasks.filter(task => task.props.id === id)

      if(completed.length !== 0) {
        state.completedTasks = state.completedTasks.filter(task => task.props.id !== id)
      }
     state.tasks = state.tasks.filter(task => task.props.id !== id)
    },
    completeTask: (state, action) => { //action.payload: id (checked)
      const id = action.payload;
      var completedTask = state.tasks.filter((task) => task.props.id === id)[0]
      if(completedTask === undefined){
        completedTask = state.importantTasks.filter((task) => task.props.id === id)[0]
        state.importantTasks = state.importantTasks.filter((task) => task.props.id !== id);
      }
      else {
        state.tasks = state.tasks.filter((task) => task.props.id !== id);
      }
      state.completedTasks.unshift(createTask(completedTask.props.title, completedTask.props.id, true)) 
    },
    readdTask: (state, action) => { //action.payload: id (unchecked)
      const id = action.payload;
      const readdTask = state.completedTasks.filter((task) => task.props.id === id)[0];      
      
      state.completedTasks = state.completedTasks.filter((task) => task.props.id !== id);
      state.tasks.push(createTask(readdTask.props.title, readdTask.props.id, false)) 
    },
    prioritizeTask: (state, action) => {
      const id = action.payload;
      const importantTask = state.tasks.filter((task) => task.props.id === id)[0]

      state.tasks = state.tasks.filter((task) => task.props.id !== id);
      state.importantTasks.unshift(createTask(importantTask.props.title, importantTask.props.id, false, true)) 
    },
    dePrioritizeTask: (state, action) => {
      const id = action.payload;
      const task = state.importantTasks.filter((task) => task.props.id === id)[0]

      state.importantTasks = state.importantTasks.filter((task) => task.props.id !== id);
      state.tasks.push(createTask(task.props.title, task.props.id, false, false)) 
    }
  }
})

export const {addTask, removeTask, completeTask, readdTask, prioritizeTask, dePrioritizeTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks
export const selectCompletedTasks = (state) => state.tasks.completedTasks
export const selectImportantTasks = (state) => state.tasks.importantTasks
export default tasksSlice.reducer;