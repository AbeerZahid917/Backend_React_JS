import React, { useContext } from 'react';
import note_context from '../context/notes/NoteContext';
import Noteitem from './Noteitem';


export default function Notes() {
  const context = useContext(note_context);
  const {notes, setNotes} = context;

  return (
    <div className="row my-3">
        
        <h2>
          Your notes
        </h2>
        {notes.map((note)=>{
          return <Noteitem note={note}/>
        })}
      </div>
  )
}
