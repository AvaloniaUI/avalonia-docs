# MediaPlayer Quick Start Guide

This guide provides a practical introduction to implementing media playback in Avalonia applications using the Avalonia
Accelerate `MediaPlayer` package.

## Installation

### Configure the NuGet Package Source

Avalonia Accelerate packages are distributed through a dedicated NuGet feed that requires authentication with your Avalonia Accelerate license key. Follow these steps to configure access to this feed in your C# project.

#### Option 1: Configure via `nuget.config` (Recommended)

1. Locate or create a nuget.config file:
    - Look for an existing `nuget.config` file in your solution directory
    - If none exists, create a new file named `nuget.config` in the same folder as your solution file (`.sln`)

2. Add the following configuration:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
    // highlight-start
    <add key="avalonia-accelerate" value="https://accelerate-nuget-feed.avaloniaui.net/v3/index.json" />
    // highlight-end
  </packageSources>
  // highlight-start
  <packageSourceCredentials>
    <avalonia-accelerate>
      <add key="Username" value="license" />
      <add key="ClearTextPassword" value="YOUR_LICENSE_KEY" />
    </avalonia-accelerate>
  </packageSourceCredentials>
   // highlight-end
</configuration>
```

3. Replace `YOUR_LICENSE_KEY` with your actual Avalonia license key

#### Option 2: Configure via Visual Studio

1. Open Visual Studio and go to _Tools → NuGet Package Manager → Package Manager Settings_
2. Navigate to _Package Sources_
3. Click the _+_ button to add a new source:

    - **Name**: `avalonia-accelerate`
    - **Source**: https://accelerate-nuget-feed.avaloniaui.net/v3/index.json

4. Click _Update_ to save the new source
5. When prompted for credentials during package installation:

    - **Username**: `license`
    - **Password**: Your Avalonia license key

### Add the NuGet Package

Add the Avalonia Accelerate MediaPlayer package to your project:

```bash
dotnet add package Avalonia.Controls.MediaPlayer
```

Add the default theme to your App.axaml:

```xml

<Application.Styles>
    <FluentTheme/>

    <!-- Add this declaration for the default theme. -->
    <MediaFluentTheme/>
</Application.Styles>
```

### Add the License Key

Include your Avalonia UI license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

## Basic Usage

### Using MediaPlayerControl (Recommended)

The easiest way to add media playback to your Avalonia app is using the `MediaPlayerControl`, which provides a full-featured UI by default:

```xml

<Window xmlns="https://github.com/avaloniaui"
        Width="800" Height="450">

    <MediaPlayerControl Name="mediaPlayer"
                        Source="{Binding MediaSource}"
                        Volume="0.8"/>

</Window>
```

### Using MediaPlayer Directly

For more control, you can use the `MediaPlayer` class directly:

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

### From Files or URLs using UriSource

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

### From Streams with StreamSource

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

### Using File Picker with StorageFileSource

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
    
    mediaPlayer.Source = new StorageFileSource(files[0]);
}
```

## Common Operations

### Playback Control

```csharp
// Play/pause
await mediaPlayer.PlayAsync();
await mediaPlayer.PauseAsync();

// Stop
await mediaPlayer.StopAsync();

// Seek to position
mediaPlayer.Position = TimeSpan.FromSeconds(30);

// Change volume (0.0 to 1.0)
mediaPlayer.Volume = 0.75;

// Mute/unmute
mediaPlayer.IsMuted = true;
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
mediaPlayer.ErrorOccurred += (sender, args) =>
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
        
        mediaPlayer.Source = new StorageFileSource(files[0]);
    }
}
```

## Platform Prerequisites

The `MediaPlayer` component relies on native media playback frameworks on each supported platforms:

### Windows

`MediaPlayer` uses Windows's Media Foundation to render multimedia content, 
while utilizing Vulkan Graphics API whenever possible or available on the end-user's installation.

For Windows 10/11:

- No additional setup required.

For Windows 10N/11N or 10KN/11KN:

- Please see the [Troubleshooting](#troubleshooting) section below.

### macOS/iOS

`MediaPlayer` uses Apple's AVFoundation to render multimedia content on macOS and iOS. 

For macOS 10.15 or iOS 12.0 or higher. 

- No additional setup required.

### Android

`MediaPlayer` uses Android's ExoPlayer component to render multimedia content together with Vulkan Graphics API if
the end-user device supports it.

For Android API 21 (Android 5.0) or higher.

- No additional setup required.

### Linux

`MediaPlayer` uses the system-installed LibVLC library to render multimedia content for Linux distros.

Requires LibVLC 3.0.21 or higher.

Debian/Ubuntu:

```bash
apt install libvlc
```

Fedora:

```bash
dnf install libvlc
```

### Embedded Linux (Direct Rendering Manager)

Similar to the requirements on regular Linux, `MediaPlayer` uses the system-installed LibVLC library to render multimedia content for embedded Linux devices.

Please follow the guide in setting up Avalonia on Linux DRM Framebuffer [here](https://avaloniaui.net/blog/unleashing-net-on-embedded-linux).

Afterwards, install the VLC dependencies as described above.

No special requirements are needed for the Linux DRM setup and you can continue on using the `MediaPlayer` control like on regular Linux.

## Codecs Support

The media codecs that `MediaPlayer` supports will depend on the target platform's built-in codecs & additional plugins.

The safest assumption is that most platforms can support for video is `MPEG-4 Part 10 - Advanced Video Coding` or
more commonly known as `H.264`, with `MPEG-4 Part 14` or `MP4` as video container. 

As for audio, the safe to assume supported codecs are `MP3`, `AAC` and `WAV`.

As for platform-specific resources on which codecs are supported, please check the following:

### Windows

- https://support.microsoft.com/en-us/windows/codecs-in-media-player-d5c2cdcd-83a2-4805-abb0-c6888138e456

### Android

- https://developer.android.com/media/platform/supported-formats

### Linux 

- https://www.videolan.org/vlc/features.html

### macOS and iOS

- Unfortunately, we haven't yet found a definitive primary source on which default codecs are supported in macOS/iOS.

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
    - Handle the `ErrorOccurred` event for any error messages and reset accordingly.

For more detailed information on the components:

- [MediaPlayerControl](mediaplayercontrol.md)
- [MediaPlayer](mediaplayer.md)
- [MediaSource](MediaSource.html)
