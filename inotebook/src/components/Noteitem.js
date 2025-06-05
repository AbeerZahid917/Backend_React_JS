import React from 'react';
import { Link } from "react-router-dom";


export default function Noteitem(props) {
    const {note} = props;

    return (
      <div className="col-md-3">

        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash mx-2" style={{color:" #74C0FC"}}></i>
                <i className="fa-solid fa-pen-to-square mx-2" style={{color:" #74C0FC"}}></i>
            </div>
        </div>

    </div>
  )
}
