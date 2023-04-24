# Application Lifetimes

Platforms are not created equal. The lifetime management that we are used to in Windows Forms and WPF can work only on desktop-style platforms. AvaloniaUI is a cross-platform framework, so to help your application to be portable, we provide different lifetime models for your application and allow you to control everything manually if platform allows us to do so.

## How do lifetimes work?

The preferred way of initializing your application on desktop is:

```csharp
class Program
{
  // This method is needed for IDE previewer infrastructure
  public static AppBuilder BuildAvaloniaApp() 
    => AppBuilder.Configure<App>().UsePlatformDetect();

  // The entry point. Things aren't ready yet, so at this point
  // you shouldn't use any Avalonia types or anything that expects
  // a SynchronizationContext to be ready
  public static int Main(string[] args) 
    => BuildAvaloniaApp().StartWithClassicDesktopLifetime(args);
}
```

So, where is the main window setup? It's now moved to Application class:

```csharp
public override void OnFrameworkInitializationCompleted()
{
  if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    desktop.MainWindow = new MainWindow();
  else if (ApplicationLifetime is ISingleViewApplicationLifetime singleView)
    singleView.MainView = new MainView();
  base.OnFrameworkInitializationCompleted();
}
```

This method is called when the framework is ready to use and `ApplicationLifetime` property contains the chosen lifetime if any. If your application is run in design mode by IDE previewer process, `ApplicationLifetime` is `null`.

## Lifetime types

A particular lifetime might provide different aspects, so we have a set of interfaces to access them.

### IControlledApplicationLifetime

Provided by:

- `StartWithClassicDesktopLifetime`
- `StartLinuxFramebuffer`

Allows you to subscribe to `Startup`  `Exit` events  and explicitly shutdown the application by calling `Shutdown` method. Also provides the control of the application's exit code.

### IClassicDesktopStyleApplicationLifetime

Inherits: `IControlledApplicationLifetime`

Provided by:

- `StartWithClassicDesktopLifetime`

Allows you to control your application lifetime in WindowsForms/WPF manner. Provides a way to access the list of the currently opened windows, set a main window and 3 shutdown modes:

- OnLastWindowClose - shuts down the application when the last window is closed
- OnMainWindowClose - shuts down the application when MainWindow is closed, if MainWindow is set
- OnExplicitShutdown - disables automatic shutdown of the application, you need to call Shutdown manually

### ISingleViewApplicationLifetime

Provided by:

- `StartLinuxFramebuffer`
- mobile platforms (WIP)

Some platforms doesn't have a concept of a desktop `Window` and only allow one view on the screen simultaneously. For such platforms such lifetime allows you to set and change the `MainView`. For now we don't provide our own navigation stack implementation, but you can use one from ReactiveUI.

## Manual lifetime management

We don't force you to use our lifetime model on platforms that allow us to do so. On desktop platforms you can pass a `AppMain` delegate to `BuildAvaloniaApp.Start` and manage things manually from there:

More docs will come later, for now see: [Issue #2564](https://github.com/AvaloniaUI/Avalonia/issues/2564) and  [PR 2676](https://github.com/AvaloniaUI/Avalonia/pull/2676)

```csharp
class Program
{
  // This method is needed for IDE previewer infrastructure
  public static AppBuilder BuildAvaloniaApp() 
    => AppBuilder.Configure<App>().UsePlatformDetect();

  // The entry point. Things aren't ready yet, so at this point
  // you shouldn't use any Avalonia types or anything that expects
  // a SynchronizationContext to be ready
  public static int Main(string[] args) 
    => BuildAvaloniaApp().Start(AppMain, args);

  // Application entry point. Avalonia is completely initialized.
  static void AppMain(Application app, string[] args)
  {
     // A cancellation token source that will be used to stop the main loop
     var cts = new CancellationTokenSource();
     
     // Do you startup code here
     new Window().Show();

     // Start the main loop
     app.Run(cts.Token);
  }
}
```
