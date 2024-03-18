import './TextAreaInput.css';
import {useJournal} from "../../contexts/JournalContext";
import {ChangeEvent, useState} from 'react';
import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

export default function TextAreaInput() {
  const {updateText, journalEntry} = useJournal();


  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {

    event.preventDefault();
    const value: string = event.target.value;
    updateText(value);
  }

  return (
    // TODO: Add spellCheck to settings
    <div className={"textArea-container"}>
      <textarea className="entry-input"
                placeholder={'Enter text'}
                spellCheck='true'
                value={journalEntry.textContent}
                onChange={handleChange}
      />
    </div>
  );
}

