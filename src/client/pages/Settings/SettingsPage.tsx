import './SettingsPage.css'
import { useJournal } from '../../contexts/JournalContext.tsx';
import {  FormEvent, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';

export default function SettingsPage() {
  const {journalFolder, updateJournalFolder} = useJournal();
  const [savePath, setSavePath] = useState<string>(journalFolder);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: validation check of path
    updateJournalFolder(savePath);
  }
  async function selectFolder() {
    const path: string | null = await open({
      directory: true,
      multiple: false,
    }) as string | null;

    if (path) {
      // Should never be string[] due to multiple: false
      setSavePath(path);
    }
  }

  return (
    <div className="settings-container">
      <form onSubmit={saveSettings}>
      <div>
        <label className={"title"}>Save path</label>
        <input className={'one-line-input'}
               onFocus={selectFolder}
               value={savePath}
               onChange={e => setSavePath(e.target.value)}


        />
      </div>
      <button>Save</button>
      </form>
    </div>

  );
}
