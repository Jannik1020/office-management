import './App.css';
import React from "react"
import TaskList from "./TodoView"
import AddView from "./AddTodo"

function PageWrapper () {

  var newTitle = ""
  var submitted

  function callbackInput (title){
    console.log(title)
    newTitle = title;
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
