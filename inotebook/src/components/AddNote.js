import React, { useContext, useState } from 'react';
import note_context from '../context/notes/NoteContext';




export default function AddNote(props) {
  const context = useContext(note_context);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: "default"})
  
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("note added", "success")
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div className="container my-3">
        
        <h2>
            Add a note
        </h2>

        <form>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
            </div>

            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
            </div>

            <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>

    </div>
  )
}
