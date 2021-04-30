import './App.css';
import React from "react"
import TaskView from "./features/tasks/Components/TaskView"
import AddView from "./AddTodo"

function PageWrapper () {

  function callbackInput (title){
    console.log(title)
  }

  return (
    <div className="page-wrapper">
      <TaskView/>
      <AddView callbackInput={callbackInput}/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <PageWrapper />
    </div>);
}

export default App;
