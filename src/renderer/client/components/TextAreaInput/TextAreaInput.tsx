import './TextAreaInput.css'
import {useJournal} from "../../contexts/JournalContext";
import {ChangeEvent, useEffect, useState } from 'react';

export default function TextAreaInput() {
  const {updateText} = useJournal();
  const [textContent, setTextContent] = useState<string>('')

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value: string = event.target.value;
    setTextContent(value);
    updateText(value);
    console.log(textContent)
  }

  return (
    // TODO: Add spellCheck to settings
    <div className={"textArea-container"}>
      <textarea className="journal-input"
                placeholder={'Enter text'}
                spellCheck='false'
                value={textContent}
                onChange={handleChange}
      />
    </div>
  );
}

