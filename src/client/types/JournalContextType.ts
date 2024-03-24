import {JournalModel} from "../models/JournalModel";
import {JSONValue} from "./Json.ts";

export type JournalContextType = {
  journalEntry: JournalModel;
  updateText(text: string): void;
  removeAction(key: string): void;
  updateMetaData(key: string, value: JSONValue): void;
  updateActions(key: string, value: JSONValue): void;
  resetEntry(): void;
}
