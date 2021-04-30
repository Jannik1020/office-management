import {nanoid} from "@reduxjs/toolkit";
import Task from "./Components/Task"

export const createTask = (title, checked = false, id=nanoid()) => <Task key={id} id={id} title={title} checked={checked}/>
