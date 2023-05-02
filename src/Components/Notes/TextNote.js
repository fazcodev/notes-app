import React, { useContext} from "react";
import NoteOptions from "./NoteOptions";
import { TextField } from "@mui/material";
import DataContext from "../Helpers/DataContext";
const TextNote = ({bgcolorHandler, insertImageHandler, closeHandler, setMakeNote, cardNote})=>{

    const ctx = useContext(DataContext)
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
            autoFocus = {!cardNote}
            name="heading"
            className="inline-block w-full px-3 py-2"
            value = {!cardNote ? ctx.newNote.heading : cardNote.heading}
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
            value = {!cardNote ? ctx.newNote.text : cardNote.text}
            onChange={ctx.contentChangeHandler}
          />
          {!cardNote && <NoteOptions bgcolorHandler = {bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler = {closeHandler} setInputField = {setMakeNote}/>}
          
        </>
    )
}

export default TextNote