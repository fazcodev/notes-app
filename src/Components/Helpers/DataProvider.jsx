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
    useEffect(()=>{
        setNotesList(()=>{
            fetchedNotes.notes.sort((a, b)=>b.timestamp-a.timestamp)
            return fetchedNotes.notes
        });
        
    }, [fetchedNotes.notes])
    useEffect(()=>{
        setDeletedNotes(()=>{
            fetchedNotes.deletedNotes.sort((a, b)=>b.timestamp-a.timestamp)
            return fetchedNotes.deletedNotes
        });
    }, [fetchedNotes.deletedNotes])
    useEffect(()=>{
        setArchiveNotes(()=>{
            fetchedNotes.archivedNotes.sort((a, b)=>b.timestamp-a.timestamp)
            return fetchedNotes.archivedNotes
        });
    }, [fetchedNotes.archivedNotes])

    
    const archiveNoteHandler = async(note)=>{
        console.log(note);
        remove(ref(db, `/users/${auth.currentUser.uid}/notes/${note.id}`))
        setNotesList((prevList)=>{
            setArchiveNotes((prev)=>[note, ...prev]);
            return(
                prevList.filter((item)=>{
                    return note.id !== item.id
                })
            )
            
        })
        set(ref(db, `/users/${auth.currentUser.uid}/archived/${note.id}`),note)
        setAlertList((prevList)=>["Note added to archive", ...prevList])
        
    }
    const deleteNoteHandler = async(note)=>{
        remove(ref(db, `/users/${auth.currentUser.uid}/notes/${note.id}`))
        setNotesList((prevList)=>{
            setDeletedNotes((prev)=>[note, ...prev])
            return(
                prevList.filter((item)=>{
                    return note.id !== item.id
                })
            )
        })
        
        set(ref(db, `/users/${auth.currentUser.uid}/deleted/${note.id}`),note)
        setAlertList((prevList)=>["Note Deleted", ...prevList])
    }
    const unarchiveNoteHandler = async(note)=>{
        remove(ref(db, `/users/${auth.currentUser.uid}/archived/${note.id}`))
        setArchiveNotes((prevList)=>{
            setNotesList((prev)=>[...prev, note])
            return(
                prevList.filter((item)=>{
                    return note.id !== item.id
                })
            )
        })
        set(ref(db, `/users/${auth.currentUser.uid}/notes/${note.id}`),note)
        setAlertList((prevList)=>["Note Unarchived", ...prevList])
    }
    const restoreHandler = async(note)=>{
        remove(ref(db, `/users/${auth.currentUser.uid}/deleted/${note.id}`))
        setDeletedNotes((prevList)=>{
            setNotesList((prev)=>[...prev, note])
            return(
                prevList.filter((item)=>{
                    return note.id !== item.id
                })
            )
        })
        
        set(ref(db, `/users/${auth.currentUser.uid}/notes/${note.id}`),note)
        setAlertList((prevList)=>["Note Restored", ...prevList])
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
            setOpenModal,
            archiveNoteHandler,
            deleteNoteHandler,
            unarchiveNoteHandler,
            restoreHandler,
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