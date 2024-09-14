import { useContext } from "react";
import NotesList from "./NotesList";
import DataContext from "../Helpers/DataContext";

const ArchivedNotes = () => {
  const { archiveNotes } = useContext(DataContext);
  return (
    <section className="p-3 text-center flex-1">
      <NotesList notesList={archiveNotes} />
    </section>
  );
};

export default ArchivedNotes;
