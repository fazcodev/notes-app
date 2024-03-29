import * as React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon'; 
import ListItemText from '@mui/material/ListItemText';
import { LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from "@mui/icons-material";
import { Link, NavLink, useLocation } from "react-router-dom";
const NavList = ({open})=>{
    const location = useLocation()
    const iconList = [
        {id: 1, name: 'Notes', icon: <Lightbulb/>},
        {id: 2, name: 'Archive', icon: <Archive/>},
        {id: 3, name: 'Trash', icon: <Delete/>}
    ]
    return(
        <List>
          {iconList.map((item) => (
            
              <ListItem key={item.id} disablePadding sx={{ display: 'block'}}>
                <NavLink to={item.name === 'Notes' ? '/' : (item.name === 'Archive' ? '/Archive' : '/Trash')}>
                <ListItemButton
                  className={(location.pathname === `/${item.name}` || (location.pathname === '/' && item.name === 'Notes')) ? 'bg-blue-200': ''}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    "&:hover": { background: "#dae6ed"},
                    borderTopRightRadius: '25px',
                    borderBottomRightRadius: '25px',
                    borderRadius: !open? '0': ''
                    
                  }}
                >
                  <ListItemIcon
                    sx={{
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </NavLink>
              </ListItem>
          ))}
        </List>
    )
}

export default NavList