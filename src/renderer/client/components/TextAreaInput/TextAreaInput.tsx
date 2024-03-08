import './TextAreaInput.css'

export default function TextAreaInput() {
  return (
    // TODO: Add spellCheck to settings
    <div>
      <textarea className="journal-input" spellCheck='false'/>
    </div>
  );
}
