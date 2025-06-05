import React from 'react';
import { Link } from "react-router-dom";


export default function Noteitem(props) {
    const {note} = props;

    return (
      <div>
        {note.title}
        {note.description}

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <Link to="/" className="btn btn-primary">Go somewhere</Link>
            </div>
        </div>
    </div>
  )
}
