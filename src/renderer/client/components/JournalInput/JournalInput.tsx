import './JournalInput.css'

export default function JournalInput() {
  return (
    // TODO: Add spellCheck to settings
    <div>
      <textarea className="journal-input" spellCheck='false'/>
    </div>
  );
}
