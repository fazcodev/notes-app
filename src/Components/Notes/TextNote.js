import React, { useContext, useEffect } from "react";
import NoteOptions from "./NoteOptions";
import { TextField } from "@mui/material";
import DataContext from "../Helpers/DataContext";
const TextNote = ({bgcolorHandler, insertImageHandler, closeHandler, setMakeNote})=>{

    const ctx = useContext(DataContext)

    const contentChangeHandler = (event)=>{
      ctx.setNewNote((prevNote)=>{
         return {...prevNote, [event.target.name]: event.target.value}
        
      })
    }
      return (
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
            autoFocus
            name="heading"
            className="inline-block w-full px-3 py-2"
            value = {ctx.newNote.heading}
            onChange={ctx.contentChangeHandler}
          />
          <TextField
            placeholder="Take a note..."
            multiline
            fullWidth
            maxRows={4}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            name="text"
            className="inline-block w-full px-3 py-2"
            value = {ctx.newNote.text}
            onChange={ctx.contentChangeHandler}
          />
          <NoteOptions bgcolorHandler = {bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler = {closeHandler} setInputField = {setMakeNote}/>
          
        </>
    )
}

export default TextNote