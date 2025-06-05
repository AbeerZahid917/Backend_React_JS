import { useState } from "react";
import note_context from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "683d8fab18afc66eb36a8887",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": " please wake",
            "tag": "personal",
            "date": "2025-06-02T11:48:59.349Z",
            "__v": 0
        },
        {
            "_id": "683fcd1ffb85c922c0589400",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": " please wake up",
            "tag": "personal",
            "date": "2025-06-04T04:35:43.374Z",
            "__v": 0
        },
        {
            "_id": "683d8fab18a7c66eb36a8887",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": " please wake",
            "tag": "personal",
            "date": "2025-06-02T11:48:59.349Z",
            "__v": 0
        },
        {
            "_id": "683fcd1ffb85c92270589400",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": " please wake up",
            "tag": "personal",
            "date": "2025-06-04T04:35:43.374Z",
            "__v": 0
        },
        {
            "_id": "683d8f7b18afc66eb36a8887",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": " please wake",
            "tag": "personal",
            "date": "2025-06-02T11:48:59.349Z",
            "__v": 0
        },
        {
            "_id": "683fcd17fb85c922c0589400",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": " please wake up",
            "tag": "personal",
            "date": "2025-06-04T04:35:43.374Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInitial);
    
    // Add a note
    const addNote = (title, description, tag)=>{
        // TODO: api call
        let note = {
            "_id": "683f8d17fb85c922c0589400",
            "user": "683d8e15ff810c3a1462ccab",
            "title": "my title",
            "description": "Okirooo [ADDED]",
            "tag": "personal",
            "date": "2025-06-04T04:35:43.374Z",
            "__v": 0
        };
        setNotes(notes.push(note));
    }


    // Delete a note
    const deleteNote = (id)=>{

    }

    // Edit a note
    const editNote = (id)=>{

    }


    return (
        <note_context.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </note_context.Provider>
    )
}

export default NoteState;