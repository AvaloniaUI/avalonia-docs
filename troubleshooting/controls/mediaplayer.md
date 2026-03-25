---
id: mediaplayer
title: MediaPlayer issues
description: Troubleshoot common MediaPlayer problems in Avalonia, including playback failures, black screens, memory leaks, and platform-specific codec issues.
doc-type: troubleshooting
sidebar_label: MediaPlayer
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## No playback when setting `Source` in the constructor

`MediaPlayer` is not ready to accept a media source until the Avalonia UI has fully loaded. If you set `Source` in a `Window` or `UserControl` constructor, the underlying platform backend has not been initialized yet and the source will not load.

**Fix:** Set the `Source` property in the `OnLoaded` override or use `Dispatcher.UIThread.Post`:

```csharp
// Option 1: OnLoaded override
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    mediaPlayer.Source = new UriSource("file:///C:/Videos/sample.mp4");
}

// Option 2: Dispatcher.UIThread.Post
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    Dispatcher.UIThread.Post(() =>
    {
        mediaPlayer.Source = new UriSource("file:///C:/Videos/sample.mp4");
    });
}
```

See [Initialization Timing](/controls/media/media-playback#initialization-timing) for more details.

## Black screen with no visible output

If the `MediaPlayer` control renders a black rectangle instead of video content, check the following:

- **Verify your source path or URL.** Make sure the file path or remote URL you are passing to `Source` is correct and accessible.
- **Confirm the media format is supported.** Not every codec is available on every platform. Test with a known-good file such as an MP4 encoded with H.264 and AAC.
- **Check that required codecs are installed.** Some operating systems ship without certain codecs. See the platform-specific sections below for guidance.

## No playback on Windows

Windows "N" and "KN" editions ship without media components. If you are running Windows 10N, 10KN, 11N, or 11KN, install the [Media Feature Pack](https://support.microsoft.com/en-us/topic/media-feature-pack-list-for-windows-n-editions-c1c6fffa-d052-8338-7a79-a4bb980a700a) from Microsoft.

If you are on a standard Windows edition and playback still fails:

- Install an alternative codec pack if the built-in codecs do not support the format you need.
- Confirm that Windows Media Player or the Films & TV app can play the same file. If those apps also fail, the issue is at the OS or codec level rather than in your Avalonia application.

## No playback on Linux

`MediaPlayer` on Linux relies on LibVLC. Make sure VLC (or at least the `libvlc-dev` package) is installed on your system:

```bash
# Debian / Ubuntu
sudo apt install vlc libvlc-dev

# Fedora
sudo dnf install vlc vlc-devel
```

After installing, restart your application to pick up the new libraries.

## Memory leaks

Improper cleanup of `MediaPlayer` resources can cause memory to grow over time. Follow these practices to avoid leaks:

- Always call `UnInitialize()` on the player when you are finished with it, for example in the `OnUnloaded` override of your view.
- Use `using` statements when working with `StreamSource` to ensure the stream is disposed correctly.

```csharp
protected override void OnUnloaded(RoutedEventArgs e)
{
    base.OnUnloaded(e);
    mediaPlayer.UnInitialize();
}
```

## Player stuck in an error state

When the player encounters a problem (such as an unsupported codec or a network timeout), it enters an error state and stops responding to new commands. To recover:

1. Subscribe to the `ErrorOccurred` event so you can log the error details and react accordingly.
2. Call `Player.ReleaseAsync()` to reset the player from the error state.

```csharp
mediaPlayer.ErrorOccurred += (sender, args) =>
{
    // Log or display the error
    Console.WriteLine($"Playback error: {args.ErrorMessage}");
};

// Reset the player after an error
await mediaPlayer.Player.ReleaseAsync();
```

After releasing, you can set a new `Source` and attempt playback again.

## See also

- [MediaPlayer control](/controls/media/mediaplayercontrol)
- [MediaPlayer class](/docs/media/mediaplayer)
- [MediaSource class](/docs/media/mediasource)
