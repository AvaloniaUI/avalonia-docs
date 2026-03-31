---
id: docker
title: Docker containers
description: How to run an Avalonia application inside a Docker container with the required Linux dependencies and a virtual display.
doc-type: how-to
---

Running an Avalonia application inside a Docker container requires installing the native Linux libraries that Avalonia depends on and providing a display server (or virtual framebuffer) for the rendering backend.

## Required packages

Avalonia on Linux targets X11 directly, so the container image must include several native libraries that are not present in the default .NET runtime images.

Install these packages in your Dockerfile (Debian/Ubuntu-based images):

```bash
apt-get update && apt-get install -y \
    libx11-6 \
    libice6 \
    libsm6 \
    libfontconfig1 \
    xvfb
```

| Package | Purpose |
|---|---|
| `libx11-6` | X11 client library. Avalonia connects to the X display server through this. |
| `libice6` | Inter-Client Exchange protocol. Required by the X session. |
| `libsm6` | X Session Management protocol. |
| `libfontconfig1` | Font discovery and configuration. Required for text rendering. |
| `xvfb` | X Virtual Framebuffer. Provides a virtual display when no physical monitor is attached. |

## Setting up a virtual display with Xvfb

Docker containers do not have a physical display. Avalonia needs an X11 display to render, so you must run Xvfb to create a virtual framebuffer.

Set the `DISPLAY` environment variable in your Dockerfile:

```dockerfile
ENV DISPLAY=:99
```

Then start Xvfb before your application launches. The simplest approach is an entrypoint script:

```bash title="entrypoint.sh"
#!/bin/bash
Xvfb :99 -screen 0 1920x1080x24 &

# Wait for Xvfb to be ready
sleep 1

exec "$@"
```

Alternatively, start Xvfb from your application code before initializing the Avalonia UI:

```csharp
var display = Environment.GetEnvironmentVariable("DISPLAY") ?? ":99";
var xvfb = Process.Start("Xvfb", new[] { display, "-screen", "0", "1920x1080x24" });

// Wait for the display to become available
var timeout = TimeSpan.FromSeconds(5);
var sw = Stopwatch.StartNew();
while (sw.Elapsed < timeout)
{
    // Try connecting to the display
    try
    {
        // If your app starts without error, the display is ready.
        break;
    }
    catch
    {
        Thread.Sleep(100);
    }
}
```

## Installing fonts

Minimal Docker images do not include fonts. Without fonts, text renders as blank rectangles. Install at least one font family:

```dockerfile
RUN apt-get install -y fonts-noto fonts-ubuntu \
    && fc-cache -fv
```

## Complete Dockerfile example

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["MyApp/MyApp.csproj", "MyApp/"]
RUN dotnet restore "MyApp/MyApp.csproj"
COPY . .
WORKDIR /src/MyApp
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish \
    --runtime linux-x64 --self-contained true

FROM mcr.microsoft.com/dotnet/runtime:9.0 AS final

# Install Avalonia dependencies and Xvfb
RUN apt-get update && apt-get install -y \
    libx11-6 \
    libice6 \
    libsm6 \
    libfontconfig1 \
    xvfb \
    fonts-noto \
    && fc-cache -fv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV DISPLAY=:99

WORKDIR /app
COPY --from=build /app/publish .
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["./MyApp"]
```

Create the entrypoint script alongside the Dockerfile:

```bash title="entrypoint.sh"
#!/bin/bash
Xvfb :99 -screen 0 1920x1080x24 &
sleep 1
exec "$@"
```

Build and run:

```bash
docker build -t myapp .
docker run myapp
```

## Using the headless platform instead

If your container does not need to produce visible output (for example, running automated tests or generating images), consider using the [headless testing platform](/docs/testing/setting-up-the-headless-platform) instead. The headless platform replaces the windowing and rendering backends with in-memory implementations and does not require X11 or Xvfb.

```csharp
public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<App>()
    .UseSkia()
    .UseHeadless(new AvaloniaHeadlessPlatformOptions
    {
        UseHeadlessDrawing = false // set to true if you don't need pixel output
    });
```

This approach produces a smaller container image because no X11 packages are needed.

## Troubleshooting

### `libX11.so.6: cannot open shared object file`

The `libx11-6` package is missing. Add it to your Dockerfile:

```dockerfile
RUN apt-get update && apt-get install -y libx11-6
```

### Blank or missing text

No fonts are installed in the container. Install a font package and rebuild the font cache:

```dockerfile
RUN apt-get install -y fonts-noto && fc-cache -fv
```

### `Cannot open display`

Xvfb is not running or the `DISPLAY` variable does not match the Xvfb display number. Verify that Xvfb starts before your application and that `DISPLAY` is set to the same value (for example, `:99`).

## See also

- [Deploying to Desktop Linux](/docs/deployment/linux) for `.deb` packaging
- [Deploying to Embedded Linux](/docs/deployment/embedded-linux) for DRM/KMS scenarios
- [Desktop Linux platform integration](/docs/platform-specific-guides/linux) for X11 dependencies and WSL 2
- [Headless Testing Platform](/docs/testing/setting-up-the-headless-platform) for running without any display server
