import './SubmitJournal.css'
import {useJournal} from "../../contexts/JournalContext";


export function SubmitJournal() {


  return (
    <div className="container">
      <button className="submit-button" type={"submit"}>
        Save
      </button>
    </div>
  )
}
