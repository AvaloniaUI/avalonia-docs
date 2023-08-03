---
id: setting-up-your-developer-environment-for-ios
title: 如何为iOS设置开发环境
---

# 如何为iOS设置开发环境

### 先决条件

在Mac上，您需要安装最新版本的macOS和Xcode。

### 安装SDK

首先，非常重要的是安装正确的[dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)。截至撰写本文时，最低支持的SDK版本是6.0.200。

### 安装Workload

```bash
dotnet workload install ios
```

:::info
您可能需要使用`sudo`运行命令

您可能还需要卸载旧版本。`dotnet workload remove ios`
:::

这将允许您在任何平台上构建iOS应用程序。但是，如果您没有访问安装有Xcode的实际macOS硬件，您只能测试和运行这些应用程序。
