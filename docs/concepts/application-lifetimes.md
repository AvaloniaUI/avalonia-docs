---
description: CONCEPTS
---

# Application Lifetimes

Not all platforms are created equal! For example, the lifetime management that you may be using to developing with in Windows Forms or WPF can operate only on desktop-style platforms. _Avalonia UI_ is a cross-platform framework; so to make your application portable, it provides several different lifetime models for your application, and also allows you to control everything manually if the target platform permits.

## How do lifetimes work?

For a desktop application, you initialise like this:

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

Then the main window is created in the `Application` class:

```csharp
public override void OnFrameworkInitializationCompleted()
{
  if (ApplicationLifetime 
                  is IClassicDesktopStyleApplicationLifetime desktop)
    desktop.MainWindow = new MainWindow();
  else if (ApplicationLifetime 
                  is ISingleViewApplicationLifetime singleView)
    singleView.MainView = new MainView();
  base.OnFrameworkInitializationCompleted();
}
```

This method is called when the framework has initialized and the `ApplicationLifetime` property contains the chosen lifetime if any.

:::info
If you run the application in design mode (this uses the IDE previewer process), then `ApplicationLifetime` is null.
:::

## Lifetime Interfaces

_Avalonia UI_ provides a range of interfaces to allow you to choose a level of control that is suitable for your application. These are provided by the `BuildAvaloniaApp().Start[Something]` family of methods.

### IControlledApplicationLifetime

Provided by:

* `StartWithClassicDesktopLifetime`
* `StartLinuxFramebuffer`

Allows you to subscribe to `Startup` and `Exit` events and permits explicitly shutting down of the application by calling the `Shutdown` method. This interface gives you control of the application's exit procedures.

### IClassicDesktopStyleApplicationLifetime

Inherits: `IControlledApplicationLifetime`

Provided by:

* `StartWithClassicDesktopLifetime`

Allows you to control your application lifetime in the manner of a Windows Forms or WPF application. This interface provides a way to access the list of the currently opened windows, to set a main window, and has three shutdown modes:

* `OnLastWindowClose` - shuts down the application when the last window is closed
* `OnMainWindowClose` - shuts down the application when the main window is closed (if it has been set).
* `OnExplicitShutdown` - disables automatic shutdown of the application, you need to call the `Shutdown` method in your code.

### ISingleViewApplicationLifetime

Provided by:

* `StartLinuxFramebuffer`
* mobile platforms
* web platform (WebAssembly/WASM) 

Some platforms do not have a concept of a desktop main window and only allow one view on the device's screen at a time. For these platforms the lifetime allows you to set and change the main view class (`MainView`) instead.

:::info
To implement the navigation stack on platforms like this (with a single main view), you can use [_ReactiveUI_ routing](https://www.reactiveui.net/docs/handbook/routing/) or another routing control.
:::

## Manual Lifetime Management

If you need to, you can take full control of your application's lifetime management. For example on a desktop platform you can pass a delegate to `AppMain` to the `BuildAvaloniaApp.Start` method, and then manage things manually from there:

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
     // A cancellation token source that will be 
     // used to stop the main loop
     var cts = new CancellationTokenSource();
     
     // Do your startup code here
     new Window().Show();

     // Start the main loop
     app.Run(cts.Token);
  }
}
```
