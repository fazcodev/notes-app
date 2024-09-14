import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import {
  ref as refStore,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import { ref as refDb, update, getDatabase } from "firebase/database";
import { auth } from "../../firebase";
import DataContext from "../Helpers/DataContext";
import "./NotesCard.css";
import {
  AddPhotoAlternateOutlined,
  ColorLensOutlined,
  ArchiveOutlined,
  DeleteOutlined,
  RestoreFromTrashOutlined,
  UnarchiveOutlined,
} from "@mui/icons-material";
import TextNote from "../Notes/TextNote";
import Todo from "../Notes/Todo";
import { useLocation } from "react-router-dom";

const NotesCard = ({ Note }) => {
  const ctx = useContext(DataContext);
  const store = getStorage();
  const db = getDatabase();
  const currLoc = useLocation().pathname;
  const editImageHandler = async (event) => {
    Note.url = URL.createObjectURL(event.target.files[0]);
    const uploadTask = uploadBytesResumable(
      refStore(store, `/users/${auth.currentUser.uid}/${Note.id}`),
      event.target.files[0]
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        ctx.setUploadStatus(Math.trunc(progress));
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
      }
    );
  };
  const bgcolorHandler = async (event) => {
    if (currLoc === "/") {
      ctx.setNotesList((prevList) => {
        return prevList.map((note) => {
          if (note.id === Note.id)
            return { ...note, bgcolor: event.target.value };
          return note;
        });
      });
      update(
        refDb(db, `/users/${auth.currentUser.uid}/notes/${Note.id}`),
        Note
      );
    } else {
      ctx.setArchiveNotes((prevList) => {
        return prevList.map((note) => {
          if (note.id === Note.id)
            return { ...note, bgcolor: event.target.value };
          return note;
        });
      });
      update(
        refDb(db, `/users/${auth.currentUser.uid}/archived/${Note.id}`),
        Note
      );
    }
  };
  const OpenModalHandler = () => {
    ctx.setOpenModal(Note.id);
  };
  return (
    <div
      onClick={currLoc !== "/Trash" ? OpenModalHandler : () => {}}
      style={{ backgroundColor: Note.bgcolor }}
      className={`container rounded-md border border-blue-200 w-full h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-hidden`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="handle block rounded-md absolute z-20 -top-2 left-1/2 w-12 h-3.5 bg-black -translate-x-1/2 opacity-0 transition-all ease-in-out delay-200 hover:cursor-move"
      ></div>
      <div className="absolute z-10 w-full h-full" />
      {(Note.url || Note.image) && (
        <div className="rounded-md overflow-hidden w-full flex justify-center items-center">
          <img
            className="object-contain"
            alt="Uploaded"
            src={Note.url ? Note.url : URL.createObjectURL(Note.image)}
          ></img>
        </div>
      )}
      {Note.isTodo ? (
        <Todo className="rounded-md overflow-hidden" cardNote={Note} />
      ) : (
        <TextNote className="rounded-md overflow-hidden" cardNote={Note} />
      )}

      <div className="item-bar z-20 w-full absolute bottom-0 opacity-0 transition-all ease-in-out delay-200">
        <ul className="flex p-1 mx-auto w-fit">
          {currLoc !== "/Trash" && (
            <li
              key="1"
              onClick={(event) => event.stopPropagation()}
              className="px-1 text-center align-middle rounded-full hover:bg-sky-200"
            >
              <input
                type="color"
                id={`editbgcolor${Note.id}`}
                className="hidden"
                onChange={(event) => bgcolorHandler(event)}
              />
              <label htmlFor={`editbgcolor${Note.id}`}>
                <ColorLensOutlined className="w-5 cursor-pointer" />
              </label>
            </li>
          )}
          <li
            key="2"
            className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200"
            onClick={(event) => {
              event.stopPropagation();
              if (currLoc !== "/Archive") ctx.archiveNoteHandler(Note);
              else ctx.unarchiveNoteHandler(Note);
            }}
          >
            {currLoc !== "/Archive" ? (
              <ArchiveOutlined className="w-5 cursor-pointer" />
            ) : (
              <UnarchiveOutlined className="w-5 cursor-pointer" />
            )}
          </li>
          {currLoc !== "/Trash" && (
            <li
              key="3"
              onClick={(event) => event.stopPropagation()}
              className="px-1 ml-2 text-center align-middle scroll-py-0.55 rounded-full hover:bg-sky-200"
            >
              <input
                type="file"
                accept="image/*"
                id={`editfile${Note.id}`}
                className="hidden"
                onChange={(event) => {
                  editImageHandler(event);
                }}
              />
              <label htmlFor={`editfile${Note.id}`}>
                <AddPhotoAlternateOutlined className="w-5 cursor-pointer" />
              </label>
            </li>
          )}
          <li
            key="4"
            className="px-1 ml-2 text-center align-middle rounded-full hover:bg-sky-200"
            onClick={(event) => {
              event.stopPropagation();
              if (currLoc !== "/Trash") ctx.deleteNoteHandler(Note);
              else ctx.restoreHandler(Note);
            }}
          >
            {currLoc !== "/Trash" ? (
              <DeleteOutlined className="w-5 cursor-pointer" />
            ) : (
              <RestoreFromTrashOutlined className="w-5 cursor-pointer" />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
//e3e4e1
export default React.memo(NotesCard);

NotesCard.propTypes = {
  Note: PropTypes.object.isRequired,
};
