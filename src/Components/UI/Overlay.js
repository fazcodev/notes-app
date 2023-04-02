import React, {useContext, useEffect} from "react";
import DataContext from "../Helpers/DataContext";
import TextNote from "../Notes/TextNote";
import Todo from "../Notes/Todo";

const Overlay = ()=>{
    const {openModal, setOpenModal, bgcolorHandler, editImageHandler, newNote, setNewNote, notesList, setNotesList} = useContext(DataContext);

    const handleClose = ()=>{
        console.log('clicked')
        newNote.id = openModal.note.id;
        setNotesList((prevList)=>{
            let updatedList = [...prevList];
            updatedList.forEach(item => {
                if(item.id === newNote.id){
                    Object.assign(item, newNote)
                }
            });
            return updatedList
        })
        setNewNote({ id: "", bgcolor: "white", url: "", heading: "", text: "" , todo: {undone: [], done: []}, isTodo: false});
        setOpenModal({});
        
    }
    let overlay = Object.keys(openModal).length !== 0 ? true: false;
    return (

        <div style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300}} onClick={handleClose} className = "fixed w-full h-full top-0 left-0 right-0 bottom-0">
            <div style={{ backgroundColor: newNote.bgcolor}}
          className="container w-5/12 mx-auto mt-8 text-left shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl overflow-hidden" onClick={(event)=>event.stopPropagation()}>
                {newNote.url !== "" && <div className="w-full overflow-y-auto max-h-72">
                    <img className="w-full" alt="Uploaded" src={newNote.url}></img>
                    </div>
                }
                {openModal.value === "TodoNote"  && <Todo note={openModal.note} bgcolorHandler={bgcolorHandler} insertImageHandler={editImageHandler} closeHandler={handleClose}/>}
                {openModal.value === "TextNote" && <TextNote note = {openModal.note} bgcolorHandler={bgcolorHandler} insertImageHandler={editImageHandler} closeHandler={handleClose}/>}
            </div>

        </div>
            
        
    )
}

export default Overlay