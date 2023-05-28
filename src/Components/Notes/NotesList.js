import React, {useState} from 'react'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import { MuuriComponent } from 'muuri-react'
import { BookmarkAddOutlined, ArchiveOutlined, DeleteOutlined } from '@mui/icons-material'
import NotesCard from '../UI/NotesCard'
import './NotesList.css'
import { useLocation } from 'react-router-dom'
const NotesList = (props) => {
    const path = useLocation().pathname
    return (
        <>
            {props.notesList.length === 0 &&
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block opacity-30 text-slate-300 text-3xl'>
                    {path == '/' && <><BookmarkAddOutlined className='w-28 h-28' /> <h1>Notes you add appear here</h1></>}
                    {path == '/Trash' && <><DeleteOutlined className='w-28 h-28'/> <h1>Trash is empty</h1></>}
                    {path == '/Archive' && <><ArchiveOutlined className='w-28 h-28'/> <h1>Archive is empty</h1> </>}
                </div>
            }
            {
                <div className='mt-16'>

                    <MuuriComponent
                        layoutDuration={400}
                        dragRelease={{
                            duration: 400,
                            easing: "ease-out"
                        }}
                        dragHandle = ".handle"
                        dragEnabled={true}
                        dragContainer={document.body}
                        // The placeholder of an item that is being dragged.
                        dragPlaceholder={{
                            enabled: true,
                            createElement: function (item) {
                                // The element will have the Css class ".muuri-item-placeholder".
                                return item.getElement().cloneNode(true);
                            }
                        }}
                        
                    >
                        {
                            props.notesList.map((note, idx) => {
                                return (
                                    <div className="item" key={note.id}>
                                        <div className="item-content">
                                            <NotesCard Note={note} />
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </MuuriComponent>
                </div>
            }
        </>


    )
}
// export default NotesList

export default React.memo(NotesList)
    