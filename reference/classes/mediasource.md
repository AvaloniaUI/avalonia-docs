---
id: mediasource
title: MediaSource
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

The `MediaSource` class hierarchy provides an abstraction for different types of media content sources in Avalonia Accelerate MediaControls. This allows the media playback system to handle various content sources (files, URLs, streams) through a unified interface.

## MediaSource (Abstract Base Class)

`MediaSource` is an abstract base class that defines the common interface for all media sources.

### Methods

| Method    | Return Type | Description                                  |
|-----------|-------------|----------------------------------------------|
| Dispose() | void        | Releases resources used by the media source. |

## UriSource Class

The `UriSource` class represents media content referenced by a URI, which can point to local files or network resources.

### Properties

| Property | Type | Description                                    |
|----------|------|------------------------------------------------|
| Source   | Uri  | Gets the URI that points to the media content. |

### Constructors

| Constructor              | Description                                |
|--------------------------|--------------------------------------------|
| UriSource(Uri source)    | Initializes with the specified URI.        |
| UriSource(string source) | Initializes with the specified URI string. |

### Methods

| Method                  | Return Type | Description                                 |
|-------------------------|-------------|---------------------------------------------|
| Equals(UriSource other) | bool        | Determines equality with another UriSource. |
| Equals(object obj)      | bool        | Determines equality with an object.         |
| GetHashCode()           | int         | Returns the hash code for this instance.    |
| Dispose()               | void        | Releases resources (typically a no-op).     |

### Usage Examples

```csharp
// From a string URL
var webSource = new UriSource("https://example.com/video.mp4");

// From a file path
var fileSource = new UriSource("file:///C:/Videos/sample.mp4");

// From a Uri object
var uri = new Uri("rtsp://example.com/stream");
var streamSource = new UriSource(uri);
```

## StreamSource Class

The `StreamSource` class represents media content provided as a stream, allowing for dynamic or in-memory content to be
played.

### Properties

| Property     | Type   | Description                                          |
|--------------|--------|------------------------------------------------------|
| TargetStream | Stream | Gets the underlying stream containing media data.    |
| IsSeekable   | bool   | Gets whether the underlying stream supports seeking. |

### Constructors

| Constructor                       | Description                            |
|-----------------------------------|----------------------------------------|
| StreamSource(Stream targetStream) | Initializes with the specified stream. |

### Methods

| Method                     | Return Type | Description                                          |
|----------------------------|-------------|------------------------------------------------------|
| Equals(StreamSource other) | bool        | Determines equality with another StreamSource.       |
| Dispose()                  | void        | Releases resources, including the underlying stream. |

### Usage Examples

```csharp
// From a file stream
var fileStream = File.OpenRead("video.mp4");
var fileStreamSource = new StreamSource(fileStream);

// From a memory stream
byte[] videoData = GetVideoData();
var memoryStream = new MemoryStream(videoData);
var memoryStreamSource = new StreamSource(memoryStream);

// From a network stream
var webRequest = WebRequest.Create("https://example.com/video.mp4");
var responseStream = webRequest.GetResponse().GetResponseStream();
var networkStreamSource = new StreamSource(responseStream);
```

## Choosing Between `UriSource` and `StreamSource`

### When to Use `UriSource`

- Local media files.
- Network streams with direct URLs.
- Real-time protocol streams (RTSP/RTMP/RDP).
- Any media with a standard URI representation.

**Advantages**:

- Lower overhead.
- Native handling by media backends.
- No memory or lifetime management concerns.

### When to Use `StreamSource`

- In-memory media content.
- Dynamic content generated at runtime.
- Content loaded from non-standard sources.
- Content that needs preprocessing before playback.

**Advantages**:

- Flexibility for custom content sources.
- No need for temporary files.
- Works with encrypted or protected content.

## Resource Management

Both `UriSource` and `StreamSource` implement `IDisposable`:

- For `UriSource`, the `Dispose` method is typically a no-op.
- For `StreamSource`, the `Dispose` method disposes the underlying stream.

The `MediaPlayer` manages the lifecycle automatically:

- When setting a new Source, the previous Source is disposed.
- When the player is released or uninitiated, the current Source is disposed.

## Best Practices

1. **Resource Management**:
    - Don't dispose streams passed to a `StreamSource` as it takes ownership.

2. **Source Selection**:
    - Use `UriSource` for file and network media when possible (more efficient).
    - Use `StreamSource` for in-memory content or preprocessing.

3. **Error Handling**:
    - Validate URIs before creating a `UriSource`
    - Verify streams are readable before creating a `StreamSource`
    - Handle exceptions when opening files or network resources

4. **Seeking Considerations**:
    - Check `StreamSource.IsSeekable` to determine if seeking is supported.
    - If seeking is required, ensure the stream supports it (`CanSeek` = true).

## See also

- [MediaPlayer control](/controls/media/mediaplayercontrol)
- [MediaPlayer class](/reference/classes/mediaplayer)
- [Implementing MediaPlayer](/docs/media/media-playback)
- [Installing Avalonia Accelerate](/docs/development-optimization/accelerate-tools/installing-accelerate)
- [Troubleshooting](/troubleshooting/controls/mediaplayer)