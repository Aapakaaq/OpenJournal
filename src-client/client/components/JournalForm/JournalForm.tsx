import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TagsInput from "../TagsInput/TagsInput";
import ActionInput from "../ActionInput/ActionInput";
import {SubmitJournal} from "../SubmitJournal/SubmitJournal";
import {useJournal} from "../../contexts/JournalContext";
import { FormEvent, useState } from 'react';
import './JournalForm.css'
import { invoke } from '@tauri-apps/api/tauri';
import { StatusCodes } from 'http-status-codes';
import { getFormattedTimestamp } from '../../utils/FormattedTimestamp.ts';
import '../../global CSS/CommonButtons.css'

export default function JournalForm() {
  const {resetEntry, journalEntry, createPathFromFolder} = useJournal();

  const [actions, setActions] = useState<string[]>([]);
  const [journalText, setJournalText] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  async function saveJournal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timestamp: string = getFormattedTimestamp();
    const fileName: string = timestamp + '.json';
    const journalAsJsonString: string = JSON.stringify(journalEntry)
    const result: number = await invoke(
      "create_journal",
      {journalJson: journalAsJsonString, path: createPathFromFolder(fileName)})
    // TODO: Error handling
    if (result == StatusCodes.CREATED) {
      console.log(`Journal submitted `);
      resetEntry();
    } else {
      console.error(`Journal could not be submitted`);
    }
  }

  function handleActionUpdate(updatedData: string[]): void {
    setActions(updatedData);
  }

  function handleJournalTextUpdate(updatedText: string) : void {
    setJournalText(updatedText);
  }

  function handleTagUpdate(updatedTags: string[]): void {
    setTags(updatedTags);
  }

  function resetAllStates(): void {
    setJournalText('');
    setTags([]);
    setActions([]);
  }

  // @ts-ignore
  function handleOnReset(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    resetAllStates();
  }

  return (
    <form onSubmit={saveJournal} onReset={() => handleOnReset}>
      <TextAreaInput value={journalText} updateValue={handleJournalTextUpdate}/>
      <TagsInput tags={tags} updateData={handleTagUpdate}/>
      <ActionInput actions={actions} updateData={handleActionUpdate}/>
      <div className={"buttons-container"}>
        <SubmitJournal />
        <button className="large-button-right" onClick={handleOnReset}>
          Clear
        </button>
      </div>
    </form>
  );
}
