using System.Collections.Concurrent;
using System.IO.Abstractions;
using Core.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Core;

public class ParallelJsonReaderService : IFileReader<JObject>
{
  private readonly IParallelIO _parallelIO;
  private readonly IFileSystemDataAccess _fileSystem;

  public ParallelJsonReaderService(IParallelIO parallelIo, IFileSystemDataAccess fileSystem)
  {
    _parallelIO = parallelIo;
    _fileSystem = fileSystem;
  }

  /// <summary>
  /// Reads JSON data from the given file path and returns a concurrent queue of JObject instances.
  /// </summary>
  /// <param name="path">The file path from which to read JSON data.</param>
  /// <returns>A ConcurrentQueue containing JObject instances parsed from the JSON data.</returns>
  public ConcurrentQueue<JObject> ReadFromDirectory(string path)
  {
    ConcurrentQueue<JObject?> jsonFiles = new();

    try
    {
      _parallelIO.TraverseDirectoryForEach(path, filePath =>
      {
        JObject? jsonObject = readJsonFile(filePath, _fileSystem);
        if (jsonObject != null)
        {
          jsonFiles.Enqueue(jsonObject);
        }
      });
    }
    catch (ArgumentException exception)
    {
      // TODO:
      Console.WriteLine(exception.Message);
    }

    return jsonFiles;
  }

  private Func<string, IFileSystemDataAccess, JObject?> readJsonFile = (filePath, fileSystem) =>
  {
    if (!fileSystem.GetPathExtension(filePath).Equals(".json", StringComparison.OrdinalIgnoreCase))
      return null;

    using (StreamReader file = fileSystem.OpenText(filePath))
    {
      using (JsonTextReader reader = new JsonTextReader(file))
      {
        JObject? jsonObject = (JObject)JToken.ReadFrom(reader);
        return jsonObject;
      }
    }
  };
}
