
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput";
import {SubmitJournal} from "../../components/SubmitJournal/SubmitJournal";
import {JournalProvider} from "../../contexts/JournalContext";
import './WritePage.css'

export default function WritePage() {
  return (
    <JournalProvider>
    <div className="container">
      <TextAreaInput/>
      <SubmitJournal />
    </div>
    </JournalProvider>
  );
}
