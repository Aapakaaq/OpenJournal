import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TagsInput from "../TagsInput/TagsInput";
import ActionInput from "../ActionInput/ActionInput";
import {SubmitJournal} from "../SubmitJournal/SubmitJournal";
import {useJournal} from "../../contexts/JournalContext";
import {FormEvent} from "react";
import './JournalForm.css'
import {ResetEntry} from "../ResetEntry/ResetEntry";
import { invoke } from '@tauri-apps/api/tauri';
export default function JournalForm() {
  const {resetEntry, journalEntry} = useJournal();

  async function saveJournal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const journalAsJsonString: string = JSON.stringify(journalEntry)
    console.log(journalAsJsonString);
    const result: string = await invoke(
      "create_journal",
      {journalJson: journalAsJsonString, path: './test.json'})
    console.log(result);
    // TODO: inform user on failure + reason
    if (result == "201") {
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
