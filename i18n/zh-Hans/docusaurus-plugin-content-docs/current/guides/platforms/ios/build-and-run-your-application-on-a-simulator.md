---
id: build-and-run-your-application-on-a-simulator
title: 如何在iOS模拟器上构建和运行
---

import RuniOSSimulatorScreenshot from '/img/guides/platforms/ios/run-ios-simulator.png';

# 如何在iOS模拟器上构建和运行

请确保您已经按照[构建跨平台应用程序](../../building-cross-platform-applications)指南的步骤进行操作。

假设您已经创建了一个名为`HelloWorld`的项目。请在命令行中进入`HelloWorld.iOS`目录。

要为iOS构建该项目，请运行以下命令。

```bash
dotnet build
```

要在模拟器中运行该项目，请运行以下命令。

```bash
dotnet run
```

<img src={RuniOSSimulatorScreenshot} alt='Application running on iPad simulator'/>

如果您使用的是`JetBrains Rider`或`Visual Studio for Mac`，您可以打开解决方案并在模拟器中运行、构建和调试您的程序。
