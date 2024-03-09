import {JSONObject, JSONValue} from "../types/Json";


type MetaData = { [key: string]: JSONValue}

type JournalModel = {
  filePath: string;
  metaData: MetaData,
  textContent: string,
  actions?: Actions
}

type Actions = {
  [key in keyof string]: JSONValue
}


// TODO: validation check3
function journalMapToModel(jsonObject: JSONObject): JournalModel {
  const filePath: string = jsonObject['filePath'] as string;
  const metaData: MetaData = jsonObject['metaData'] as MetaData;
  const textContent: string = jsonObject['textContent'] as string;
  const actions: Actions = jsonObject['actions'] as Actions;
  const journalModel: JournalModel = {
    filePath: filePath,
    metaData: metaData,
    textContent: textContent,
    actions: actions
  };

  return journalModel;
}


export {journalMapToModel, MetaData, JournalModel, Actions}
