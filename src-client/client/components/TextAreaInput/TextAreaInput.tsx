import './TextAreaInput.css';
import {useJournal} from "../../contexts/JournalContext";
import {ChangeEvent} from 'react';
export default function TextAreaInput() {
  const {updateText, journalEntry} = useJournal();


  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value: string = event.target.value;
    updateText(value);
    event.preventDefault();
  }

  return (
    // TODO: Add spellCheck to settings
    <div className={"textArea-container"}>
      <textarea className="entry-input"
                placeholder={'Enter text'}
                spellCheck='true'
                value={journalEntry.content}
                onChange={handleChange}
      />
    </div>
  );
}

