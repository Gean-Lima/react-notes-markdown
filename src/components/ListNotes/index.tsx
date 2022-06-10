import React from 'react';
import InterfaceNote from '../../interfaces/note';
import './ListNotes.scss';

interface Props {
  notes: InterfaceNote[],
  selectItem: Function,
  deleteItem: Function
}

function ListNotes({ notes, selectItem, deleteItem }: Props) {
  return (
    <div className="ListNotes">
      <h4>My Notes</h4>

      <div>
        <ul>
          {notes.map((item, index) => (
            <li className="ItemNote" key={index}>
              <div className="ItemNoteColumn1" onClick={(event) => selectItem(event, item)}>
                {item.name}
              </div>

              <div className="ItemNoteColumn2">
                <button className="icon" onClick={(event) => deleteItem(event, item)}>
                  <i className='bx bx-trash' ></i>
                </button>
              </div>
            </li>
          ))}
        </ul>

        { (!!!notes.length) && (<p className="ListNotesNoNotes">
            <i className='bx bx-message-square' ></i> No notes
          </p>) }
      </div>
    </div>
  )
}

export default ListNotes;
