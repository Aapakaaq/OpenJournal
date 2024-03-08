import './TextAreaInput.css'
import {useJournal} from "../../contexts/JournalContext";
import {ChangeEvent, useEffect, useState } from 'react';

export default function TextAreaInput() {
  const {updateText} = useJournal();
  const [textContent, setTextContent] = useState<string>('')

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextContent(event.target.value);
    updateText(textContent);
  }
  return (
    // TODO: Add spellCheck to settings
    <div>
      <textarea className="journal-input"
                spellCheck='false'
                value={textContent}
                onChange={e => handleChange(e)}
      />
    </div>
  );
}

