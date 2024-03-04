import { IJournal } from "../../../Shared/types/JournalEntry";

import './SubmitJournal.css'

interface SubmitProps {
    journal: IJournal
}

// TODO:
export function SubmitJournal() {
    // TODO: Create service for converting to json and submiting to backend

    function onClickHandler(){
        // if (journal.componentSet.size() === 0) return;

    }

    return(
        <div className="container">
            <button className="submit-button" onClick={onClickHandler}>
            Create entry
            </button>
        </div>
    )
}
