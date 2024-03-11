import './SubmitJournal.css'
import {useJournal} from "../../contexts/JournalContext";


export function SubmitJournal() {
  const {getJournalModel} = useJournal();

  async function onClickHandler() {
    console.log("Submitting journal...")
    const journalAsJsonString: string = JSON.stringify(getJournalModel())
    console.log(journalAsJsonString);
    const result = await window.electron.ipcRenderer.saveJournal(journalAsJsonString);

    // TODO: inform user on failure + reason
    if (result) {
      console.log(`Journal submitted at ${getJournalModel().filePath}`);
    } else {
      console.error(`Journal could not be saved at ${getJournalModel().filePath}`);
    }
  }

  return (
    <div className="container">
      <button className="submit-button"
              onClick={onClickHandler} type={"submit"}>
        Save
      </button>
    </div>
  )
}
