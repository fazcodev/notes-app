import React, { useContext} from "react";
import NoteOptions from "./NoteOptions";
import { TextField } from "@mui/material";
import DataContext from "../Helpers/DataContext";
const TextNote = ({bgcolorHandler, insertImageHandler, closeHandler, setMakeNote, cardNote, setLocalNewNote, localNewNote})=>{

    const contentChangeHandler = (event) => {
      setLocalNewNote((prevNote) => {
        let changedNote = {
          ...prevNote,
          [event.target.name]: event.target.value,
        };
        return changedNote;
      });
    };
      return (
        <>
         <TextField
            placeholder="Title"
            spellCheck = {false}
            multiline
            maxRows={4}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            autoFocus = {!cardNote}
            name="heading"
            className="inline-block w-full px-3 py-2"
            value = {!cardNote ? localNewNote.heading : cardNote.heading}
            onChange={contentChangeHandler}
          />
          <TextField
            placeholder="Take a note..."
            spellCheck = {false}
            multiline
            fullWidth
            maxRows={4}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            name="text"
            className="inline-block w-full px-3 py-2"
            value = {!cardNote ? localNewNote.text : cardNote.text}
            onChange={contentChangeHandler}
          />
          {!cardNote && <NoteOptions bgcolorHandler = {bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler = {closeHandler} setInputField = {setMakeNote}/>}
          
        </>
    )
}

export default TextNote