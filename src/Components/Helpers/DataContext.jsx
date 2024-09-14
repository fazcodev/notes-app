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
    unarchiveNoteHandler: ()=>{},
    restoreHandler: ()=>{},
    dragActive: Boolean,
    setDragActive: ()=>{},
    uploadStatus: Number,
    setUploadStatus: ()=>{}   
})

export default DataContext