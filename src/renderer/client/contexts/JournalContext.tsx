import {createContext, ReactNode, useContext, useState} from 'react';
import {JournalModel} from "../../Shared/models/JournalModel";
import {JournalContextType} from '../types/JournalContextType';
import {JSONValue} from "../../Shared/types/Json";

interface IProps {
  children: ReactNode;
}

const initialState: JournalModel = {
  // TODO: SHOULD BE SET ON ONBOARDING. TMP FOR DEVELOPMENT
  filePath: '/tmp/test.json',
  metaData: {},
  textContent: '',
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

  function getJournalModel(): JournalModel {
    return journalEntry
  }

  function updateText(text: string): void {
    setJournalEntry(prevState => ({
      ...prevState,
      textContent: text
    }));
  }

  function updateMetaData(key: string, value: JSONValue): void {
    setJournalEntry(prevState => ({
      ...prevState,
      metaData: {
        ...prevState.metaData,
        [key]: value,
      },
    }));
  }

  function resetEntry(): void {
    setJournalEntry(initialState);
  }

  // TODO: Fix
  function updateActions(key: string, value: JSONValue): void {
    setJournalEntry(prevState => ({
      ...prevState,
      actions: {
        ...prevState.actions,
        [key]: value,
      }
    }));
  }

  function removeAction(keyToRemove: string): void {
    if (!journalEntry.actions || !journalEntry.actions[keyToRemove]) return;

    const updatedActions = { ...journalEntry.actions };
    delete updatedActions[keyToRemove];
    setJournalEntry((prevEntry) => ({
      ...prevEntry,
      actions: updatedActions,
    }));

  }

  return (
    <JournalContext.Provider
      value={{journalEntry, removeAction, updateText, updateMetaData, updateActions, resetEntry}}>
      {children}
    </JournalContext.Provider>
  );
}

export {useJournal, JournalProvider}
