import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { serviceCollection } from "../../inversify.config";
import { TYPES } from "../../Shared/types/types";
import { JSONObject } from '../../Shared/types/Json';

describe('SYSTEM_TEST JsonFileReaderService', () => {
  let sut: IFileReader<JSONObject>;
  let tempDirPath: string;
  const TEST_FILES = [
    { fileName: 'file1.json', content: { key: "mario" } },
    { fileName: 'file2.json', content: { key: "luigi" } }
  ];

  beforeAll(() => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    tempDirPath = `${tempDir}/`;
    console.log(tempDirPath)
    TEST_FILES.forEach(({ fileName, content }) => {
      fs.writeFileSync(path.join(tempDir, fileName), JSON.stringify(content));
    });

    sut = serviceCollection.get<IFileReader<JSONObject>>(TYPES.IFileReader);
  });

  afterAll(() => {
    //fs.rmSync(tempDirPath, { recursive: true, force: true });
  });

  it('should read JSON files from directory', async () => {
    // Arrange
    const expectedLength: number = TEST_FILES.length;

    // Act
    const filesContent: JSONObject[] = await sut.readFilesFromDirectoryAsync(tempDirPath);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    fs.writeFileSync(path.join(tempDir, "aaaa"), JSON.stringify(filesContent[0]));
    console.log(filesContent)
    // Assert
    expect(filesContent).toHaveLength(expectedLength);
    TEST_FILES.forEach(({ content }) => {
      expect(filesContent).toContainEqual(content);
    });
  });

  it('should throw error if directory does not exist', async () => {
    // Arrange
    const nonExistentDir = path.join(tempDirPath, 'nonexistent');

    // Act & Assert
    await expect(sut.readFilesFromDirectoryAsync(nonExistentDir)).rejects.toThrowError();
  });
});
