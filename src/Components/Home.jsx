import React, { useContext } from "react";
import SwipeDrawer from "./SwipeDrawer";
import DataContext from "./Helpers/DataContext";
import Overlay from "./UI/Overlay";
import AlertBox from "./Alert/AlertBox";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";





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
const Home = () => {
  const { openModal, setDragActive } = useContext(DataContext);
  const [drawerState, dispatchDrawer] = React.useReducer(drawerReducer, {open: false, buttonOpen: false})
    
  let overlay = Object.keys(openModal).length !== 0 ? true : false;
  return (
    <>
      <AlertBox />

      <div
        onMouseUp={() => {
          setTimeout(() => {
            setDragActive(false);
          }, 100);
        }}
        // className={overlay ? `text-center content-center relative` : ``}
        className="h-screen flex flex-col"
      >
        <HeaderBar open = {drawerState.buttonOpen} dispatchDrawer = {dispatchDrawer}/>
        {Object.keys(openModal).length !== 0 && <Overlay />}
        <div className="flex h-full">
          <SwipeDrawer dispatchDrawer = {dispatchDrawer} drawerState = {drawerState} />
          <div className={`${drawerState.buttonOpen ? 'w-60': 'w-20'}`}/>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Home;
