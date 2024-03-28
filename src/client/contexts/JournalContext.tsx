import {createContext, ReactNode, useContext, useState} from 'react';
import { JournalAction, JournalModel } from '../models/JournalModel';
import {JournalContextType} from '../types/JournalContextType';

interface IProps {
  children: ReactNode;
}

const initialState: JournalModel = {
  // TODO: SHOULD BE SET ON ONBOARDING. TMP FOR DEVELOPMENT
  content: '',
  actions: [],
  tags: [],
}

const JournalContext = createContext<JournalContextType | null>(null);

function useJournal(): JournalContextType {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}

function JournalProvider({children}: IProps) {
  const [journalEntry, setJournalEntry] = useState<JournalModel>(initialState);

  function updateText(text: string): void {
    setJournalEntry(prevState => ({
      ...prevState,
      content: text
    }));
  }

  function updateTags(newTags: string[]): void {
    setJournalEntry(prevState => ({
      ...prevState,
      tags: newTags,
    }));
  }

  function resetEntry(): void {
    setJournalEntry(initialState);
  }

  // TODO: Fix
  function updateActions(newActions: JournalAction[]): void {
    setJournalEntry(prevState => ({
      ...prevState,
      actions: newActions
    }));
  }


  return (
    <JournalContext.Provider
      value={{journalEntry, updateText, updateTags: updateTags, updateActions, resetEntry}}>
      {children}
    </JournalContext.Provider>
  );
}

export {useJournal, JournalProvider}
