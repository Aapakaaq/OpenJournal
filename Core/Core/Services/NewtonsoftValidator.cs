using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Core;

// TODO: Consider Schema-Driven JSON Validation
public class NewtonsoftValidator : IJsonValidator
{
  public bool IsValid(string jsonString)
  {
    try
    {
      JObject.Parse(jsonString);
      return true;
    }
    catch (JsonReaderException)
    {
      return false;
    }
  }
}
