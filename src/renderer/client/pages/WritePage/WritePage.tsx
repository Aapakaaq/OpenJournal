
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput";
import {SubmitJournal} from "../../components/SubmitJournal/SubmitJournal";
import {JournalProvider, useJournal} from "../../contexts/JournalContext";
import './WritePage.css'
import TagsInput from "../../components/TagsInput/TagsInput";
import ActionInput from "../../components/ActionInput/ActionInput";
import JournalForm from "../../components/JournalForm/JournalForm";
import { createContext, useState } from "react";
import {JournalModel} from "../../../Shared/models/JournalModel";

export default function WritePage() {
  return (
    <div className={"write-page-container"}>
      <JournalForm />
    </div>
  );
}
