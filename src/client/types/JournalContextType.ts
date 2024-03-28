import { JournalAction, JournalModel } from '../models/JournalModel';

export type JournalContextType = {
  journalEntry: JournalModel;
  updateText(text: string): void;
  updateTags( newTags: string[]): void;
  updateActions(newActions: JournalAction[]): void;
  resetEntry(): void;
}
