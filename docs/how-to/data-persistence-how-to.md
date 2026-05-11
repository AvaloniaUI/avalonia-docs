---
id: data-persistence-how-to
title: "How to: Save and Load Application Settings"
description: Persist user preferences and application state across sessions using JSON files or databases.
doc-type: how-to
---

This guide covers patterns for persisting user preferences and application state across sessions in your Avalonia application.

## JSON file settings

The simplest approach stores settings as a JSON file in the user's app data directory:

```csharp
using System.Text.Json;

public class AppSettings
{
    public string Theme { get; set; } = "Default";
    public double WindowWidth { get; set; } = 800;
    public double WindowHeight { get; set; } = 600;
    public string LastOpenedFile { get; set; } = "";
    public bool ShowSidebar { get; set; } = true;
}

public class SettingsService
{
    private static readonly string SettingsPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
        "MyApp",
        "settings.json");

    public AppSettings Load()
    {
        if (!File.Exists(SettingsPath))
            return new AppSettings();

        var json = File.ReadAllText(SettingsPath);
        return JsonSerializer.Deserialize<AppSettings>(json) ?? new AppSettings();
    }

    public void Save(AppSettings settings)
    {
        var directory = Path.GetDirectoryName(SettingsPath)!;
        Directory.CreateDirectory(directory);

        var json = JsonSerializer.Serialize(settings, new JsonSerializerOptions
        {
            WriteIndented = true
        });
        File.WriteAllText(SettingsPath, json);
    }
}
```

:::tip
Consider wrapping your `Load` method in a `try`/`catch` block. If the JSON file becomes corrupt or its schema changes between application versions, `JsonSerializer.Deserialize` will throw an exception. Returning a default `AppSettings` instance in the `catch` block prevents your application from crashing on startup.
:::

### Using with a view model

```csharp
public partial class SettingsViewModel : ObservableObject
{
    private readonly SettingsService _settingsService;
    private readonly AppSettings _settings;

    public SettingsViewModel(SettingsService settingsService)
    {
        _settingsService = settingsService;
        _settings = settingsService.Load();
        _theme = _settings.Theme;
        _showSidebar = _settings.ShowSidebar;
    }

    [ObservableProperty]
    private string _theme;

    [ObservableProperty]
    private bool _showSidebar;

    partial void OnThemeChanged(string value)
    {
        _settings.Theme = value;
        _settingsService.Save(_settings);
    }

    partial void OnShowSidebarChanged(bool value)
    {
        _settings.ShowSidebar = value;
        _settingsService.Save(_settings);
    }
}
```

:::note
Saving on every property change is convenient but can cause excessive disk I/O if you have many rapidly changing settings. For high-frequency updates, consider debouncing saves or batching changes with a timer that flushes after a short delay.
:::

## Saving window position and size

You can persist window geometry so it restores on the next launch:

```csharp
public partial class MainWindow : Window
{
    private readonly SettingsService _settings;

    public MainWindow()
    {
        InitializeComponent();
        _settings = new SettingsService();
        RestoreWindowState();
    }

    private void RestoreWindowState()
    {
        var s = _settings.Load();
        if (s.WindowWidth > 0 && s.WindowHeight > 0)
        {
            Width = s.WindowWidth;
            Height = s.WindowHeight;
        }
    }

    protected override void OnClosing(WindowClosingEventArgs e)
    {
        var s = _settings.Load();
        s.WindowWidth = Width;
        s.WindowHeight = Height;
        _settings.Save(s);
        base.OnClosing(e);
    }
}
```

:::warning
When restoring window position, validate that the saved coordinates are still within the bounds of the current screen configuration. A user may have disconnected an external monitor since the last session, causing the window to appear off-screen. You can use `Screens.All` on `TopLevel` to check available screen bounds before applying saved position values.
:::

If you also want to persist the window's position (not just its size), add `WindowX` and `WindowY` properties to your `AppSettings` class and set them in `OnClosing`:

```csharp
// In AppSettings
public int WindowX { get; set; } = -1;
public int WindowY { get; set; } = -1;

// In RestoreWindowState
if (s.WindowX >= 0 && s.WindowY >= 0)
{
    Position = new PixelPoint(s.WindowX, s.WindowY);
}

// In OnClosing
s.WindowX = Position.X;
s.WindowY = Position.Y;
```

## Recent files list

