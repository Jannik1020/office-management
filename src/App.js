import './App.css';
import React from "react"
import TaskList from "./TodoView"
import AddView from "./AddTodo"

function PageWrapper () {

  function callbackInput (title){
    console.log(title)
  }

  return (
    <div className="page-wrapper">
      <TaskList/>
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
