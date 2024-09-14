import React, {useContext} from "react";

import {
    AddPhotoAlternateOutlined,
    ColorLensOutlined,
    ArchiveOutlined,
    DeleteOutlined,
    UnarchiveOutlined,
    RestoreFromTrashOutlined,
  } from "@mui/icons-material";
import DataContext from "../Helpers/DataContext";
import { useLocation } from "react-router-dom";


const NoteOptions = ({bgcolorHandler, insertImageHandler, closeHandler, setInputField, localNewNote}) => {
    
    const {deleteNoteHandler, archiveNoteHandler, restoreHandler, unarchiveNoteHandler, openModal, setOpenModal} = useContext(DataContext)
    const currLoc = useLocation().pathname
    let overlay = openModal.length !== 0 ? true: false;
    return (
        <div className={`flex justify-between ${overlay?'text-base':'text-sm'} sm:text-base`}>
            <ul className="flex mb-2">
                {currLoc !== '/Trash' && <li
                    key="1"
                    className="ml-3 px-1 py-0.5 rounded-full hover:bg-sky-200"
                >
                    <input
                        type="color"
                        id="bgcolor"
                        className="hidden"
                        onChange={overlay ? (event)=>{bgcolorHandler(event)}:bgcolorHandler}
                    />
                    <label htmlFor="bgcolor" className="cursor-pointer" title="Background Color">
                        <ColorLensOutlined />
                    </label>
                </li>}
                <li
                    key="2"
                    className="sm:ml-3 px-1 py-0.5 rounded-full hover:bg-sky-200"
                    title={currLoc !== '/Archive' ? "Archive": 'Unarchive'}
                    onClick={currLoc!=='/Archive' ? ()=>archiveNoteHandler(localNewNote): ()=>unarchiveNoteHandler(localNewNote)}
                >
                    {currLoc !== '/Archive' ? <ArchiveOutlined className="cursor-pointer" /> : <UnarchiveOutlined className="cursor-pointer" />  }
                </li>
                {currLoc!='/Trash' && <li
                    key="3"
                    className="sm:ml-3 px-1 scroll-py-0.55 rounded-full hover:bg-sky-200"
                >
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={overlay ? (event)=>{insertImageHandler(event)}:insertImageHandler}
                    />
                    <label htmlFor="file" title="Add Image">
                        <AddPhotoAlternateOutlined className="cursor-pointer" />
                    </label>
                </li>}
                {overlay && 
                    <li
                        key="4"
                        className="sm:ml-3 px-1 py-0.5 rounded-full hover:bg-sky-200"
                        title={currLoc != '/Trash' ? 'Delete': 'Restore'}
                        onClick={currLoc !== '/Trash' ? ()=>{
                           
                            deleteNoteHandler(localNewNote)
                            setOpenModal("");
                        }: ()=>restoreHandler(localNewNote)}
                    >
                        {currLoc !== '/Trash' ? <DeleteOutlined className="cursor-pointer" />:<RestoreFromTrashOutlined className="cursor-pointer" />}
                    </li>
                }
            </ul>
            <div>
                {!overlay && 
                    <button onClick={closeHandler} className="hover:bg-sky-100 mb-2 px-1 sm:px-2 py-0.5 sm:py-1 sm:mr-2 rounded-md">
                        Add
                    </button>
                } 
                <button onClick={closeHandler} className="hover:bg-sky-100 mb-2 px-1 sm:px-2 py-0.5 sm:py-1 mr-2 rounded-md">
                    Close
                </button>
            </div>
        </div>
    )
}

export default NoteOptions