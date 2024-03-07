import {JSONValue} from "./Json";

type JournalComponent = {
    type: JournalComponentType
};


type JournalComponentType = ActionComponent| FreeTextComponent


type FreeTextComponent = {
  data: string
}

type ActionComponent = {
  [key in keyof string]: JSONValue
}


export {JournalComponent, JournalComponentType}




