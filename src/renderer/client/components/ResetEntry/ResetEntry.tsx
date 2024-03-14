import {useJournal} from "../../contexts/JournalContext";
import "./ResetEntry.css"

export function ResetEntry() {
  const {resetEntry} = useJournal();

  // @ts-ignore
  function onClickHandler(event: MouseEvent<HTMLButtonElement>): void {
    resetEntry();
  }
  return (
    <div className="container">
      <button className="reset-button" onClick={onClickHandler}>
        Clear
      </button>
    </div>
  )
}
