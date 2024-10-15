---
id: debian-ubuntu
title: Debian / Ubuntu 打包
---

Avalonia Linux 程序可以通过双击可执行文件或在终端中启动的方式，在大多数 Linux 发行版中运行。但是为了提供更好的用户体验，建议将程序安装到系统中，这样用户可以通过桌面快捷方式（比如在 GNOME 和 KDE 等桌面环境中）或通过命令行启动程序，前提是将程序添加到 PATH当中。

Debian 和 Ubuntu 等相关的发行版将其应用程序打包为 .deb 文件，这样可以通过 sudo apt install ./your_package.deb 命令进行安装。

## 打包教程

在本教程中，我们将使用 `dpkg-deb` 工具来编译你的 `.deb` 包。

### 1) 在暂存文件夹组织程序文件

Debian 包遵循以下基本结构：

```sh
./staging_folder/     # 暂存文件夹
├── DEBIAN
│   └── control   # 包控制文件
└── usr
    ├── bin
    │   └── myprogram       # 启动脚本
    ├── lib
    │   └── myprogram
    │       ├── libHarfBuzzSharp.so     # Avalonia 本地库
    │       ├── libSkiaSharp.so         # Avalonia 本地库
    │       ├── other_native_library_1.so
    │       ├── myprogram_executable    # 主可执行文件
    │       ├── myprogram.dll 
    │       ├── my_other_dll.dll 
    │       ├── ...     # 所有由 dotnet publish 生成的文件
    └── share
        ├── applications
        │   └── MyProgram.desktop     # 桌面快捷方式文件
        ├── icons
        │   └── hicolor
        │       ├── ...     # 其他分辨率图标（可选）
        └── pixmaps
            └── myprogram.png     # 主应用程序图标
```

每个文件夹的含义：

* `DEBIAN`: 需要包含 `control` 文件。
* `/usr/bin/`: 包含启动脚本(推荐用于通过命令行启动程序)。
* `/usr/lib/myprogram/`: 所有由 `dotnet publish` 生成的文件存放的位置。
* `/usr/share/applications/`: 存放桌面快捷方式的文件夹。
* `/usr/share/pixmaps/` 和 `/usr/share/icons/hicolor/**`: 应用程序图标所在的文件夹。

:::info

`/usr/share/icons/hicolor/**` 是可选的，即使没有这些图片，你的应用程序图标也可以显示在桌面上，但建议为更好的区分度来提供它们。
:::

### 2) 创建`control` 文件

`control` 文件放在 `DEBIAN` 文件夹中。

这个文件描述了程序的一般方面，如名称、版本、类别、依赖项、维护者、处理器架构和许可证。[Debian 文档](https://www.debian.org/doc/debian-policy/ch-controlfields.html) 提供了文件中所有可能字段的更详细描述。

:::tip[作者提示]

不必过于担心填写所有可能的字段，大多数字段不是必需的。本教程旨在制作一个“够用就行”的 Debian 包。 
:::

.NET 依赖项可以通过运行 `apt show dotnet-runtime-deps-8.0`（后缀根据其他 .NET 版本变化）列出；它们将出现在以 *Depends: ...* 开头的行中。你也可以在 [.NET Core 仓库](https://github.com/dotnet/core/blob/main/release-notes/8.0/linux-packages.md) 中查看它们。

Avalonia 所需的依赖项是：`libx11-6, libice6, libsm6, libfontconfig1`。

总的来说，所有 .NET 和 Avalonia 依赖项都是必需的，再加上你的应用程序特定的任何其他依赖项。

下面是一个简单的 `control` 文件示例。

```
Package: myprogram
Version: 3.1.0
Section: devel
Priority: optional
Architecture: amd64
Installed-Size: 68279
Depends: libx11-6, libice6, libsm6, libfontconfig1, ca-certificates, tzdata, libc6, libgcc1 | libgcc-s1, libgssapi-krb5-2, libstdc++6, zlib1g, libssl1.0.0 | libssl1.0.2 | libssl1.1 | libssl3, libicu | libicu74 | libicu72 | libicu71 | libicu70 | libicu69 | libicu68 | libicu67 | libicu66 | libicu65 | libicu63 | libicu60 | libicu57 | libicu55 | libicu52
Maintainer: Ken Lee <kenlee@outlook.com>
Homepage: https://github.com/kenlee/myprogram
Description: This is MyProgram, great for doing X.
Copyright: 2022-2024 Ken Lee <kenlee@outlook.com>
```

### 3) 创建启动脚本

推荐这个步骤有两个原因：首先可以减少桌面快捷方式的复杂性，其次使你的应用程序可以从终端运行。

启动脚本的文件名最好是 `myprogram`（不带 `.sh` 扩展名），这样当用户在终端中输入 "myprogram" 时，他/她将启动你的程序。

**myprogram_executable** 文件通常与其 .NET 项目的名称相同，例如，如果你的 Avalonia .csproj 项目名为 *MyProgram.Desktop*，那么由 dotnet publish 生成的主可执行文件将是 `MyProgram.Desktop`。

启动脚本示例:

```sh
#!/bin/bash

# 使用 exec 以避免包装脚本作为一个单独的进程存在
# "$@" 用于将命令行参数传递给应用程序

exec /usr/lib/myprogram/myprogram_executable "$@"
```

### 4) 创建桌面快捷方式

桌面快捷方式文件遵循 [FreeDesktop 规范](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#recognized-keys)。Arch Linux Wiki 也有一些好的[Arch Linux规范](https://wiki.archlinux.org/title/Desktop_entries)。

下面是一个桌面快捷方式文件的示例。

```
[Desktop Entry]
Name=MyProgram
Comment=MyProgram, great for doing X
Icon=myprogram
Exec=myprogram
StartupWMClass=myprogram
Terminal=false
Type=Application
Categories=Development
GenericName=MyProgram
Keywords=keyword1; keyword2; keyword3
```

:::tip

如果你想要你的应用程序可以打开文件，请在 `Exec` 行的末尾，`myprogram` 之后附加 **%F**；如果它应该打开 URL，则附加 **%U**。

:::

### 5) 添加 hicolor 图标（可选）

Hicolor 图标遵循如下文件夹结构。

[这篇博客](https://martin.hoppenheit.info/blog/2016/where-to-put-application-icons-on-linux/) 建议我们根据 [Debian Menu System 文档](https://www.debian.org/doc/packaging-manuals/menu.html/ch3.html#s3.7) 和 [FreeDesktop 文档](https://specifications.freedesktop.org/icon-theme-spec/icon-theme-spec-0.11.html#install_icons)，将图标放在 `hicolor` 和 `pixmaps` 目录中。
```
├── icons
│   └── hicolor
│       ├── 128x128
│       │   └── apps
│       │       └── myprogram.png
│       ├── 16x16
│       │   └── apps
│       │       └── myprogram.png
│       ├── 256x256
│       │   └── apps
│       │       └── myprogram.png
│       ├── 32x32
│       │   └── apps
│       │       └── myprogram.png
│       ├── 48x48
│       │   └── apps
│       │       └── myprogram.png
│       ├── 512x512
│       │   └── apps
│       │       └── myprogram.png
│       ├── 64x64
│       │   └── apps
│       │       └── myprogram.png
│       └── scalable
│           └── apps
│               └── myprogram.svg
```

### 6) 编译 `.deb` 包

```sh
# 对于 x64 架构，建议的后缀是 amd64。
dpkg-deb --root-owner-group --build ./staging_folder/ "./myprogram_${versionName}_amd64.deb"
```

## 完整的 Linux shell 脚本示例

```bash
#!/bin/bash

# 清理
rm -rf ./out/
rm -rf ./staging_folder/

# .NET 发布
# 推荐使用 self-contained 发布，这样用户不需要安装 .NET运行时
dotnet publish "./src/MyProgram.Desktop/MyProgram.Desktop.csproj" \
  --verbosity quiet \
  --nologo \
  --configuration Release \
  --self-contained true \
  --runtime linux-x64 \
  --output "./out/linux-x64"

# 暂存目录
mkdir staging_folder

# Debian control文件
mkdir ./staging_folder/DEBIAN
cp ./src/MyProgram.Desktop.Debian/control ./staging_folder/DEBIAN

# 启动脚本
mkdir ./staging_folder/usr
mkdir ./staging_folder/usr/bin
cp ./src/MyProgram.Desktop.Debian/myprogram.sh ./staging_folder/usr/bin/myprogram
chmod +x ./staging_folder/usr/bin/myprogram # 设置启动脚本的执行权限

# 其他文件
mkdir ./staging_folder/usr/lib
mkdir ./staging_folder/usr/lib/myprogram
cp -f -a ./out/linux-x64/. ./staging_folder/usr/lib/myprogram/ # 从publish目录复制所有文件
chmod -R a+rX ./staging_folder/usr/lib/myprogram/ # 设置所有文件的读权限
chmod +x ./staging_folder/usr/lib/myprogram/myprogram_executable # 设置主可执行文件的执行权限

# 桌面快捷方式
mkdir ./staging_folder/usr/share
mkdir ./staging_folder/usr/share/applications
cp ./src/MyProgram.Desktop.Debian/MyProgram.desktop ./staging_folder/usr/share/applications/MyProgram.desktop

# 桌面图标
# 一个 1024px x 1024px 的 PNG 文件，类似于 VS Code 使用的图标
mkdir ./staging_folder/usr/share/pixmaps
cp ./src/MyProgram.Desktop.Debian/myprogram_icon_1024px.png ./staging_folder/usr/share/pixmaps/myprogram.png

# Hicolor 图标
mkdir ./staging_folder/usr/share/icons
mkdir ./staging_folder/usr/share/icons/hicolor
mkdir ./staging_folder/usr/share/icons/hicolor/scalable
mkdir ./staging_folder/usr/share/icons/hicolor/scalable/apps
cp ./misc/myprogram_logo.svg ./staging_folder/usr/share/icons/hicolor/scalable/apps/myprogram.svg

# 制作 .deb 文件
dpkg-deb --root-owner-group --build ./staging_folder/ ./myprogram_3.1.0_amd64.deb
```

## 安装

```sh
sudo apt install ./myprogram_3.1.0_amd64.deb
```

## 卸载 / 删除

```sh
sudo apt remove myprogram
```

## 第三方打包工具（适用于 Debian / Ubuntu）

* https://github.com/quamotion/dotnet-packaging
* https://github.com/SuperJMN/DotnetPackaging
* https://github.com/kuip