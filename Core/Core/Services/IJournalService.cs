using Core.Models;

namespace Core;

public interface IJournalService
{
  bool SaveJournal(string journalAsJson);

  Journal ReadJournal(string path);
}
