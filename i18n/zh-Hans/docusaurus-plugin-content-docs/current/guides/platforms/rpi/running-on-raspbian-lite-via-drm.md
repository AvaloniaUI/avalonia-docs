---
id: running-on-raspbian-lite-via-drm
title: 在树莓派上通过 Raspbian Lite 运行
---

import RaspbianLiteDrmKmsCubeScreenshot from '/img/guides/platforms/rpi/raspbian-lite-drm-kmscube.gif';
import RaspbianLiteDrmDesktopScreenshot from '/img/guides/platforms/rpi/raspbian-lite-drm-desktop.jpg';
import RaspbianLiteRaspberryScreenshot from '/img/guides/platforms/rpi/raspbian-lite-drm-run-on-raspberry.jpg';

# 在树莓派上通过 Raspbian Lite 运行

本教程将向您展示如何在树莓派上通过 Raspbian Lite 和 [DRM](https://en.wikipedia.org/wiki/Direct\_Rendering\_Manager) 运行 Avalonia 应用。

### 步骤 1 - 设置树莓派

第一步是设置您的树莓派。

#### 1.1 下载 Raspbian Lite 操作系统镜像

您可以从官方树莓派网站下载 Raspbian Lite 操作系统映像。
[下载树莓派操作系统镜像](https://www.raspberrypi.com/software/operating-systems/)

#### 1.2 准备树莓派进行烧录

Raspberry Lite 的安装方法因型号不同而有所不同。

[**Raspberry Pi 4 b**](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
对于 Pi 4 b，您需要一个 SD 卡来安装操作系统。
将 SD 卡插入您的计算机。
然后您可以直接进入步骤 1.3。

[**Raspberry CM4**](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000)
由于 CM4 是为嵌入式应用而设计的，您仍然需要一个 IO 板。有官方的 [Compute Module 4 IO board](https://www.raspberrypi.com/products/compute-module-4-io-board/)，或者也有其他许多选择，如 [SourceKit PiTray mini](https://sourcekit.cc/#/?id=sourcekit%C2%AE-pitray-mini)。

要准备 EMMC 存储器进行挂载，请按照这些[步骤](https://www.raspberrypi.com/documentation/computers/compute-module.html#flashing-the-compute-module-emmc)。

#### 1.3 烧录操作系统

* [下载](https://etcher.io/) Etcher 映像写入工具并安装。
* 打开 Etcher，并从您的硬盘中选择在步骤 1.1 中下载的 .zip 文件。
* 选择要将镜像写入的存储设备（SD 卡或 CM4 EMMC）。
* 查看您的选择并点击 "Flash!" 开始写入数据。一旦写入完成，在 Raspberry 的启动盘驱动器上创建一个名为 **ssh**（没有扩展名，例如用 `touch ssh` 创建）的新空文件。这将确保 SSH 守护程序在树莓派启动后启用，从而可以通过网络登录。
* _**仅针对 Cm4** 添加以下内容到 `/boot/config.txt` 以启用 USB 2.0 端口_

```
dtoverlay=dwc2,dr_mode=host
```

* 启动 Raspberry 并登录。
  **Raspberry Pi 4 b**：将 SD 卡插入 Raspberry 并连接电源
  **CM 4**：在 CM4 IO Board 上拔掉电源，移除 J2 跳线，然后再次连接电源

#### 1.4 安装缺失的库

在 Raspbian Lite 上运行 Avalonia 应用所需的一些库：

```bash
sudo apt update
sudo apt upgrade
sudo reboot
sudo apt-get install libgbm1 libgl1-mesa-dri libegl1-mesa libinput10
```

#### 1.5 验证 DRM（可选）

您可以使用一个简单但实用的工具 [kmscube](https://gitlab.freedesktop.org/mesa/kmscube) 来测试您的安装。

```bash
sudo apt-get install kmscube
sudo kmscube
```

现在您应该在树莓派屏幕上看到旋转的立方体：
<img src={RaspbianLiteDrmKmsCubeScreenshot} alt=''/>

### 步骤 2 - 准备 Avalonia 应用

**2.1 创建新的 Avalonia 应用（Core 或 MVVM App）**
在本教程中，我们称其为 _AvaloniaRaspbianLiteDrm_。

**2.2 添加包** [**Avalonia.LinuxFrameBuffer**](https://www.nuget.org/packages/Avalonia.LinuxFramebuffer)

```bash
dotnet add package Avalonia.LinuxFramebuffer
```

**2.3 创建 MainView**
当我们通过 FrameBuffer 工作时，没有窗口，因此我们需要一个单独的视图（UserControl），它将是我们的顶级控件。该视图是普通窗口的对应物。

`MainView` 将是我们开发 UI 的应用基础：

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d"
             d:DesignWidth="800"
             d:DesignHeight="450"
             x:Class="AvaloniaRaspbianLiteDrm.MainView">
    <StackPanel HorizontalAlignment="Center"
                VerticalAlignment="Center"
                Margin="30"
                Spacing="30">
        <TextBlock FontSize="25">
            Welcome to Avalonia! The best XAML framework ever ♥
        </TextBlock>
        <Slider />
    </StackPanel>
</UserControl>
```

现在创建一个名为 `MainSingleView` 的新 `UserControl`，并托管 `MainView`：

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:avaloniaRaspbianLiteDrm="clr-namespace:AvaloniaRaspbianLiteDrm"
             mc:Ignorable="d"
             d:DesignWidth="800"
             d:DesignHeight="450"
             x:Class="AvaloniaRaspbianLiteDrm.MainSingleView">
    <avaloniaRaspbianLiteDrm:MainView />
</UserControl>
```

还要更改 `MainWindow.axaml` 以在其中托管 `MainView`：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:avaloniaRaspbianLiteDrm="clr-namespace:AvaloniaRaspbianLiteDrm"
        mc:Ignorable="d"
        d:DesignWidth="800"
        d:DesignHeight="450"
        x:Class="AvaloniaRaspbianLiteDrm.MainWindow"
        Title="AvaloniaRaspbianLiteDrm">
    <avaloniaRaspbianLiteDrm:MainView />
</Window>
```

_正如您所看到的，`MainView` 在 `MainSingleView` 和 `MainWindow` 中都被托管。这使得开发时在桌面和树莓派上运行应用程序变得更加容易。_

**2.4 准备 Program.cs**
接下来，我们需要准备 `Program.cs` 以启用DRM的使用。
将 Main 方法更改为以下内容：

```csharp
public static int Main(string[] args)
{
    var builder = BuildAvaloniaApp();
    if (args.Contains("--drm"))
    {
        SilenceConsole();
        return builder.StartLinuxDrm(args);
    }

    return builder.StartWithClassicDesktopLifetime(args);
}

private static void SilenceConsole()
{
    new Thread(() =>
        {
            Console.CursorVisible = false;
            while (true)
                Console.ReadKey(true);
        })
        { IsBackground = true }.Start();
}
```

_`SilenceConsole()`捕获控制台输入并隐藏它。否则，您将在屏幕上看到控制台光标闪烁。_

**2.5 准备 App.axaml.cs**
接下来，我们需要为DRM使用设置 `ISingleViewApplicationLifetime` 的MainView。

在 `App.axaml.cs` 中更改 `OnFrameworkInitializationCompleted()`：

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        desktop.MainWindow = new MainWindow();
    else if (ApplicationLifetime is ISingleViewApplicationLifetime singleView)
        singleView.MainView = new MainSingleView();

    base.OnFrameworkInitializationCompleted();
}
```

**2.6 在桌面上运行和测试**
现在，您可以像往常一样在桌面上运行/调试应用程序。
启动您的应用程序时，您应该会看到这样的界面：
<img src={RaspbianLiteDrmDesktopScreenshot} alt=''/>

### 步骤3 - 部署并在树莓派上运行

**3.1 发布应用程序发布应用程序**

```bash
dotnet publish -c Release -o publish -r linux-arm -p:PublishReadyToRun=true -p:PublishSingleFile=true -p:PublishTrimmed=true --self-contained true -p:IncludeNativeLibrariesForSelfExtract=true
```

**3.2 将应用程序复制到树莓派**
将项目的 `/publish` 目录中的文件复制到树莓派。
您可以通过 `scp <源> <目标>` 或使用 [CyberDuck](https://cyberduck.io) 或通过USB设备完成。

**3.3 在树莓派上运行应用程序**
首先，我们需要更改权限为可执行。

```bash
sudo chmod +x /path/to/app/AvaloniaRaspbianLiteDrm
```

现在，您可以通过以下命令运行应用程序：

```bash
sudo ./path/to/app/AvaloniaRaspbianLiteDrm --drm
```

您应该在树莓派上看到应用程序正在运行：

<img src={RaspbianLiteRaspberryScreenshot} alt=''/>

如果您安装了触摸显示器，请尝试滑动滑动条控件 :)
