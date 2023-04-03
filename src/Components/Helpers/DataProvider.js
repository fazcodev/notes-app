import React, { useState, useEffect } from 'react'
import DataContext from './DataContext'

const DataProvider = (props)=>{
    
    const [notesList, setNotesList] = useState([])
    const [archiveNotes, setArchiveNotes] = useState([])
    const [deletedNotes, setDeletedNotes] = useState([])
    const [alertList, setAlertList] = useState([])
    const [openModal, setOpenModal] = useState("");
    const [newNote, setNewNote] = useState({
        id: "",
        bgcolor: "white",
        url: "",
        heading: "",
        text: "",
        todo: {undone: [], done: []},
        isTodo: false
    })
    const archiveNoteHandler = (note)=>{
        setArchiveNotes((prevArchive)=>[note, ...prevArchive])
        setAlertList((prevList)=>["Note added to archive", ...prevList])
        // deleteAlert();
        setNotesList((prevList) => {
            const updatedNotes = prevList.filter(data=>data.id !== note.id);
            return updatedNotes
        })
    }
    const deleteNoteHandler = (note)=>{
        setDeletedNotes((prevDelete)=>[note, ...prevDelete])
        setAlertList((prevList)=>["Note Deleted", ...prevList])
        setNotesList((prevList) => {
            const updatedNotes = prevList.filter(data=>data.id !== note.id);
            return updatedNotes
        })
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
            const updatedNote = {...prevNote, url: URL.createObjectURL(event.target.files[0])}
            return updatedNote;
        })

    }
    const bgcolorHandler = (event) => {
        setNewNote((prevNote) => {
            const updatedNote = {...prevNote, bgcolor: event.target.value}
            return updatedNote;
        })
    }
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
            editImageHandler
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider