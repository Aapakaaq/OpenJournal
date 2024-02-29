using Core.Utils;
using NUnit.Framework;
using System;
using System.IO;
using System.IO.Abstractions;
using Core;

namespace CoreTest.Utils
{
  [TestFixture]
  public class IOUtilsTest
  {
    private IOUtils _sut;
    private string _tempDirectory;
    private IFileSystemDataAccess _fileSystem;

    [SetUp]
    public void Setup()
    {
      _tempDirectory = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
      Directory.CreateDirectory(_tempDirectory); // Create a temporary folder for testing


      _fileSystem = new FileSystemDataAccess();
      _sut = new IOUtils(_fileSystem);
    }

    [TearDown]
    public void TearDown()
    {
      Directory.Delete(_tempDirectory, true); // Delete the temporary folder and its contents after the test
    }

    [Test]
    public void DoesDirectoryExists_WithValidPath_ReturnsTrue()
    {
      // Arrange
      string validPath = _tempDirectory;

      // Act
      bool result = _sut.DoesDirectoryExists(validPath);

      // Assert
      Assert.IsTrue(result);
    }

    [Test]
    [Category(TestCategory.SYSTEM_TEST)]
    public void DoesDirectoryExists_WithInvalidPath_ThrowsArgumentException()
    {
      // Arrange
      string invalidPath = @"invalid path to Mushroom Kingdom";

      // Act & Assert
      Assert.Throws<ArgumentException>(() => _sut.DoesDirectoryExists(invalidPath));
    }

    [TestCase(@"/C:\temp", true, ExpectedResult = true)]
    [TestCase(@"/temp/files", true, ExpectedResult = true)]
    [TestCase(@"temp", false, ExpectedResult = false)]
    [Category(TestCategory.SYSTEM_TEST)]
    public bool IsValidPath_ValidatesPathCorrectly(string path, bool allowRelativePaths)
    {
      // Arrange & Act
      bool result = _sut.IsValidPath(path, allowRelativePaths);

      // Assert
      return result;
    }
  }
}
