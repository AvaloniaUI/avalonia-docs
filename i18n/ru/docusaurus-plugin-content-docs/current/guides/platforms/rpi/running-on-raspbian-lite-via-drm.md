---
id: running-on-raspbian-lite-via-drm
title: Running on Raspberry Pi with Raspbian Lite
---

import RaspbianLiteDrmKmsCubeScreenshot from '/img/guides/platforms/rpi/raspbian-lite-drm-kmscube.gif';
import RaspbianLiteDrmDesktopScreenshot from '/img/guides/platforms/rpi/raspbian-lite-drm-desktop.jpg';
import RaspbianLiteRaspberryScreenshot from '/img/guides/platforms/rpi/raspbian-lite-drm-run-on-raspberry.jpg';

# Running on Raspberry Pi with Raspbian Lite

This tutorial shows you how to run your Avalonia app on a Raspberry Pi with Raspbian Lite via [DRM](https://en.wikipedia.org/wiki/Direct\_Rendering\_Manager).

### Step 1 - Setup the Raspberry Pi

First step is to setup your Raspberry Pi.

#### 1.1 Download the Raspbian lite operation system image.

You can download the Raspbian lite operating system image from the official Raspberry Pi website.\
[Link to Raspberry Pi Operating system images](https://www.raspberrypi.com/software/operating-systems/)

#### 1.1 Prepare Raspberry for flashing

The installation of Raspberry Lite is a bit different depending on the model.

[**Raspberry Pi 4 b**](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)\
For the Pi 4 b you need a SD Card on which the operating system will be installed.\
Insert the SD card into your computer.\
You can now go directly to step 1.2.

[**Raspberry CM4**](https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000)\
Since the CM4 is designed for embedded applications you still need an IO board. For this there is the official [Compute Module 4 IO board](https://www.raspberrypi.com/products/compute-module-4-io-board/) or alternatively many other boards like the [SourceKit PiTray mini](https://sourcekit.cc/#/?id=sourcekit%C2%AE-pitray-mini).

To prepare the EMMC memory for mounting follow these [steps](https://www.raspberrypi.com/documentation/computers/compute-module.html#flashing-the-compute-module-emmc).

#### 1.2 Flashing the operating system

* [Download](https://etcher.io/) the Etcher image writing utility and install it.
* Open Etcher and select from your hard drive the .zip file you downloaded in step 1.1.
* Select the mass storage (SD card or CM4 EMMC) you wish to write your image to.
* Review your selections and click 'Flash!' to begin writing data. Once flashing is complete, create a new empty file named **ssh** (with no extension, e.q with `touch ssh`) in the boot drive of the Raspberry. This will ensure that the SSH daemon is enabled once the Raspberry Pi has started and you can logon over the network.
* _**Only for Cm4** add the following to `/boot/config.txt` to enable the Usb 2.0 ports_

```
dtoverlay=dwc2,dr_mode=host
```

* Start up your Raspberry and login.\
  **Raspberry Pi 4 b**: Put the SD card into the Raspberry and plug in power supply\
  **CM 4**: On CM4 IO Board unplug the power supply, remove J2 jumper, plug in power supply again

#### 1.3 Install missing libraries

Some libraries required to run a Avalonia app via DRM on raspbian lite:

```bash
sudo apt update
sudo apt upgrade
sudo reboot
sudo apt-get install libgbm1 libgl1-mesa-dri libegl1-mesa libinput10
```

#### 1.4 Verify DRM (optional)

You can test your installation with a simple but useful tool called [kmscube](https://gitlab.freedesktop.org/mesa/kmscube).

```bash
sudo apt-get install kmscube
sudo kmscube
```

You should see the spinning cube on your Raspberry pi screen now:\
<img src={RaspbianLiteDrmKmsCubeScreenshot} alt=""/>

### Step 2 - Prepare Avalonia App

**2.1 Create new Avalonia App (Core or MVVM App)**\
We called it _AvaloniaRaspbianLiteDrm_ in this tutorial.

**2.2 Add package** [**Avalonia.LinuxFrameBuffer**](https://www.nuget.org/packages/Avalonia.LinuxFramebuffer)

```bash
dotnet add package Avalonia.LinuxFramebuffer
```

**2.3 Create MainView**\
When we work via FrameBuffer there are no windows, so we need a separate view (UserControl) which will be our toplevel control. This view is the counterpart to the normal window.

`MainView` will be our app base in which we develop our UI:

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

Now create a new UserControl with name `MainSingleView` and host the `MainView`:

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

Also change the `MainWindow.axaml` to host the `MainView` inside:

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

_So as you see the MainView is hosted in booth `MainSingleView` and `MainWindow`. This makes it easier for development to run the app also on desktop and on the Raspberry_

**2.3 Prepare Program.cs**\
Next we need to prepare the `Program.cs` to enable the DRM usage.\
Change the Main void to the following:

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

_`SilenceConsole()` captures the console input and hide it. Otherwise you will see the console cursor blinking on the screen._

**2.4 Prepare App.axaml.cs**\
Next we need to set the MainView for the `ISingleViewApplicationLifetime` for the DRM usage.

Change the `OnFrameworkInitializationCompleted()` in `App.axaml.cs`:

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

**2.5 Run and test on desktop**\
Now you can run/debug your app on desktop as usual.\
When you start your app you should see this:\
<img src={RaspbianLiteDrmDesktopScreenshot} alt=''/>

### Step 3 - Deploy and run on Raspberry

**3.1 Publish app**

```bash
dotnet publish -c Release -o publish -r linux-arm -p:PublishReadyToRun=true -p:PublishSingleFile=true -p:PublishTrimmed=true --self-contained true -p:IncludeNativeLibrariesForSelfExtract=true
```

**3.2 Copy app to Raspberry**\
Copy the files from `/publish` directory of your project to your Raspberry.\
You can do this via `scp <source> <destination>` or use a app like [CyberDuck](https://cyberduck.io) or via Usb stick.

**3.3 Run app on Raspberry**\
First we need to change the permission to executable.

```bash
sudo chmod +x /path/to/app/AvaloniaRaspbianLiteDrm
```

Now you can run the app with the following:

```bash
sudo ./path/to/app/AvaloniaRaspbianLiteDrm --drm
```

You should see the app running on your Raspberry Pi now:

<img src={RaspbianLiteRaspberryScreenshot} alt=''/>

If you have a touch display installed, try to slide the slider control :)
