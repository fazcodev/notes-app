import React, { useState, useContext } from "react";
import {ref as refDb, set, getDatabase} from 'firebase/database'
import {ref as refStore, uploadBytesResumable, getStorage } from "firebase/storage";
import { v4 as uuid } from "uuid";
import "./InputNotes.css";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import {
  AddPhotoAlternateOutlined,
  BrushOutlined,
  PlaylistAddCheckOutlined,

} from "@mui/icons-material";
import DataContext from "../Helpers/DataContext";
import AuthContext from "../Authentication/AuthContext"
import Todo from "./Todo"
import TextNote from "./TextNote";


const InputNotes = () => {
  const ctx = useContext(DataContext);
  const {currentUser} = useContext(AuthContext)
  const [localNewNote, setLocalNewNote] = useState({
        id: "",
        bgcolor: "white",
        heading: "",
        text: "",
        todo: {undone: [], done: []},
        isTodo: false
    })
  const [makeNote, setMakeNote] = useState(false);
  const [makeList, setMakeList] = useState(false);
  const [bgcolor, setBgcolor] = useState("");
  const db = getDatabase()
  const store = getStorage()
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


  const bgcolorHandler = (event) => {
    ctx.setNewNote((prevNote) => {
      let changedNote = { ...prevNote, bgcolor: event.target.value };
      return changedNote;
    });
    setBgcolor(`${event.target.value}`);
  };
  const writeToDb = async(id, note)=>{
    ctx.setNotesList((prevList)=>[note, ...prevList]);
    if(note.image){
  
          const uploadTask = uploadBytesResumable(refStore(store, `/users/${currentUser.uid}/${id}`), note.image);
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              ctx.setUploadStatus(Math.trunc(progress))
            }, 
            (error) => {
              // Handle unsuccessful uploads
            }, 
            () => {
              delete note.image
            }
          );
    }
    set(refDb(db, '/users/'+`${currentUser.uid}/notes/${note.id}`), note)
    
  }
  const closeNoteHandler = () => {
    if (ctx.newNote.image || ctx.newNote.heading !== "" || ctx.newNote.text !== "" || ctx.newNote.isTodo) {
      ctx.setNewNote((prevNote) => {
        if(prevNote.image)prevNote.url = URL.createObjectURL(prevNote.image)
        prevNote.id = uuid();
        prevNote.timestamp = Math.floor(Date.now())/1000
        return prevNote; 
      });
      writeToDb(ctx.newNote.id, ctx.newNote);
      console.log(ctx.newNote)
      ctx.setNewNote({ id: "", bgcolor: "white", heading: "", text: "" , todo: {undone: [], done: []}, isTodo: false});
      
    }
    setBgcolor('white')
    setMakeList(false)
    setMakeNote(false);
  };
  const insertImageHandler = (event) => {
    ctx.setNewNote((prevNote) => {
      let updatedNote = { ...prevNote, image: event.target.files[0] };
      return updatedNote
    });
    if(!makeList)setMakeNote(true);
    
  };
  

  

  return (
    <>
      <ClickAwayListener onClickAway={(makeList || makeNote)&&!ctx.dragActive ? closeNoteHandler: ()=>{}}>
        <div
          style={{ backgroundColor: bgcolor }}
          className="container w-5/12 mx-auto mt-8 text-left shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl overflow-hidden"
        >
          {!makeNote && !makeList && (
            <div className="flex justify-between cursor-text p-1">
              <h4 className="mt-2 ml-2 w-full" onClick={()=>setMakeNote(true)}>
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
          {ctx.openModal.length === 0 && ctx.newNote.image && (
            <div className="w-full overflow-y-auto max-h-72">
              <img className="w-full" alt="Uploaded" src={URL.createObjectURL(ctx.newNote.image)}></img>
            </div>
          )}
          {makeList && (<Todo bgcolorHandler = {bgcolorHandler} insertImageHandler = {insertImageHandler} setMakeList = {setMakeList} closeHandler = {closeNoteHandler}/> )}
          {makeNote && <TextNote bgcolorHandler = {bgcolorHandler} insertImageHandler = {insertImageHandler} setMakeNote = {setMakeNote} closeHandler = {closeNoteHandler}/>}
        </div>
      </ClickAwayListener>
      {ctx.uploadStatus < 100 && <div className="w-5/12 mx-auto mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
        <div className="bg-blue-300 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${ctx.uploadStatus}%`}}>{ctx.uploadStatus}%</div>
        </div>
      }
    </>
  );
};

export default React.memo(InputNotes);
