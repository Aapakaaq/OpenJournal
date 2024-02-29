
import { ReactNode, createContext, useState } from 'react';
import { IJournal, JournalContextType } from '../types/Journal'
import { JournalComponent, JournalComponentEntity } from '../types/JournalComponent';
import { SetWithContentEquality } from '../utils/SetWithContentEquality';

interface IProps {
  children: ReactNode;
}

const initialState: IJournal = {
    id: 0,
    componentSet: new SetWithContentEquality<JournalComponentEntity, JournalComponent>
        (component => component.type),
}

export const JournalContext = createContext<JournalContextType | null>(null)

export function JournalProvider({children}: IProps ){
    const [journal, setJournal] = useState(initialState);

    function getJournal(): IJournal {return journal}

    function addComponent<TComponent extends JournalComponent, TArgs extends any[]>
        (component: new (...args: TArgs) => TComponent, ...args: TArgs): void{
            const instance: TComponent = new component(...args);

            const newComponentsSet = new
                SetWithContentEquality<JournalComponentEntity, JournalComponent>(
                    component => component.type,
                    journal.componentSet.values()

            );

            newComponentsSet.add(instance);

            setJournal((prevJournal: IJournal) => ({
                id: prevJournal.id,
                componentSet: newComponentsSet

            }));
    };

    function getComponent<TComponent extends JournalComponent>
        (componentType: JournalComponentEntity): TComponent | undefined {
        return journal.componentSet.getValueByKey(componentType) as TComponent | undefined;
    }


    return(
        <JournalContext.Provider value={{getJournal, addComponent, getComponent }}>
            {children}
        </JournalContext.Provider>
    )
}
