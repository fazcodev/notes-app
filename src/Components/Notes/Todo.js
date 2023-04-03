import React, { useState, useContext, useEffect} from "react";
import { TextField } from "@mui/material";
import { AddOutlined, KeyboardArrowRightOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material";
import { v4 } from "uuid";
import UndoneList from "../UI/UndoneList";
import DoneList from "../UI/DoneList"
import NoteOptions from "./NoteOptions";
import DataContext from "../Helpers/DataContext";

const Todo = ({bgcolorHandler, insertImageHandler, setMakeList, closeHandler})=>{
    
    const ctx = useContext(DataContext)
    let overlay = Object.keys(ctx.openModal).length !== 0 ? true: false
    const [todoList, setTodoList] = useState(overlay ? ctx.newNote.todo: {done: [], undone: []});
    const [checked, setChecked] = useState([]);
    const [openDrop, setOpenDrop] = useState(false)
    const contentChangeHandler = (event)=>{
        
        ctx.setNewNote((prevNote)=>{
            let updatedNote = {...prevNote, heading: event.target.value, isTodo: true}
            return updatedNote
        })
        
    }
    useEffect(()=>{
        ctx.setNewNote((prevNote)=>{
            let updatedNote = {...prevNote, todo: todoList, isTodo: true};
            return updatedNote
        })
    }, [todoList])
    
    
    const addItemHandler = (event)=>{
        setTodoList((prevList)=>{
            let updatedList = {...prevList, undone: [...prevList.undone, {id: v4(), text: event.target.value}]};
            return updatedList;
        })
        event.target.value = "";
    }
    const handleToggle = ()=>{
        setOpenDrop((prev)=>!prev);
    }
    return(
        <>
            <TextField
                
                placeholder="Title"
                multiline
                maxRows={4}
                fullWidth
                variant="standard"
                InputProps={{
                disableUnderline: true,
                }}
                name="heading"
                value = {ctx.newNote.heading}
                className="inline-block w-full px-3 py-2"
                onChange={contentChangeHandler}
            />
            {todoList.undone.length !== 0 && <UndoneList todo = {todoList} setTodo = {setTodoList} checked={checked} setChecked={setChecked}/>}
            <div className="flex justify-between px-4 py-1 border mb-3">
                <AddOutlined className="text-lg relative top-1 left-3.5 text-gray-500"/>
                <input type = 'text' placeholder="List item" value = "" className="ml-8 p-0 w-full" onChange={addItemHandler}/>
            </div>
            {todoList.done.length !==0 &&
                <div className="my-3">
                    <div className="px-4 py-1">
                        <button onClick={handleToggle} className="relative left-3">{(!openDrop && <KeyboardArrowRightOutlined/>) || <KeyboardArrowDownOutlined/>}</button>
                        <h4 className="inline-block ml-6">{`${todoList.done.length} Completed Items`}</h4>
                    </div>
                    
                    {openDrop && <DoneList todo = {todoList} setTodo = {setTodoList} checked = {checked} setChecked={setChecked}/>}
                </div>
            }
            <NoteOptions bgcolorHandler = {bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler = {closeHandler} setInputField = {setMakeList} note = {ctx.newNote}/>
        </>
    )
}

export default Todo