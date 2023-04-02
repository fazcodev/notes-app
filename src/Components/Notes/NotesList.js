import { Grid } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import DataContext from '../Helpers/DataContext'
import { BookmarkAddOutlined } from '@mui/icons-material'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from '../UI/NotesCard'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
const NotesList = () => {
    const ctx = useContext(DataContext)
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            ctx.notesList,
            result.source.index,
            result.destination.index
        );
        ctx.setNotesList(items)

    }
    return (
        <>
            {ctx.notesList.length === 0 &&
                <div className='mt-16 text-center inline-block opacity-30 text-slate-300 text-3xl'>
                    <BookmarkAddOutlined className='w-28 h-28' />
                    <h1>Notes you add appear here</h1>
                </div>
            }
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}>
                            <Grid container className='mt-16 mx-auto'>
                                {
                                    ctx.notesList.map((note, index) =>
                                    (
                                        <Draggable key={note.id} draggableId={note.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='w-1/5 m-3'
                                                    
                                                >
                                                    <Grid item key={note.id} >
                                                        <Card Note={note} />
                                                    </Grid>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }

                            </Grid>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>


    )
}

export default NotesList