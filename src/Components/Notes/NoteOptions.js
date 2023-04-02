import React, {useContext} from "react";

import {
    AddPhotoAlternateOutlined,
    ColorLensOutlined,
    ArchiveOutlined,
    DeleteOutlined
  } from "@mui/icons-material";
import DataContext from "../Helpers/DataContext";


const NoteOptions = ({bgcolorHandler, insertImageHandler, closeHandler, setInputField, note}) => {
    
    const {deleteNoteHandler, archiveNoteHandler, openModal} = useContext(DataContext)
    let overlay = Object.keys(openModal).length !== 0 ? true: false;
    return (
        <div className="flex justify-between">
            <ul className="flex mb-2">
                <li
                    key="1"
                    className="ml-3 px-1 py-0.5 rounded-full hover:bg-sky-200"
                >
                    <input
                        type="color"
                        id="bgcolor"
                        className="hidden"
                        onChange={overlay ? (event)=>{bgcolorHandler(event, openModal.note)}:bgcolorHandler}
                    />
                    <label htmlFor="bgcolor" className="cursor-pointer" title="Background Color">
                        <ColorLensOutlined />
                    </label>
                </li>
                <li
                    key="2"
                    className="ml-3 px-1 py-0.5 rounded-full hover:bg-sky-200"
                    title="Archive"
                    onClick={overlay ? ()=>{closeHandler(); archiveNoteHandler(openModal.note)} : ()=>archiveNoteHandler(note)}
                >
                    <ArchiveOutlined className="cursor-pointer" />
                </li>
                <li
                    key="3"
                    className="ml-3 px-1 scroll-py-0.55 rounded-full hover:bg-sky-200"
                >
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={overlay ? (event)=>{insertImageHandler(event, openModal.note)}:insertImageHandler}
                    />
                    <label htmlFor="file" title="Add Image">
                        <AddPhotoAlternateOutlined className="cursor-pointer" />
                    </label>
                </li>
                {Object.keys(openModal).length !== 0 && 
                    <li
                        key="4"
                        className="ml-3 px-1 py-0.5 rounded-full hover:bg-sky-200"
                        title="Delete"
                        onClick={(event)=>{
                            closeHandler()
                            deleteNoteHandler(openModal.note)
                        }}
                    >
                        <DeleteOutlined className="cursor-pointer" />
                    </li>
                }
            </ul>
            <div>
                {!overlay && 
                    <button onClick={closeHandler} className="hover:bg-sky-100 mb-2 px-2 py-1 mr-2 rounded-md">
                        Add
                    </button>
                } 
                <button onClick={overlay ? closeHandler : () => { setInputField(false) }} className="hover:bg-sky-100 mb-2 px-2 py-1 mr-2 rounded-md">
                    Close
                </button>
            </div>
        </div>
    )
}

export default NoteOptions