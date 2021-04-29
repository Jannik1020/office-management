import "./AddTodo.css"
import {BsPlus} from "react-icons/bs"
import React, {useState, useEffect} from "react"
import { GiConsoleController } from "react-icons/gi";

function AddText (props) {

    const [value, setValue] = useState(""); 
    const callbackText = props.callbackText;
    const callbackSubmit = props.callbackSubmit

    function handleChange (e){
        setValue(e.target.value);
    }

    function taskAdded (title){
        callbackText(title)
    }

    function handleKeyPress (e) {
        if(e.key === "Enter") {
            callbackSubmit()
        }
    }

    return (
        <div className="add-field">
            <input type="input" onChange={handleChange} placeholder="Neue Aufgabe" className="add-field-input" onKeyPress={handleKeyPress}/>
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
    var submitted = false;

    function taskSubmitted () {
        submitted= true
    }

    function taskAdded (title) {
        props.callbackInput(title)
    }

    return (
        <div className="add-view">
            <AddButton callback={taskSubmitted}/>
            <AddText callbackText={taskAdded} callbackSubmit={taskSubmitted}/>
        </div>
    )
}