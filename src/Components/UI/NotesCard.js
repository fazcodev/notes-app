import React, { useContext, useState, useRef } from "react";
import { ref as refStore, uploadBytesResumable, getStorage } from 'firebase/storage'
import { ref as refDb, update, getDatabase } from 'firebase/database'
import { auth } from "../../firebase";
import DataContext from "../Helpers/DataContext";
import './NotesCard.css'
import { AddPhotoAlternateOutlined, ColorLensOutlined, ArchiveOutlined, DeleteOutlined, RestoreFromTrashOutlined, UnarchiveOutlined } from '@mui/icons-material';
import TextNote from "../Notes/TextNote";
import Todo from "../Notes/Todo";
import { useLocation } from "react-router-dom";



const NotesCard = (props) => {

    const cardRef = useRef();
    const ctx = useContext(DataContext);
    const store = getStorage()
    const db = getDatabase();
    const currLoc = useLocation().pathname
    const editImageHandler = async (event) => {
        props.Note.url = URL.createObjectURL(event.target.files[0])
        const uploadTask = uploadBytesResumable(refStore(store, `/users/${auth.currentUser.uid}/${props.Note.id}`), event.target.files[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                ctx.setUploadStatus(Math.trunc(progress))
            },
            (error) => {
                // Handle unsuccessful uploads
            }
        );
    }
    const bgcolorHandler = async (event) => {
        if (currLoc === '/') {
            ctx.setNotesList((prevList) => {
                return (
                    prevList.map((note) => {
                        if (note.id === props.Note.id) return { ...note, bgcolor: event.target.value }
                        return note
                    })
                )
            })
            update(refDb(db, `/users/${auth.currentUser.uid}/notes/${props.Note.id}`), props.Note)
        }
        else {
            ctx.setArchiveNotes((prevList) => {
                return (
                    prevList.map((note) => {
                        if (note.id === props.Note.id) return { ...note, bgcolor: event.target.value }
                        return note
                    })
                )
            })
            update(refDb(db, `/users/${auth.currentUser.uid}/archived/${props.Note.id}`), props.Note)
        }

    }
    const OpenModalHandler = () => {
        ctx.setOpenModal(props.Note.id);
    }
    return (
        <div ref={cardRef} onClick={currLoc !== '/Trash' ? OpenModalHandler : () => { }} style={{ backgroundColor: props.Note.bgcolor }} className={`container rounded-md border-2 border-blue-200 w-full h-full relative shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-hidden`}>
            <div className="handle block rounded-md absolute z-20 -top-2 left-1/2 w-12 h-3.5 bg-black -translate-x-1/2 opacity-0 transition-all ease-in-out delay-200 hover:cursor-move"></div>
            <div className="absolute rounded-md top-0 left-0 opacity-0 w-full h-full" style={{ zIndex: 1 }}></div>
            {props.Note.url || props.Note.image ? <div className='rounded-md overflow-hidden w-full h-full'><img className='w-full h-full' alt='Uploaded' src={props.Note.url ? props.Note.url : URL.createObjectURL(props.Note.image)}></img></div> :
                (props.Note.isTodo ? <Todo className='rounded-md overflow-hidden' cardNote={props.Note} setTodoList={() => { }} /> : <TextNote className='rounded-md overflow-hidden' cardNote={props.Note} />)
            }

            <div className="item-bar z-20 w-full absolute bottom-0 opacity-0 transition-all ease-in-out delay-200">
                <ul className="flex p-1 mx-auto w-fit">
                    {currLoc !== '/Trash' && <li key='1' onClick={(event) => event.stopPropagation()} className="px-1 text-center align-middle rounded-full hover:bg-sky-200">
                        <input type="color" id={`editbgcolor${props.Note.id}`} className='hidden' onChange={(event) => bgcolorHandler(event)} />
                        <label htmlFor={`editbgcolor${props.Note.id}`}><ColorLensOutlined className="w-5 cursor-pointer" /></label>
                    </li>}
                    <li key='2' className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200" onClick={(event) => { event.stopPropagation(); if (currLoc !== '/Archive')ctx.archiveNoteHandler(props.Note);else ctx.unarchiveNoteHandler(props.Note) }}>{currLoc !== '/Archive' ? <ArchiveOutlined className="w-5 cursor-pointer" /> : <UnarchiveOutlined className="w-5 cursor-pointer" />}</li>
                    {currLoc !== '/Trash' && <li key='3' onClick={(event) => event.stopPropagation()} className="px-1 ml-2 text-center align-middle scroll-py-0.55 rounded-full hover:bg-sky-200">
                        <input type='file' accept='image/*' id={`editfile${props.Note.id}`} className='hidden' onChange={(event) => { editImageHandler(event) }} />
                        <label htmlFor={`editfile${props.Note.id}`}><AddPhotoAlternateOutlined className='w-5 cursor-pointer' /></label>
                    </li>}
                    <li key='4' className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200" onClick={(event) => { event.stopPropagation(); if(currLoc !== '/Trash')ctx.deleteNoteHandler(props.Note); else ctx.restoreHandler(props.Note) }}>{currLoc !== '/Trash' ? <DeleteOutlined className="w-5 cursor-pointer" /> : <RestoreFromTrashOutlined className="w-5 cursor-pointer" />}</li>
                </ul>
            </div>
        </div>
    )
}
//e3e4e1
export default React.memo(NotesCard)