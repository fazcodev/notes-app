import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import { DragIndicatorOutlined } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import './UndoneList.css'
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function UndoneList({todo, setTodo, checked, setChecked}) {

  const handleToggle = (value) => {

    const newChecked = [...checked];
    newChecked.push(value.id);
    setChecked(newChecked);
    setTodo((prevTodo)=>{
      const newTodo = {...prevTodo};
      newTodo.undone.splice(newTodo.undone.indexOf(value), 1);
      newTodo.done.push(value);
      return newTodo;
    })

  };
  const onDragEnd = (result)=>{
    if (!result.destination) {
      return;
    }
  
    const items = reorder(
      todo.undone,
      result.source.index,
      result.destination.index
    );
  
    setTodo((prevList)=>{
      return {...prevList, undone: items};
    })
  }
  const editTodoHandler = async(event, itemId)=>{
    setTodo((prevList)=>{
      let updatedList = {...prevList};
      updatedList.undone.forEach(item => {
        if(item.id === itemId)item.text = event.target.value;
      });
      return updatedList;
    })

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
      {(provided, snapshot) => (

        <List {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ width: '100%', padding: 0}}>
          {todo.undone.map((value, idx) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
              <Draggable key = {value.id} draggableId = {value.id} index = {idx}>
                {(provided, snapshot)=>(

                  <ListItem
                    disablePadding
                    dense
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    
                    
                  >
                    
                    <ListItemButton  role={undefined} dense disableRipple className='item pl-0 cursor-text'>
                      <div {...provided.dragHandleProps}><DragIndicatorOutlined className='drag outline-none invisible text-gray-500 cursor-move'/></div>
                      <ListItemIcon className='min-w-fit'>
                        <Checkbox
                          onClick={()=>handleToggle(value)}
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                          size = 'small'
                          className='px-1 py-0.5 transform scale-90 ml-0.5'
                        />
                      </ListItemIcon>
                      <input type='text' id={labelId} value={value.text} spellCheck='false' onChange = {(event)=>editTodoHandler(event, value.id)} autoFocus className='p-0 pl-3 w-full'></input>
                    </ListItemButton>
                  </ListItem>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </List>
      )}
      </Droppable>
    </DragDropContext>
  );
}
