using Core;
using Core.Utils;
using Moq;
using NUnit.Framework;

namespace CoreTest.Services
{
  [TestFixture]
  public class JsonFileWriterTest
  {
    private JsonFileWriter _sut;
    private Mock<IFileSystemDataAccess> _fileSystemMock;
    private IIOUtils _ioUtils;
    private IJsonValidator _jsonValidator;

    [SetUp]
    public void Setup()
    {
      _fileSystemMock = new Mock<IFileSystemDataAccess>();
      _fileSystemMock.Setup(fs => fs.GetPathExtension(It.IsAny<string>())).Returns(".json");
      _fileSystemMock.Setup(fs => fs.DoesDirectoryExists(It.IsAny<string>())).Returns(true);
      _fileSystemMock.Setup(fs => fs.IsPathRooted(It.IsAny<string>())).Returns(true);
      _ioUtils = new IOUtils(_fileSystemMock.Object);
      _jsonValidator = new NewtonsoftValidator();
      _sut = new JsonFileWriter(_fileSystemMock.Object, _ioUtils, _jsonValidator);
    }

    [Test]
    [Category(TestCategory.INTEGRATION_TEST)]
    public void WriteFile_ShouldWriteOnce_ReturnsTrue()
    {
      // Arrange
      string fakeFileName = "mario.json";
      string fakeContent = "{\"friend\": \"me\"}";
      string filePath = $"/{fakeFileName}";

      // Act
      bool result = _sut.WriteFile(filePath, fakeContent);

      // Assert
      Assert.IsTrue(result);
      _fileSystemMock.Verify(fs => fs.WriteAllText(filePath, fakeContent), Times.Once);
    }
  }
}
