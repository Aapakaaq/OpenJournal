using System.IO.Abstractions;
using Core.Utils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic.FileIO;
using Newtonsoft.Json.Linq;

namespace Core;

public class Startup
{
  private ServiceCollection _serviceCollection;
  private IServiceProvider _serviceProvider;

  public Startup()
  {
    _serviceCollection = new();
  }

  public IServiceProvider CreateServiceProvider()
  {
    ConfigureServices();
    return _serviceProvider;
  }

  private void ConfigureServices()
  {
    _serviceCollection.AddSingleton<IFileSystemDataAccess, FileSystemDataAccess>();

    _serviceCollection.AddTransient<IParallelIO, ParallelIO>();
    _serviceCollection.AddTransient<IIOUtils, IOUtils>();
    _serviceCollection.AddTransient<IFileReader<JObject>, ParallelJsonReaderService>();
    _serviceCollection.AddTransient<IFileWriter, JsonFileWriter>();
    _serviceCollection.AddTransient<IJsonValidator, NewtonsoftValidator>();
    _serviceCollection.AddTransient<IJournalService, JournalService>();

    _serviceProvider = _serviceCollection.BuildServiceProvider();
  }
}
