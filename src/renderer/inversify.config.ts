import { Container } from "inversify";
import "reflect-metadata";

import {IFileSystemDataAccess} from "./server/dataAccess/IFileSystemDataAccess";
import { TYPES } from "./Shared/types/types";
import {FileSystemDataAccess} from "./server/dataAccess/FileSystemDataAccess";
import {JsonFileReaderService} from "./server/services/JsonFileReaderService";
import {IFileWriter} from "./server/services/IFileWriter";
import {JsonFileWriterService} from "./server/services/JsonFileWriterService";
import {JSONObject} from "./Shared/types/Json";



const serviceCollection: Container = new Container();
serviceCollection.bind<IFileSystemDataAccess>(TYPES.IFileSystemDataAccess).to(FileSystemDataAccess);
serviceCollection.bind<IFileReader<JSONObject>>(TYPES.IFileReader).to(JsonFileReaderService);
serviceCollection.bind<IFileWriter>(TYPES.IFileWriter).to(JsonFileWriterService);

export { serviceCollection };
