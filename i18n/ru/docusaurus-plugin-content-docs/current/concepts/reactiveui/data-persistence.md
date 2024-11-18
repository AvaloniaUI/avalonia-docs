# Data Persistence

For better UX, your app should be capable of saving state to the disk when the app is suspending and of restoring state when the app is resuming. [ReactiveUI](https://reactiveui.net/) provides facilities allowing you to persist application state by serializing the view model tree when the app is shutting down or suspending. In this tutorial we are going to look through the capabilities of ReactiveUI that help us manage the state which outlives the process.

### Annotating The ViewModel

View model serialization is a tricky business. We have to decide, which properties of the view model to save on application shutdown and which ones to recreate. Taking our typical search screen view model, we definitely want to save and restore the search query, so we annotate the public property with the `[DataMember]` attribute. We don't want to save the state of the commands to the disk, so we mark the command with the `[IgnoreDataMember]` attribute. These attributes are available in the standard library, but one can easily use other annotations, for example, `[JsonProperty]` or `[JsonIgnore]`.

```csharp
[DataContract]
public class MainViewModel : ReactiveObject
{
    private string _searchQuery;

    public MainViewModel() 
    {
        var canSearch = this
            .WhenAnyValue(x => x.SearchQuery)
            .Select(query => !string.IsNullOrWhiteSpace(query));
        
        Search = ReactiveCommand.CreateFromTask(
            () => Task.Delay(1000), // a long-running operation
            canSearch);
    }

    [IgnoreDataMember]
    public ReactiveCommand<Unit, Unit> Search { get; }
    
    [DataMember]
    public string SearchQuery 
    {
        get => _searchQuery;
        set => this.RaiseAndSetIfChanged(ref _searchQuery, value);
    }
}
```

There is no need to save the state of a [reactive command](https://reactiveui.net/docs/handbook/commands/) which implements the `ICommand` interface. `ReactiveCommand<TIn, TOut>` class is typically initialized in the constructor, its `CanExecute` indicator usually fully depends on view model properties and gets recalculated each time any of those properties change.

### Creating The View

Next, we modify the `MainWindow` class to follow the standard ReactiveUI pattern.

```csharp
public class MainWindow : ReactiveWindow<MainViewModel>
{
    public MainWindow()
    {
        AvaloniaXamlLoader.Load(this);
        this.WhenActivated(disposable => { });
    }
}
```

The XAML of our `ReactiveWindow` will look like as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="ReactiveUI.Samples.Suspension.MainWindow"
        Title="ReactiveUI.Samples.Suspension">
    <TextBox Text="{Binding SearchQuery, Mode=TwoWay}"
             Watermark="Place, enter the search query"
             Margin="20" />
</Window>
```

### Creating The Suspension Driver

Here we provide the implementation that uses `Newtonsoft.Json` and saves the application state to a plain text file.

```csharp
public class NewtonsoftJsonSuspensionDriver : ISuspensionDriver
{
    private readonly string _file;
    private readonly JsonSerializerSettings _settings = new JsonSerializerSettings
    {
        TypeNameHandling = TypeNameHandling.All
    };

    public NewtonsoftJsonSuspensionDriver(string file) => _file = file;

    public IObservable<Unit> InvalidateState()
    {
        if (File.Exists(_file)) 
            File.Delete(_file);
        return Observable.Return(Unit.Default);
    }

    public IObservable<object> LoadState()
    {
        var lines = File.ReadAllText(_file);
        var state = JsonConvert.DeserializeObject<object>(lines, _settings);
        return Observable.Return(state);
    }

    public IObservable<Unit> SaveState(object state)
    {
        var lines = JsonConvert.SerializeObject(state, _settings);
        File.WriteAllText(_file, lines);
        return Observable.Return(Unit.Default);
    }
}
```

### Wiring The Things Together

On the final step, we initialize the `AutoSuspendHelper`, following the [new Avalonia lifetimes pattern](https://github.com/AvaloniaUI/Avalonia/wiki/Application-lifetimes). In the `App.xaml.cs` file we create an override for the `OnFrameworkInitializationCompleted` method and initialize the variables required for the suspension feature to work fine.

```csharp
public class App : Application
{
    public override void Initialize() => AvaloniaXamlLoader.Load(this);

    public override void OnFrameworkInitializationCompleted()
    {
        // Create the AutoSuspendHelper.
        var suspension = new AutoSuspendHelper(ApplicationLifetime);
        RxApp.SuspensionHost.CreateNewAppState = () => new MainViewModel();
        RxApp.SuspensionHost.SetupDefaultSuspendResume(new NewtonsoftJsonSuspensionDriver("appstate.json"));
        suspension.OnFrameworkInitializationCompleted();

        // Load the saved view model state.
        var state = RxApp.SuspensionHost.GetAppState<MainViewModel>();
        new MainWindow {DataContext = state}.Show();
        base.OnFrameworkInitializationCompleted();
    }
}
```

In the `Program.cs` file, we add a call to `.UseReactiveUI()` to the app builder.

```csharp
internal static class Program
{
    public static void Main(string[] args) => BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);

    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .UseReactiveUI()
            .LogToDebug();
}
```

Now, we can run the app. If we type some text into the `TextBox`, it will be present there even if we close the app instance and launch a new one. The state is saved to the `appstate.json` file which is placed near the program executable.

```bash
# If you are targeting .NET Core 3, then use
# netcoreapp3.0 as the CLI argument.
dotnet run --framework netcoreapp2.1
```

See the "[Saving Routing State to the Disk in a Cross-Platform .NET Core GUI App with ReactiveUI and Avalonia](https://habr.com/ru/post/462307/)" blog post to explore how to combine the data persistence feature with ReactiveUI routing and dependency injection. See also [the source code of the sample app](https://github.com/reactiveui/ReactiveUI.Samples/tree/a7d06759e27fa17f9c6a77018362a2f8e0c30fa6/avalonia) in the ReactiveUI.Samples repository.

