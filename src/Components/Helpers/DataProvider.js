import React, { useState, useEffect, useContext} from 'react'
import DataContext from './DataContext'
import { auth } from '../../firebase'
import {remove, ref, set, getDatabase} from 'firebase/database'
import AuthContext from '../Authentication/AuthContext'
const DataProvider = (props)=>{
    const db = getDatabase()
    const {fetchedNotes} = useContext(AuthContext)
    const [notesList, setNotesList] = useState([])
    const [archiveNotes, setArchiveNotes] = useState([])
    const [deletedNotes, setDeletedNotes] = useState([])
    const [alertList, setAlertList] = useState([])
    const [openModal, setOpenModal] = useState("");
    const [newNote, setNewNote] = useState({
        id: "",
        bgcolor: "white",
        heading: "",
        text: "",
        todo: {undone: [], done: []},
        isTodo: false
    })
    useEffect(()=>{
        setNotesList(()=>{
            fetchedNotes.notes.sort((a, b)=>b.timestamp-a.timestamp)
            return fetchedNotes.notes
        });
        setArchiveNotes(()=>{
            fetchedNotes.archivedNotes.sort((a, b)=>b.timestamp-a.timestamp)
            return fetchedNotes.archivedNotes
        });
        setDeletedNotes(()=>{
            fetchedNotes.deletedNotes.sort((a, b)=>b.timestamp-a.timestamp)
            return fetchedNotes.deletedNotes
        });
    }, [fetchedNotes])
    // console.log(notesList)
    const archiveNoteHandler = async(note)=>{
        remove(ref(db, `/users/${auth.currentUser.uid}/notes/${note.id}`))
        setNotesList((prevList)=>{
            return(
                prevList.filter((item)=>{
                    return note.id !== item.id
                })
            )
        })
        set(ref(db, `/user/${auth.currentUser.uid}/archived/${note.id}`),note)
        setAlertList((prevList)=>["Note added to archive", ...prevList])
        
    }
    const deleteNoteHandler = async(note)=>{
        remove(ref(db, `/users/${auth.currentUser.uid}/notes/${note.id}`))
        setNotesList((prevList)=>{
            return(
                prevList.filter((item)=>{
                    return note.id !== item.id
                })
            )
        })
        
        set(ref(db, `/users/${auth.currentUser.uid}/deleted/${note.id}`),note)
        setAlertList((prevList)=>["Note Deleted", ...prevList])
    }
    const contentChangeHandler = (event) => {
        setNewNote((prevNote) => {
          let changedNote = {
            ...prevNote,
            [event.target.name]: event.target.value,
          };
          return changedNote;
        });
      };
    const editImageHandler = (event) => {
        
        setNewNote((prevNote) => {
            let updatedNote = {...prevNote, image: event.target.files[0]}
            delete updatedNote.url;
            return updatedNote;
        })

    }
    const bgcolorHandler = (event) => {
        setNewNote((prevNote) => {
            const updatedNote = {...prevNote, bgcolor: event.target.value}
            return updatedNote;
        })
    }
    const [dragActive, setDragActive] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(100);
    return (
        <DataContext.Provider value={{
            notesList,
            setNotesList, 
            archiveNotes, 
            setArchiveNotes,
            deletedNotes,
            setDeletedNotes,
            alertList,
            setAlertList,
            openModal,
            newNote,
            setNewNote,
            setOpenModal,
            archiveNoteHandler,
            deleteNoteHandler,
            contentChangeHandler,
            bgcolorHandler,
            editImageHandler,
            dragActive,
            setDragActive,
            uploadStatus,
            setUploadStatus
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider