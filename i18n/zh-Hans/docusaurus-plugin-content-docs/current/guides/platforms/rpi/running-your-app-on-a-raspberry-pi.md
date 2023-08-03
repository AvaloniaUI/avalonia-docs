---
id: running-your-app-on-a-raspberry-pi
title: 在树莓派上运行
---

# 在树莓派上运行

### 步骤 1

使用 Raspbian Stretch (2018-11-13) 刷入 8GB SD 卡。`BelenaEtcher` 是一个不错的工具。

插入 SD 卡并启动树莓派。

您可以按照[此指南](https://blogs.msdn.microsoft.com/david/2017/07/20/setting_up_raspian_and_dotnet_core_2_0_on_a_raspberry_pi/)进行操作，下面是摘要：

### 步骤 2

* 安装 `curl`、`libunwind8`、`gettext` 和 `apt-transport-https`。通常 `curl` 和 `apt-transport-https` 已经是最新的版本。

```bash
sudo apt-get install curl libunwind8 gettext apt-transport-https
```

* 下载 tar 包。

```bash
curl -sSL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Runtime/release/2.0.0/dotnet-runtime-latest-linux-arm.tar.gz
```

* 解压缩 tar 包到 `/opt/dotnet`。

```bash
sudo mkdir -p /opt/dotnet && sudo tar zxf dotnet.tar.gz -C /opt/dotnet
```

* 创建 `dotnet` 二进制文件的链接。

```bash
sudo ln -s /opt/dotnet/dotnet /usr/local/bin
```

或者使用替代方法：您可以登录为超级用户（运行 "sudo su"）。

```bash
apt-get -y install curl libunwind8 gettext apt-transport-https
curl -sSL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Runtime/release/2.0.0/dotnet-runtime-latest-linux-arm.tar.gz
mkdir -p /opt/dotnet && sudo tar zxf dotnet.tar.gz -C /opt/dotnet
ln -s /opt/dotnet/dotnet /usr/local/bin
```

> 注意：请注意脚本的行尾符号，它应该使用 `LF` 而不是 `CR LF`。将脚本保存为 `.sh` 文件，并在树莓派上使用 bash `filename.sh` 命令运行它。

### 步骤 3

* 要在树莓派上运行 `Avalonia` 应用程序，您需要使用此 NuGet 包：

```
https://www.nuget.org/packages/Avalonia.Skia.Linux.Natives/1.68.0.2
```

其中包含 `libSkiaSharp.so`。

* 现在，使用以下命令发布应用程序：

```bash
dotnet publish -r linux-arm -f netcoreapp2.0
```

* 将发布目录复制到树莓派，并使用 `dotnet publish/ApplicationName.dll` 命令运行它。
