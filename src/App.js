import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Note from "./Note"

function App() {
  //toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setAvtiveNote] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setAvtiveNote(newNote.id);
  }


  const onDeleteNote = (idToDelete) => {
    if (window.confirm("Are you sure?")) {
      const newNoteList = notes.filter((note) => note.id !== idToDelete);
      localStorage.removeItem(activeNote.id);
      setNotes(newNoteList);

      const currentIndex = getActiveNote.findIndex((note) => note.id === idToDelete);
      const nextNoteIndex = currentIndex === 0 ? 1 : currentIndex - 1;
      let nextNoteId;
      if (newNoteList.length > 0) {
        if (nextNoteIndex === newNoteList.length) {
          nextNoteId = newNoteList[0].id;
        }
        else {
          nextNoteId = newNoteList[0].id;
        }
      }

      else {
        navigate(`/notes`);
        return;
      }

      setAvtiveNote(nextNoteId);
      navigate(`/notes/${notes.indexOf(activeNote) + 1}`);
    }
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return {
          ...note,
          ...updatedNote,
        };
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
  };
  


  const getActiveNote = () => {
    //returns active note for main section to show each active note when selected
    return notes.find((note) => note.id === activeNote);
  }


  return(
    <>
    <Header />
    <Sidebar isOpen={isOpen} toggle={toggle} notes={notes} onAddNote={onAddNote} activeNote={activeNote} setAvtiveNote={setAvtiveNote}/>
    <Note isOpen={isOpen} activeNote={getActiveNote()} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote} notes={notes}/>
   
    </>
  )
}


export default App;
