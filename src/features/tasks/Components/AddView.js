import "./AddView.css"
import {BsPlus} from "react-icons/bs"
import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {addTask} from "../tasksSlice"

export default function AddView (props) {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    function handleSubmit () {
        dispatch(addTask([title, "tasks"]));
        setTitle("")
    }

    function handleKeyDown (e) {
        if(e.key === "Enter") {
            handleSubmit();
        }
    }

    function handleInput (e) {
        setTitle(e.target.value);
    }

    return (
        <div className="add-view">
            <div className="add-btn">
                <BsPlus className="ic-add-btn" onClick={handleSubmit}/>
            </div>
            <div className="add-field">
                <input type="input" placeholder="Neue Aufgabe" className="add-field-input" value={title} onKeyPress={handleKeyDown} onChange={handleInput}/*onKeyPress={}*//>
            </div>    
        </div>
    )
}