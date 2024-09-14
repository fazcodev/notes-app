import InputNotes from "./InputNotes";
import NotesList from "./NotesList";
import { useContext } from "react";
import DataContext from "../Helpers/DataContext";


const Notes = () => {
  const {notesList} = useContext(DataContext)
  return (
    <section className="p-3 text-center flex-1">
      <InputNotes />
      <NotesList notesList = {notesList}/>
    </section>
  );
};

export default Notes;
