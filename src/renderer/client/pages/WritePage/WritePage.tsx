import { useState } from "react";
import JournalInput from "../../components/JournalInput/JournalInput";
import { SubmitJournal } from "../../components/SubmitJournal/SubmitJournal";

import './WritePage.css'
import { IJournal } from "../../../Shared/types/Journal";

export default function WritePage(){
    const [journal, setJournal] = useState<IJournal>();

    return (
        <div className="container">
            <h1 className="title"> Journal input</h1>
            <JournalInput />
            <SubmitJournal journal={journal}/>
        </div>
    );
}
