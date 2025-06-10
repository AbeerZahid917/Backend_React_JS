import React, { useContext } from 'react';
import note_context from '../context/notes/NoteContext';



export default function Noteitem(props) {
  const context = useContext(note_context);
  const { deleteNote } = context;
  const {note, updateNote} = props;

    return (
      <div className="col-md-3">

        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash mx-2" style={{color:" #74C0FC"}} onClick={()=>{deleteNote(note._id); props.showAlert("note deleted", "success")}}></i>
                <i className="fa-solid fa-pen-to-square mx-2" style={{color:" #74C0FC"}} onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>

    </div>
  )
}
