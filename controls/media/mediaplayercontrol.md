---
id: mediaplayercontrol
title: MediaPlayerControl
tags:
  - accelerate
---

The `MediaPlayerControl` is a fully-featured UI control for media playback that provides transport controls, progress display, volume control, and video rendering. It encapsulates a `MediaPlayer` instance and provides a rich user interface for media playback.


:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## Properties

### Basic properties

| Property       | Type             | Description                                                                                 |
|----------------|------------------|---------------------------------------------------------------------------------------------|
| Player         | MediaPlayer      | Gets the underlying MediaPlayer instance that handles the actual media playback operations. |
| Source         | MediaSource      | Gets or sets the media source to be played (`UriSource` or `StreamSource`).                 |
| LoadedBehavior | MediaPlayerState | Gets or sets the behavior when media is loaded (`AutoPlay` or `Manual`).                    |

### Playback properties

| Property                     | Type      | Description                                                                  |
|------------------------------|-----------|------------------------------------------------------------------------------|
| Position                     | TimeSpan  | Gets or sets the current playback position.                                  |
| Duration                     | TimeSpan? | Gets the total duration of the current media. Null for non-seekable media.   |
| SkipTime                     | TimeSpan  | Gets or sets the time to skip with forward/backward commands (default: 10s). |

### State properties

| Property                | Type    | Description                                                        |
|-------------------------|---------|--------------------------------------------------------------------|
| IsBuffering             | bool    | Gets whether the media is currently buffering.                     |
| BufferProgress          | double? | Gets the buffer progress (0.0-1.0). Null if not available.         |
| IsPaused                | bool    | Gets whether the media playback is currently paused.               |
| IsMediaActive           | bool    | Gets whether media is currently active (loaded and/or playing).    |
| HasVideo                | bool    | Gets whether the current media contains video content.             |
| IsSeekable              | bool    | Gets whether the current media can be seeked.                      |
| IsOverlayTimeoutEnabled | bool    | Gets or sets whether control overlay should hide after inactivity. |

### Audio properties

| Property | Type   | Description                                                              |
|----------|--------|--------------------------------------------------------------------------|
| Volume   | double | Gets or sets the playback volume with normalized values (e.g., 0.0-1.0). |
| IsMuted  | bool   | Gets whether audio is currently muted.                                   |

### Command properties

