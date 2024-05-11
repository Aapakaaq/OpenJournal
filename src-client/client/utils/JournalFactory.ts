import { JournalAction, JournalModel } from '../models/JournalModel.ts';

export function createJournal(content: string, tags: string[], actions: string[], timestamp: string): JournalModel {
  return {
    content: content,
    tags: tags,
    actions: createJournalAction(actions),
    createdAt: timestamp
  }
}

function createJournalAction(actions: string[]){
  return actions.map((value: string) => ({
      description: value,
      completed: false
  }));
}