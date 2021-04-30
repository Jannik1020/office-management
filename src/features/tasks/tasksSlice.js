import {createSlice} from "@reduxjs/toolkit";
import {createTask} from "./util"

const initialState = {tasks: ["Brötchen backen", "Brötchen verkaufen", "Geld aus der Kasse nehmen", "Feierabend"].map((task) => createTask(task)), completedTasks: []};

export const tasksSlice = createSlice({
  name:"tasks",
  initialState,
  reducers: {
    addTask: (state, action) => { // action.payload: title
      const title = action.payload.title;
      state.tasks.unshift(createTask(title));
    },
    completeTask: (state, action) => { //action.payload: id (checked)
      const id = action.payload;
      const completedTask = state.tasks.filter((task) => task.props.id === id)[0]
      
      state.tasks = state.tasks.filter((task) => task.props.id !== id);
      state.completedTasks.unshift(createTask(completedTask.props.title, true, completedTask.props.id)) 
    },
    readdTask: (state, action) => { //action.payload: id (unchecked)
      const id = action.payload;
      const readdTask = state.completedTasks.filter((task) => task.props.id === id)[0];      
      
      state.completedTasks = state.completedTasks.filter((task) => task.props.id !== id);
      state.tasks.push(createTask(readdTask.props.title, false, readdTask.props.id)) 
    }
  }
})

export const {addTask, completeTask, readdTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks
export const selectCompletedTasks = (state) => state.tasks.completedTasks
export default tasksSlice.reducer;