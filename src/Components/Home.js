import React, {useContext } from 'react'
import SwipeDrawer from './SwipeDrawer'
import DataContext from './Helpers/DataContext'
import Overlay from './UI/Overlay'
import { Box } from '@mui/system'
import AlertBox from './Alert/AlertBox'
import { Outlet } from 'react-router-dom'
 
const Home = () => {
    const { openModal, setDragActive } = useContext(DataContext)
    let overlay = Object.keys(openModal).length !== 0 ? true : false;
    return (
        <>
            <AlertBox />
            <Box onMouseUp = {()=>{
                setTimeout(()=>{setDragActive(false)}, 100)
            }} sx={{ display: 'flex', width: '100%' }} className={overlay ? `text-center content-center relative` : ``}>
                {Object.keys(openModal).length !== 0 && <Overlay/>}
                <SwipeDrawer />
                <Outlet/>
            </Box>
        </>
    )
}
export default Home