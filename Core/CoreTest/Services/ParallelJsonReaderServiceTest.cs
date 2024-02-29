using Core;
using Core.Utils;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace CoreTest;

[TestFixture]
public class ParallelJsonReaderServiceTest
{
  [SetUp]
  public void Setup()
  {
    _tempDirectory = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
    Directory.CreateDirectory(_tempDirectory);
    _fileSystemDataAccess = new FileSystemDataAccess();
    _parallelIo = new ParallelIO(_fileSystemDataAccess, new IOUtils(_fileSystemDataAccess));
    _sut = new ParallelJsonReaderService(_parallelIo, _fileSystemDataAccess);
  }

  [TearDown]
  public void Cleanup()
  {
    Directory.Delete(_tempDirectory, true);
  }

  private ParallelJsonReaderService _sut;
  private IParallelIO _parallelIo;
  private IFileSystemDataAccess _fileSystemDataAccess;

  private string _tempDirectory;


  [Test]
  //[Repeat(10)]
  [TestCase(1)]
  //[TestCase(100)]
  //[TestCase(10000)]
  [Parallelizable(ParallelScope.All)]
  [Category(TestCategory.INTEGRATION_TEST)]
  public void Read_ShouldReadAllJsonFiles(int numbFiles)
  {
    // Arrange
    var expectedFileCount = numbFiles;
    int actualFileCount;

    // Generate JSON files in the temporary directory
    for (var i = 0; i < numbFiles; i++)
      File.WriteAllText(Path.Combine(_tempDirectory, $"file_{i}.json"), "{\"id\": " + i + "}");

    // Act
    var result = _sut.ReadFromDirectory(_tempDirectory);
    actualFileCount = result.Count;

    // Assert
    Assert.AreEqual(expectedFileCount, actualFileCount);
  }


  private List<string> GenerateJObjects(int amount)
  {
    List<string> jsons = new();

    // Json fields
    var key = "id";

    for (var i = 0; i < amount; i++)
    {
      JObject json = new();
      json[key] = i;

      jsons.Add(json.ToString());
    }

    return jsons;
  }
}
