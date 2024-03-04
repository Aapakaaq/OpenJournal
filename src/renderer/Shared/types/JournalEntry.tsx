import { SetWithContentEquality } from "../../client/utils/SetWithContentEquality";
import { JournalComponent, JournalComponentType } from "./JournalComponent";
import {JSONObject} from "./Json";
import {JournalModel} from "../models/JournalModel";



export type JournalContextType = {
    getJournal(): JournalModel;
    //addComponent<TComponent extends JournalComponent, TArgs extends any[]>
    //    (component: new (...args: TArgs) => TComponent, ...args: TArgs): void;
    //getComponent<TComponent extends JournalComponent>(componentType: JournalComponentType): TComponent | undefined
    //addComponent<TComponent extends JournalComponent>(component: TComponent): void
    // updateComponent(componentType: JournalComponentType, component: IJournalComponent): IJournal;
    // removeComponent(componentType: JournalComponentType): IJournal;
}
