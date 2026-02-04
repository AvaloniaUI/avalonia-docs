---
id: intent-filter
title: Register your app to open files
---

# Register your app to open files

Android allows an app to register as a file or protocol handler. This guide shows how to register an Avalonia app to handle text files and how to receive them via Avalonia's storage framework.

1. Add an `IntentFilter` attribute to your activity. This attribute automatically registers the intent filter in the Android manifest during build.

2. Attach a listener to the `IAvaloniaActivity.Activated` event. When Android activates your app to open a file, this event will be raised with `FileActivatedEventArgs`.

3. Forward the storage items from the event data to your view model. You can use the static `Avalonia.Application.Current` property to access your `App` instance from an activity. In your `App` class you can store your view model instance in a field after creating it in `OnFrameworkInitializationCompleted`.

```csharp
[Activity(
    Label = "Demo.Android",
    Theme = "@style/MyTheme.NoActionBar",
    Icon = "@drawable/icon",
    MainLauncher = true,
    ConfigurationChanges = ConfigChanges.Orientation | ConfigChanges.ScreenSize | ConfigChanges.UiMode)]
[IntentFilter(["android.intent.action.VIEW"],
    Categories = [Intent.CategoryDefault, Intent.CategoryBrowsable],
    DataSchemes = ["file", "content"],
    DataMimeType = "text/plain",
    DataPathPattern = ".*\\.txt")]
public class MainActivity : AvaloniaMainActivity<App>
{
    public MainActivity()
    {
        ((IAvaloniaActivity)this).Activated += HandleIntent;
    }

    private static void HandleIntent(object? sender, ActivatedEventArgs e)
    {
        if (e is FileActivatedEventArgs fileActivated && Avalonia.Application.Current is App app)
        {
            app.OpenFiles(fileActivated.Files);
        }
    }
}
```

```csharp
public partial class App : Application
{
    private MainViewModel? mainViewModel;

    public void OpenFiles(IReadOnlyList<IStorageItem> files)
    {
        mainViewModel?.OpenFiles(files);
    }
}
```

```csharp
public class MainViewModel
{
    public async void OpenFiles(IReadOnlyList<IStorageItem> files)
    {
        foreach (IStorageItem item in files)
        {
            if (item is IStorageFile file)
            {
                using Stream stream = await file.OpenReadAsync();
                // Read the stream (use StreamReader, etc.)
            }
        }
    }
}
```
