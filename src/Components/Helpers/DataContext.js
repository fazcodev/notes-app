import { createContext} from 'react'

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
    setNewNote:()=>{},
    dragActive: Boolean,
    setDragActive: ()=>{},
    uploadStatus: Number,
    setUploadStatus: ()=>{}   
})

export default DataContext