You can track recently opened files to display in a menu or on a welcome screen:

```csharp
public class RecentFilesService
{
    private const int MaxRecent = 10;
    private readonly string _path;
    private List<string> _recentFiles = new();

    public RecentFilesService()
    {
        _path = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "MyApp", "recent.json");
        Load();
    }

    public IReadOnlyList<string> RecentFiles => _recentFiles;

    public void AddFile(string filePath)
    {
        _recentFiles.Remove(filePath);
        _recentFiles.Insert(0, filePath);
        if (_recentFiles.Count > MaxRecent)
            _recentFiles.RemoveAt(_recentFiles.Count - 1);
        Save();
    }

    public void RemoveFile(string filePath)
    {
        _recentFiles.Remove(filePath);
        Save();
    }

    private void Load()
    {
        try
        {
            if (File.Exists(_path))
            {
                var json = File.ReadAllText(_path);
                _recentFiles = JsonSerializer.Deserialize<List<string>>(json) ?? new();
            }
        }
        catch (JsonException)
        {
            _recentFiles = new();
        }
    }

    private void Save()
    {
        var dir = Path.GetDirectoryName(_path)!;
        Directory.CreateDirectory(dir);
        File.WriteAllText(_path, JsonSerializer.Serialize(_recentFiles));
    }
}
```

:::tip
When displaying a recent files list, check that each file still exists before showing it to your users. Files may have been moved, renamed, or deleted since they were last opened. Providing a "Remove from list" option (as shown with the `RemoveFile` method above) improves the user experience when stale entries appear.
:::

## Platform-specific storage paths

Use the appropriate directory for each platform. The following table shows the conventional locations:

| Platform | Typical path |
|---|---|
| Windows | `%APPDATA%\MyApp\` |
| macOS | `~/Library/Application Support/MyApp/` |
| Linux | `~/.config/MyApp/` |

```csharp
public static string GetAppDataPath()
{
    if (OperatingSystem.IsMacOS())
        return Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            "Library", "Application Support", "MyApp");

    if (OperatingSystem.IsLinux())
        return Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            ".config", "MyApp");

    // Windows and others
    return Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
        "MyApp");
}
```

:::note
On Linux, you can respect the `XDG_CONFIG_HOME` environment variable if it is set. When defined, your application should store configuration files in `$XDG_CONFIG_HOME/MyApp/` instead of `~/.config/MyApp/`. You can check for this with `Environment.GetEnvironmentVariable("XDG_CONFIG_HOME")`.
:::

## Bookmarked storage (mobile and sandbox)

On sandboxed platforms (iOS, Android, WebAssembly), the standard file system APIs may not have access to user-selected files across sessions. Use Avalonia's `IStorageProvider` bookmarks to persist file access:

```csharp
var storage = TopLevel.GetTopLevel(this)?.StorageProvider;
if (storage is null) return;

// Save a bookmark
var file = (await storage.OpenFilePickerAsync(new FilePickerOpenOptions())).FirstOrDefault();
if (file is not null)
{
    var bookmark = await file.SaveBookmarkAsync();
    // Store the bookmark string in your settings
    settings.LastFileBookmark = bookmark;
}

// Restore from bookmark
if (!string.IsNullOrEmpty(settings.LastFileBookmark))
{
    var restored = await storage.OpenFileBookmarkAsync(settings.LastFileBookmark);
    if (restored is not null)
    {
        await using var stream = await restored.OpenReadAsync();
        // Read file contents
    }
}
```

:::warning
Bookmarks can become invalid if the user moves or deletes the file, or if the operating system revokes the permission grant. Always check that the restored `IStorageFile` is not `null` and handle failures gracefully. On some platforms, bookmarks may also expire after a system restart.
:::

See [Bookmarks](/docs/services/storage/bookmarks) for full details on the bookmark API.

## See also

- [Storage Provider](/docs/services/storage/storage-provider): File and folder access across platforms.
- [Bookmarks](/docs/services/storage/bookmarks): Persisting file access across sessions on sandboxed platforms.
- [Storage Item](/docs/services/storage/storage-item): Working with `IStorageFile` and `IStorageFolder` instances.
- [Window Management](/docs/app-development/window-management): Window lifecycle, positioning, and state.
- [Dependency Injection](/docs/app-development/dependency-injection): Registering services like `SettingsService` in your application.
