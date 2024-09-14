import React from "react";
import { TextField, List, ListItem, ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

export default function DoneList({ todo, setTodo, checked, setChecked }) {
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    setTodo((prevTodo) => {
      const newTodo = { ...prevTodo };
      newTodo.done.splice(newTodo.done.indexOf(value), 1);
      newTodo.undone = [value, ...newTodo.undone];
      return newTodo;
    });
  };

  const editTodoHandler = async (event, itemId) => {
    setTodo((prevList) => {
      let updatedList = { ...prevList };
      updatedList.done.forEach((item) => {
        if (item.id == itemId) item.text = event.target.value;
      });
      return updatedList;
    });
  };
  return (
    <List sx={{ width: "100%", padding: 0 }}>
      {todo.done.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem disablePadding dense key={value.id}>
            <ListItemButton
              dense
              disableRipple
              className="listItem pl-0 cursor-text"
            >
              <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
                <Checkbox
                  onClick={(e) => {e.stopPropagation(); handleToggle(value)}}
                  edge="start"
                  tabIndex={-1}
                  checked={true}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  size="small"
                  className="transform scale-90"
                />
              </ListItemIcon>
              <TextField
                spellCheck={false}
                id={labelId}
                multiline
                maxRows={4}
                fullWidth
                variant="standard"
                slotProps={{input: {disableUnderline: true, style: {textDecoration: "line-through", opacity: '60%'}}}}
                className="w-full pl-3"
                value={value.text}
                onChange={(event) => editTodoHandler(event, value.id)}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
