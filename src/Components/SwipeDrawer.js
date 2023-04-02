import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';


import HeaderBar from './HeaderBar';
import NavList from './NavList'
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    zIndex: 10,
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const drawerReducer = (state, action)=>{
    if(action.type === 'slide'){
        if(!state.buttonOpen)return{open: !state.open, buttonOpen: state.buttonOpen}
        else return {open: state.open, buttonOpen: state.buttonOpen}
    }
    if(action.type === 'clickSlide'){
      console.log(!state.buttonOpen)
      return {open: !state.open, buttonOpen: !state.buttonOpen}
    }
    return {open: false, buttonOpen: false}
}
export default function SwipeDrawer(props) {

    const [drawerState, dispatchDrawer] = React.useReducer(drawerReducer, {open: false, buttonOpen: false})
    const button_handleDrawer = ()=>{
        dispatchDrawer({type: 'clickSlide', func: props.drawerOpen})
    }   
    const handleDrawer = ()=>{
        dispatchDrawer({type: 'slide'})
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderBar open = {drawerState.buttonOpen} handleDrawer = {button_handleDrawer}/>
            <Drawer variant="permanent" open={drawerState.open} onMouseEnter ={handleDrawer} onMouseLeave = {handleDrawer}>
                <DrawerHeader> </DrawerHeader>
                <NavList open = {drawerState.open}/>
            </Drawer>
            
        
        </Box>
    );
}