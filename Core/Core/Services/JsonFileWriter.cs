using System.IO.Abstractions;
using Core.Utils;
using FileSystem = Microsoft.VisualBasic.FileIO.FileSystem;

namespace Core;

public class JsonFileWriter : IFileWriter
{
  private readonly IFileSystemDataAccess _fileSystem;
  private readonly IIOUtils _ioUtils;
  private readonly IJsonValidator _jsonValidator;

  public JsonFileWriter(IFileSystemDataAccess fileSystem, IIOUtils ioUtils, IJsonValidator jsonValidator)
  {
    _fileSystem = fileSystem;
    _ioUtils = ioUtils;
    _jsonValidator = jsonValidator;
  }


  /// <summary>
  /// Writes content to a file at the specified path. It replaces the file if it exists
  /// </summary>
  /// <param name="path">The path to the file where content will be written.</param>
  /// <param name="content">The content to be written to the file.</param>
  /// <returns>
  ///   <c>true</c> if the content was successfully written to the file; otherwise, <c>false</c>.
  /// </returns>
  /// <exception cref="ArgumentOutOfRangeException">
  ///   Thrown when <paramref name="path"/> is is a invalid path. or not a valid json file.
  /// </exception>
  /// <exception cref="ArgumentNullException">
  ///   Thrown when <paramref name="path"/> is null or empty
  /// </exception>
  public bool WriteFile(string path, string content)
  {
    if (string.IsNullOrEmpty(path))
      throw new ArgumentNullException(nameof(path), "Path cannot be null or empty.");

    if (!_fileSystem.GetPathExtension(path).Equals(".json", StringComparison.OrdinalIgnoreCase))
      throw new ArgumentOutOfRangeException(nameof(path), "Not a json file");

    if (!_ioUtils.IsValidPath(path, allowRelativePaths: true))
    {
      throw new ArgumentOutOfRangeException(nameof(path), "Invalid path");
    }

    try
    {
      if (!_jsonValidator.IsValid(content))
      {
        throw new ArgumentOutOfRangeException(nameof(content), "not valid json content");
      }

      _fileSystem.WriteAllText(path, content);

      return true;
    }
    // TODO: Better exception handling
    catch (Exception ex)
    {
      Console.WriteLine($"Error writing file: {ex.Message}");
      return false;
    }
  }
}
