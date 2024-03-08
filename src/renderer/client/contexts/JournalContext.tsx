import {createContext, Dispatch, ReactNode, useCallback, useContext, useState} from 'react';
import {JournalModel} from "../../Shared/models/JournalModel";
import { JournalContextType } from '../types/JournalContextType';

interface IProps {
  children: ReactNode;
}

const initialState: JournalModel = {
  // TODO: SHOULD BE SET ON ONBOARDING. TMP FOR DEVELOPMENT
  filePath: '/tmp/test.json',
  metaData: {tags: ""},
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

function JournalProvider({children}: IProps ) {
  const [journalModel, setJournalModel] = useState<JournalModel>(initialState);

  function getJournalModel(): JournalModel {
    return journalModel
  }

  function updateText(text: string): void {
    setJournalModel(prevState => ({
      ...prevState,
      textContent: text
    }));
  }

  return (
    <JournalContext.Provider value={{ getJournalModel, updateText}}>
      {children}
    </JournalContext.Provider>
  );
}

export{useJournal, JournalProvider}
