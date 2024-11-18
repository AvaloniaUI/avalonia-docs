---
id: build-and-run-your-application-on-your-iphone-or-ipad
title: 如何在iPhone或iPad上构建和运行应用程序
---

import IOSOpenXcodeScreenshot from '/img/guides/platforms/ios/ios-open-xcode.png';
import IOSCreateXcodeProjectScreenshot from '/img/guides/platforms/ios/ios-create-xcode-project.png';
import IOSSelectProjectOptionsScreenshot from '/img/guides/platforms/ios/ios-select-project-options.png';
import IOSSelectAnyDeviceScreenshot from '/img/guides/platforms/ios/ios-select-any-device.png';
import IOSAddAdditionalSimulatorsScreenshot from '/img/guides/platforms/ios/ios-add-additional-simulators.png';
import IOSProvisionPhoneScreenshot from '/img/guides/platforms/ios/ios-provision-phone.png';
import IOSSelectDeviceScreenshot from '/img/guides/platforms/ios/ios-select-device.png';
import IOSChangeBundleIdentifierScreenshot from '/img/guides/platforms/ios/ios-change-bundle-identifier.png';
import IOSCertScreenshot from '/img/guides/platforms/ios/ios-cert.png';

# 如何在iPhone或iPad上构建和运行应用程序

为了允许dotnet将您的应用程序侧加载到您的iPhone或iPad上，您首先必须使用Xcode为您的设备配置权限。

在继续之前，请按照 [此指南创建免费的Apple开发者签名证书](https://docs.microsoft.com/en-us/xamarin/ios/get-started/installation/device-provisioning/free-provisioning)。

为此，您需要创建一个Xcode应用项目，其`bundle identifier`与您的应用程序中将使用的标识符相同。

1. 打开 Xcode

<img src={IOSOpenXcodeScreenshot} alt=''/>

2\. 选择创建一个新的Xcode项目

<img src={IOSCreateXcodeProjectScreenshot} alt=''/>

3\. 选择iOS和应用程序，然后点击下一步。

<img src={IOSSelectProjectOptionsScreenshot} alt=''/>

4\. 为您的项目和组织输入名称。其余信息保持不变。

5\. 选择保存项目的目录。您不需要保留该项目，所以不必过于担心选择哪里保存。

6\. 在顶部的状态栏中点击"Any device (arm64)"。

<img src={IOSSelectAnyDeviceScreenshot} alt=''/>

7\. 在列表底部点击"Add Additional Simulators..."

<img src={IOSAddAdditionalSimulatorsScreenshot} alt=''/>

8\. 点击设备，然后用USB电缆连接您的iPhone或iPad。Xcode将开始为您的手机进行开发配置。

<img src={IOSProvisionPhoneScreenshot} alt=''/>

9\. 从设备列表中选择您的iPhone或iPad。

<img src={IOSSelectDeviceScreenshot} alt=''/>

10\. 点击播放按钮，应用程序将被安装并运行在您的手机上。

如果成功，您可以返回到您选择的IDE，并打开iOS项目中的`info.plist`文件。

11\. 将bundle identifier更改为您在步骤3中在Xcode中选择的标识符相同。

<img src={IOSChangeBundleIdentifierScreenshot} alt=''/>

12\. 现在编辑`.iOS.csproj`文件。

```xml
<RuntimeIdentifier>ios-arm64</RuntimeIdentifier>
<CodesignKey>Apple Development: dan@walms.co.uk (3L323F7VSS)</CodesignKey>
```

将`RuntimeIdentifier`从`iossimulator-x64`更改为`ios-arm64`。

:::info
如果您将来希望在模拟器上运行，您需要反转此步骤。
:::

添加一个`<CodesignKey>`标签。

要找到此值，请打开`KeyChain Access`应用程序。在搜索框中搜索development。

<img src={IOSCertScreenshot} alt=''/>

将该值设置为窗口顶部粗体文本中所示的选定开发证书。

在此示例中为`Apple Development: dan@walms.co.uk (3L323F7VSS)`。

完成后，您可以像正常情况下一样在iPhone或iPad上运行和调试应用程序。
