import React, { useContext, useEffect } from "react";
import NoteOptions from "./NoteOptions";
import { TextField } from "@mui/material";
import DataContext from "../Helpers/DataContext";
const TextNote = ({note, bgcolorHandler, insertImageHandler, closeHandler, setMakeNote})=>{

    const ctx = useContext(DataContext)
    let overlay = Object.keys(ctx.openModal).length !== 0 ? true: false;
    useEffect(()=>{
      if(overlay)ctx.setNewNote(ctx.openModal.note)
    }, [ctx.openModal.note])
    const contentChangeHandler = (event)=>{
      ctx.setOpenModal((prevModal)=>{
         return {...prevModal, note:{...prevModal.note, [event.target.name]: event.target.value}}
        
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
            value = {overlay ? ctx.openModal.note.heading : ctx.newNote.heading}
            onChange={overlay ? contentChangeHandler : ctx.contentChangeHandler}
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
            value = {overlay ? ctx.openModal.note.text : ctx.newNote.text}
            onChange={overlay ? contentChangeHandler :ctx.contentChangeHandler}
          />
          <NoteOptions bgcolorHandler = {bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler = {closeHandler} setInputField = {setMakeNote}/>
          
        </>
    )
}

export default TextNote