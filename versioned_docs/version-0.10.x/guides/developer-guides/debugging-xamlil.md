---
id: debugging-xamlil
title: Debugging the XAML compiler
---

import VsAttachDebuggerScreenshot from '/img/guides/developer-guides/debugging-xamlil/132686320-958f30a6-49f8-498f-853c-b9dd17262b54.png';

You can debug the XAML compiler by adding the `AvaloniaXamlIlDebuggerLaunch` property to your .csproj like this:

```xml
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <Nullable>enable</Nullable>
    <AvaloniaXamlIlDebuggerLaunch>true</AvaloniaXamlIlDebuggerLaunch>
  </PropertyGroup>
```

If build the project in Visual Studio you should see a window like this:

<img className="center" src={VsAttachDebuggerScreenshot} alt="" />

On other IDEs, a message will appear in the build output window indicating the PID of the process to attach the debugger to and the elapsed time. If within one minute of starting the build no debugger is attacked to the process, a timeout message will be reported and the build will continue as normal.