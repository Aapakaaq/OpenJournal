import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { JsonFileReaderService } from "../renderer/services/JsonFileReaderService";
import { FileSystemDataAccess } from "../renderer/dataAccess/FileSystemDataAccess";

describe('JsonFileReaderService', () => {
  let fileReaderService: JsonFileReaderService;
  let tempDirPath: string;
  const TEST_FILES = [
    { fileName: 'file1.json', content: '{"key": "mario"}' },
    { fileName: 'file2.json', content: '{"key": "luigi"}' }
  ];

  beforeAll(() => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    tempDirPath = `${tempDir}/`;
    TEST_FILES.forEach(({ fileName, content }) => {
      fs.writeFileSync(path.join(tempDir, fileName), content);
    });

    const fileSystemDataAccess = new FileSystemDataAccess();
    fileReaderService = new JsonFileReaderService(fileSystemDataAccess);
  });

  afterAll(() => {
    fs.rmSync(tempDirPath, { recursive: true, force: true });
  });

  it('[SYSTEM_TEST] should read JSON files from directory', async () => {
    // Arrange
    const expectedLength: number = TEST_FILES.length;

    // Act
    const filesContent: string[] = await fileReaderService.readFilesFromDirectoryAsync(tempDirPath);

    // Assert
    expect(filesContent).toHaveLength(expectedLength);
    TEST_FILES.forEach(({ content }) => {
      expect(filesContent).toContain(content);
    });
  });

  it('should throw error if directory does not exist', async () => {
    // Arrange
    const nonExistentDir = path.join(tempDirPath, 'nonexistent');

    // Act & Assert
    await expect(fileReaderService.readFilesFromDirectoryAsync(nonExistentDir)).rejects.toThrowError();
  });
});
