# 数据持久化

为了提供更好的用户体验，您的应用程序应该能够在应用程序暂停时将状态保存到磁盘，并在应用程序恢复时恢复状态。[ReactiveUI](https://reactiveui.net/)提供了一些功能，允许您通过在应用程序关闭或暂停时序列化视图模型树来持久化应用程序状态。在本教程中，我们将介绍ReactiveUI的功能，帮助我们管理超过进程生命周期的状态。

### 注释视图模型

视图模型序列化是一项棘手的任务。我们必须决定在应用程序关闭时保存哪些视图模型的属性，以及在重新创建时保存哪些属性。以我们典型的搜索屏幕视图模型为例，我们肯定希望保存和恢复搜索查询，因此我们使用`[DataMember]`属性对公共属性进行注释。我们不希望将命令的状态保存到磁盘上，因此我们使用`[IgnoreDataMember]`属性标记该命令。这些属性在标准库中可用，但也可以轻松使用其他注释，例如`[JsonProperty]`或`[JsonIgnore]`。

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
            () => Task.Delay(1000), // 一个长时间运行的操作
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

没有必要保存实现`ICommand`接口的[响应式命令](https://reactiveui.net/docs/handbook/commands/)的状态。`ReactiveCommand<TIn, TOut>`类通常在构造函数中初始化，其`CanExecute`指示器通常完全依赖于视图模型属性，并在任何这些属性更改时重新计算。

### 创建视图

接下来，我们修改`MainWindow`类以遵循标准的ReactiveUI模式。

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

我们的`ReactiveWindow`的XAML如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="ReactiveUI.Samples.Suspension.MainWindow"
        Title="ReactiveUI.Samples.Suspension">
    <TextBox Text="{Binding SearchQuery, Mode=TwoWay}"
             Watermark="请输入搜索查询"
             Margin="20" />
</Window>
```

### 创建悬挂驱动程序

这里我们提供了使用`Newtonsoft.Json`并将应用程序状态保存到纯文本文件的实现。

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

### 将各个部分连接起来

在最后一步中，我们初始化`AutoSuspendHelper`，遵循[Avalonia生命周期模式](https://github.com/AvaloniaUI/Avalonia/wiki/Application-lifetimes)。在`App.xaml.cs`文件中，我们创建了`OnFrameworkInitializationCompleted`方法的重写，并初始化了悬挂功能所需的变量。

```csharp
public class App : Application
{
    public override void Initialize() => AvaloniaXamlLoader.Load(this);

    public override void OnFrameworkInitializationCompleted()
    {
        // 创建AutoSuspendHelper。
        var suspension = new AutoSuspendHelper(ApplicationLifetime);
        RxApp.SuspensionHost.CreateNewAppState = () => new MainViewModel();
        RxApp.SuspensionHost.SetupDefaultSuspendResume(new NewtonsoftJsonSuspensionDriver("appstate.json"));
        suspension.OnFrameworkInitializationCompleted();

        // 加载保存的视图模型状态。
        var state = RxApp.SuspensionHost.GetAppState<MainViewModel>();
        new MainWindow {DataContext = state}.Show();
        base.OnFrameworkInitializationCompleted();
    }
}
```

在`Program.cs`文件中，我们向应用程序构建器添加了一个`.UseReactiveUI()`的调用。

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

现在，我们可以运行应用程序。如果我们在`TextBox`中输入一些文本，即使关闭应用程序实例并启动一个新实例，文本仍将保留在那里。状态保存在`appstate.json`文件中，该文件位于程序可执行文件附近。

```bash
# 如果您的目标是.NET Core 3，请使用
# netcoreapp3.0作为CLI参数。
dotnet run --framework netcoreapp2.1
```

请参阅"[在使用ReactiveUI和Avalonia的跨平台.NET Core GUI应用程序中将路由状态保存到磁盘](https://habr.com/ru/post/462307/)"博文，了解如何将数据持久性功能与ReactiveUI路由和依赖注入相结合。还可以查看ReactiveUI.Samples存储库中[示例应用程序的源代码](https://github.com/reactiveui/ReactiveUI.Samples/tree/a7d06759e27fa17f9c6a77018362a2f8e0c30fa6/avalonia)。