import { JournalModel } from '../models/JournalModel';

export type JournalContextType = {
  journalEntry: JournalModel;
  resetEntry(): void;
  journalFolder: string;
  createPathFromFolder(path: string): string;
  updateJournalFolder(newPath: string): void;
}
