---
id: media-playback
title: Implementing media playback with MediaPlayer
sidebar_label: Implementing media playback
tags:
  - accelerate
---

This guide provides a practical introduction to implementing media playback in Avalonia applications using the Avalonia Accelerate [`MediaPlayer`](/controls/media/mediaplayercontrol).


:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## Installation

See the [Installation Guide](/tools/developer-tools/installation) for step-by-step instructions on how to install Accelerate components.

Add the MediaPlayer package to your project:

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

### Add the license key

Include your Avalonia UI license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

## Basic usage

### Using MediaPlayerControl (recommended)

The easiest way to add media playback to your Avalonia app is using the `MediaPlayerControl`, which provides a full-featured UI by default:

```xml

<Window xmlns="https://github.com/avaloniaui"
        Width="800" Height="450">

    <MediaPlayerControl Name="mediaPlayer"
                        Source="{Binding MediaSource}"
                        Volume="0.8"/>

</Window>
```

### Using MediaPlayer directly

For more control, you can use the `MediaPlayer` class directly. When using `MediaPlayer` without `MediaPlayerControl`, you must call `InitializeAsync()` first and ensure the source is set only after the control is loaded:

```csharp
private MediaPlayer _player = new MediaPlayer();

protected override async void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);

    await _player.InitializeAsync();

    _player.Volume = 0.8;
    _player.LoadedBehavior = MediaPlayerState.AutoPlay;

    _player.Source = new UriSource("file:///C:/Videos/sample.mp4");
    await _player.PrepareAsync();
    await _player.PlayAsync();
}
```

## Initialization timing

:::caution
`MediaPlayer` is not ready to accept a media source until the Avalonia UI has fully loaded. Setting the `Source` property too early (for example, in a Window or UserControl constructor) will fail silently because the underlying platform backend has not yet been initialized.
:::

Always set the `Source` property after the control's `Loaded` event has fired. You can do this in one of two ways:

### Option 1: Use the OnLoaded override

```csharp
public partial class MainView : UserControl
{
    private Model _vm;

    public MainView()
    {
        InitializeComponent();
        _vm = new Model();
        DataContext = _vm;
    }

    protected override void OnLoaded(RoutedEventArgs e)
    {
        base.OnLoaded(e);
        _vm.SetSource(new UriSource("file:///C:/Videos/sample.mp4"));
    }
}
```

### Option 2: Use Dispatcher.UIThread.Post

If you need to set the source from a context where you cannot override `OnLoaded`, use `Dispatcher.UIThread.Post` to defer the call until the UI thread is ready:

```csharp
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    Dispatcher.UIThread.Post(() =>
    {
        mediaPlayer.Source = new UriSource("file:///C:/Videos/sample.mp4");
    });
}
```

:::tip
When using `MediaPlayerControl` with XAML bindings (for example, `Source="{Binding MediaSource}"`), the binding system handles the timing automatically because bindings are evaluated after the control is attached to the visual tree. You only need to manage timing explicitly when setting `Source` in code-behind.
:::

## Loading media sources

### From files or URLs using UriSource

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

### From streams with StreamSource

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

### Using file picker with StorageFileSource

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

## Common operations

### Playback control

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

### Media information

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

### Error handling

```csharp
mediaPlayer.ErrorOccurred += (sender, args) =>
{
    Console.WriteLine($"Media error: {args.Message}");
    args.Handled = true; // Prevents the exception from being thrown.
};
```

**Note**: This callback gives you the opportunity to reset the state of the `MediaPlayer` gracefully.

### Basic example

```xml
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

## Platform prerequisites

The `MediaPlayer` component relies on native media playback frameworks on each supported platforms:

### Windows

`MediaPlayer` uses Windows's Media Foundation to render multimedia content, 
while utilizing Vulkan Graphics API whenever possible or available on the end-user's installation.

For Windows 10/11:

- No additional setup required.

For Windows 10N/11N or 10KN/11KN:

- Please see the [Troubleshooting](/troubleshooting/controls/mediaplayer).

### macOS/iOS

`MediaPlayer` uses Apple's AVFoundation to render multimedia content on macOS and iOS. 

For macOS 10.15 or iOS 12.0 or higher. 

- No additional setup required.

### Android

`MediaPlayer` uses Android's ExoPlayer component to render multimedia content together with Vulkan Graphics API if
the end-user device supports it.

For Android API 21 (Android 5.0) or higher.

- Call `UseAndroidPlayer` in your app builder;
```csharp
protected override AppBuilder CustomizeAppBuilder(AppBuilder builder)
{
    return base.CustomizeAppBuilder(builder)
        ...
        .UseAndroidPlayer(this)
        ...
        .LogToTrace();
}
  ```
- For Vulkan support;
```csharp
protected override AppBuilder CustomizeAppBuilder(AppBuilder builder)
{
    return base.CustomizeAppBuilder(builder)
        .UseAndroidPlayer(this)
        .With(new VulkanOptions()
        {
            VulkanDeviceCreationOptions = new VulkanDeviceCreationOptions()
            {
                DeviceExtensions = new[] { "VK_ANDROID_external_memory_android_hardware_buffer", "VK_EXT_queue_family_foreign" }
            }
        })
        ...
        .LogToTrace();
}
```

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

### Embedded Linux (direct rendering manager)

Similar to the requirements on regular Linux, `MediaPlayer` uses the system-installed LibVLC library to render multimedia content for embedded Linux devices.

Follow the [guide to setting up Avalonia on Linux DRM Framebuffer](https://avaloniaui.net/blog/unleashing-net-on-embedded-linux).

Afterwards, install the VLC dependencies as described above.

No special requirements are needed for the Linux DRM setup and you can continue on using the `MediaPlayer` control like on regular Linux.

## Codecs support

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

- A definitive primary source on default codecs supported in macOS/iOS has not yet been identified.

## See also

- [MediaPlayer control](/controls/media/mediaplayercontrol)
- [MediaPlayer class](/docs/media/mediaplayer)
- [MediaSource class](/docs/media/mediasource)
- [Installing Avalonia Accelerate](/tools/installing-accelerate)
- [Troubleshooting](/troubleshooting/controls/mediaplayer)