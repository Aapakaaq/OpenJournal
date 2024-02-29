using Core.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Core;

public class JournalService : IJournalService
{
  private readonly IFileReader<JObject> _fileReader;
  private readonly IFileWriter _fileWriter;
  private readonly IJsonValidator _jsonValidator;

  public JournalService(IFileReader<JObject> fileReader,
    IFileWriter fileWriter, IJsonValidator jsonValidator)
  {
    _fileReader = fileReader;
    _fileWriter = fileWriter;
    _jsonValidator = jsonValidator;
  }

  public bool SaveJournal(string journalAsJson)
  {
    if (string.IsNullOrWhiteSpace(journalAsJson))
    {
      throw new ArgumentNullException(nameof(journalAsJson));
    }

    bool isValidJson = _jsonValidator.IsValid(journalAsJson);

    if (!isValidJson)
    {
      throw new ArgumentOutOfRangeException(nameof(journalAsJson));
    }

    Journal? journal = JsonConvert.DeserializeObject<Journal>(journalAsJson) ??
                       throw new ArgumentNullException($"Error when deserialize {nameof(journalAsJson)}");

    if (string.IsNullOrWhiteSpace(journal?.Path))
    {
      throw new NullReferenceException("Missing path");
    }

    string content = JsonConvert.SerializeObject(journal.Fields);

    return _fileWriter.WriteFile(journal.Path, content);
  }

  // TODO
  public Journal ReadJournal(string path)
  {
    throw new NotImplementedException();
  }
}
