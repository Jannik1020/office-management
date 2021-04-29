import "./AddTodo.css"
import {BsPlus} from "react-icons/bs"
import React, {useState} from "react"

function AddText (props) {

    const [value, setValue] = useState(""); 
    const callbackText = props.callbackText;
    const callbackSubmit = props.callbackSubmit

    function handleChange (e){
        setValue(e.target.value);        
        callbackText(e.target.value)
    }

    function handleKeyPress (e) {
        if(e.key === "Enter") {
            callbackSubmit()
        }
    }

    return (
        <div className="add-field">
            <input type="input" value={value} onChange={handleChange} placeholder="Neue Aufgabe" className="add-field-input" onKeyPress={handleKeyPress}/>
        </div>
    )
}

function AddButton (props){

    function handleClick() {
        props.callback()
    }

    return (
        <div className="add-btn">
            <BsPlus onClick={handleClick} className="ic-add-btn"/>
        </div>
    )
}

export default function AddView (props) {
    const [taskTitle, setTaskTitle] = useState("")

    function taskSubmitted () {
        if(taskTitle !== ""){
            props.callbackInput(taskTitle)
        }
    }

    function taskAdded (title) {
        setTaskTitle(title)
    }

    return (
        <div className="add-view">
            <AddButton callback={taskSubmitted}/>
            <AddText callbackText={taskAdded} callbackSubmit={taskSubmitted}/>
        </div>
    )
}