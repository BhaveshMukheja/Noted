import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/notes/noteContext";
import  AddNote  from "./AddNote";
import NoteItem from './NoteItem'

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote} = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("Updated Successfully", "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
  else{
    navigate('/login')
  }

  }, [])
  
  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id ,etitle: currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    props.showAlert("updated Successfully", "success")
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
    <AddNote showAlert={props.showAlert}/> 

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit Note
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={note.etitle}
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        </form>
        
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Node</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem note={note} showAlert={props.showAlert} updateNote={updateNote} key={note._id}/>
        })}
      </div>
    </>
  );
};

export default Notes;
