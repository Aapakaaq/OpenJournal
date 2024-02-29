namespace Core;

public interface IFileSystemDataAccess
{
  public string GetPathExtension(string path);
  public void WriteAllText(string path, string content);
  public bool DoesDirectoryExists(string path);
  public bool IsPathRooted(string path);
  public string? GetPathRoot(string path);

  public StreamReader OpenText(string path);
  public string[] GetDirectories(string path);
  public string[] GetFiles(string path);
}
