import React, { useContext} from "react";
import {ref as refDb, update, getDatabase} from 'firebase/database'
import {ref as refStore, uploadBytesResumable, getStorage} from 'firebase/storage'
import AuthContext from '../Authentication/AuthContext'
import DataContext from "../Helpers/DataContext";
import TextNote from "../Notes/TextNote";
import Todo from "../Notes/Todo";

const Overlay = () => {
    const { openModal, setOpenModal, bgcolorHandler, editImageHandler, newNote, setNewNote, setNotesList, setUploadStatus } = useContext(DataContext);
    const {currentUser} = useContext(AuthContext)
    const db = getDatabase()
    const store = getStorage()
    console.log(newNote)
    const handleClose = async() => {
        setOpenModal("");
        if(newNote.image){
            setNewNote((prevNote)=>{
                prevNote.url = URL.createObjectURL(prevNote.image)
                return prevNote;
            })
            // await uploadBytes(refStore(store, `/users/${currentUser.uid}/${newNote.id}`), newNote.image)
            const uploadTask = uploadBytesResumable(refStore(store, `/users/${currentUser.uid}/${newNote.id}`), newNote.image);
                console.log(newNote)
                uploadTask.on('state_changed', 
                (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadStatus(Math.trunc(progress))
                }, 
                (error) => {
                // Handle unsuccessful uploads
                }, 
                () => {
                    delete newNote.image
                }
            );
        }   
        setNewNote((old)=>{
            const updated = old;
            delete updated.image;
            return updated
        })
        setNotesList((prevList)=>{
            return prevList.map((item)=>{
                if(item.id !== newNote.id)return item;
                return newNote;
            })
        })
        update(refDb(db, `/users/${currentUser.uid}/notes/${newNote.id}`), newNote)
        setNewNote({ id: "", bgcolor: "white", heading: "", text: "", todo: { undone: [], done: [] }, isTodo: false })

    }
    return (

        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1300 }} onClick={handleClose} className="fixed w-full h-full top-0 left-0 right-0 bottom-0">
            <div style={{ backgroundColor: newNote.bgcolor }}
                className="container w-5/12 max-h-96 mx-auto mt-8 mb-8 text-left shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
                <div className="w-full max-h-96 overflow-y-scroll">
                    {(newNote.url || newNote.image) && <div className="w-full overflow-y-auto max-h-72">
                        <img className="w-full" alt="Uploaded" src={newNote.url ? newNote.url: URL.createObjectURL(newNote.image)}></img>
                    </div>
                    }
                    {openModal === "TodoNote"&& <Todo classname = '' bgcolorHandler={bgcolorHandler} insertImageHandler={editImageHandler} closeHandler={handleClose}/>}
                    {openModal === "TextNote" && <TextNote bgcolorHandler={bgcolorHandler} insertImageHandler={editImageHandler} closeHandler={handleClose} />}
                </div>

            </div>

        </div>


    )
}

export default Overlay