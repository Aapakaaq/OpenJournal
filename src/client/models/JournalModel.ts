import {JSONObject, JSONValue} from "../types/Json.ts";


type MetaData = { [key: string]: JSONValue}

type JournalModel = {
  textContent: string,
  actions?: Actions,
  tags: string[],
}

type Actions = {
  [action: string]: {
    dueDate: string,
  }
}


// TODO: validation check3
function journalMapToModel(jsonObject: JSONObject): JournalModel {
  const tags: string[] = jsonObject['tags'] as string[];
  const textContent: string = jsonObject['textContent'] as string;
  const actions: Actions | null = jsonObject['actions'] as Actions;
  const journalModel: JournalModel = {
    tags: tags,
    textContent: textContent,
    actions: actions
  };

  return journalModel;
}


export {journalMapToModel, MetaData, JournalModel, Actions}
