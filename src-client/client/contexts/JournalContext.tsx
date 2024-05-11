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
  const [journalFolder, setjournalFolder] = useState<string>("./journals");

  function createPathFromFolder(path: string): string {
    // Consider setting path to default on empty
    if (!path || path.trim() === "") {
      throw new Error("Path parameter cannot be null, undefined, or empty.");
    }

    const trimmedPath = path.endsWith("/") ? path.slice(0, -1) : path;

    const fullPath: string = `${journalFolder}/${trimmedPath}`;
    return fullPath;
  }

  function updateJournalFolder(newPath: string): void {
    if (newPath){
      setjournalFolder(newPath);
    }
  }
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
      value={{journalFolder,createPathFromFolder, updateJournalFolder, journalEntry, updateText, updateTags: updateTags, updateActions, resetEntry}}>
      {children}
    </JournalContext.Provider>
  );
}

export {useJournal, JournalProvider}
