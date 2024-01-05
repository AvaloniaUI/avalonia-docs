---
id: create-a-project
title: 创建并运行项目
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import RiderSplashScreenshot from '/img/get-started/test-drive/rider-splashscreen.png';
import RiderSolutionScreenshot from '/img/get-started/test-drive/rider-solution.png';
import VsFindAvaloniaTemplateScreenshot from '/img/get-started/test-drive/vs-find-avalonia-template-screenshot.png';
import VsNewAvaloniaProjectScreenshot from '/img/get-started/test-drive/vs-new-avalonia-project-screenshot.png';
import RiderRunScreenshot from '/img/get-started/test-drive/rider-run.png';
import InitialWindowScreenshot from '/img/get-started/test-drive/initial-window.png';

## 安装模板

在开始之前，请确保您已经[安装了Avalonia模板](../install.md)：

```bash
dotnet new install Avalonia.Templates
```

## 创建项目

首先，我们将使用最简单的Avalonia模板：`Avalonia Application`（或是CLI中的`avalonia.app`）。

<Tabs>
  <TabItem value="cli" label="命令行" default>
运行以下命令：

```bash
dotnet new avalonia.app -o GetStartedApp
```

这将创建一个名为`GetStartedApp`的新文件夹，其中包含新的项目。
  </TabItem>
  <TabItem value="rider" label="Rider">

- 在Rider启动界面上，选择**New Solution**

<img className="center" src={RiderSplashScreenshot} width="600"/>

- 在侧边栏中向下滚动并选择**Avalonia App**
- 在**Solution Name**字段中输入`GetStartedApp`
- 点击**Create**

该模板将创建一个新的解决方案和项目。

<img className="center" src={RiderSolutionScreenshot} width="600"/>

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

- 在**Visual Studio**中，点击**Create a new project**。
- 在搜索框中输入`Avalonia`。
- 点击**Avalonia Application**，然后点击**Next**。

<img className="center" src={VsFindAvaloniaTemplateScreenshot} />

- 将项目命名为`GetStartedApp`，然后点击**Create**。

- 在下一个页面勾选目标平台：点击**Desktop**，然后点击**Next**。

- 在下一个页面勾选设计模式：点击**ReactiveUI**，然后点击**Create**。

模板将创建一个新的解决方案和两个新项目。`GetStartedApp` 是在每个平台之间共享的主要项目。`GetStartedApp.Desktop` 是针对桌面平台的特定项目。

<img className="center" src={VsNewAvaloniaProjectScreenshot} />

  </TabItem>
</Tabs>

## 运行项目

现在我们准备好运行项目了！

<Tabs>
  <TabItem value="cli" label="命令行" default>
进入`GetStartedApp`目录并运行：

```bash
dotnet run
```
  </TabItem>
  <TabItem value="rider" label="Rider">

在Rider工具栏中点击**Run**按钮：

<img className="center" src={RiderRunScreenshot} />

  </TabItem>
  <TabItem value="vs" label="Visual Studio">

右键单击 `GetStartedApp.Desktop` 项目，然后选择 **Set as Startup Project**。

按 `F5` 运行项目。

  </TabItem>
</Tabs>

解决方案将构建并运行。

现在您应该正在运行您的第一个Avalonia应用程序了！

<img className="center" src={InitialWindowScreenshot} />