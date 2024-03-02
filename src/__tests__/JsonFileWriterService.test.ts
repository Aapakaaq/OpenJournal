import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import {serviceCollection} from "../renderer/inversify.config";
import { IFileWriter } from '../renderer/services/IFileWriter';
import {TYPES} from "../renderer/types/types";

describe('[SYSTEM_TEST] JsonFileWriterService - writeFile', () => {
  let sut: IFileWriter;
  let tempDirPath: string;
  const FAKE_CONTENT: string = '{"key": "test"}';
  const FAKE_FILE_NAME: string = 'testFile.json';

  beforeAll(() => {
    const tempDir: string = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    tempDirPath = `${tempDir}/`;
    sut = serviceCollection.get<IFileWriter>(TYPES.IFileWriter);
  });

  afterAll(() => {
    fs.rmSync(tempDirPath, { recursive: true, force: true });
  });

  it('should write content to a file', async () => {
    // Arrange
    const filePath: string = path.join(tempDirPath, FAKE_FILE_NAME);
    const expectedContent: any = JSON.parse(FAKE_CONTENT);

    // Act
    const writeResult = await sut.writeFile(filePath, FAKE_CONTENT);

    // Assert
    expect(writeResult).toBeTruthy();

    const fileExists: boolean = fs.existsSync(filePath);
    expect(fileExists).toBeTruthy();

    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const fileContentJsonFormat: any = JSON.parse(fileContent);
    expect(fileContentJsonFormat).toEqual(expectedContent);
  });

  it('should return false if unable to write to file', async () => {
    // Arrange

    const filePath: string = '/nonexistent/testFile.json';

    // Act & Assert
    await expect(sut.writeFile(filePath, FAKE_CONTENT)).rejects.toThrowError();
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).toBeFalsy();
  });
});
