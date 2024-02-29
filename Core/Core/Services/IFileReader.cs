using System.Collections.Concurrent;
using Newtonsoft.Json.Linq;

namespace Core;

public interface IFileReader<T>
{
  ConcurrentQueue<T> ReadFromDirectory(string path);
}
