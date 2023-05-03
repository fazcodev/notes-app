import React, { useContext, useState, useEffect } from 'react'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import { MuuriComponent } from 'muuri-react'
import DataContext from '../Helpers/DataContext'
import { BookmarkAddOutlined } from '@mui/icons-material'
import NotesCard from '../UI/NotesCard'
import './NotesList.css'
const NotesList = (props) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [drag, setDrag] = useState(false);
    return (
        <>
            {props.notesList.length === 0 &&
                <div className='mt-16 text-center inline-block opacity-30 text-slate-300 text-3xl'>
                    <BookmarkAddOutlined className='w-28 h-28' />
                    <h1>Notes you add appear here</h1>
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
