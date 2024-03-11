import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TagsInput from "../TagsInput/TagsInput";
import ActionInput from "../ActionInput/ActionInput";
import {SubmitJournal} from "../SubmitJournal/SubmitJournal";
import {useJournal} from "../../contexts/JournalContext";
import {JournalModel} from "../../../Shared/models/JournalModel";
import { FormEvent } from "react";

export default function JournalForm(){
  const {resetEntry, journalEntry} = useJournal();

  async function saveJournal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submitting journal...")
    const journalAsJsonString: string = JSON.stringify(journalEntry)
    console.log(journalAsJsonString);
    const result: boolean = await window.electron.ipcRenderer.saveJournal(journalAsJsonString);

    // TODO: inform user on failure + reason
    if (result){
      console.log(`Journal submitted at ${journalEntry.filePath}`);
      resetEntry();
    }
    else {
      console.error(`Journal could not be saved at ${journalEntry.filePath}`);
    }

  }

  function handleFormReset(): void {
    resetEntry();
    console.log("Entry resat.")
  }

  return (

      <form onSubmit={ saveJournal} onReset={() => handleFormReset()}>
        <TextAreaInput/>
        <TagsInput/>
        <ActionInput/>
        <SubmitJournal/>
      </form>


  );
}
