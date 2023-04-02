import { Grid } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import DataContext from '../Helpers/DataContext'
import { ArchiveOutlined } from '@mui/icons-material'
import Card from '../UI/Card'

const NotesList = () => {
    const ctx = useContext(DataContext)
    return (
        <>
            {ctx.archiveNotes.length === 0 &&
                <div className='mt-16 text-center inline-block opacity-30 text-slate-300 text-3xl'>
                    <ArchiveOutlined className='w-28 h-28'/>
                    <h1>Notes you add appear here</h1>
                </div> 
            }
            <Grid container className='mt-16 mx-auto'>
                {
                    ctx.archiveNotes.map((note) =>
                        <Grid item className='w-1/5 m-3' key={note.id} >
                            <Card Note={note} />
                        </Grid>
                    )
                }

            </Grid>
        </>


    )
}

export default NotesList