import "./AddTodo.css"
import {BsPlus} from "react-icons/bs"
import React from "react"

class AddText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            callback: this.props.callback
        };


    }

    handleChange (e){
        this.setState({
            value: e.target.value
        });
    }

    taskAdded (title){
        this.state.callback(title)
    }

    render () {    
        return (
            <div className="add-field">
                <input type="input" onChange={this.handleChange.bind(this)} placeholder="Neue Aufgabe" className="add-field-input"/>
            </div>
        )
    }
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