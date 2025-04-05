# MediaPlayer Quick Start Guide

This guide provides a practical introduction to implementing media playback in Avalonia applications using the Avalonia
Accelerate MediaControls package.

- [Installation](#installation)
- [Basic Usage](#basic-usage)
    - [Using MediaPlayerControl (Recommended)](#using-mediaplayercontrol-recommended)
    - [Using MediaPlayer Directly](#using-mediaplayer-directly)
- [Loading Media Sources](#loading-media-sources)
    - [From Files or URLs (UriSource)](#from-files-or-urls-urisource)
    - [From Streams (StreamSource)](#from-streams-streamsource)
    - [Using File Picker](#using-file-picker)
- [Common Operations](#common-operations)
    - [Playback Control](#playback-control)
    - [Media Information](#media-information)
    - [Error Handling](#error-handling)
    - [Basic Example](#basic-example)
- [Troubleshooting](#troubleshooting)

## Installation

Add the Avalonia Accelerate MediaControls packages to your project:

```bash
dotnet add package Avalonia.Media
dotnet add package Avalonia.Media.Theme.Fluent
```

Add the default theme to your App.axaml:

```xml

<Application.Styles>
    <FluentTheme/>

    <!-- Add this declaration for the default theme. -->
    <MediaFluentTheme/>
</Application.Styles>
```

## Basic Usage

### Using MediaPlayerControl (Recommended)

The easiest way to add media playback is using the MediaPlayerControl, which provides a full-featured UI by default:

```xml

<Window xmlns="https://github.com/avaloniaui"
        Width="800" Height="450">

    <MediaPlayerControl Name="mediaPlayer"
                        Source="{Binding MediaSource}"
                        Volume="0.8"/>

</Window>
```

### Using MediaPlayer Directly

For more control, you can use the MediaPlayer class directly:

```csharp
// Create and initialize a MediaPlayer
var player = new MediaPlayer();
await player.InitializeAsync();

// Set properties
player.Volume = 0.8;
player.LoadedBehavior = MediaPlayerState.AutoPlay;

// Load and play media
player.Source = new UriSource("https://example.com/audio.mp3");
await player.PrepareAsync();
await player.PlayAsync();
```

## Loading Media Sources

### From Files or URLs (UriSource)

```csharp
// Local file
mediaPlayer.Source = new UriSource("file:///C:/videos/sample.mp4");
// or 
mediaPlayer.Source = new UriSource(new Uri("file:///C:/videos/sample.mp4"));

// Remote URL
mediaPlayer.Source = new UriSource("https://example.com/video.mp4");
```

**Note**: If it's possible, always add the `file://` schema to your local file URI's. This makes sure that
the player recognizes the file's path as local.

### From Streams (StreamSource)

```csharp
// From file stream
var fileStream = File.OpenRead("path/to/video.mp4");
mediaPlayer.Source = new StreamSource(fileStream);

// From memory stream
var memoryStream = new MemoryStream(byteArray);
mediaPlayer.Source = new StreamSource(memoryStream);
```

**Note**: Make sure to not control the disposal of the stream you passed to the `StreamSource` as the player will take
care of its lifetime.

### Using File Picker

```csharp
public async void OpenFile_Click(object sender, RoutedEventArgs e)
{
    var storageProvider = TopLevel.GetTopLevel(this)?.StorageProvider;
    if (storageProvider == null) return;
    
    var files = await storageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
    {
        AllowMultiple = false
    });
    
    if (files.Count != 1) return;
    if (files[0].Path is not { } path) return;
    
    mediaPlayer.Source = new UriSource(files[0].Path.ToString());
}
```

## Common Operations

### Playback Control

```csharp
// Play/pause
await mediaPlayer.Player.PlayAsync();
await mediaPlayer.Player.PauseAsync();

// Stop
await mediaPlayer.Player.StopAsync();

// Seek to position
mediaPlayer.Position = TimeSpan.FromSeconds(30);

// Change volume (0.0 to 1.0)
mediaPlayer.Volume = 0.75;

// Mute/unmute
mediaPlayer.Player.IsMuted = true;
```

### Media Information

```csharp
// Get duration
TimeSpan? duration = mediaPlayer.Duration;

// Check if media has video
bool hasVideo = mediaPlayer.HasVideo;

// Check if media is seekable
bool isSeekable = mediaPlayer.IsSeekable;

// Get current position
TimeSpan position = mediaPlayer.Position;
```

### Error Handling

```csharp
mediaPlayer.OnErrorOccurred += (sender, args) =>
{
    Console.WriteLine($"Media error: {args.Message}");
    args.Handled = true; // Prevents the exception from being thrown.
};
```

**Note**: This callback gives you the opportunity to reset the state of the `MediaPlayer` gracefully.

### Basic Example

```xaml
<Window xmlns="https://github.com/avaloniaui"
        Width="800" Height="450">
    
    <Grid RowDefinitions="*, Auto">
        <MediaPlayerControl Name="mediaPlayer" Grid.Row="0" />
        <Button Grid.Row="1" Content="Open File" Click="OpenFile_Click" />
    </Grid>
    
</Window>
```

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public async void OpenFile_Click(object sender, RoutedEventArgs e)
    {
        var storageProvider = TopLevel.GetTopLevel(this)?.StorageProvider;
        if (storageProvider == null) return;
        
        var files = await storageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
        {
            AllowMultiple = false
        });
        
        if (files.Count != 1) return;
        if (files[0].Path is not { } path) return;
        
        mediaPlayer.Source = new UriSource(files[0].Path.ToString());
    }
}
```

## Troubleshooting

Common issues and solutions:

1. **Black screen**
    - Verify the source path/URL is correct.
    - Ensure the media format is supported by the target platform.
    - Check that required codecs are installed in the system.

2. **No playback on Windows**
    - If you are on Windows 10N/10KN or Windows 11N/11KN versions, try installing
      the [Media Feature Pack](https://support.microsoft.com/en-us/topic/media-feature-pack-list-for-windows-n-editions-c1c6fffa-d052-8338-7a79-a4bb980a700a).
    - Try to install alternative codec packs if the Media Feature Pack doesn't support the codec you wish to play.
    - Check Windows Media Player or related Windows apps are working.

3. **No playback on Linux**
    - Ensure LibVLC/VLC is installed on your system.

4. **Memory leaks**
    - Always call `UnInitialize()` when you're done with the player
    - Use `using` statements with StreamSource to ensure proper disposal

5. **Player in error state**
    - Call `Player.ReleaseAsync()` to reset from the error state
    - Handle the `OnErrorOccurred` event for any error messages and reset accordingly.

For more detailed information on the components:

- [MediaPlayerControl](mediaplayercontrol.md)
- [MediaPlayer](mediaplayer.md)
- [MediaSource](MediaSource.html)