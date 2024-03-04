import './SubmitJournal.css'
import {JournalModel} from "../../../Shared/models/JournalModel";

interface SubmitProps {
  journal: JournalModel
}

// TODO:
export function SubmitJournal({journal}: SubmitProps) {
  // TODO: Create service for converting to json and submiting to backend

  async function onClickHandler() {
    console.log("aaa")
    console.log(journal.components)
    if (journal.components.length === 0) return;
    const journalAsJsonString: string = JSON.stringify(journal)
    console.log(journal.metaData);
    console.log(journalAsJsonString);
    // Use IPC API to query Electron's main thread and run this method
    const result = await window.electron.ipcRenderer.saveJournal(journalAsJsonString);
    console.log(result)

  }

  return (
    <div className="container">
      <button className="submit-button" onClick={onClickHandler}>
        Create entry
      </button>
    </div>
  )
}
