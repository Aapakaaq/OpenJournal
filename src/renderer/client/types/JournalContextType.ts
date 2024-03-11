import {JournalModel} from "../../Shared/models/JournalModel";
import {JSONValue} from "../../Shared/types/Json";

export type JournalContextType = {
  journalEntry: JournalModel;
  getJournalModel(): JournalModel;
  updateText(text: string): void;
  updateMetaData(key: string, value: JSONValue): void;
  updateActions(key: string, value: JSONValue): void;
  resetEntry(): void;
}
