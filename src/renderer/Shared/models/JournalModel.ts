import { JournalComponentType } from "../types/JournalComponent";
import {JSONObject, JSONValue} from "../types/Json";




export interface JournalModel {
  filePath: string;
  metaData: {
    [key: string]: JSONValue
  },
  components: {
    [key in keyof JournalComponentType]: JournalComponentType[key]
  },
}

// TODO: Validation check of component types
export function JournalMapToModel(jsonObject: JSONObject): JournalModel {
  const filePath: string = jsonObject['filePath'] as string;
  const metaData: JSONObject = jsonObject['metaData'] as JSONObject;
  const components = jsonObject['components'] as {
    [key in keyof JournalComponentType]: JournalComponentType[key]
  };


  const journalModel: JournalModel = {
    filePath: filePath,
    metaData: metaData,
    components: components,
  };

  return journalModel;
}
