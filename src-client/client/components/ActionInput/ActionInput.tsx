import { createRef, RefObject, useState } from 'react';
import {useJournal} from "../../contexts/JournalContext";
import { JournalAction } from '../../models/JournalModel.ts';
import "react-datepicker/dist/react-datepicker.css";
import "../../global CSS/OneLineInput.css"
import ScrollableList from '../ScrollableList/ScrollableList.tsx';

export default function ActionInput() {
  let actionKeyRef: NonNullable<RefObject<HTMLInputElement>> = createRef<HTMLInputElement>();

  const {updateActions} = useJournal();
  const {journalEntry} = useJournal()
  const [actionDescription, setActionDescription] = useState<string>('');

  function createActions() {
    if (!journalEntry.actions) return null;
    return (
      <ScrollableList
        items={Object.entries(journalEntry.actions)}
        renderItem={([_, action], index: number) => (
          <div key={index}>
              {action.description}
          </div>
        )}
        onDelete={(clickEvent, index) => deleteAction(clickEvent, index)}
      />
    );
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
      const newAction: JournalAction = createJournalAction();
      const newValue: JournalAction[] = [...journalEntry.actions, newAction];
      updateActions(newValue);
      resetAction()
      event.preventDefault();
    }
  }

  function createJournalAction(){
    const newAction: JournalAction = {
      description: actionDescription,
      completed: false,
    }
    return newAction;
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
  }

  return (
    <div className={'action-input-container'}>
        <input className={'one-line-input'}
               ref={actionKeyRef}
               placeholder={'Enter action'}
               value={actionDescription}
               onKeyDown={onKeyHandler}
               onChange={e => setActionDescription(e.target.value)} />
        {createActions()}

    </div>
  );
}
