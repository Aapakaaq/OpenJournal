import {JournalComponentType} from "../types/JournalComponent";
import {JSONObject, JSONValue} from "../types/Json";

export interface JournalModel {
  filePath: string;
  metaData: {
    [key: string]: JSONValue
  },
  // TODO: Consider use the custom type
  //  'SetWithObjectEquality' instead
  components: {
    [key in keyof JournalComponentType]: JSONValue
  },
}


export function JournalMapToModel(jsonObject: JSONObject): JournalModel {
  const filePath = jsonObject['filePath'] as string;
  const metaData = jsonObject['metaData'] as JSONObject;
  const components = jsonObject['components'] as {
    [key in keyof JournalComponentType]: JSONValue
  };

  const journalModel: JournalModel = {
    filePath: filePath,
    metaData: metaData,
    components: components,
  };

  return journalModel;
}
