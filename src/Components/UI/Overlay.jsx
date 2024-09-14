import React, { useContext, useState} from "react";
import {ref as refDb, update, getDatabase} from 'firebase/database'
import {ref as refStore, uploadBytesResumable, getStorage} from 'firebase/storage'
import AuthContext from '../Authentication/AuthContext'
import DataContext from "../Helpers/DataContext";
import TextNote from "../Notes/TextNote";
import Todo from "../Notes/Todo";
import { useLocation } from "react-router-dom";

const Overlay = () => {
    const { openModal, setOpenModal, setNotesList, setUploadStatus, notesList, setArchiveNotes } = useContext(DataContext);
    const {currentUser} = useContext(AuthContext)
    const db = getDatabase()
    const store = getStorage()
    const currLoc = useLocation().pathname;
    const [localNewNote, setLocalNewNote] = useState(notesList.find((item)=>item.id === openModal))
    const insertImageHandler = (event) => {
        console.log('hello')
        setLocalNewNote((prevNote) => {
          if(prevNote.url)delete prevNote.url;
          let updatedNote = { ...prevNote, image: event.target.files[0] };
          return updatedNote
        });
        
      };
    const bgcolorHandler = (event) => {
    setLocalNewNote((prevNote) => {
        let changedNote = { ...prevNote, bgcolor: event.target.value };
        return changedNote;
    });
    };
    const handleClose = async() => {
        setOpenModal("");
        if(localNewNote.image){
            setLocalNewNote((prevNote)=>{
                prevNote.url = URL.createObjectURL(prevNote.image)
                return prevNote;
            })
            // await uploadBytes(refStore(store, `/users/${currentUser.uid}/${newNote.id}`), newNote.image)
            const uploadTask = uploadBytesResumable(refStore(store, `/users/${currentUser.uid}/${localNewNote.id}`), localNewNote.image);
                uploadTask.on('state_changed', 
                (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadStatus(Math.trunc(progress))
                }, 
                (error) => {
                // Handle unsuccessful uploads
                }, 
                () => {
                    delete localNewNote.image
                }
            );
        }   
        setLocalNewNote((old)=>{
            const updated = old;
            delete updated.image;
            return updated
        })
        if(currLoc === '/Notes'){
            setNotesList((prevList)=>{
                return prevList.map((item)=>{
                    if(item.id !== localNewNote.id)return item;
                    return localNewNote;
                })
            })
            update(refDb(db, `/users/${currentUser.uid}/notes/${localNewNote.id}`), localNewNote)
        }
        else{
           setArchiveNotes((prevList)=>{
                return prevList.map((item)=>{
                    if(item.id !== localNewNote.id)return item;
                    return localNewNote;
                })
            })
            update(refDb(db, `/users/${currentUser.uid}/archive/${localNewNote.id}`), localNewNote)
        }
        
       
        setLocalNewNote({ id: "", bgcolor: "white", heading: "", text: "", todo: { undone: [], done: [] }, isTodo: false })

    }
    return (

        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300 }} onClick={handleClose} className="fixed w-full h-full top-0 left-0 right-0 bottom-0">
            <div style={{ backgroundColor: localNewNote.bgcolor }}
                className="container w-2/3 sm:w-5/12 max-h-96 mx-auto mt-8 mb-8 text-left shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
                <div className="w-full max-h-96 overflow-y-scroll">
                    {(localNewNote.url || localNewNote.image) && <div className="w-full overflow-y-auto max-h-72">
                        <img className="w-full" alt="Uploaded" src={localNewNote.url ? localNewNote.url: URL.createObjectURL(localNewNote.image)}></img>
                    </div>
                    }
                    {localNewNote.isTodo && <Todo classname = '' bgcolorHandler={bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler={handleClose} localNewNote = {localNewNote} setLocalNewNote = {setLocalNewNote}/>}
                    {!localNewNote.isTodo && <TextNote bgcolorHandler={bgcolorHandler} insertImageHandler={insertImageHandler} closeHandler={handleClose} localNewNote = {localNewNote} setLocalNewNote = {setLocalNewNote}/>}
                </div>

            </div>

        </div>
        

    )
}

export default Overlay