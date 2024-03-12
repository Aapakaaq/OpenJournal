import {JournalModel} from "../../Shared/models/JournalModel";
import {JSONValue} from "../../Shared/types/Json";

export type JournalContextType = {
  journalEntry: JournalModel;
  updateText(text: string): void;
  removeAction(key: string): void;
  updateMetaData(key: string, value: JSONValue): void;
  updateActions(key: string, value: JSONValue): void;
  resetEntry(): void;
}
