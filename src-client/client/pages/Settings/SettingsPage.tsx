import './SettingsPage.css'
import { useJournal } from '../../contexts/JournalContext.tsx';
import {  FormEvent, useState } from 'react';
import InputFieldFolder from '../../components/InputFieldFolder/InputFieldFolder.tsx';

export default function SettingsPage() {
  const {journalFolder, updateJournalFolder} = useJournal();
  const [savePath, setSavePath] = useState<string>(journalFolder);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Saving settings...")
    console.log(savePath);
    updateJournalFolder(savePath);
    console.log("Settings saved")

  }


  return (
    <div className="settings-container">
      <form onSubmit={saveSettings}>
      <div>
        <h1 className={"title"}>Save path</h1>
        <InputFieldFolder savePath={savePath} setSavePath={setSavePath} />
      </div>
      <button>Save</button>
      </form>
    </div>

  );
}
