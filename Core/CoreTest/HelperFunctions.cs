using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CoreTest;

public static class HelperFunctions
{
  public static string GenerateRandomJsonString(int numFields)
  {
    JObject json = new JObject();

    Random rnd = new Random();

    for (int i = 0; i < numFields; i++)
    {
      string key = "field" + i;

      int randomInt = rnd.Next(1, 100);
      double randomDouble = rnd.NextDouble() * 100;
      bool randomBool = rnd.Next(0, 2) == 1;
      string guid = Guid.NewGuid().ToString();

      json[key] = new JObject();
      json[key]["int"] = randomInt;
      json[key]["double"] = randomDouble;
      json[key]["bool"] = randomBool;
      json[key]["guid"] = guid;
    }

    string jsonString = JsonConvert.SerializeObject(json, Formatting.Indented);
    return jsonString;
  }
}
