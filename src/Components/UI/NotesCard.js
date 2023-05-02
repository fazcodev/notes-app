import React, { useContext, useState, useRef} from "react";
import {ref as refStore, uploadBytesResumable, getStorage} from 'firebase/storage'
import {ref as refDb, update, getDatabase} from 'firebase/database'
import { auth } from "../../firebase";
import DataContext from "../Helpers/DataContext";
import './NotesCard.css'
import { AddPhotoAlternateOutlined, ColorLensOutlined, ArchiveOutlined, DeleteOutlined } from '@mui/icons-material';
import TextNote from "../Notes/TextNote";
import Todo from "../Notes/Todo";



const NotesCard = (props) => {
    
    const cardRef = useRef();
    const ctx = useContext(DataContext);
    const store = getStorage()
    const db = getDatabase();
    const [mouseDown, setMouseDown] = useState(false)
    const [drag, setDrag] = useState(true)
    const editImageHandler = async(event)=>{
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
    const bgcolorHandler = async(event)=>{
        ctx.setNotesList((prevList)=>{
            return(
                prevList.map((note)=>{
                    if(note.id === props.Note.id)return {...note, bgcolor: event.target.value}
                    return note
                })
            )
        })
        update(refDb(db, `/users/${auth.currentUser.uid}/${props.Note.id}`), props.Note)
    }
    const OpenModalHandler = ()=>{
        
        if(props.Note.isTodo === true)ctx.setOpenModal("TodoNote");
        else ctx.setOpenModal("TextNote")
        console.log(props.Note)
        ctx.setNewNote(props.Note);
    }
    return (
        <div ref = {cardRef} onClick={!drag ? OpenModalHandler: ()=>{}} onMouseUp = {()=>setTimeout(()=>{setMouseDown(false); setDrag(false)}, 100)} onMouseDown = {()=>{setMouseDown(true)}} onMouseMove ={mouseDown ? ()=>{ cardRef.current.style.cursor = 'crosshair'; setDrag(true)} : ()=>{cardRef.current.style.cursor = 'auto'}}  style={{backgroundColor: props.Note.bgcolor}} className={`container w-full h-full relative shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]`}>
            <div className="absolute top-0 left-0 opacity-0 w-full h-full" style={{zIndex: 1}}></div>
            {props.Note.url || props.Note.image ? <div className='w-full h-full'><img className='w-full h-full' alt='Uploaded' src={props.Note.url ? props.Note.url : URL.createObjectURL(props.Note.image)}></img></div> : 
                (props.Note.isTodo ? <Todo cardNote = {props.Note} setTodoList = {()=>{}}/> : <TextNote cardNote = {props.Note}/>)
            }

            <div className="item-bar z-10 w-full absolute bottom-0 opacity-0 transition-all ease-in-out delay-200">
                <ul className="flex p-1 mx-auto w-fit">
                    <li key='1' onClick={(event)=>event.stopPropagation()} className="px-1 text-center align-middle rounded-full hover:bg-sky-200">
                        <input type="color" id={`editbgcolor${props.Note.id}`} className='hidden' onChange={(event)=>bgcolorHandler(event)} />
                        <label htmlFor={`editbgcolor${props.Note.id}`}><ColorLensOutlined className="w-5 cursor-pointer" /></label>
                    </li>
                    <li key='2' className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200" onClick={(event)=>{event.stopPropagation(); ctx.archiveNoteHandler(props.Note)}}><ArchiveOutlined className="w-5 cursor-pointer" /></li>
                    <li key='3' onClick={(event)=>event.stopPropagation()} className="px-1 ml-2 text-center align-middle scroll-py-0.55 rounded-full hover:bg-sky-200">
                        <input type='file' accept='image/*' id={`editfile${props.Note.id}`} className='hidden' onChange={(event)=>{editImageHandler(event)}} />
                        <label htmlFor={`editfile${props.Note.id}`}><AddPhotoAlternateOutlined className='w-5 cursor-pointer' /></label>
                    </li>
                    <li key='4' className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200" onClick={(event)=>{event.stopPropagation(); ctx.deleteNoteHandler(props.Note)}}><DeleteOutlined className="w-5 cursor-pointer" /></li>
                </ul>
            </div>
        </div>
    )
}
//e3e4e1
export default React.memo(NotesCard)