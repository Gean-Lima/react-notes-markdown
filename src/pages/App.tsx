import React, { useState } from 'react';
import ListNotes from '../components/ListNotes';
import NoteEditor from '../components/NoteEditor'
import InterfaceNote from '../interfaces/note';
import { v4 as uuid } from 'uuid';
import './App.scss';

function App() {
  const [notes, setNotes] = useState<InterfaceNote[]>([]);

  const [nameNewNote, setNameNewNote] = useState('');

  const [visibleInputNameNewNote, setVisibleInputNameNewNote] = useState(false);

  const [noteInEditor, setNoteInEditor] = useState<InterfaceNote>();

  const toggleAddNote = (event: React.MouseEvent): void => {
    event.preventDefault();

    setVisibleInputNameNewNote(!visibleInputNameNewNote)
  };

  const addNote = (event: React.KeyboardEvent): void => {
    if (event.charCode === 13 && nameNewNote.trim() !== '') {
      setNotes([
        {
          id: uuid(),
          name: nameNewNote,
          content: ''
        },
        ...notes
      ]);

      setNameNewNote('');
      setVisibleInputNameNewNote(false);
    }
  };

  const deleteNoteItem = (event: React.MouseEvent, note: InterfaceNote) => {
    event.preventDefault();

    if (noteInEditor?.id === note.id) {
      setNoteInEditor(undefined);
    }

    setNotes(notes.filter((n) => n.id !== note.id));
  };

  const selectNoteItem = (event: React.MouseEvent, note: InterfaceNote) => {
    event.preventDefault();

    setNoteInEditor(note);
  };

  const updateNoteContent = (note: InterfaceNote) => {
    setNotes(notes.map((item) => {
      if (item.id === note.id) {
        item.content = note.content;
      }
      return item;
    }))
  }

  return (
    <div className="App">
      <div className="AppColumn1">
        <div className="Navbar">
          <div className="navbar-right">
            <button className="icon" onClick={toggleAddNote}>
              { visibleInputNameNewNote
                ? <i className='bx bx-message-square-x'></i>
                : <i className='bx bx-message-square-add'></i>
               }
            </button>
          </div>
        </div>

        <div className={`AppBoxInputNewNote ${visibleInputNameNewNote && 'visible'}`}>
          <input onKeyPress={addNote}
            className="AppInputNewNote"
            placeholder="Name note"
            value={nameNewNote}
            onChange={(event) => setNameNewNote(event.target.value)}  />

          <p>Press "Enter" for add</p>
        </div>

        <ListNotes notes={notes} selectItem={selectNoteItem} deleteItem={deleteNoteItem} />
      </div>

      <div className="AppColumn2">
        <div className="Navbar">
          <div className="navbar-left">
            <h1>NOTES</h1>
          </div>

          <div className="navbar-right">
            <a href="https://github.com/Gean-Lima/react-notes-markdown" target="_blank">
              <i className='bx bxl-github bx-sm'></i>
            </a>
          </div>
        </div>

        <NoteEditor note={noteInEditor} updateNote={updateNoteContent} />
      </div>
    </div>
  );
}

export default App;
