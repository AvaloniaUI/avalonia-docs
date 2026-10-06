---
id: attaching-applications
title: Attaching applications
description: Connect Avalonia Developer Tools to browser, iOS, Android, and WSL2 applications running on the same machine or local network.
doc-type: how-to
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

This page covers how to attach browser or mobile applications. It is assumed your apps are deployed on the same local network or same machine. For remote connections, see [Attaching to the remote tools](/tools/developer-tools/attaching-to-the-remote-tool).

:::note
For all platforms, `AvaloniaUI.DiagnosticsSupport` package can be installed in the shared project. As well as `this.AttachDeveloperTools()` code can be kept in the shared `Application` class. If any custom configuration is needed per platform, use `OperatingSystem.IsAndroid()`, `OperatingSystem.IsIOS()` and similar methods.
:::

## Attaching browser application

1. Follow [Getting Started](/tools/developer-tools/installation) for the initial setup.
2. Run the Developer Tools application. `avdt` dotnet tool can be used from the command line.
3. Run browser application either via `dotnet run` or `dotnet serve` on a published project. See [Avalonia WebAssembly documentation](/docs/platform-specific-guides/webassembly) for details.
4. By default, browser projects are configured to attach to the Developer Tools on startup. See [DeveloperToolsOptions.ConnectOnStartup](/tools/developer-tools/options) for details.

![Browser with Developer Tools](/img/tools/dev-tools/attaching-to-browser.png)

:::note

To avoid conflicts with Chrome Developer Tools, Avalonia tools shortcut can be redefined from <kbd>F12</kbd> to a custom one. See [DeveloperToolsOptions.Gesture](/tools/developer-tools/options) for details.

:::

## Attaching iOS application


1. Follow [Getting Started](/tools/developer-tools/installation) for the initial setup.
2. Run the Developer Tools application. `avdt` dotnet tool can be used from the command line.
3. Run iOS application from your IDE. See [Avalonia iOS documentation](/docs/platform-specific-guides/ios) for details.
4. Make sure iOS app is focused, so shortcut can be intercepted. Press <kbd>F12</kbd>.

![iOS with Developer Tools](/img/tools/dev-tools/attaching-to-ios.png)

## Attaching Android application

1. Follow [Getting Started](/tools/developer-tools/installation) for the initial setup.

    :::caution
    Android does not allow any HTTP traffic by default.

    1. Create `Resources/xml/network_security_config.xml` file:

        ```xml
        <?xml version="1.0" encoding="utf-8"?>
        <network-security-config>
          <domain-config cleartextTrafficPermitted="true">
            <domain includeSubdomains="true">10.0.2.2</domain> <!-- Debug address -->
          </domain-config>
        </network-security-config>
        ```

    2. In the AndroidManifest.xml file, update `<application>` xml node:

        ```xml
        <application android:networkSecurityConfig="@xml/network_security_config">
        ```

    3. For details, see the [Microsoft blog](https://devblogs.microsoft.com/xamarin/ cleartext-http-android-network-security/).
    :::

2. Run Developer Tools application. `avdt` dotnet tool can be used from the command line.
3. Run Android application from your IDE. Please visit [Avalonia Android documentation](/docs/platform-specific-guides/android) for more details.
4. By default, Android projects are configured to attach to the Developer Tools on startup. See [DeveloperToolsOptions.ConnectOnStartup](/tools/developer-tools/options) for details.

![Android with Developer Tools](/img/tools/dev-tools/attaching-to-android.png)

:::note

`10.0.2.2` is a default IP address on Android instead of `localhost`. It's mapped by the emulator to target host machine. To override it see [DeveloperToolsOptions.Protocol](/tools/developer-tools/options).

:::

## Attaching WSL2 application

WSL2 allows debugging and running of Linux applications from the Windows host.
It's possible to follow the same instructions and install full Developer Tools process in the WSL2 system, potentially duplicating installation with the Windows version.

But for convenience of keeping single installation it is recommended to attach Linux running application to the Windows running Developer Tools instance.

1. Follow [Getting Started](/tools/developer-tools/installation) instructions for initial setup and NuGet packages installation.
2. Configure WSL2 machine once:

    - (Preferred) Set up WSL2 mirrored mode networking, as specified in [Mirrored mode networking](https://learn.microsoft.com/en-us/windows/wsl/networking#mirrored-mode-networking) documentation. This mode makes Windows `localhost` directly accessible on WSL instance. No extra configuration and code changes are required.

    - (Alternative) Retrieve Windows host IP address following WSL2 documentation: [Accessing Windows networking apps from Linux (host IP)](https://learn.microsoft.com/en-us/windows/wsl/networking#accessing-windows-networking-apps-from-linux-host-ip). Which then can be used in your `AttachDeveloperTools` options:

    ```csharp
    this.AttachDeveloperTools(o =>
    {
        o.Protocol = DeveloperToolsProtocol.CreateHttp(IPAddress.Parse("YOUR_LOCAL_NETWORK_HOST_IP"));
    });
    ```

3. Run the Developer Tools instance on your Windows host machine. Typically via `avdt` dotnet tool command line.
4. Run your Linux app and attach to the Developer Tools via <kbd>F12</kbd>.

![Attaching to WSL2](/img/tools/dev-tools/attaching-wsl.png)

## See also

- [Attaching to the remote tool](/tools/developer-tools/attaching-to-the-remote-tool)
- [Developer tools installation](/tools/developer-tools/installation)
