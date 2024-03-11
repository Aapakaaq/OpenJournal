
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput";
import {SubmitJournal} from "../../components/SubmitJournal/SubmitJournal";
import {JournalProvider} from "../../contexts/JournalContext";
import './WritePage.css'
import TagsInput from "../../components/TagsInput/TagsInput";
import ActionInput from "../../components/ActionInput/ActionInput";

export default function WritePage() {
  return (
    <JournalProvider>
    <div className={"write-page-container"}>
      <TextAreaInput/>
      <TagsInput />
      <ActionInput />
      <SubmitJournal />
    </div>
    </JournalProvider>
  );
}
