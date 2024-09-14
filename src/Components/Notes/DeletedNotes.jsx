import { useContext } from "react";
import NotesList from "./NotesList";
import DataContext from "../Helpers/DataContext";

const DeletedNotes = () => {
  const { deletedNotes } = useContext(DataContext);
  return (
    <section className="p-3 text-center flex-1">
      <NotesList notesList={deletedNotes} />
    </section>
  );
};

export default DeletedNotes;
