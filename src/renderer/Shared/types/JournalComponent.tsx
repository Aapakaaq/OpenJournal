import {JSONValue} from "./Json";

type JournalComponent = {
    type: JournalComponentType
};


type JournalComponentType = ActionComponent| TextAreaInputComponent


type TextAreaInputComponent = {
  data: string
}

type ActionComponent = {
  [key in keyof string]: JSONValue
}


export {JournalComponent, JournalComponentType}




