import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TagsInput from "../TagsInput/TagsInput";
import ActionInput from "../ActionInput/ActionInput";
import {SubmitJournal} from "../SubmitJournal/SubmitJournal";
import {useJournal} from "../../contexts/JournalContext";
import {FormEvent} from "react";
import './JournalForm.css'
import {ResetEntry} from "../ResetEntry/ResetEntry";
import { invoke } from '@tauri-apps/api/tauri';
import { StatusCodes } from 'http-status-codes';
import { getFormattedTimestamp } from '../../utils/FormattedTimestamp.ts';
export default function JournalForm() {
  const {resetEntry, journalEntry, createPathFromFolder} = useJournal();

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

  function handleFormReset(): void {
    resetEntry();
    console.log("Entry resat.")
  }

  return (

    <form onSubmit={saveJournal} onReset={() => handleFormReset()}>
      <TextAreaInput/>
      <TagsInput/>
      <ActionInput/>
      <div className={"buttons-container"}>
      <SubmitJournal/>
        <ResetEntry/>
      </div>
    </form>


  );
}
