import {IJournalService} from "../services/IJournalService";
import {serviceCollection} from "../../inversify.config";
import {IFileWriter} from "../services/IFileWriter";
import {JSONObject} from "../../Shared/types/Json";
import {ServiceTypes} from "../ServiceTypes";
import { injectable } from "inversify";
import {JournalModel} from "../models/JournalModel";
import {JournalComponentType} from "../../Shared/types/JournalComponent";

// Mock implementations for testing
const fakeJsonObject1: JSONObject = {
  filePath: '/path/to/file',
  metaData_foo: { value: 'metaDataValue1' },
  metaData_bar: { value: 'metaDataValue2' },
  ACTION_COMPONENT: { value: 'mario' },
  INPUT_COMPONENT: { value: 'luigi' }
};

const fakeJsonObject2: JSONObject = {
  filePath: '/path/to/file2',
  metaData_foo: { value: 'metaDataValue1' },
  ACTION_COMPONENT: { value: 'peach' },
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

  it('should return an array of JournalModel objects', async () => {
    // Arrange
    const expectedFilePath1: string = '/path/to/file';
    const expectedMetaData1: Map<string, JSONObject> = new Map<string, JSONObject>([
      ['foo', { value: 'metaDataValue1' }],
      ['bar', { value: 'metaDataValue2' }]
    ]);
    const expectedComponents1 = new Map<JournalComponentType, JSONObject>([
      ['ACTION_COMPONENT', { value: 'mario' }],
      ['INPUT_COMPONENT', { value: 'luigi' }]
    ]);

    const expectedJournal1: JournalModel = {
      filePath: expectedFilePath1,
      metaData: expectedMetaData1,
      components: expectedComponents1
    };
    const expectedFilePath2: string = '/path/to/file2';
    const expectedMetaData2: Map<string, JSONObject> = new Map<string, JSONObject>([
      ['foo', {value: 'metaDataValue1'}]
    ]);
    const expectedComponents2 = new Map<JournalComponentType, JSONObject>([
      ['ACTION_COMPONENT', { value: 'peach' }],
    ])
    const expectedJournal2: JournalModel = {
      filePath: expectedFilePath2,
      metaData: expectedMetaData2,
      components: expectedComponents2
    }

    const expectedResults: JournalModel[] = [expectedJournal1, expectedJournal2];

    const fakePath: string = '/path/to/file';

    // Act
    const actualResult: JournalModel[] = await sut.getAllJournalsFromDirectory(fakePath);

    // Assert
    expect(actualResult).toEqual(expectedResults);
  })

  it('should read all json files from directory', async () => {
    // Arrange
    const fakeDirectoryPath: string ='/path/to/';

    const expectedFilePath1: string = '/path/to/file';
    const expectedMetaData1: Map<string, JSONObject> = new Map<string, JSONObject>([
      ['foo', { value: 'metaDataValue1' }],
      ['bar', { value: 'metaDataValue2' }]
    ]);
    const expectedComponents1 = new Map<JournalComponentType, JSONObject>([
      ['ACTION_COMPONENT', { value: 'mario' }],
      ['INPUT_COMPONENT', { value: 'luigi' }]
    ]);

    const expectedJournal1: JournalModel = {
      filePath: expectedFilePath1,
      metaData: expectedMetaData1,
      components: expectedComponents1
    };
    const expectedFilePath2: string = '/path/to/file2';
    const expectedMetaData2: Map<string, JSONObject> = new Map<string, JSONObject>([
      ['foo', {value: 'metaDataValue1'}]
    ]);
    const expectedComponents2 = new Map<JournalComponentType, JSONObject>([
      ['ACTION_COMPONENT', { value: 'peach' }],
    ])
    const expectedJournal2: JournalModel = {
      filePath: expectedFilePath2,
      metaData: expectedMetaData2,
      components: expectedComponents2
    }

    const expectedResults: JournalModel[] = [expectedJournal1, expectedJournal2];

    // Act
    const actualResults: JournalModel[] = await sut.getAllJournalsFromDirectory(fakeDirectoryPath);

    // Assert
    expect(actualResults).toEqual(expectedResults);

  })
});
