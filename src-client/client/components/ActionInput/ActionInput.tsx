import { createRef, RefObject, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "../../global CSS/OneLineInput.css"
import ScrollableList from '../ScrollableList/ScrollableList.tsx';
import { JournalAction } from '../../models/JournalModel.ts';

interface IProps {
  actions: JournalAction[];
  updateData: (updatedData: JournalAction[]) => void;
}

export default function ActionInput({actions, updateData}: IProps) {
  let actionKeyRef: NonNullable<RefObject<HTMLInputElement>> = createRef<HTMLInputElement>();

  const [actionDescription, setActionDescription] = useState<string>('');

  function createActions() {
    if (!actions) return null;

    return (
      <ScrollableList
        items={actions.map((action: JournalAction, index: number) => (
          { key: index.toString(), value: action.description }))}
        renderItem={({ value: action }) => (
          <div key={action}>{action}</div>
        )}
        onDelete={(clickEvent, index) => deleteAction(clickEvent, index)}
      />
    );
  }

  // @ts-ignore
  function onKeyHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const trimmedInput: string = event.target.value.trim();
    if (event.key === "Enter" && trimmedInput === '') {
      event.preventDefault();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const newAction: JournalAction = {
        description: actionDescription,
        completed: false
      }
      const newValue: JournalAction[] = [...actions, newAction];
      updateData(newValue);
      resetAction();
      event.preventDefault();
    }
  }


  // @ts-ignore
  function deleteAction(event: MouseEvent<HTMLButtonElement>, index: number): void {
    const newValue: JournalAction[] = [...actions];
    newValue.splice(index, 1);
    updateData(newValue);
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
