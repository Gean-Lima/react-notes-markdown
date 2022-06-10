import React, { useState, useEffect } from 'react';
import InterfaceNote from '../../interfaces/note';
import ReactMarkdown from 'react-markdown';
import './NoteEditor.scss';

import remarkGfm from 'remark-gfm';

interface Props {
  note: InterfaceNote | undefined,
  updateNote: Function
}

function NoteEditor({ note, updateNote }: Props) {
  const [contentEdited, setContentEdited] = useState('');
  const [linesContent, setLinesContent] = useState([1]);

  useEffect(() => {
    setContentEdited((note?.content as string));
  }, [note]);

  useEffect(() => {
    let numberLines = (contentEdited?.match(/\n/g) || []).length + 1;
    const lines = Array(numberLines).fill(1);
    setLinesContent(lines);

    const newContetNote = {
      ...note,
      content: contentEdited
    };

    updateNote(newContetNote);
  }, [contentEdited]);

  return (
    <div className="NoteEditor">
      <div className="NoteEditorBar">
        { (!!note) &&
          <div className="NoteEditorTitle">
            <h3>{ note?.name }</h3>

            <button className="icon">
              <i className='bx bx-window-close'></i>
            </button>
          </div>
        }

        <div className="NoteEditorBarButtons">
          <button className="icon">
            <i className='bx bxs-dock-right'></i>
          </button>
        </div>
      </div>

      <div className="NoteEditorGrid">
        <div className="NoteEditorBoxAreaEditor">
          <div className="NoteEditorLines">
            <ul className="NoteEditorLinesList">
            {linesContent.map((line, index) => (<li key={index}>{index + 1}</li>))}
            </ul>
          </div>

          <textarea className="NoteEditorTextarea"
            value={contentEdited}
            onChange={(event) => setContentEdited(event.target.value)}></textarea>
        </div>

        <div className="NoteEditorPreview">
          <ReactMarkdown children={contentEdited} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    </div>
  )
}

export default NoteEditor;
