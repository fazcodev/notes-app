import React, { useContext, useState } from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from "./Authentication/AuthContext";

const AppBar = styled(MuiAppBar)`
    z-index: 1201;
    background: #fff;
    height: 70px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    color: #5F6368;
`;
const HeaderBar = ({ open, handleDrawer }) => {
  const { currentUser, logout } = useContext(AuthContext)
  const name = currentUser.email.split('@')[0]
  const [openOptions, setOpenOptions] = useState(false)
  const showOptions = () => setOpenOptions(true);
  const hideOptions = () => setOpenOptions(false)
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="#5F6368"
          onClick={handleDrawer}
          edge="start"
          sx={{
            marginRight: 3,
            "&:hover": { background: "#dae6ed" },
            backgroundColor: open ? "#a5deff" : "white"
          }}
          className = "sm: mr-5"
        >
          <MenuIcon />
        </IconButton>
        <div className=" w-full flex flex-row justify-between sm:m-10">
          <Typography variant="h6" noWrap component="div">
            Note Notify
          </Typography>
          <h3 className="mr-5 mt-1 sm:mt-0 text-center cursor-pointer" onMouseEnter={showOptions} onMouseLeave={hideOptions}>Hello! {name}
            <ul className={openOptions ? 'overflow-hidden absolute h-32 sm:h-36 text-sm sm:text-base flex flex-col justify-evenly rounded-xl py-2 bg-white w-1/3 sm:w-1/6 right-16 sm:right-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]' : 'hidden'}>
              <li>
                <button className="hover:text-blue-400">View Profile</button>
              </li>
              <li>
                <button className="hover:text-blue-400" onClick={logout}>Logout</button>
              </li>
              <li>
                <button className="hover:text-blue-400">Change Password</button>
              </li>
            </ul>
          </h3>
        </div>

      </Toolbar>
    </AppBar>
  )
}


export default HeaderBar