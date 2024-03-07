import {JournalModel} from "../../Shared/models/JournalModel";

export type JournalContextType = {
  getJournalModel(): JournalModel;
  //addComponent<TComponent extends JournalComponent, TArgs extends any[]>
  //(component: new (...args: TArgs) => TComponent, ...args: TArgs): void;


}
