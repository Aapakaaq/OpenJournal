using System.IO.Abstractions;

namespace Core.Utils;

public interface IIOUtils
{
  bool DoesDirectoryExists(string path);
  bool IsValidPath(string path, bool allowRelativePaths);
}

public class IOUtils : IIOUtils
{
  private readonly IFileSystemDataAccess _fileSystem;

  public IOUtils(IFileSystemDataAccess fileSystem)
  {
    _fileSystem = fileSystem;
  }

  /// <summary>
  /// Determines whether the specified directory exists.
  /// </summary>
  /// <param name="path">The path to the directory to check.</param>
  /// <returns>
  ///   <c>true</c> if the directory exists; otherwise, <c>false</c>.
  /// </returns>
  /// <exception cref="ArgumentException">
  ///   Thrown when <paramref name="path"/> is an invalid path
  /// </exception>
  public bool DoesDirectoryExists(string path)
  {
    if (!IsValidPath(path, allowRelativePaths: true))
    {
      throw new ArgumentException("Invalid path", "path");
    }

    return _fileSystem.DoesDirectoryExists(path);
  }

  /// <summary>
  /// Checks whether the given path is valid.
  /// </summary>
  /// <param name="path">The path to be validated.</param>
  /// <param name="allowRelativePaths">
  ///   <c>true</c> to allow relative paths; otherwise, <c>false</c>.
  /// </param>
  /// <returns>
  ///   <c>true</c> if the path is valid; otherwise, <c>false</c>.
  /// </returns>
  public bool IsValidPath(string path, bool allowRelativePaths)
  {
    try
    {
      if (allowRelativePaths)
      {
        return _fileSystem.IsPathRooted(path);
      }

      string? root = _fileSystem.GetPathRoot(path);
      // TODO: Not all mounted drivers ends with a letter
      Console.Write(root);
      return string.IsNullOrEmpty(root.Trim('\\', '/')) == false;
    }
    // TODO:
    catch (Exception ex)
    {
      Console.WriteLine((ex));
      return false;
    }
  }
}
