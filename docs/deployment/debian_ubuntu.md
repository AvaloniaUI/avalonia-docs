---
id: debian_ubuntu
title: Debian / Ubuntu packaging
---

Avalonia Linux programs can be executed in most Linux distros by double-clicking the executable or by starting it from the terminal. However, for a better user experience, it is recommended to have the program installed, so the user can start it via desktop shortcut, that exists in desktop environments such as GNOME and KDE, or via command-line, by having the program added to PATH.

Debian and Ubuntu related distros have their applications packaged in `.deb` files, that can be installed via `sudo apt install ./your_package.deb`.

## Tutorial

In this tutorial, we will use the `dpkg-deb` tool to compile your `.deb` package.

### 1) Organize program files in a staging folder

Debian packages follow this basic structure:

```sh
./staging_folder/
├── DEBIAN
│   └── control # package control file
└── usr
    ├── bin
    │   ├── your_program # starter script (optional)
    │   └── your_program_executable
    ├── lib
    │   └── your_program
    │       ├── libHarfBuzzSharp.so # Avalonia native library
    │       ├── libSkiaSharp.so # Avalonia native library
    │       └── other_native_library_1.so
    └── share
        ├── applications
        │   └── YourProgram.desktop # desktop shortcut file
        ├── icons
        │   └── hicolor
        │       ├── ... # other resolution icons (optional)
        └── pixmaps
            └── your_program.png # main application icon
```

Meaning of each folder:

* `DEBIAN`: contains the `control` file.
* `/usr/bin/`: contains the main executable and its starting script (recommended for starting your program via command-line).
* `/usr/lib/your_program/`: where the `.so` native libraries will be included. (`your_program` is custom)
* `/usr/share/applications/`: where the desktop shortcut will be placed.
* `/usr/share/pixmaps/` and `/usr/share/icons/hicolor/**`: folders for application icons.

:::info

The `/usr/share/icons/hicolor/**` are *optional*, as in your app icon will probably show up on desktop even without those images, however, it is recommended to have them for better resolution.

:::

### 2) Make the `control` file

The `control` file goes inside the `DEBIAN` folder.

