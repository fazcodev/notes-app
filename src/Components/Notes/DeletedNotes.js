import React, { useContext } from "react";
import NotesList from "./NotesList";
import {Box} from '@mui/material'
import DataContext from "../Helpers/DataContext";

const DeletedNotes = ()=>{
    const {deletedNotes} = useContext(DataContext)
    return(
        <Box sx = {{display: 'flex', width:'100%'}}>
            <Box sx = {{p: 3, width: '100%', textAlign: 'center'}}>
                <NotesList notesList = {deletedNotes}/>
            </Box>
        </Box>
    )
}

export default DeletedNotes;