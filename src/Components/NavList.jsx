import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  LightbulbOutlined as Lightbulb,
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
} from "@mui/icons-material";
import { Link, NavLink, useLocation } from "react-router-dom";
const NavList = ({ open }) => {
  const location = useLocation();
  const iconList = [
    { id: 1, name: "Notes", icon: <Lightbulb fontSize="medium" /> },
    { id: 2, name: "Archive", icon: <Archive fontSize="medium" /> },
    { id: 3, name: "Trash", icon: <Delete fontSize="medium" /> },
  ];
  return (
    <List>
      {iconList.map((item) => (
        <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
          <NavLink
            to={
              item.name === "Notes"
                ? "/Notes"
                : item.name === "Archive"
                ? "/Archive"
                : "/Trash"
            }
          >
            <ListItemButton
              sx={{
                borderTopRightRadius: open ? '25px' : '0px',
                borderBottomRightRadius: open ? '25px' : '0px',
                backgroundColor: open && location.pathname === `/${item.name}` ? "#dae6ed" : "",
                paddingY: 0,
                paddingX: 1.1,
                margin: 0,
              }}
            >
              <ListItemIcon
                sx={{
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <div className={`rounded-full p-3 flex items-center ${!open && location.pathname === `/${item.name}` ? "bg-[#dae6ed]" : ""}`}>{item.icon}</div>
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ visibility: open ? "visible" : "hidden" }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
