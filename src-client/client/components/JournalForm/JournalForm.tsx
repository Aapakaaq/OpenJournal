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
import { createJournal } from '../../utils/JournalFactory.ts';
import { JournalModel } from '../../models/JournalModel.ts';
import { generateRandomStringWithNumbers } from '../../utils/RandomStringGenerator.ts';

// TODO: Store content between page and on shutdown. Tauri-plugin store
export default function JournalForm() {
  const {createPathFromFolder} = useJournal();

  const [actions, setActions] = useState<string[]>([]);
  const [journalText, setJournalText] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  async function saveJournal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const timestamp: string = getFormattedTimestamp();
    const journalEntry: JournalModel = createJournal(journalText, tags, actions, timestamp);

    const suffix: string = generateRandomStringWithNumbers(4);
    const fileName: string = timestamp + " "+ suffix + '.json';
    console.log(fileName)

    const journalAsJsonString: string = JSON.stringify(journalEntry)
    const savePath: string = createPathFromFolder(fileName);

    console.log("Saving file at: " + savePath);
    const result: number = await invoke(
      "create_journal",
      {journalJson: journalAsJsonString, path: savePath})

    // TODO: Error handling
    if (result == StatusCodes.CREATED) {
      console.log(`Journal submitted `);
      resetAllStates();
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
    console.log("Form resat");
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
