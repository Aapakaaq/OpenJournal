import {IJournalService} from "../services/IJournalService";
import {serviceCollection} from "../../inversify.config";
import {IFileWriter} from "../services/IFileWriter";
import {JSONObject, JSONValue} from "../../Shared/types/Json";
import {ServiceTypes} from "../ServiceTypes";
import {injectable} from "inversify";
import {Actions, JournalModel, MetaData} from "../../Shared/models/JournalModel";

// Mock implementations for testing
const fakeJsonObject1: JSONObject = {
  filePath: '/path/to/file',
  metaData: {
    foo: 'metaDataValue1',
    bar: 'metaDataValue2'
  },
  textContent: "mario",
  actions: {
    foo: 42,
    bar: "luigi"
  }
};

const fakeJsonObject2: JSONObject = {
  filePath: '/path/to/file',
  metaData: {
    foo: 'metaDataValue1',
  },
  textContent: "peach",
};

@injectable()
class MockFileWriter implements IFileWriter {
  async writeFile(filePath: string, data: string): Promise<boolean> {
    return true;
  }
}

@injectable()
class MockFileReader implements IFileReader<JSONObject> {

  async readFilesFromDirectoryAsync(path: string): Promise<JSONObject[]> {
    return [fakeJsonObject1, fakeJsonObject2];
  }
}

describe('INTEGRATION_TEST JournalService', () => {
  let sut: IJournalService

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    serviceCollection.snapshot();
    serviceCollection.rebind(ServiceTypes.IFileReader).to(MockFileReader);
    serviceCollection.rebind(ServiceTypes.IFileWriter).to(MockFileWriter);

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

  it('INTEGRATION_TEST should return an array of JournalModel objects', async () => {
    // Arrange
    const fakePath: string = '/path/to/'
    const expectedJournal1: JournalModel = {
      filePath: fakeJsonObject1['filePath'] as string,
      metaData: fakeJsonObject1['metaData'] as MetaData,
      textContent: fakeJsonObject1['textContent'] as string,
      actions: fakeJsonObject1['actions'] as Actions
    };

    const expectedJournal2: JournalModel = {
      filePath: fakeJsonObject2['filePath'] as string,
      metaData: fakeJsonObject2['metaData'] as MetaData,
      textContent: fakeJsonObject2['textContent'] as string,
      actions: fakeJsonObject2['actions'] as Actions
    };

    const expectedResults: JournalModel[] = [expectedJournal1, expectedJournal2];

    // Act
    const actualResult: JournalModel[] = await sut.getAllJournalsFromDirectory(fakePath);

    // Assert
    expect(actualResult).toEqual(expectedResults);
  })
});
