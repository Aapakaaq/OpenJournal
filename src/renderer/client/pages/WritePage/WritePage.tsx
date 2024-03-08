
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput";
import {SubmitJournal} from "../../components/SubmitJournal/SubmitJournal";
import {JournalProvider} from "../../contexts/JournalContext";
import './WritePage.css'

export default function WritePage() {
  return (
    <JournalProvider>
    <div className="container">
      <h1 className="title"> Journal input</h1>
      <TextAreaInput/>
      <SubmitJournal />
    </div>
    </JournalProvider>
  );
}
