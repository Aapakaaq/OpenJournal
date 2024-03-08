import {JournalModel} from "../../Shared/models/JournalModel";

export type JournalContextType = {
  getJournalModel(): JournalModel;
  updateText(text: string): void;
}
