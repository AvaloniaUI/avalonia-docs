---
id: ios
title: iOS
---

import IOSOpenXcodeScreenshot from '/img/guides/platform-specific-guides/ios/ios-open-xcode.png';
import IOSCreateXcodeProjectScreenshot from '/img/guides/platform-specific-guides/ios/ios-create-xcode-project.png';
import IOSSelectProjectOptionsScreenshot from '/img/guides/platform-specific-guides/ios/ios-select-project-options.png';
import IOSSelectAnyDeviceScreenshot from '/img/guides/platform-specific-guides/ios/ios-select-any-device.png';
import IOSAddAdditionalSimulatorsScreenshot from '/img/guides/platform-specific-guides/ios/ios-add-additional-simulators.png';
import IOSProvisionPhoneScreenshot from '/img/guides/platform-specific-guides/ios/ios-provision-phone.png';
import IOSSelectDeviceScreenshot from '/img/guides/platform-specific-guides/ios/ios-select-device.png';
import IOSChangeBundleIdentifierScreenshot from '/img/guides/platform-specific-guides/ios/ios-change-bundle-identifier.png';
import IOSCertScreenshot from '/img/guides/platform-specific-guides/ios/ios-cert.png';
import IOSSimulatorScreenshot from '/img/guides/platform-specific-guides/ios/run-ios-simulator.png';

## Setting up your developer environment

### Prerequisites

On a Mac you will need to have the latest version of macOS and Xcode installed.

### Install the SDK

First it is very important to install the correct [dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0). At the time of writing, the lowest sdk version that works is 6.0.200.

### Install the workload

```bash
dotnet workload install ios
```

:::info
You may need to run the command with `sudo`\
\
You may also need to uninstall old versions. `dotnet workload remove ios`
:::

This will allow you to build applications for iOS on any platform. However you will only be able to test and run them if you have access to actual macOS hardware with Xcode installed.

## Running your app on an iOS device

In order to allow dotnet to sideload your application to your iphone or ipad you must first use Xcode to provision your device.

Before continuing follow this [guide to create a free Apple developer signing certificate](https://docs.microsoft.com/en-us/xamarin/ios/get-started/installation/device-provisioning/free-provisioning).

This has to be done by creating an Xcode app project that has the same `bundle identifier` that you will use in your application.

1. Open Xcode

<img src={IOSOpenXcodeScreenshot} alt=''/>

2. Select Create a new Xcode project

<img src={IOSCreateXcodeProjectScreenshot} alt=''/>

3. Select iOS and App and click Next.

<img src={IOSSelectProjectOptionsScreenshot} alt=''/>

4. Type in a name for your project and Organisation. Keep all the rest of the information the same.

5. Choose a directory to save the project. You will not need to keep the project so don't worry too much about where.

6. In the status bar at the top click on the "Any device (arm64)"

<img src={IOSSelectAnyDeviceScreenshot} alt=''/>

7. At the bottom of the list click "Add Additional Simulators..."

<img src={IOSAddAdditionalSimulatorsScreenshot} alt=''/>

8. Click on devices and connect your iPhone or iPad with the USB cable. Xcode will start to provision your phone for development.

<img src={IOSProvisionPhoneScreenshot} alt=''/>

9. Select you iPhone or iPad from the device list.

<img src={IOSSelectDeviceScreenshot} alt=''/>

10. Click the play button and the app will be installed and run on your phone.

If successful you may return to your IDE of choice and open the `info.plist` file from the iOS project.

11. Change the bundle identifier to the same as the one you choose in Xcode in step 3.

<img src={IOSChangeBundleIdentifierScreenshot} alt=''/>

12. Now edit the `.iOS.csproj` file.

```xml
<RuntimeIdentifier>ios-arm64</RuntimeIdentifier>
<CodesignKey>Apple Development: dan@walms.co.uk (3L323F7VSS)</CodesignKey>
```

Change the `RuntimeIdentifier` from `iossimulator-x64` to `ios-arm64`

:::info
`You will need to reverse this step if you wish to run in the simulator in future.`
:::

Add a `<CodesignKey>` tag.

To find the value for this open the application `KeyChain Access`. In the search box search for development.

<img src={IOSCertScreenshot} alt=''/>

Set the value exactly as the bold text at the top of the window on your selected development certificate.

`Apple Development: dan@walms.co.uk (3L323F7VSS)` in this case.

After this you can run and debug your application on the iPhone or iPad.

## Running your app on an iOS simulator

Assuming you have created a project called `HelloWorld`. Enter the directory `HelloWorld.iOS` from the command line.

To build the project for iOS run the following command.

```bash
dotnet build
```

To run the project in a simulator, run the following command.

```bash
dotnet run
```

<img src={IOSSimulatorScreenshot} alt='Application running on iPad simulator'/>

If you use `JetBrains Rider` or `Visual Studio for Mac` you can open the solution and run, build and debug your program inside the simulator.

:::info
`Dependent on the .NET version and the iOS Simulator version it may require Rosetta 2 to be installed on Apple Silicon Macs. To install Rosetta 2, you can use the following command in the terminal:`

```bash
/usr/sbin/softwareupdate --install-rosetta
```
:::