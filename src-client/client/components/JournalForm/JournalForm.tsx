import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TagsInput from "../TagsInput/TagsInput";
import ActionInput from "../ActionInput/ActionInput";
import {SubmitJournal} from "../SubmitJournal/SubmitJournal";
import {useJournal} from "../../contexts/JournalContext";
import { FormEvent, useEffect, useState } from 'react';
import './JournalForm.css'
import { invoke } from '@tauri-apps/api/tauri';
import { StatusCodes } from 'http-status-codes';
import { getFormattedTimestamp } from '../../utils/FormattedTimestamp.ts';
import '../../global CSS/CommonButtons.css'
import { JournalAction, journalMapToModel, JournalModel } from '../../models/JournalModel.ts';
import { generateRandomStringWithNumbers } from '../../utils/RandomStringGenerator.ts';
import { Store } from 'tauri-plugin-store-api';
import { JSONObject } from '../../types/Json.ts';
const store = new Store('.tempStorage.dat')

const initialModel: JournalModel = {
  content: '',
  tags: [],
  actions: []
}

// TODO: Needs major refactor.
export default function JournalForm() {
  const {createPathFromFolder} = useJournal();

  const [journalModel, setJournalModel] = useState<JournalModel>(initialModel);

  // Loads journal from last session
  useEffect(()=> {
    store.get("journal")
      .then((content) => content as JSONObject)
      .then((content) => journalMapToModel(content))
      .then((journal) =>{
        setJournalModel(journal);
      })
  }, [])

  useEffect(() => {
    // temp store in app data
    store.set("journal", journalModel)
    store.save();
  }, [journalModel])

  async function saveJournal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const timestamp: string = getFormattedTimestamp();
    setJournalModel(prevState => ({
      ...prevState,
      createdAt:timestamp
    }))

    const suffix: string = generateRandomStringWithNumbers(4);
    const fileName: string = timestamp + " "+ suffix + '.json';
    console.log(fileName)

    const journalAsJsonString: string = JSON.stringify(journalModel)
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

  function handleActionUpdate(updatedData: JournalAction[]): void {
    setJournalModel(prevState => ({
      ...prevState,
      actions: updatedData
    }))
  }

  function handleJournalTextUpdate(updatedText: string) : void {
    setJournalModel(prevState => ({
      ...prevState,
      content: updatedText
    }));
  }

  function handleTagUpdate(updatedTags: string[]): void {
    setJournalModel(prevState => ({
      ...prevState,
      tags: updatedTags,
    }));
  }

  function resetAllStates(): void {
    setJournalModel(initialModel);
    console.log("Form resat");
  }

  // @ts-ignore
  function handleOnReset(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    resetAllStates();
  }

  return (
    <form onSubmit={saveJournal} onReset={() => handleOnReset}>
      <TextAreaInput value={journalModel.content} updateValue={handleJournalTextUpdate}/>
      <TagsInput tags={journalModel.tags} updateData={handleTagUpdate}/>
      <ActionInput actions={journalModel.actions} updateData={handleActionUpdate}/>
      <div className={"buttons-container"}>
        <SubmitJournal />
        <button className="large-button-right" onClick={handleOnReset}>
          Clear
        </button>
      </div>
    </form>
  );
}
