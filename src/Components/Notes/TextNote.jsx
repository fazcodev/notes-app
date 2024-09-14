import React, { useContext } from "react";
import NoteOptions from "./NoteOptions";
import { TextField } from "@mui/material";



const TextNote = ({
  bgcolorHandler,
  insertImageHandler,
  closeHandler,
  setMakeNote,
  cardNote,
  setLocalNewNote,
  localNewNote,
}) => {
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
      {(!cardNote || cardNote.heading)&& <TextField
        sx={{ padding: 1 }}
        placeholder="Title"
        spellCheck={false}
        multiline
        maxRows={4}
        fullWidth
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true, // Disable underline
            style: { fontFamily: "Poppins", fontWeight: 'bolder', textAlign: 'center' }, // Set font-family here
          },
        }}
        autoFocus={cardNote || localNewNote ? false : true}
        name="heading"
        value={!cardNote ? localNewNote.heading : cardNote.heading}
        onChange={contentChangeHandler}
      />}

      <TextField
        sx={{ padding: 1 }}
        placeholder="Take a note..."
        spellCheck={false}
        multiline
        fullWidth
        maxRows={4}
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true, // Disable underline
            style: { fontFamily: "Poppins"}, // Set font-family here
          },
        }}
        name="text"
        value={!cardNote ? localNewNote.text : cardNote.text}
        onChange={contentChangeHandler}
      />
      {!cardNote && (
        <NoteOptions
          bgcolorHandler={bgcolorHandler}
          insertImageHandler={insertImageHandler}
          closeHandler={closeHandler}
          setInputField={setMakeNote}
        />
      )}
    </>
  );
};

export default TextNote;
