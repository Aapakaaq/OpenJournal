import { injectable } from "inversify";

interface IJournalDataAccess {

}

@injectable()
export class JournalDataAccess implements IJournalDataAccess {


  constructor(dbPath: string) {

  }
}
