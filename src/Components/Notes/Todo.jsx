import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import {
  AddOutlined,
  KeyboardArrowRightOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import { v4 } from "uuid";
import UndoneList from "../UI/UndoneList";
import DoneList from "../UI/DoneList";
import NoteOptions from "./NoteOptions";

const Todo = ({
  bgcolorHandler,
  insertImageHandler,
  setMakeList,
  closeHandler,
  cardNote,
  localNewNote,
  setLocalNewNote,
}) => {
  const [todoList, setTodoList] = useState(
    cardNote ? cardNote.todo : localNewNote.todo
  );
  const [checked, setChecked] = useState([]);
  const [openDrop, setOpenDrop] = useState(false);
  const contentChangeHandler = (event) => {
    setLocalNewNote((prevNote) => {
      let updatedNote = {
        ...prevNote,
        heading: event.target.value,
        isTodo: true,
      };
      return updatedNote;
    });
  };
  useEffect(() => {
    if (!cardNote) {
      setLocalNewNote((prevNote) => {
        let updatedNote = {
          ...prevNote,
          todo: todoList,
          isTodo: todoList.done.length !== 0 || todoList.undone.length !== 0,
        };
        return updatedNote;
      });
    }
  }, [todoList, cardNote, setLocalNewNote]);

  const addItemHandler = (event) => {
    setTodoList((prevList) => {
      let updatedList = {
        ...prevList,
        undone: [...prevList.undone, { id: v4(), text: event.target.value }],
      };
      return updatedList;
    });
    event.target.value = "";
  };
  const handleToggle = () => {
    setOpenDrop((prev) => !prev);
  };
  return (
    <>
      {(!cardNote || cardNote.heading)&&<TextField
        sx = {{padding: 1}}
        placeholder="Title"
        multiline
        maxRows={4}
        fullWidth
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true, // Disable underline
            style: { fontFamily: "Poppins", fontWeight: 'bolder' }, // Set font-family here
          },
        }}
        name="heading"
        value={!cardNote ? localNewNote.heading : cardNote.heading}
        className="inline-block w-full px-3 py-2"
        onChange={contentChangeHandler}
      />}
      {todoList.undone && (
        <UndoneList
          todo={
            !cardNote
              ? todoList
              : { undone: cardNote.todo.undone, done: cardNote.todo.done }
          }
          cardNote={cardNote}
          setTodo={setTodoList}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      {!cardNote && <div className="flex justify-between px-4 py-1 border mb-3">
        <AddOutlined className="text-gray-500" />
        <input
          type="text"
          placeholder="List item"
          value=""
          className="ml-8 p-0 w-full"
          onChange={addItemHandler}
        />
      </div>}
      {todoList.done && (
        <div className="my-3">
          {!cardNote && <div className="px-4 py-1">
            <button onClick={handleToggle} className="relative left-3">
              {(!openDrop && <KeyboardArrowRightOutlined />) || (
                <KeyboardArrowDownOutlined />
              )}
            </button>
            <h4 className="inline-block text-sm sm:text-base ml-6">{`${todoList.done.length} Completed Items`}</h4>
          </div>}

          {(cardNote ||openDrop) && (
            <DoneList
              todo={todoList}
              setTodo={setTodoList}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      )}
      {!cardNote && (
        <NoteOptions
          bgcolorHandler={bgcolorHandler}
          insertImageHandler={insertImageHandler}
          closeHandler={closeHandler}
          setInputField={setMakeList}
          localNewNote={localNewNote}
        />
      )}
    </>
  );
};

export default Todo;
