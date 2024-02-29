namespace Core.Utils;

public interface IParallelIO
{
  void TraverseDirectoryForEach(string directoryPath, Action<string> action);
}
