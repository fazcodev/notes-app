import React, { createContext, useContext } from 'react'

const DataContext = createContext({
    notesList: [],
    setNotesList: () => { },
    archiveNotes: [],
    setArchiveNotes: () => { },
    deletedNotes: [],
    setDeletedNotes: () => { },
    errorList: [],
    setErrorList: () => { },
    openModal: {},
    setOpenModal: ()=>{ },
    archiveNoteHandler: ()=>{},
    deleteNoteHandler: ()=>{},
    contentChangeHandler: ()=>{},
    bgcolorHandler: ()=>{},
    editImageHandler: ()=>{},
    newNote: {},
    setNewNote:()=>{}
})

export default DataContext