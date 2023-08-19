---
id: linux
title: Linux Desktop Deployment
---

## Which format to choose?

Linux applications are best distributed in either the Flatpak or Snap cross-distribution packaging formats.

- Use [Flatpak](https://flatpak.org) to target all distributions or self-host the packaging server.
- Use [Snap](https://snapcraft.io/about) to target a primarily Ubuntu-based ecosystem.

## Flatpak

[Flatpak](https://flatpak.org) is the most popular and typically recommended way to package Linux desktop applications.

[Flathub](https://flathub.org/) is an open-source packaging server owned by the 501c(3) non-profit GNOME Foundation, and is the default choice for most major distributions to provide graphical software to users.

### Prerequisites:

A Linux-based environment is required for building Flatpak applications, fortunately there are options available for the other two major operating systems:

- Windows: [WSL (Windows Sub-system for Linux)](https://learn.microsoft.com/en-us/windows/wsl/about)
- macOS: [macOS Virtualization framework](https://developer.apple.com/documentation/virtualization/running_gui_linux_in_a_virtual_machine_on_a_mac)

### Steps for Packaging

#### Installing dependencies

1. Install Flatpak using the method provided for your distribution [Flatpak - Quick Setup](https://flatpak.org/setup/)
2. Install the FreeDesktop SDKs `$ flatpak install flathub org.freedesktop.Platform//22.08 org.freedesktop.Sdk//22.08` (Select the latest available version)
3. Install the Flatpak SDK extension for your dotnet version (e.g. `org.freedesktop.Sdk.Extension.dotnet7`)

#### Creating the Flatpak

5. Create a new folder somewhere different from your existing project 
6. Create a YAML file titled `com.github.[[username]].[[project-name]].yml` with the following example template, replacing the placeholders with the appropriate information: 
    ```yml
    app-id: com.github.[[username]].[[project-name]]
    runtime: org.freedesktop.Platform
    runtime-version: '22.08'
    sdk: org.freedesktop.Sdk
    sdk-extensions:
      - org.freedesktop.Sdk.Extension.dotnet7
    build-options:
      prepend-path: "/usr/lib/sdk/dotnet7/bin"
      append-ld-library-path: "/usr/lib/sdk/dotnet7/lib"
      env:
        PKG_CONFIG_PATH: "/app/lib/pkgconfig:/app/share/pkgconfig:/usr/lib/pkgconfig:/usr/share/pkgconfig:/usr/lib/sdk/dotnet7/lib/pkgconfig"
    
    command: [[your-project-name]]
    
    finish-args:  
      - --device=dri
      # TODO: Replace this with wayland and fallback-x11 once Wayland support
      #       becomes available:
      #       https://github.com/AvaloniaUI/Avalonia/pull/8003
      - --socket=x11
      - --env=DOTNET_ROOT=/app/lib/dotnet
    
    modules:
      - name: dotnet
        buildsystem: simple
        build-commands:
        - /usr/lib/sdk/dotnet7/bin/install.sh
    
      - name: [[project-name]]
        buildsystem: simple
        sources:
          - type: git
            url: https://github.com/[[username]]/[[your-project-name]].git
          - ./nuget-sources.json
        build-commands:
          - dotnet publish [[project-name]]/[[project-name]].csproj -c Release --no-self-contained --source ./nuget-sources
          - mkdir -p ${FLATPAK_DEST}/bin
          - cp -r ${FLATPAK_BUILDER_BUILDDIR}/[[project-name]]/bin/Release/net7.0/publish/* ${FLATPAK_DEST}/bin
    ```

    > For providing access to other things such as the network or filesystem, see the "Sandbox" section of the Flatpak reference documentation: https://docs.flatpak.org/

7. Copy the dotnet NuGet sources generator script `flatpak-dotnet-generator.py` from the [Flatpak Builder Tools repository](https://github.com/flatpak/flatpak-builder-tools)
8. Clone down your project repository to the folder `git clone https://github.com/[[username]]/[[project]].git`
9. Run the NuGet source config generator script `flatpak-dotnet-generator.py` with the following arguments:
    ```shell
    python3 flatpak-dotnet-generator.py --dotnet 7 nuget-sources.json [[project-name]]/[[project-name]]/[[project-name]].csproj
    ```
10. Run the builder script 
    ```shell
    flatpak-builder build-dir ./org.gridlocdev.LinuxDesktopShortcutBuilder.yml --force-clean --user --install
    ```
11. Run the newly generated and installed Flatpak application
    ```shell
    flatpak run com.github.[[username]].[[project]]
    ```
12. If it works successfully, initialize the folder with a Git repository
    ```shell
    git init .
    ```
14. Add a .gitignore file with the following details:
    ```
    .flatpak-builder
    build-dir
    [[project-name]]
    ```

### Deploying to Flathub

Documentation for deploying to Flathub can be found here: [Flathub - How to submit an app](https://docs.flathub.org/docs/for-app-authors/submission/)

## Snap

A [Snap](https://snapcraft.io/about) is an alternative, primarily Ubuntu-centric, self-updating application format for both desktop applications and server software.

[Snapcraft](https://flathub.org/) is a proprietary packaging server owned by Canonical Ltd. (the creators of Ubuntu), and is the default choice for Ubuntu and Ubuntu flavors to provide graphical software to users.

Documentation for packaging for Snap packages can be found here: [Snapcraft - Packaging for .NET Apps](https://snapcraft.io/docs/dotnet-apps)
