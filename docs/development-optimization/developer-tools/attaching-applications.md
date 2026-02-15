---
id: attaching-applications
title: Attaching applications
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## Attaching Browser or Mobile applications

This page assumes both apps are deployed on the same local network or same machine. For the remote connection, please visit [Attaching to the remote tools](/docs/development-optimization/developer-tools/attaching-to-the-remote-tool).

:::note

For all platforms, `AvaloniaUI.DiagnosticsSupport` package can be installed in the shared project. As well as `this.AttachDeveloperTools()` code can be kept in the shared `Application` class. If any custom configuration is needed per each platform, `OperatingSystem.IsPlatform` APIs can be used. 

:::

## Attaching Browser application

1. Follow [Getting Started](/docs/development-optimization/developer-tools/installation) for the initial setup.
2. Run `Developer Tools` application. `avdt` dotnet tool can be used from the command line.
3. Run browser application either via `dotnet run` or `dotnet serve` on a published project. Please visit [Avalonia WebAssembly documentation](/docs/platform-specific-guides/webassembly) for more details.
4. By default, iOS projects configured to attach to `Developer Tools` on startup. See [DeveloperToolsOptions.ConnectOnStartup](/tools/developer-tools/options) for details.

![Browser with Developer Tools](/img/tools/dev-tools/attaching-to-browser.png)

:::note

To avoid conflicts with Chrome Developer Tools, Avalonia tools shortcut can be redefined from `F12` to a custom one. See [DeveloperToolsOptions.Gesture](/tools/developer-tools/options) for details.

:::

## Attaching iOS application


1. Follow [Getting Started](/docs/development-optimization/developer-tools/installation) for the initial setup.
2. Run `Developer Tools` application. `avdt` dotnet tool can be used from the command line.
3. Run iOS application from your IDE. Please visit [Avalonia iOS documentation](/docs/platform-specific-guides/ios) for more details.
4. Make sure browser app is focused, so shortcut can be intercepted. Press `F12`.

![iOS with Developer Tools](/img/tools/dev-tools//attaching-to-ios.png)

## Attaching Android application

1. Follow [Getting Started](/docs/development-optimization/developer-tools/installation) for the initial setup.
2. IMPORTANT: Android doesn't allow any HTTP traffic by default:
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
   3. For more details, visit https://devblogs.microsoft.com/xamarin/cleartext-http-android-network-security/
   4. `SimpleToDoList.Android` project in this repository also contains these changes for reference.
3. Run `Developer Tools` application. `avdt` dotnet tool can be used from the command line.
4. Run Android application from your IDE. Please visit [Avalonia Android documentation](/docs/platform-specific-guides/android/android) for more details.
5. By default, Android projects configured to attach to `Developer Tools` on startup. See [DeveloperToolsOptions.ConnectOnStartup](/tools/developer-tools/options) for details.

![Android with Developer Tools](/img/tools/dev-tools/attaching-to-android.png)

:::note

`10.0.2.2` is a default IP address on Android instead of `localhost`. It's mapped by the emulator to target host machine. To override it see [DeveloperToolsOptions.Protocol](/tools/developer-tools/options).

:::

## Attaching WSL2 application

WSL2 is an incredible tool allowing debugging and running of Linux applications from the Windows host.
It's possible to follow the same instructions and install full Developer Tools process in the WSL2 system, potentially duplicating installation with the Windows version.

But for convenience of keeping single installation it is recommended to attach Linux running application to the Windows running Developer Tools instance.

1. Follow [Getting Started](/docs/development-optimization/developer-tools/installation) instructions for initial setup and nuget packages installation.
2. Configure WSL2 machine once:

    - (Preferred)  Setup WSL2 mirrored mode networking, as specified in [Mirrored mode networking](https://learn.microsoft.com/en-us/windows/wsl/networking#mirrored-mode-networking) documentation. This mode makes Windows `localhost` directly accessible on WSL instance. No extra configuration and code changes is required.

    - (Alternative) Retrieve Windows host IP address following WSL2 documentation: [Accessing Windows networking apps from Linux (host IP)](https://learn.microsoft.com/en-us/windows/wsl/networking#accessing-windows-networking-apps-from-linux-host-ip). Which then can be used in your `AttachDeveloperTools` options:

    ```csharp
    this.AttachDeveloperTools(o =>
    {
        o.Protocol = DeveloperToolsProtocol.CreateHttp(IPAddress.Parse("YOUR_LOCAL_NETWORK_HOST_IP"));
    });
    ```

3. Run `Developer Tools` instance on your Windows host machine. Typically via `avdt` dotnet tool command line.
4. Run your Linux app and attach to `Developer Tools` via F12.

![Attaching to WSL2](/img/tools/dev-tools/attaching-wsl.png)