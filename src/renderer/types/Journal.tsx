import { SetWithContentEquality } from "../utils/SetWithContentEquality";
import { JournalComponent, JournalComponentEntity } from "./JournalComponent";


export interface IJournal {
    id: number;
    componentSet: SetWithContentEquality<JournalComponentEntity, JournalComponent>;
}

export type JournalContextType = {
    getJournal(): IJournal;
    addComponent<TComponent extends JournalComponent, TArgs extends any[]>
        (component: new (...args: TArgs) => TComponent, ...args: TArgs): void;
    getComponent<TComponent extends JournalComponent>(componentType: JournalComponentEntity): TComponent | undefined
    addComponent<TComponent extends JournalComponent>(component: TComponent): void
    // updateComponent(componentType: JournalComponentType, component: IJournalComponent): IJournal;
    // removeComponent(componentType: JournalComponentType): IJournal;
}
