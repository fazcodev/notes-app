import React, {useState, useContext} from 'react'
import SwipeDrawer from './SwipeDrawer'
import Notes from './Notes/Notes'
import DataContext from './Helpers/DataContext'
import Overlay from './UI/Overlay'
import {Box} from "@mui/material"

const  Home = ()=>{
    const {openModal} = useContext(DataContext)
    let overlay = Object.keys(openModal).length !== 0 ? true: false;
    return (
        <Box sx = {{display: 'flex', width: '100%'}} className={overlay ? `text-center content-center relative`: ``}>
            {Object.keys(openModal).length !== 0 && <Overlay/>}
            <SwipeDrawer/>
            <Notes/>
            
        </Box>
    )
}
export default Home