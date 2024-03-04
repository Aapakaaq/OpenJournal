import {createContext, ReactNode, useState} from 'react';
import {JournalContextType} from '../../Shared/types/JournalEntry'
import {JournalComponent, JournalComponentType} from '../../Shared/types/JournalComponent';
import {JSONObject} from "../../Shared/types/Json";
import {JournalModel} from "../../Shared/models/JournalModel";

interface IProps {
  children: ReactNode;
}

const initialState: JournalModel = {
  filePath: '',
  metaData: new Map<string, JSONObject>(),
  components: new Map<JournalComponentType, JournalComponent>(),
}

export const JournalContext = createContext<JournalContextType | null>(null)

export function JournalProvider({children}: IProps) {
  const [journal, setJournal] = useState(initialState);

  function getJournal(): JournalModel {
    return journal
  }

  /*
    function addComponent<TComponent extends JournalComponent, TArgs extends any[]>
        (component: new (...args: TArgs) => TComponent, ...args: TArgs): void{
            const instance: TComponent = new component(...args);


            const newComponentsSet = new
                SetWithContentEquality<JournalComponentType, JournalComponent>(
                    component => component.type,
                    journal.componentSet.values()

            );

            newComponentsSet.add(instance);

            setJournal((prevJournal: IJournal) => ({
                metaData: prevJournal.metaData,
                componentSet: newComponentsSet

            }));
    };

    function getComponent<TComponent extends JournalComponent>
        (componentType: JournalComponentType): TComponent | undefined {
        return journal.componentSet.getValueByKey(componentType) as TComponent | undefined;
    }

*/
  return (
    <JournalContext.Provider value={{getJournal}}>
      {children}
    </JournalContext.Provider>
  )
}
