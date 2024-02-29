namespace Core;

public interface IFileWriter
{
  public bool WriteFile(string path, string content);
}
