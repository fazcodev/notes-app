import React from "react";
import InputNotes from "./InputNotes";
import NotesList from "./NotesList";
import {Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import { useContext } from "react";
import DataContext from "../Helpers/DataContext";

const DrawerHeader = styled('div')(({ theme }) => ({
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Notes = ()=>{
    const {notesList} = useContext(DataContext)
    return(
        <Box sx = {{display: 'flex', width:'100%'}}>
            <Box sx = {{p: 3, width: '100%', textAlign: 'center'}}>
                <DrawerHeader/>
                <InputNotes/>
                <NotesList notesList = {notesList}/>
            </Box>
        </Box>
    )
}

export default Notes;