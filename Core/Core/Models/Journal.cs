using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Core.Models;

public record Journal
{
  public string Path { get; init; }

  public Dictionary<string, string> MetaData { get; init; }

  [JsonExtensionData]
  public IDictionary<string, JToken> Fields { get; init; }
}
