import React, { useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import { DragIndicatorOutlined } from '@mui/icons-material';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable as arrayMove } from 'array-move';

import './UndoneList.css'
import { TextField } from '@mui/material';
const SortableItem = SortableElement(({todo, setTodo, value, labelId }) => {
  const editTodoHandler = async (event, itemId) => {
    event.target.setSelectionRange(-1, -1)
    setTodo((prevList) => {
      let updatedList = { ...prevList };
      updatedList.undone.forEach(item => {
        if (item.id === itemId) item.text = event.target.value;
      });
      return updatedList;
    })
   
  }
  
  const handleToggle = (value) => {
    setTimeout(()=>{
      setTodo((prevTodo) => {
        const newTodo = { ...prevTodo };
        newTodo.undone.splice(newTodo.undone.indexOf(value), 1);
        newTodo.done.push(value);
        return newTodo;
      })
    }, 100)
    

  };
  return (
    <ListItem
      disablePadding
      dense
    >

      <ListItemButton role={undefined} dense disableRipple className='item pl-0 cursor-text'>
        <DragHandle />
        <ListItemIcon className='min-w-fit'>
          <Checkbox
            onClick={() => handleToggle(value)}
            edge="start"
            tabIndex={-1}
            inputProps={{ 'aria-labelledby': labelId }}
            size='small'
            className='px-1 py-0.5 transform scale-90 ml-0.5'
          />
        </ListItemIcon>
        <TextField
          id={labelId}
          multiline
          maxRows={4}
          fullWidth
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          autoFocus
          className="w-full pl-3"
          value = {value.text}
          onChange={(event)=>editTodoHandler(event, value.id)}
        />
      </ListItemButton>
    </ListItem>
  )

})
const DragHandle = SortableHandle(() => <button><DragIndicatorOutlined className='drag outline-none invisible text-gray-500 cursor-move' /></button>)

const SortableList = SortableContainer(({ items, todo, setTodo }) => {
  return (
    <List
      sx={{ width: '100%', padding: 0 }}>
      {items.map((value, idx) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <SortableItem todo={todo} setTodo = {setTodo} key={value.id} index={idx} value={value} labelId={value.id} />
        )
      })}
    </List>
  )
})
export default function UndoneList({ todo, setTodo }) {

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTodo((prevTodo) => {
      const updatedTodo = { ...prevTodo, undone: arrayMove(prevTodo.undone, oldIndex, newIndex) }
      return updatedTodo;
    })
  }

  return (
    <SortableList todo={todo} setTodo = {setTodo} lockAxis='y' lockToContainerEdges={true} items={todo.undone} onSortEnd={onSortEnd} useDragHandle />
  )
}
