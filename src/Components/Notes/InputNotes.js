import React, { useState, useContext, useEffect } from "react";

import { v4 as uuid } from "uuid";
import "./InputNotes.css";
import { TextField } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import {
  AddPhotoAlternateOutlined,
  BrushOutlined,
  PlaylistAddCheckOutlined,
  ColorLensOutlined,
  ArchiveOutlined,
  UndoRounded,
  RedoRounded,
} from "@mui/icons-material";
import DataContext from "../Helpers/DataContext";
import Todo from "./Todo"
import NotesList from "./NotesList";
import TextNote from "./TextNote";


const InputNotes = () => {
  const ctx = useContext(DataContext);
  const [makeNote, setMakeNote] = useState(false);
  const [makeList, setMakeList] = useState(false);
  const [bgcolor, setBgcolor] = useState("");
  const extraOptions = [
    {
      id: 1,
      name: "AddList",
      icon: <PlaylistAddCheckOutlined className="cursor-pointer" onClick={()=>setMakeList(true)}/>,
    },
    { id: 2, name: "Draw", icon: <BrushOutlined className="cursor-pointer" /> },
    {
      id: 3,
      name: "Image",
      icon: <AddPhotoAlternateOutlined className="cursor-pointer" />,
    },
  ];
  const noteItemList = [
    {
      id: 1,
      name: "bgcolor",
      icon: <ColorLensOutlined className="cursor-pointer" />,
    },
    { id: 2, name: "archive", icon: <ArchiveOutlined /> },
    {
      id: 3,
      name: "Image",
      icon: <AddPhotoAlternateOutlined className="cursor-pointer" />,
    },
    { id: 4, name: "undo", icon: <UndoRounded className="cursor-pointer" /> },
    { id: 5, name: "redo", icon: <RedoRounded className="cursor-pointer" /> },
  ];

  const bgcolorHandler = (event) => {
    ctx.setNewNote((prevNote) => {
      let changedNote = { ...prevNote, bgcolor: event.target.value };
      return changedNote;
    });
    setBgcolor(`${event.target.value}`);
  };
  const makeNoteHandler = () => {
    setMakeNote(true);
  };
  const closeNoteHandler = () => {
    if (ctx.newNote.url != "" || ctx.newNote.heading != "" || ctx.newNote.text != "" || ctx.newNote.todo.undone.length !== 0 || ctx.newNote.todo.done.length !== 0) {
      ctx.setNewNote((prevNote) => {
        prevNote.id = uuid();
        return prevNote; 
      });
      ctx.setNotesList((prevList) => [ctx.newNote, ...prevList]);
      ctx.setNewNote({ id: "", bgcolor: "white", url: "", heading: "", text: "" , todo: {undone: [], done: []}, isTodo: false});
    }
    setBgcolor('white')
    setMakeList(false)
    setMakeNote(false);
  };
  const insertImageHandler = (event) => {
    ctx.setNewNote((prevNote) => {
      let updatedNote = { ...prevNote, url: URL.createObjectURL(event.target.files[0]) };
      return updatedNote
    });
    if(!makeList)setMakeNote(true);
    
  };
  

  

  return (
    <>
      <ClickAwayListener onClickAway={(makeList || makeNote) ? closeNoteHandler: ()=>{}}>
        <div
          style={{ backgroundColor: bgcolor }}
          className="container w-5/12 mx-auto mt-8 text-left shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl overflow-hidden"
        >
          {!makeNote && !makeList && (
            <div className="flex justify-between cursor-text p-1">
              <h4 className="mt-2 ml-2 w-full" onClick={makeNoteHandler}>
                Take a note...
              </h4>
              <ul className="flex mr-1">
                {extraOptions.map(
                  (item) =>
                    item.name !== "Image" && (
                      <li
                        key={item.id}
                        className="ml-3 px-2 py-1.5 rounded-full hover:bg-sky-500/50"
                      >
                        {item.icon}
                      </li>
                    )
                )}
                <li
                  key="3"
                  className="ml-3 px-2 py-1.5 rounded-full hover:bg-sky-500/50"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    className="hidden"
                    onChange={insertImageHandler}
                  />
                  <label htmlFor="file">
                    <AddPhotoAlternateOutlined className="cursor-pointer" />
                  </label>
                </li>
              </ul>
            </div>
          )}
          {ctx.openModal.length === 0 && ctx.newNote.url !== "" && (
            <div className="w-full overflow-y-auto max-h-72">
              <img className="w-full" alt="Uploaded" src={ctx.newNote.url}></img>
            </div>
          )}
          {makeList && (<Todo bgcolorHandler = {bgcolorHandler} insertImageHandler = {insertImageHandler} setMakeList = {setMakeList} closeNoteHandler = {closeNoteHandler}/> )}
          {makeNote && <TextNote bgcolorHandler = {bgcolorHandler} insertImageHandler = {insertImageHandler} setMakeNote = {setMakeNote} closeNoteHandler = {closeNoteHandler}/>}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default InputNotes;
