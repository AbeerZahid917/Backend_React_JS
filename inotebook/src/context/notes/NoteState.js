import { useState } from "react";
import note_context from "./NoteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    
    
    // Get all notes
    const getNotes = async ()=>{
        let url = `${host}/api/notes/fetchallnotes`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json_res = await response.json();
        console.log(json_res);
        setNotes(json_res)
    }





    // Add a note
    const addNote = async (title, description, tag)=>{
        let url = `${host}/api/notes/addnote`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json_res = response.json();

        console.log(json_res);

        const note = {
            "_id": "683f8d17fb85c922c0589400",
            "user": "683d8e15ff810c3a1462ccab",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-06-04T04:35:43.374Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }




    // Delete a note
    const deleteNote = async (id)=>{
        let url = `${host}/api/notes/deletenote/${id}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });

        const json_res = response.json();
        console.log(json_res);
        
        const new_notes = notes.filter((note)=>{return note._id !== id});
        setNotes(new_notes);
    }




    // Edit a note
    const editNote = async (id, title, description, tag)=>{
        let url = `${host}/api/notes/updatenote/${id}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json_res = response.json();
        console.log(json_res);


        let new_notes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < new_notes.length; index++) 
        {
            const element = new_notes[index];

            if (element._id === id)
            {
                new_notes[index].title = title;
                new_notes[index].description = description;
                new_notes[index].tag = tag;
                break;
            }
        }
        setNotes(new_notes);
    }



    return (
        <note_context.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </note_context.Provider>
    )
}

export default NoteState;