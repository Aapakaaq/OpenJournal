using Core.Utils;
using NUnit.Framework;
using System;
using System.IO;
using System.IO.Abstractions;
using Core;

namespace CoreTest.Utils
{
  [TestFixture]
  public class TraverseDirectoryForEachTest
  {
    private ParallelIO _sut;
    private IFileSystemDataAccess _fileSystem;
    private IIOUtils _IOUtils;
    private string _tempDirectory;

    [SetUp]
    public void Setup()
    {
      _tempDirectory = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
      Console.WriteLine(_tempDirectory);
      Directory.CreateDirectory(_tempDirectory);

      _fileSystem = new FileSystemDataAccess();
      _IOUtils = new IOUtils(_fileSystem);
      _sut = new ParallelIO(_fileSystem, _IOUtils);
    }

    [TearDown]
    public void Cleanup()
    {
      if (Directory.Exists(_tempDirectory))
      {
        Directory.Delete(_tempDirectory, true);
      }
    }

    [Test]
    [Repeat(10)]
    [TestCase(1)]
    [TestCase(100)]
    [TestCase(10000)]
    [Category(TestCategory.SYSTEM_TEST)]
    public void TraverseDirectoryForEach_ShouldCallActionForAllFiles(int numbFiles)
    {
      // Arrange
      for (int i = 0; i < numbFiles; i++)
      {
        string filePath = Path.Combine(_tempDirectory, $"file_{i}.txt");
        File.WriteAllText(filePath, $"Content of file {i}");
      }

      int expectedFileCount = numbFiles;
      int actualFileCount = 0;

      // Act
      _sut.TraverseDirectoryForEach(_tempDirectory, (file) => { Interlocked.Increment(ref actualFileCount); });

      // Assert
      Assert.AreEqual(expectedFileCount, actualFileCount);
    }
  }
}
