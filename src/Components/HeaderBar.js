import * as React from "react";
import { styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Toolbar, Typography, IconButton} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;
const AppBar = styled(MuiAppBar)`
    z-index: 1201;
    background: #fff;
    height: 70px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    color: #5F6368;
`;
const HeaderBar = ({open, handleDrawer})=>{
    
    return (
        <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="#5F6368"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 15,
              "&:hover": { background: "#dae6ed"},
              backgroundColor: open ? "#a5deff": "white"
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Note Notify
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default HeaderBar