import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';



export default function UndoneList({todo, setTodo, checked, setChecked}) {
  
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];
    
    newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    setTodo((prevTodo)=>{
        const newTodo = {...prevTodo};
        newTodo.done.splice(newTodo.done.indexOf(value), 1);
        newTodo.undone = [value, ...newTodo.undone];
        return newTodo;
    })
    

    
  };

  const editTodoHandler = async(event, itemId)=>{
    setTodo((prevList)=>{
      let updatedList = {...prevList};
      updatedList.done.forEach(item => {
        if(item.id == itemId)item.text = event.target.value;
      });
      return updatedList;
    })
  }
  return (


        <List sx={{ width: '100%', padding: 0}}>
            {todo.done.map((value) => {
                const labelId = `checkbox-list-label-${value.id}`;

            return (

                <ListItem
                disablePadding
                dense
                key = {value.id}
                className='text-gray-500'
    
                >
                
                <ListItemButton  role={undefined} dense disableRipple className='item pl-6 cursor-text'>

                    <ListItemIcon className='min-w-fit'>
                    <Checkbox
                        onClick={()=>handleToggle(value)}
                        edge="start"
                        tabIndex={-1}
                        checked={true}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        size = 'small'
                        className='px-1 py-0.5 transform scale-90 ml-0.5'
                    />
                    </ListItemIcon>
                    <input type='text' id={labelId} value={value.text} spellCheck='false' onChange = {(event)=>editTodoHandler(event, value.id)} className='p-0 pl-3 w-full line-through'></input>
                </ListItemButton>
                </ListItem>
            )
        })}
            
        </List>
    )
  
}
