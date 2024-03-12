import { Container } from "inversify";
import "reflect-metadata";

import {IFileSystemDataAccess} from "./server/dataAccess/IFileSystemDataAccess";
import { ServiceTypes } from "./server/ServiceTypes";
import {FileSystemDataAccess} from "./server/dataAccess/FileSystemDataAccess";
import {JsonFileReaderService} from "./server/services/JsonFileReaderService";
import {IFileWriter} from "./server/services/IFileWriter";
import {JsonFileWriterService} from "./server/services/JsonFileWriterService";
import {JSONObject} from "./Shared/types/Json";
import {IJournalService} from "./server/services/IJournalService";
import {JournalService} from "./server/services/JournalService";



const serviceCollection: Container = new Container();
serviceCollection.bind<IFileSystemDataAccess>(ServiceTypes.IFileSystemDataAccess).to(FileSystemDataAccess);
serviceCollection.bind<IFileReader<JSONObject>>(ServiceTypes.IFileReader).to(JsonFileReaderService);
serviceCollection.bind<IFileWriter>(ServiceTypes.IFileWriter).to(JsonFileWriterService);
serviceCollection.bind<IJournalService>(ServiceTypes.IJournalService).to(JournalService);

export { serviceCollection };
