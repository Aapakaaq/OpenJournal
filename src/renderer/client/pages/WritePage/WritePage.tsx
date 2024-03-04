import {useState} from "react";
import JournalInput from "../../components/JournalInput/JournalInput";
import {SubmitJournal} from "../../components/SubmitJournal/SubmitJournal";

import './WritePage.css'
import {JournalModel} from "../../../Shared/models/JournalModel";

export default function WritePage() {
  // TODO: Fix
  const [journal, setJournal] = useState<JournalModel>();

  return (
    <div className="container">
      <h1 className="title"> Journal input</h1>
      <JournalInput/>
      <SubmitJournal journal={journal}/>
    </div>
  );
}
