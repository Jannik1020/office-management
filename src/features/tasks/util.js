import {nanoid} from "@reduxjs/toolkit";
import Task from "./Components/Task"

export const createTask = ({title,  id=nanoid(), checked=false, important=false, section="tasks"}) => <Task key={id} id={id} title={title} checked={checked} important={important} section={section}/>