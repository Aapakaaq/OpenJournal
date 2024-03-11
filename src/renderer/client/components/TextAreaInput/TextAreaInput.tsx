import './TextAreaInput.css'
import {useJournal} from "../../contexts/JournalContext";
import {ChangeEvent, useEffect, useState } from 'react';

export default function TextAreaInput() {
  const {updateText, journalEntry} = useJournal();
  const [textContent, setTextContent] = useState<string>('')

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    const value: string = event.target.value;
    setTextContent(value);
    updateText(value);
  }

  return (
    // TODO: Add spellCheck to settings
    <div className={"textArea-container"}>
      <textarea className="journal-input"
                placeholder={'Enter text'}
                spellCheck='false'
                value={journalEntry.textContent}
                onChange={handleChange}
      />
    </div>
  );
}

