import {IJournalService} from "../services/IJournalService";
import {serviceCollection} from "../../inversify.config";
import {IFileWriter} from "../services/IFileWriter";
import {JSONObject} from "../../Shared/types/Json";
import {ServiceTypes} from "../ServiceTypes";
import { injectable } from "inversify";

// Mock implementations for testing
@injectable()
class MockFileWriter implements IFileWriter {
  async writeFile(filePath: string, data: string): Promise<boolean> {
    return true;
  }
}
@injectable()
class MockFileReader implements IFileReader<JSONObject> {
  async readFilesFromDirectoryAsync(path: string): Promise<JSONObject[]> {
    return [{key: "mario"}];
  }
}

describe('INTEGRATION_TEST JournalService', () => {
  let sut: IJournalService


  beforeAll(() => {
    serviceCollection.rebind(ServiceTypes.IFileReader).to(MockFileReader);
    serviceCollection.rebind(ServiceTypes.IFileWriter).to(MockFileWriter);
    serviceCollection.snapshot();

    sut = serviceCollection.get<IJournalService>(ServiceTypes.IJournalService);
  })

  afterEach(() => {
    serviceCollection.restore();
  });

  it('should write file to disk', async () => {
    // Arrange
    const fakeJsonString: string = '{"filePath": "dummyPath", "metaData": {}, "components": []}';

    // Act
    const actualResult: boolean = await sut.saveJournalJONString(fakeJsonString);

    // Act
    expect(actualResult).toBeTruthy();
  })
});
