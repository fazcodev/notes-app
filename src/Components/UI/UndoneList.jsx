import React, { useContext } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TextField, List, ListItem, ListItemButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { DragIndicatorOutlined, Close } from "@mui/icons-material";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable as arrayMove } from "array-move";

import "./UndoneList.css";
import DataContext from "../Helpers/DataContext";
const SortableItem = SortableElement(
  ({ cardNote, setTodo, value, labelId }) => {
    const editTodoHandler = async (event, itemId) => {
      setTodo((prevList) => {
        let updatedList = { ...prevList };
        updatedList.undone.forEach((item) => {
          if (item.id === itemId) item.text = event.target.value;
        });
        return updatedList;
      });
    };

    const handleToggle = (value) => {
      setTimeout(() => {
        setTodo((prevTodo) => {
          const newTodo = { ...prevTodo };
          newTodo.undone.splice(newTodo.undone.indexOf(value), 1);
          newTodo.done.push(value);
          return newTodo;
        });
      }, 100);
    };
    const deleteTodo = (itemId) => {
      setTodo((prevList) => {
        return {
          ...prevList,
          undone: prevList.undone.filter((item) => {
            return item.id !== itemId;
          }),
        };
      });
    };
    return (
      <ListItem disablePadding>
        <ListItemButton
          dense
          disableRipple
          className="listItem pl-0 cursor-text"
        >
          {!cardNote && <DragHandle />}
          <ListItemIcon sx={{display: 'flex', justifyContent: 'center'}}>
            <Checkbox
              sx={{ padding: 1 }}
              onClick={(e) => {e.stopPropagation(); handleToggle(value)}}
              edge="start"
              tabIndex={-1}
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
            slotProps={{input: {disableUnderline: true,}}}
            autoFocus={!cardNote}
            onFocus={(event) => event.target.setSelectionRange(-1, -1)}
            className="w-full pl-3"
            value={value.text}
            onChange={(event) => editTodoHandler(event, value.id)}
          />
          <button onClick={() => deleteTodo(value.id)}>
            <Close className="text-lg text-gray-300 hover:text-gray-500" />
          </button>
        </ListItemButton>
      </ListItem>
    );
  }
);

const DragHandle = SortableHandle(() => {
  const ctx = useContext(DataContext);
  return (
    <button
      onMouseDown={() => {
        ctx.setDragActive(true);
      }}
    >
      <DragIndicatorOutlined className="drag outline-none invisible text-gray-500 cursor-move" />
    </button>
  );
});

const SortableList = SortableContainer(({ items, setTodo, cardNote }) => {
  return (
    <List sx={{ width: "100%", padding: 0 }}>
      {items.map((value, idx) => {
        return (
          <SortableItem
            cardNote={cardNote}
            setTodo={setTodo}
            key={value.id}
            index={idx}
            value={value}
            labelId={value.id}
          />
        );
      })}
    </List>
  );
});
export default function UndoneList({ todo, setTodo, cardNote }) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTodo((prevTodo) => {
      const updatedTodo = {
        ...prevTodo,
        undone: arrayMove(prevTodo.undone, oldIndex, newIndex),
      };
      return updatedTodo;
    });
  };
    return (
    <SortableList
      helperClass="sortableHelper"
      cardNote={cardNote}
      setTodo={setTodo}
      lockAxis="y"
      lockToContainerEdges={true}
      items={todo.undone}
      onSortEnd={onSortEnd}
      useDragHandle
    />
    
  );
}
