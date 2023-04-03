import React, { useContext, useState } from "react";
import DataContext from "../Helpers/DataContext";
import './NotesCard.css'
import { AddPhotoAlternateOutlined, ColorLensOutlined, ArchiveOutlined, DeleteOutlined } from '@mui/icons-material';



const Card = (props) => {
    
    const ctx = useContext(DataContext);
    
    // const [editNote, setEditNote] = useState(props.Note);
    // const [bgcolor, setBgcolor] = useState(props.Note.bgcolor);
    
    
    
    const OpenModalHandler = ()=>{
        if(props.Note.isTodo === true)ctx.setOpenModal("TodoNote");
        else ctx.setOpenModal("TextNote")
        ctx.setNewNote(props.Note);
    }
    return (
        <div onClick={OpenModalHandler} style={{ backgroundColor: 'black', padding: '0.05rem'}} className={`container w-full max-h-40 relative shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl overflow-hidden`}>
            {props.Note.url!=="" && <div className='w-full'><img className='w-full' alt='Uploaded' src={props.Note.url}></img></div>}
            <div className="item-bar w-full absolute bottom-0 opacity-0 transition-all ease-in-out delay-200">
                <ul className="flex p-1 mx-auto w-fit">
                    <li key='1' className="px-1 text-center align-middle rounded-full hover:bg-sky-200">
                        <input type="color" id={`editbgcolor${props.Note.id}`} className='hidden' onChange={(event)=>ctx.bgcolorHandler(event, props.Note)} />
                        <label htmlFor={`editbgcolor${props.Note.id}`}><ColorLensOutlined className="w-5 cursor-pointer" /></label>
                    </li>
                    <li key='2' className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200" onClick={(event)=>{event.stopPropagation(); ctx.archiveNoteHandler(props.Note)}}><ArchiveOutlined className="w-5 cursor-pointer" /></li>
                    <li key='3' className="px-1 ml-2 text-center align-middle scroll-py-0.55 rounded-full hover:bg-sky-200">
                        <input type='file' accept='image/*' id={`editfile${props.Note.id}`} className='hidden' onChange={(event)=>ctx.editImageHandler(event, props.Note)} />
                        <label htmlFor={`editfile${props.Note.id}`}><AddPhotoAlternateOutlined className='w-5 cursor-pointer' /></label>
                    </li>
                    <li key='4' className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200" onClick={(event)=>{event.stopPropagation(); ctx.deleteNoteHandler(props.Note)}}><DeleteOutlined className="w-5 cursor-pointer" /></li>
                </ul>
            </div>
        </div>
    )
}
//e3e4e1
export default Card