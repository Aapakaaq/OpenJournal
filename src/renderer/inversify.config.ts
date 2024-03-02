import { Container } from "inversify";
import "reflect-metadata";

import {IFileSystemDataAccess} from "./dataAccess/IFileSystemDataAccess";
import { TYPES } from "./types/types";
import {FileSystemDataAccess} from "./dataAccess/FileSystemDataAccess";
import {JsonFileReaderService} from "./services/JsonFileReaderService";
import {IFileWriter} from "./services/IFileWriter";
import {JsonFileWriterService} from "./services/JsonFileWriterService";



const serviceCollection: Container = new Container();
serviceCollection.bind<IFileSystemDataAccess>(TYPES.IFileSystemDataAccess).to(FileSystemDataAccess);
serviceCollection.bind<IFileReader<string>>(TYPES.IFileReader).to(JsonFileReaderService);
serviceCollection.bind<IFileWriter>(TYPES.IFileWriter).to(JsonFileWriterService);

export { serviceCollection };
