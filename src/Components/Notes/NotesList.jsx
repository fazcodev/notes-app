import React, { useEffect, useState, useMemo } from "react";
import { PropTypes } from "prop-types";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  BookmarkAddOutlined,
  ArchiveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import NotesCard from "../UI/NotesCard";
import "./NotesList.css";
import { useLocation } from "react-router-dom";

const NotesList = ({ notesList }) => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setWindowWidth(window.innerWidth);
  //     };

  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);
  const gridItems = useMemo(() => {
    return notesList?.map((note) => <div className={`relative overflow-hidden z-10 rounded-md`} key = {note.id}><NotesCard Note = {note}/></div> );
  }, [notesList]);

  const layouts = {
    
    sm: useMemo(() => {
      return notesList?.map((note, idx) => ({
        i: note.id,
        x: idx % 4,
        y: 0,
        w: 1,
        h: (note.image || note.url) ? 4: (note.isTodo ? (note.todo.undone.length+note.todo.done.length+(note.heading.length > 0 ? 2: 0)) : 2),
      }));
    }, [notesList]),
  };

  const responsiveProps = {
    className: "responsive-grid",
    breakpoints: { lg: 1400, md: 1200, sm: 850, xs: 400, xxs: 0 },
    cols: { lg: 6, md: 5, sm: 4, xs: 3, xxs: 1 },
    layouts: layouts,
    rowHeight: 50,
    draggableHandle: ".handle",
    isResizable: false,
    useCSSTransforms: true,
  };
  const path = useLocation().pathname;
  return (
    <>
      {notesList?.length === 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block opacity-30 text-slate-300 text-3xl">
          {path == "/" && (
            <>
              <BookmarkAddOutlined className="w-28 h-28" />{" "}
              <h1>Notes you add appear here</h1>
            </>
          )}
          {path == "/Trash" && (
            <>
              <DeleteOutlined className="w-28 h-28" /> <h1>Trash is empty</h1>
            </>
          )}
          {path == "/Archive" && (
            <>
              <ArchiveOutlined className="w-28 h-28" />{" "}
              <h1>Archive is empty</h1>{" "}
            </>
          )}
        </div>
      )}
      {
        notesList?.length > 0 &&
        <div className="m-16">
          <ResponsiveGridLayout {...responsiveProps} layouts={layouts}>
            {gridItems}
          </ResponsiveGridLayout>
        </div>
      }
    </>
  );
};
// export default NotesList

export default React.memo(NotesList);

NotesList.propTypes = {
  notesList: PropTypes.array,
};
