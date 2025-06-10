import React, { useContext, useEffect, useRef, useState } from 'react';
import note_context from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';





export default function Notes(props) {
  const context = useContext(note_context);
  const {notes, getNotes, editNote} = context;
  const ref = useRef(null);
  const ref_close = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "default"})
  let navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem('token'))
    {
      getNotes();
    }
    else
    {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  
  const updateNote = (current_note)=>{
    ref.current.click();
    setNote({id: current_note._id, etitle: current_note.title, edescription: current_note.description, etag: current_note.tag})

  }

  
  const handleClick = ()=>{
    console.log("updating the note");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    ref_close.current.click();
    props.showAlert("note updated", "success")
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }


  return (
    <>
    <AddNote showAlert={props.showAlert}/>

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">    
          <form>
              <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
              </div>

              <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription"  value={note.edescription} onChange={onChange}/>
              </div>

              <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div>

          </form>
          </div>

          <div className="modal-footer">
            <button ref={ref_close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
      
      <h2>
        Your notes
      </h2>
      <div className="container mx-2">
        {notes.length === 0 && 'no notes to dispalay'}
      </div>
        
      {notes.map((note)=>{
        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
      })}
    </div>
    </>
  )
}
