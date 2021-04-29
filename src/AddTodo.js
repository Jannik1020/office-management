import "./AddTodo.css"
import {BsPlus} from "react-icons/bs"
import React, {useState, useEffect} from "react"

function AddText (props) {

    const [value, setValue] = useState(""); 
    const callback = props.callback;

    function handleChange (e){
        setValue(e.target.value);
    }

    function taskAdded (title){
        callback(title)
    }

    return (
        <div className="add-field">
            <input type="input" onChange={handleChange} placeholder="Neue Aufgabe" className="add-field-input"/>
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

    function btnClicked () {
        submitted= true
    }

    function taskAdded (title) {
        props.callbackInput(title)
    }

    return (
        <div className="add-view">
            <AddButton callback={btnClicked}/>
            <AddText callback={taskAdded}/>
        </div>
    )
}