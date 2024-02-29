// See https://aka.ms/new-console-template for more information

using Core.Models;
using ElectronCgi.DotNet;
using Microsoft.Extensions.DependencyInjection;


namespace Core
{
  class Program
  {
    static void Main(string[] args)
    {
      Startup startup = new Startup();
      IServiceProvider serviceProvider = startup.CreateServiceProvider();
      //IJournalService? journalService = serviceProvider.GetService<IJournalService>();
      Connection? connection = new ConnectionBuilder()
        .WithLogging()
        .Build();

      connection.On<string, string>("greeting", name => "Hello " + name);
      // TODO: Consider doing some sort of verification
      /*
      connection.On<string, string>(RequestTypes.CONNECT, id =>
      {
        return "Connection established: " + id;
      });
*/
      // connection.On<string,bool>(RequestTypes.WRITE_JSON_FILE, journal => journalService.SaveJournal(journal));
      connection.Listen();
    }
  }
}
