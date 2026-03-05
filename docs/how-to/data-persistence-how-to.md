---
id: data-persistence-how-to
title: "How To: Save and Load Application Settings"
---

This guide covers patterns for persisting user preferences and application state across sessions.

## JSON File Settings

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

## Saving Window Position and Size

Persist window geometry so it restores on next launch:

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

## Recent Files List

Track recently opened files:

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

    private void Load()
    {
        if (File.Exists(_path))
        {
            var json = File.ReadAllText(_path);
            _recentFiles = JsonSerializer.Deserialize<List<string>>(json) ?? new();
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

## Platform-Specific Storage Paths

Use the appropriate directory for each platform:

| Platform | Path |
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

## Bookmarked Storage (Mobile/Sandbox)

On sandboxed platforms (iOS, Android, WebAssembly), use Avalonia's `IStorageProvider` bookmarks to persist file access:

```csharp
var storage = TopLevel.GetTopLevel(this)?.StorageProvider;
if (storage is null) return;

// Save a bookmark
var file = (await storage.OpenFilePickerAsync(new FilePickerOpenOptions())).FirstOrDefault();
if (file is not null)
{
    var bookmark = await file.SaveBookmarkAsync();
    // Store bookmark string in settings
    settings.LastFileBookmark = bookmark;
}

// Restore from bookmark
var restored = await storage.OpenFileBookmarkAsync(settings.LastFileBookmark);
if (restored is not null)
{
    await using var stream = await restored.OpenReadAsync();
    // Read file
}
```

See [Bookmarks](/docs/services/storage/bookmarks) for details.

## See Also

- [Storage Provider](/docs/services/storage/storage-provider): File and folder access.
- [Bookmarks](/docs/services/storage/bookmarks): Persisting file access across sessions.
- [Window Management](/docs/app-development/window-management): Window lifecycle and state.
- [Dependency Injection](/docs/app-development/dependency-injection): Registering services.
