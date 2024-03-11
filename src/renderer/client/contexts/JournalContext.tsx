import {createContext, Dispatch, ReactNode, useCallback, useContext, useState} from 'react';
import {JournalModel} from "../../Shared/models/JournalModel";
import { JournalContextType } from '../types/JournalContextType';
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

  function updateMetaData(key: string, value: JSONValue): void {
    setJournalModel(prevState => ({
      ...prevState,
      metaData: {
        ...prevState.metaData,
        [key]: value,
      },
    }));
  }22

  function updateActions(key: string, value: JSONValue): void {
    setJournalModel(prevState => ({
      ...prevState,
      actions: {
        ...prevState.actions,
        [key]: value,
      }
    }));
  }

  return (
    <JournalContext.Provider value={{ getJournalModel, updateText, updateMetaData, updateActions}}>
      {children}
    </JournalContext.Provider>
  );
}

export{useJournal, JournalProvider}
