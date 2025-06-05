import React, { useContext } from 'react';
import note_context from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';


export default function Notes() {
  const context = useContext(note_context);
  const {notes, addNote} = context;

  return (
    <>
    <AddNote/>
      <div className="row my-3">
        
        <h2>
          Your notes
        </h2>
        {notes.map((note)=>{
          return <Noteitem key={note._id} note={note}/>
        })}
      </div>
    </>
  )
}
