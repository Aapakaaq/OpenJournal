import {createRef, RefObject, useState} from "react";
import {useJournal} from "../../contexts/JournalContext";
import './ActionInput.css'
import { JournalAction } from '../../models/JournalModel.ts';

// TODO: Required field + user feedback
// - Create a form containing all the inputs of write page
export default function ActionInput() {
  let actionKeyRef: NonNullable<RefObject<HTMLInputElement>> = createRef<HTMLInputElement>();
  let actionDateRef: NonNullable<RefObject<HTMLInputElement>> = createRef<HTMLInputElement>();

  const inputRefs: RefObject<HTMLInputElement>[] = [actionKeyRef, actionDateRef];
  const [fieldIntIndex, setFieldIntIndex] = useState<number>(0);

  const {updateActions} = useJournal();
  const {journalEntry} = useJournal()
  const [actionDescription, setActionDescription] = useState<string>('');

  // year-month-day
  const defaultDate = new Date().toISOString().split('T')[0]
  const [actionDate, setActionDate] = useState(defaultDate)

  function createActions() {
    if (!journalEntry.actions) return;

    // @ts-ignore
    return (
      <div className={'actions'}>
        {Object.entries(journalEntry.actions).map(([_, action], index: number) => (
            <div className={'action'}>
              <div className={'key'}>
                {action.description}
              </div>
              <div className={'due-date'}>
                {action.dueDate}
              </div>
              <button onClick={event => deleteAction(event, index)}>x</button>
            </div>
          )
        )}
      </div>
    )
  }

  // @ts-ignore
  function onKeyHandler(event: KeyboardEvent<HTMLInputElement>): void {
    // TODO: Add feedback to user that value is missing
    const trimmedInput: string = event.target.value.trim();
    if (event.key === "Enter" && trimmedInput === '') {
      event.preventDefault();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      moveToNextInput();
    }

  }

  // @ts-ignore
  // Moves to the begninning of the form when going out of bound
  function moveToNextInput() {
    const nextIndex: number = fieldIntIndex + 1;
    console.log(nextIndex)
    if (inputRefs[nextIndex]) {
      // @ts-ignore
      inputRefs[nextIndex].current.focus();
      setFieldIntIndex(nextIndex);
    } else {
      setFieldIntIndex(0)
      // @ts-ignore
      inputRefs[0].current.focus()
    }
  }

  // @ts-ignore
  function addActions(event: KeyboardEvent<HTMLInputElement>): void {
    // TODO: Add feedback to user that value is missing
    if (actionDescription.trim() === '') {
      console.log("Empty action description")
      moveToNextInput();
      event.preventDefault();
      return;
    }

    if (event.key === "Enter") {
      console.log("Adding action")
      const newAction: JournalAction = {
        description: actionDescription,
        dueDate: actionDate,

      }
      console.log(newAction)
      const newValue: JournalAction[] = [...journalEntry.actions, newAction];
      updateActions(newValue);

      console.log(journalEntry.actions);
      resetAction();
      event.preventDefault();
      moveToNextInput();
    }

  }

  // @ts-ignore
  function deleteAction(event: MouseEvent<HTMLButtonElement>, index: number): void {
    const newValue: JournalAction[] = [...journalEntry.actions];
    newValue.splice(index, 1);
    updateActions(newValue)

    event.preventDefault();
  }

  function resetAction() {
    setActionDescription('');
    setActionDate(defaultDate);
  }

  return (
    <div className={'action-input-container'}>
      <div className={'action-inputs'}>
        <input className={'key-input'}
               ref={actionKeyRef}
               placeholder={'Enter action'}
               value={actionDescription}
               onKeyDown={onKeyHandler}
               onChange={e => setActionDescription(e.target.value)}
               onFocus={() => setFieldIntIndex(0)}/>
        <input type="date"
               ref={actionDateRef}
               className={'due-input'}
               defaultValue={actionDate}
               onKeyDown={addActions}
               onFocus={() => setFieldIntIndex(1)}/>
      </div>
      {createActions()}
    </div>
  );
}
