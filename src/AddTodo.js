import "./AddTodo.css"
import {BsPlus} from "react-icons/bs"
/*import React, {useState} from "react"*/

export default function AddView (props) {
    /*const [taskTitle, setTaskTitle] = useState("")

    function taskSubmitted () {
        if(taskTitle !== ""){
            props.callbackInput(taskTitle)
        }
    }

    function taskAdded (title) {
        setTaskTitle(title)
    }*/

    return (
        <div className="add-view">
            <div className="add-btn">
                <BsPlus className="ic-add-btn"/>
            </div>
            <div className="add-field">
                <input type="input" placeholder="Neue Aufgabe" className="add-field-input" /*onKeyPress={}*//>
            </div>    
        </div>
    )
}