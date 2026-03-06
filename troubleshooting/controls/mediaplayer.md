---
id: mediaplayer
title: MediaPlayer issues
sidebar_label: MediaPlayer
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## No playback when setting Source in the constructor

`MediaPlayer` is not ready to accept a media source until the Avalonia UI has fully loaded. If you set `Source` in a Window or UserControl constructor, the underlying platform backend has not been initialized yet and the source will not load.

**Fix**: Set the `Source` property in the `OnLoaded` override or use `Dispatcher.UIThread.Post`:

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

## Black screen
    - Verify the source path/URL is correct.
    - Ensure the media format is supported by the target platform.
    - Check that required codecs are installed in the system.

## No playback on Windows
    - If you are on Windows 10N/10KN or Windows 11N/11KN versions, try installing
      the [Media Feature Pack](https://support.microsoft.com/en-us/topic/media-feature-pack-list-for-windows-n-editions-c1c6fffa-d052-8338-7a79-a4bb980a700a).
    - Try to install alternative codec packs if the Media Feature Pack doesn't support the codec you wish to play.
    - Check Windows Media Player or related Windows apps are working.

## No playback on Linux
    - Ensure LibVLC/VLC is installed on your system.

## Memory leaks
    - Always call `UnInitialize()` when you're done with the player
    - Use `using` statements with StreamSource to ensure proper disposal

## Player in error state
    - Call `Player.ReleaseAsync()` to reset from the error state
    - Handle the `ErrorOccurred` event for any error messages and reset accordingly.

## See also

- [MediaPlayer control](/controls/media/mediaplayercontrol)
- [MediaPlayer class](/docs/media/mediaplayer)
- [MediaSource class](/docs/media/mediasource)