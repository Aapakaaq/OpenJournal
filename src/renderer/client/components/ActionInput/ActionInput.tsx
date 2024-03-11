import {useState} from "react";
import {Actions} from "../../../Shared/models/JournalModel";
import {useJournal} from "../../contexts/JournalContext";
import './ActionInput.css'

// TODO: Required field + user feedback
// - Create a form containing all the inputs of write page
export default function ActionInput() {
  const {updateActions} = useJournal();
  const [newActionKey, setNewActionKey] = useState<string>('');

  // year-month-day
  const defaultDate = new Date().toISOString().split('T')[0]
  const [actionDate, setActionDate] = useState(defaultDate)

  const [actions, setAction] = useState<NonNullable<Actions>>();

  function createActions() {
    if (!actions) return;
    // @ts-ignore
    return (
      <div className={'actions'}>
        {Object.entries(actions).map(([key, value], index: number) => (
            <div className={'action'}>
              <div className={'key'}>
                {key}
              </div>
              <div className={'due-date'}>
                {value.dueDate}
              </div>
              <button onClick={() => deleteAction(index)}>x</button>
            </div>
          )
        )}
      </div>
    )
  }

  // @ts-ignore
  // Moves to the begninning of the form when going out of bound
  function moveToNextInput(event: KeyboardEvent<HTMLInputElement>) {
    // TODO: Add feedback to user that value is missing
    const trimmedInput: string = event.target.value.trim();
    if (trimmedInput === '') return;

    if (event.key === "Enter") {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      const nextIndex = index + 1;

      if (form.elements[nextIndex]) {
        form.elements[nextIndex].focus();
      } else {
        form.elements[0].focus(); // Return to the first element
      }
      event.preventDefault();
    }

  }

  // @ts-ignore
  function addActions(event: KeyboardEvent<HTMLInputElement>){
    if (event.key !== "Enter") return;

    // TODO: Add feedback to user that value is missing
    if (newActionKey.trim() === '') return;

    const newAction : Actions = {
      [newActionKey]: {
        dueDate: actionDate
      }
    }
    setAction(prevState => ({
      ...prevState,
        [newActionKey]: {
          dueDate: actionDate.toString()
        }
    }));

    updateActions(newActionKey,
      {due: actionDate});
    resetAction();

    moveToNextInput(event)
  }

  function deleteAction(index: number): void {
    const newActions: Actions = {};
    Object.entries(actions)
      .filter((action: [string, { dueDate: string }], i: number): boolean => i !== index)
      .forEach(([key, value]) => { newActions[key] = value;});

    setAction(newActions)
  }

  function resetAction(){
    setNewActionKey('');
    setActionDate(defaultDate);
  }

  return (
    <div className={'action-input-container'}>

      <form className={'action-form'}>
        <input className={'key-input'}
               placeholder={'Enter action'}
               value={newActionKey}
               onChange={e => setNewActionKey(e.target.value)}
               onKeyDown={moveToNextInput}/>
        <input type="date"
               className={'due-input'}
               defaultValue={actionDate}
               onKeyDown={addActions}/>
      </form>
      {createActions()}
    </div>
  );
}
