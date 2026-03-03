---
id: webassembly
title: WebAssembly
---

## Publishing

In the `BrowserTest.Browser` directory, run:
```bash
dotnet publish
```

After project was published, .NET SDK creates an app bundle directory with `index.html` file and compiled application files.
With latest .NET 9 SDK, this directory is located at `bin/Release/net9.0-browser/publish/wwwroot`. If your project targets "net8.0-browser", use `net8.0-browser` directory.
Now you can serve your app from this directory using your favorite web server (such as Azure Static Web Apps).

:::note
On older .NET SDK versions, app bundle was located in different directory: `bin/Release/net8.0-browser/browser-wasm/AppBundle` (search for `AppBundle`).
:::

:::warning
Currently using `dotnet publish` with the `-o` or `--output` flag does not produce the AppBundle folder in the output directory. (See [this issue](https://github.com/dotnet/runtime/issues/94319).) You'll still have to grab it out of the `bin` directory at the path specified by the publish output.
:::

## Testing AppBundle locally

You can serve your wasm app from this directly using the [dotnet-serve](https://github.com/natemcmaster/dotnet-serve) tool as follows:
```bash
dotnet tool install --global dotnet-serve

dotnet serve -d:bin/Release/net9.0-browser/publish/wwwroot

# Output:
# Starting server, serving bin/Release/net9.0-browser/publish/wwwroot
# Listening on any IP:
#   http://localhost:49875
```
