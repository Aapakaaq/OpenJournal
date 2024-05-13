import {createContext, ReactNode, useContext, useState} from 'react';
import { JournalModel } from '../models/JournalModel';
import {JournalContextType} from '../types/JournalContextType';

interface IProps {
  children: ReactNode;
}

const initialState: JournalModel = {
  content: '',
  actions: [],
  tags: [],
}

const journalContext = createContext<JournalContextType | null>(null);

function useJournal(): JournalContextType {
  const context = useContext(journalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}

function JournalProvider({children}: IProps) {
  const [journalEntry, setJournalEntry] = useState<JournalModel>(initialState);
  // TODO: Should be given during on-boarding
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


  function resetEntry(): void {
    setJournalEntry(initialState);
  }

  return (
    <journalContext.Provider
      value={{journalFolder,createPathFromFolder, updateJournalFolder, journalEntry, resetEntry}}>
      {children}
    </journalContext.Provider>
  );
}

export {useJournal, JournalProvider}
