import {JournalComponentType} from "../types/JournalComponent";
import {JSONObject, JSONValue} from "../types/Json";

export interface JournalModel {
  filePath: string;
  metaData: Map<string, JSONObject>;
  components: Map<JournalComponentType, JSONObject>;
}

export function  JournalMapToModel(jsonObject: JSONObject): JournalModel{
  const filePath: string = jsonObject["filePath"] as string;
  const metaData: Map<string, JSONObject> = new Map<string, JSONObject>();
  const components: Map<JournalComponentType, JSONObject> = new Map<JournalComponentType, JSONObject>();

  for (const key in jsonObject) {
    if (key === "filePath") continue;

    const value: JSONValue = jsonObject[key];

    if (key.startsWith("metaData_")) {
      metaData.set(key.substring(9), value as JSONObject);
    } else {
      components.set(key as JournalComponentType, value as JSONObject);
    }
  }

  return { filePath, metaData, components };
}