This file describes general aspects of your program, such as its name, version, category, maintainer, processor architecture and licenses. [Debian docs](https://www.debian.org/doc/debian-policy/ch-controlfields.html) have a more thorough description of all possible fields in the file.

:::tip

Author's comment: don't worry too much about filling all possible fields, most aren't required. This tutorial is to make a "good-enough" Debian package.

:::

Below is a simple example of a `control` file.

```
Package: your_program
Version: 3.1.0
Section: devel
Priority: optional
Architecture: amd64
Installed-Size: 68279
Maintainer: Ken Lee <kenlee@outlook.com>
Homepage: https://github.com/kenlee/your_program
Description: This is YourProgram, great for doing X.
Copyright: 2022-2024 Ken Lee <kenlee@outlook.com>
```

### 3) Make the starter script

This step is recommended for two reasons: first, to reduce the complexity of the desktop shortcut, and second, to make your app runnable from Terminal.

The starter script file name should preferrably be `your_program` (without `.sh` extension), so whenever your user types "your_program" on the Terminal, he / she will start your program.

To run from command-line, we need to append the libs directory path to the **LD_LIBRARY_PATH** environment variable - this is to make native libraries, such as `libHarfBuzzSharp.so` and `libSkiaSharp.so`, available to your program during initialization.

:::warning

Without this, your program will crash due to missing libraries!

:::

Example of `your_program` starter script, setting the variable in a command-scope:

```sh
#!/bin/bash
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/your_program your_program_executable
```

### 4) Make the desktop shortcut

The desktop shortcut file follows the [freedesktop specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#recognized-keys). Arch Linux Wiki also has [good related information](https://wiki.archlinux.org/title/Desktop_entries).

Below is an example of a desktop shortcut file:

```
[Desktop Entry]
Name=YourProgram
Comment=YourProgram, great for doing X
Icon=your_program
Exec=your_program
Terminal=false
Type=Application
Categories=Development
GenericName=YourProgram
Keywords=keyword1; keyword2; keyword3
```

### 5) Add hicolor icons (optional)

Hicolor icons follow a folder structure like below.

[This blog post](https://martin.hoppenheit.info/blog/2016/where-to-put-application-icons-on-linux/) advises us to put icons on both `hicolor` and `pixmaps` directories, according to [Debian Menu System docs](https://www.debian.org/doc/packaging-manuals/menu.html/ch3.html#s3.7) and [FreeDesktop docs](https://specifications.freedesktop.org/icon-theme-spec/icon-theme-spec-0.11.html#install_icons).

```
├── icons
│   └── hicolor
│       ├── 128x128
│       │   └── apps
│       │       └── your_program.png
│       ├── 16x16
│       │   └── apps
│       │       └── your_program.png
│       ├── 256x256
│       │   └── apps
│       │       └── your_program.png
│       ├── 32x32
│       │   └── apps
│       │       └── your_program.png
│       ├── 48x48
│       │   └── apps
│       │       └── your_program.png
│       ├── 512x512
│       │   └── apps
│       │       └── your_program.png
│       ├── 64x64
│       │   └── apps
│       │       └── your_program.png
│       └── scalable
│           └── apps
│               └── your_program.svg
```

### 6) Compile the `.deb` package

```sh
# for x64 architectures, the suggested suffix is amd64.
dpkg-deb --root-owner-group --build "./staging_folder/" "./your_program_${versionName}_amd64.deb"
```

## Example of a PowerShell script for the entire process

```powershell
$publishedProgramFilesDir = "./out" # directory that has the output of dotnet publish
$stagingDir = "staging_folder"
$versionName = "3.1.0"

# Dotnet publish
# PublishSingleFile is recommended to have less files
# self-contained is recommended, so final users won't need to install .NET
dotnet publish ./src/YourProgram.Desktop/YourProgram.Desktop.csproj `
		--verbosity quiet `
		--nologo `
		--configuration Release `
		-p:PublishSingleFile=true ` 
		--self-contained true ` 
		--runtime linux-x64 `
		--output $publishedProgramFilesDir

# Staging directory
mkdir $stagingDir

# Debian control file
mkdir "${stagingDir}/DEBIAN"
cp "./src/YourProgram.Desktop.Debian/control" "${stagingDir}/DEBIAN"

# Executable file and script
mkdir "${stagingDir}/usr"
mkdir "${stagingDir}/usr/bin"
cp "./${publishedProgramFilesDir}/YourProgram" "${stagingDir}/usr/bin/your_program_executable"
cp "./src/YourProgram.Desktop.Debian/your_program.sh" "${stagingDir}/usr/bin/your_program"
chmod +x "${stagingDir}/usr/bin/your_program_executable" # set executable permissions to main executable
chmod +x "${stagingDir}/usr/bin/your_program" # set executable permissions to starter script

# Shared libraries
mkdir "${stagingDir}/usr/lib"
mkdir "${stagingDir}/usr/lib/your_program"
Get-ChildItem $publishedProgramFilesDir -File -Filter "*.so" | Copy-Item -Destination "${stagingDir}/usr/lib/your_program" -Force
# chmod 644 --> set read-only attributes (libraries shouldn't have executable permissions)
Get-ChildItem "${stagingDir}/usr/lib/your_program" -File -Filter "*.so" | % { chmod 644 $_.FullName }

# Desktop shortcut
mkdir "${stagingDir}/usr/share"
mkdir "${stagingDir}/usr/share/applications"
cp "./src/YourProgram.Desktop.Debian/your_program.desktop" "${stagingDir}/usr/share/applications/your_program.desktop"

# Desktop icon
# A 1024px x 1024px PNG, like VS Code uses for its icon
mkdir "${stagingDir}/usr/share/pixmaps"
cp "./src/YourProgram.Desktop.Debian/your_program_icon_1024px.png" "${stagingDir}/usr/share/pixmaps/your_program.png"

# Hicolor icons
mkdir "${stagingDir}/usr/share/icons"
mkdir "${stagingDir}/usr/share/icons/hicolor"
mkdir "${stagingDir}/usr/share/icons/hicolor/scalable"
mkdir "${stagingDir}/usr/share/icons/hicolor/scalable/apps"
cp "./misc/your_program_logo.svg" "${stagingDir}/usr/share/icons/hicolor/scalable/apps/your_program.svg"

# Make .deb file
dpkg-deb --root-owner-group --build $stagingDir "./your_program_${versionName}_amd64.deb"
```

## To install

```sh
sudo apt install ./your_program_3.1.0_amd64.deb
```

## To uninstall / remove

```sh
sudo apt remove your_program
```