| Property            | Type     | Description                                                           |
|---------------------|----------|-----------------------------------------------------------------------|
| PlayPauseCommand    | ICommand | Gets the command that toggles between play and pause states.          |
| StopCommand         | ICommand | Gets the command that stops playback.                                 |
| MuteCommand         | ICommand | Gets the command that toggles audio muting.                           |
| SkipForwardCommand  | ICommand | Gets the command that skips forward by [SkipTime](#playback-properties) amount.  |
| SkipBackwardCommand | ICommand | Gets the command that skips backward by [SkipTime](#playback-properties) amount. |

## Events

| Event           | Description                                                  |
|-----------------|--------------------------------------------------------------|
| ErrorOccurred | Occurs when an error is encountered during media operations. |

## Usage examples

### Basic usage

```xml
<MediaPlayerControl Name="mediaPlayerControl" Source="{Binding MediaSource}"
                    Volume="0.8"
                    LoadedBehavior="AutoPlay" />
```

### Setting Source in code-behind

When setting `Source` in code-behind rather than through a binding, you must wait until the control has loaded. Setting the source in a constructor will fail silently because the underlying player backend has not been initialized yet.

```csharp
// Do NOT set Source in the constructor:
// public MainWindow()
// {
//     InitializeComponent();
//     mediaPlayerControl.Source = new UriSource("file:///C:/video.mp4"); // Too early!
// }

// Instead, use OnLoaded:
protected override void OnLoaded(RoutedEventArgs e)
{
    base.OnLoaded(e);
    mediaPlayerControl.Source = new UriSource("file:///C:/Videos/sample.mp4");
}
```

See [Initialization Timing](/controls/media/media-playback#initialization-timing) for more details.

### Binding to commands

```xml
<Button Command="{Binding #mediaPlayerControl.PlayPauseCommand}" 
        Content="Play/Pause" />
        
<Button Command="{Binding #mediaPlayerControl.StopCommand}" 
        Content="Stop" />
```

### Error handling

```csharp
mediaPlayerControl.ErrorOccurred += (sender, args) =>
{
    Console.WriteLine($"Media error: {args.Message}");
    args.Handled = true; // Prevents the exception from being thrown.
};
```

**Note**: This callback gives you the opportunity to reset the state of the `MediaPlayerControl` gracefully.

## Template parts and customization

The default control template for `MediaPlayerControl` includes several key parts:

- **PART_MediaPlayerPresenter**: Displays the video content
- **MediaControlOverlay**: Contains the playback controls
- **MediaHoverOverlay**: Contains UI elements for hover state

The most basic configuration of the `MediaPlayerControl` can be like this:

```xml
<!-- In a ResourceDictionary referenced by your app. -->
<ControlTheme x:Key="{x:Type MediaPlayerControl}" TargetType="MediaPlayerControl">
  <Setter Property="Template">
    <ControlTemplate>
      <!-- This border is for decoration and for setting a default background for the control 
         When there's no media. -->
      <Border Background="Gray" ClipToBounds="True" CornerRadius="4">
        <Panel>
          <!-- This is used to have a dark background against the MediaPlayerPresenter when there's a 
                 video to be displayed. -->
          <Border IsVisible="{TemplateBinding HasVideo}">
            <Border Background="Black" IsVisible="{TemplateBinding IsMediaActive}"/>
          </Border>

          <!-- This ViewBox is responsible on how the MediaPlayerPresenter is stretched to fit
                 the bounding area of the control. -->
          <Viewbox>
            <!-- The control in which the internal MediaPlayer draws the video -->
            <MediaPlayerPresenter Name="PART_MediaPlayerPresenter"/>
          </Viewbox>

          <!-- Example of the overlay playback controls. 
                 Use the built-in Commands to easily control the playback. -->
          <DockPanel LastChildFill="True" MaxHeight="64" VerticalAlignment="Bottom">
            <ProgressBar DockPanel.Dock="Bottom"
                         IsIndeterminate="True"
                         IsVisible="{TemplateBinding IsBuffering}"/>
            <StackPanel Orientation="Horizontal"
                        HorizontalAlignment="Center"
                        Spacing="10"
                        Margin="5"
                        TextElement.FontSize="24">
              <Button Content="&#x23EF;"
                      Padding="5,-5,5,0"
                      Command="{TemplateBinding PlayPauseCommand}"/>
              <Button Content="&#x23F9;"
                      Padding="5,-5,5,0"
                      Command="{TemplateBinding StopCommand}"/>
            </StackPanel>
          </DockPanel>
        </Panel>
      </Border>
    </ControlTemplate>
  </Setter>
</ControlTheme>
```

You can use that and the default theme as a jumping point for your desired look for `MediaPlayerControl`

## Lifecycle management

The `MediaPlayerControl` automatically manages the lifecycle of its internal `MediaPlayer`:

```mermaid
flowchart LR
    Start([Start]) --> Attached

    subgraph Init[Initialization]
        Attached[OnAttachedToVisualTree] --> Create[Create MediaPlayer]
        Create --> Events[Set up events]
        Events --> InitPlayer[Initialize player]
    end

    subgraph Setup[Template Setup]
        Template[OnApplyTemplate] --> FindPresenter[Find presenter]
        FindPresenter --> Connect[Connect to presenter]
    end

    subgraph Cleanup[Resource Cleanup]
        Detached[OnDetachedFromVisualTree] --> DisconnectEvents[Remove events]
        DisconnectEvents --> ReleasePlayer[Release resources]
    end

    Init --> Setup
    Setup --> Usage([Usage])
    Usage --> Cleanup
    class Init,Setup,Cleanup phase
```

Here's a more comprehensive graph of `MediaPlayerControl`'s interactions with its internal `MediaPlayer` over the course of its
lifetime:

```mermaid
flowchart LR
    subgraph UI[MediaPlayerControl]
        UI_Init[Control Attached] --> SetSource[Set Source]
        SetSource --> UI_Prepared[Update UI]
        UI_Prepared --> UserPlay[User Clicks Play]
        UserPlay --> UI_Playing[Update UI: Playing]
        UI_Playing --> UserPause[User Clicks Pause]
        UserPause --> UI_Paused[Update UI: Paused]
        UI_Paused --> UserPlay
        UI_Playing --> UserStop[User Clicks Stop]
        UserStop --> UI_Stopped[Update UI: Stopped]
        UI_Playing --> UserSeek[User Drags Position Slider]
        UserSeek --> UI_NewPosition[Update Position]
        UI_Paused --> UserSeek
        UI_Playing --> MediaEnd[Media End Detected]
        MediaEnd --> UI_Completed[Update UI: Completed]
    end

    subgraph Player[MediaPlayer]
        MP_Init[Initialize] --> MP_SetSource[Set Source]
        MP_SetSource --> MP_Prepare[Prepare]
        MP_Prepare --> MP_Play[Play]
        MP_Play --> MP_Pause[Pause]
        MP_Pause --> MP_Play
        MP_Play --> MP_Stop[Stop]
        MP_Play --> MP_Seek[Seek]
        MP_Pause --> MP_Seek
        MP_Play --> MP_Complete[PlaybackCompleted]
    end

    UI_Init --->|InitializeAsync| MP_Init
    SetSource --->|Source Property| MP_SetSource
    SetSource --->|PrepareAsync| MP_Prepare
    UserPlay --->|PlayAsync| MP_Play
    UserPause --->|PauseAsync| MP_Pause
    UserStop --->|StopAsync| MP_Stop
    UserSeek --->|Position Property| MP_Seek
    MP_Complete --->|Event| MediaEnd
    classDef uiStates stroke: #333, stroke-width: 1px
    classDef playerStates stroke: #333, stroke-width: 1px

    class UI_Init,SetSource,UI_Prepared,UserPlay,UI_Playing,UserPause,UI_Paused,UserStop,UI_Stopped,UserSeek,UI_NewPosition,MediaEnd,UI_Completed uiStates
    class MP_Init,MP_SetSource,MP_Prepare,MP_Play,MP_Pause,MP_Stop,MP_Seek,MP_Complete playerStates
```

## Best practices

1. **Error Handling**:
    - Always subscribe to the `ErrorOccurred` event to handle errors gracefully.
    - Set the `Handled` property to true on the `ErrorOccurred` event handler if you've managed the error.

2. **Resource Management**:
    - The control manages the `MediaPlayerControl` lifecycle automatically.

3. **UI Integration**:
    - Use the built-in commands for integrating with custom buttons/controls.
    - The `IsMediaActive` property is useful for enabling/disabling UI elements.

## See also

- [MediaPlayer class](/docs/media/mediaplayer)
- [MediaSource class](/docs/media/mediasource)
- [Implementing MediaPlayer](/docs/media/media-playback)
- [Installing Avalonia Accelerate](/tools/installing-accelerate)
- [Troubleshooting](/troubleshooting/controls/mediaplayer)