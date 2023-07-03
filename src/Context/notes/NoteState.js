import React from 'react'
import NoteContext from './noteContext'
import {useState} from 'react'

const NoteState = (props)=>{
  const host = "http://localhost:5000"
const notesIntitial=[]

const [notes, setNotes] = useState(notesIntitial)


// API Call
const getNotes = async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit,
  
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'auth-token': localStorage.getItem('token')
    },
  });
  const json = await response.json()
  console.log(json)
  const x = localStorage.getItem('token')
  console.log(x)
  setNotes(json)
}


// Add a note
const addNote = async (title, description, tag)=>{

  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit,
  
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
  });
  const note = await response.json(); // parses JSON response into native JavaScript objects
  setNotes(notes.concat(note))


// const note =  {
//   "_id": "63a5eec2fb5bdedc8ba95e1e",
//   "user": "63a5e6e2ecb2c4ae5f853489",
//   "title": title,
//   "description": description,
//   "tag": tag,
//   "date": "2022-12-23T18:09:06.243Z",
//   "__v": 0
// };
setNotes(notes.concat(note))
}

// Delete a Note
const deleteNote = async (id)=>{

  //API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit,
  
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'auth-token': localStorage.getItem('token')
    },
  });
  const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes )
}




// Edit a Note
const editNote = async (id, title, description, tag)=>{
// API call

const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: 'PUT', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit,

  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'auth-token': localStorage.getItem('token')
  },
  body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
});
// const json = response.json(); // parses JSON response into native JavaScript objects


let newNotes = JSON.parse(JSON.stringify(notes))

  // Logic to edit in client
for(let index =0; index<newNotes.length; index++){
  const element = newNotes[index];
  if(element._id === id){
    newNotes[index].title = title;
    newNotes[index].description = description;
    newNotes[index].tag = tag;
    break;
  }

}
setNotes(newNotes);
}

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>

            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState