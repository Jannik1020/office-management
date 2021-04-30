import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const tasksSlice = createSlice({
  name:"tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    completeTask: (state, action) => {
      
    },
    readdTask: (state, action) => {

    }
  }
})

export const {addTask, completeTask, readdTask} = tasksSlice.actions;
//selector
export default tasksSlice.reducer;