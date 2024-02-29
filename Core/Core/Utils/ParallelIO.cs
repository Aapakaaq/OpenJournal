using System.IO.Abstractions;

namespace Core.Utils;

public class ParallelIO : IParallelIO
{
  private readonly IIOUtils _IOUtils;

  private readonly IFileSystemDataAccess _fileSystem;

  // Expensive to spawn new thread
  private const int SINGLE_THREAD_FILE_LIMIT = 10;

  public ParallelIO(IFileSystemDataAccess fileSystem, IIOUtils ioUtils)
  {
    _fileSystem = fileSystem;
    _IOUtils = ioUtils;
  }

  /// <summary>
  /// Traverses through the directory specified by the given path and
  /// performs the specified action on each file or directory found. Including sub-directories
  /// </summary>
  /// <param name="directoryPath">The path of the directory to traverse.</param>
  /// <param name="action">The action to perform on each file found.
  ///   This action takes a string parameter representing the path of the current file or directory.</param>
  /// <exception cref="ArgumentException">Thrown when the path does not exists.</exception>
  public void TraverseDirectoryForEach(string directoryPath, Action<string> action)
  {
    if (!_IOUtils.DoesDirectoryExists(directoryPath))
    {
      throw new ArgumentException("The given directory does not exists", nameof(directoryPath));
    }

    // For root and the discovered sub-folders
    Stack<string> directories = new();
    directories.Push(directoryPath);

    while (directories.Count > 0)
    {
      // TODO: Idea: Dictionary of (filepath, content).
      // - After processing the UI tells user that the program could not access the file paths with null content

      string currentDirectory = directories.Pop();
      string[] subDirectories = { };
      string[] files = { };

      try
      {
        subDirectories = _fileSystem.GetDirectories(currentDirectory);
      }

      catch (UnauthorizedAccessException exception)
      {
        // TODO:
        Console.WriteLine(exception.Message);
        ;
      }
      // If another process has deleted the directory after name got retrieved
      catch (DirectoryNotFoundException exception)
      {
        // TODO:
        Console.WriteLine(exception.Message);
      }

      try
      {
        files = Directory.GetFiles(currentDirectory);
      }
      catch (UnauthorizedAccessException e)
      {
        Console.WriteLine(e.Message);
      }
      // If another process has deleted the directory after name got retrieved
      catch (DirectoryNotFoundException e)
      {
        // TODO:
        Console.WriteLine(e.Message);
      }
      catch (IOException e)
      {
        // TODO:
        Console.WriteLine(e.Message);
      }

      try
      {
        if (files.Length <= SINGLE_THREAD_FILE_LIMIT)
        {
          foreach (string file in files)
          {
            action(file);
          }
        }
        else
        {
          // TODO: Consider loop state
          Parallel.ForEach(files, action);
        }
      }
      catch (AggregateException ae)
      {
        ae.Handle((ex) =>
        {
          if (ex is UnauthorizedAccessException)
          {
            // TODO:
            Console.WriteLine(ex.Message);
            return true;
          }

          return false;
        });
      }

      foreach (string directory in subDirectories)
      {
        directories.Push(directory);
      }
    }
  }
}
