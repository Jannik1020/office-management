import {createSlice} from "@reduxjs/toolkit";

const initialState = {tasks: [], completedTasks: []};

export const tasksSlice = createSlice({
  name:"tasks",
  initialState,
  reducers: {
    addTask: (state, action) => { // action.payload: <Task ... />
      state.unshift(action.payload);
    },
    completeTask: (state, action) => { //action.payload: id (checked)
      const id = action.payload;
      const completedTask = state.tasks.filter((task) => task.props.id === id);      
      
      state.tasks = state.tasks.filter((task) => task.props.id !== id);
      state.completedTasks = state.completedTasks.unshift(completedTask) 
    },
    readdTask: (state, action) => { //action.payload: id (unchecked)
      const id = action.payload;
      const completedTask = state.tasks.filter((task) => task.props.id === id);      
      
      state.completedTasks = state.completedTasks.filter((task) => task.props.id !== id);
      state.tasks = state.tasks.push(completedTask) 
    }
  }
})

export const {addTask, completeTask, readdTask} = tasksSlice.actions;
//selector
export default tasksSlice.reducer;