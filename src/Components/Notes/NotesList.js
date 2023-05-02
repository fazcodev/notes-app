import React, { useContext, useState, useEffect } from 'react'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import {Responsive , WidthProvider } from "react-grid-layout"
import DataContext from '../Helpers/DataContext'
import { BookmarkAddOutlined } from '@mui/icons-material'
import NotesCard from '../UI/NotesCard'

const NotesList = () => {
    const ctx = useContext(DataContext)
    
    const ResponsiveGridLayout = WidthProvider(Responsive)
    const arr = ctx.notesList.map((note, idx)=>{
        return <div className='rounded-lg overflow-hidden border border-black' data-grid = {{x:2*(idx%5), y: 0, w: 2, h: 4, minW: 2, minH: 3, maxW: 5, maxH: 6}} key = {idx}><NotesCard Note = {note}/></div>
    })
    return (
        <>
            {ctx.notesList.length === 0 &&
                <div className='mt-16 text-center inline-block opacity-30 text-slate-300 text-3xl'>
                    <BookmarkAddOutlined className='w-28 h-28' />
                    <h1>Notes you add appear here</h1>
                </div>
            }
            {
                ctx.notesList.length !== 0 &&
                <div className='mt-16 mr-5 w-full'>
                    <ResponsiveGridLayout
                        className="layout"
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={30}
                        // layout = {layout}
                        // onLayoutChange = {store}
                    >
                        {
                            arr
                        }
                    </ResponsiveGridLayout>
                </div> 
                
            }     
        </>


    )
}
export default NotesList

// export default React.memo(NotesList, (prevProps, nextProps) => {
//     // Only re-render if windowWidth has changed
//     return prevProps.windowWidth === nextProps.windowWidth;
//   });
