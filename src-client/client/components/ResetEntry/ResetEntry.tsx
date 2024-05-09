import {useJournal} from "../../contexts/JournalContext";
import '../../global CSS/CommonButtons.css'
export function ResetEntry() {
  const {resetEntry} = useJournal();

  // @ts-ignore
  function onClickHandler(event: MouseEvent<HTMLButtonElement>): void {
    resetEntry();
    event.preventDefault();
  }
  return (
    <div className="container">
      <button className="large-button-right" onClick={onClickHandler}>
        Clear
      </button>
    </div>
  )
}
