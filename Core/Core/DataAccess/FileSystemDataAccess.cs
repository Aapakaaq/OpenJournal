using Core.Models;
using Microsoft.VisualBasic.FileIO;

namespace Core;

public class FileSystemDataAccess : IFileSystemDataAccess
{
  public string GetPathExtension(string path)
  {
    return Path.GetExtension(path);
  }

  public void WriteAllText(string path, string content)
  {
    File.WriteAllText(path, content);
  }

  public bool DoesDirectoryExists(string path)
  {
    return Directory.Exists(path);
  }

  public bool IsPathRooted(string path)
  {
    return Path.IsPathRooted(path);
  }

  public string? GetPathRoot(string path)
  {
    return Path.GetPathRoot(path);
  }

  public StreamReader OpenText(string path)
  {
    return File.OpenText(path);
  }

  public string[] GetDirectories(string path)
  {
    return Directory.GetDirectories(path);
  }

  public string[] GetFiles(string path)
  {
    return Directory.GetFiles(path);
  }
}
