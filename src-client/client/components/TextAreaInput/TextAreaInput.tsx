import './TextAreaInput.css';
import {ChangeEvent} from 'react';

interface IProps {
  value: string;
  updateValue: (updatedValue: string) => void;
}

export default function TextAreaInput({ value, updateValue }: IProps) {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value: string = event.target.value;
    updateValue(value);
    event.preventDefault();
  }

  return (
    // TODO: Add spellCheck to settings
    <div className={"textArea-container"}>
      <textarea className="entry-input"
                placeholder={'Enter text'}
                spellCheck='true'
                value={value}
                onChange={handleChange}
      />
    </div>
  );
}

