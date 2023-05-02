import React from "react";
import NotesList from "./NotesList";
import {Box} from '@mui/material'

const DeletedNotes = ()=>{

    return(
        <Box sx = {{display: 'flex', width:'100%'}}>
            <Box sx = {{p: 3, width: '100%', textAlign: 'center'}}>
                <NotesList/>
            </Box>
        </Box>
    )
}

export default DeletedNotes;