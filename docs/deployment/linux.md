---
id: linux
title: Linux Deployment
---

## Which format to choose?

Linux applications are best distributed in either the Flatpak or Snap cross-distribution packaging formats.

- Use [Flatpak](https://flatpak.org) to target all distributions or self-host the packaging server.
- Use [Snap](https://snapcraft.io/about) to target a primarily Ubuntu-based ecosystem.

## Flatpak

[Flatpak](https://flatpak.org) is the most popular and typically recommended way to package Linux desktop applications.

[Flathub](https://flathub.org/) is an open-source Flatpak distribution server owned by the 501c(3) non-profit GNOME
Foundation, and
is the default choice for most major Linux distributions to provide graphical software to users.

### Prerequisites:

1. A Linux-based environment is required for building Flatpak applications, fortunately there are virtualized options
   available for the other two major operating systems:
    - Windows: [WSL (Windows Sub-system for Linux)](https://learn.microsoft.com/en-us/windows/wsl/about)
    -
   macOS: [macOS Virtualization framework](https://developer.apple.com/documentation/virtualization/running_gui_linux_in_a_virtual_machine_on_a_mac)
2. An Avalonia UI app with source code hosted on a Git server such as GitHub, GitLab, Bitbucket, etc.

### Steps for Packaging

> Note: In the steps below, the example application is namespaced with "com.github.[[username]]" for GitHub users.
> However, this can be replaced with any domain that you own, such as another Git server or your own website domain.

#### Installing dependencies

1. Install Flatpak using the method provided for your distribution [Flatpak - Quick Setup](https://flatpak.org/setup/)
2. Install the FreeDesktop SDKs (When prompted for a version, select the latest available version)
    ```shell
    flatpak install flathub org.freedesktop.Platform org.freedesktop.Sdk
    ```
3. Install the Flatpak SDK extension for your dotnet version (e.g. dotnet6, dotnet7)
    ```shell
    flatpak install org.freedesktop.Sdk.Extension.dotnet7
    ```

#### Creating the Flatpak

5. Create a new folder somewhere different from your existing project
6. Create a YAML file titled `com.github.[[username]].[[project-name]].yaml` with the following example template,
   replacing the placeholders with the appropriate information:
    ```yaml
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
    
    command: [[project-name]]
    
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
            url: https://github.com/[[username]]/[[project-name]].git
          - ./nuget-sources.json
        build-commands:
          - dotnet publish [[project-name]]/[[project-name]].csproj -c Release --no-self-contained --source ./nuget-sources
          - mkdir -p ${FLATPAK_DEST}/bin
          - cp -r ${FLATPAK_BUILDER_BUILDDIR}/[[project-name]]/bin/Release/net7.0/publish/* ${FLATPAK_DEST}/bin
    ```

   > For providing access to other things such as the network or filesystem, see
   the ["Sandbox Permissions" section of the Flatpak documentation](https://docs.flatpak.org/en/latest/sandbox-permissions.html)

7. Copy and save the dotnet NuGet sources generator script `flatpak-dotnet-generator.py` from
   the [Flatpak Builder Tools repository](https://github.com/flatpak/flatpak-builder-tools), to the current folder, or
   run the following command to download it:
    ```shell
    wget https://raw.githubusercontent.com/flatpak/flatpak-builder-tools/master/dotnet/flatpak-dotnet-generator.py
    ```
8. Clone down your project repository to the folder
    ```shell
    git clone https://github.com/[[username]]/[[project]].git
    ```
9. Run the NuGet source config generator script `flatpak-dotnet-generator.py` with the following arguments:
    ```shell
    python3 flatpak-dotnet-generator.py --dotnet 7 nuget-sources.json [[project-name]]/[[project-name]]/[[project-name]].csproj
    ```
10. Run the Flatpak Builder script to build the local Flatpak
    ```shell
    flatpak-builder build-dir ./org.[[username]].[[project-name]].yaml --force-clean
    ```
11. If the above build ran successfully, install the local flatpak
    ```shell
    flatpak-builder --user --install build-dir ./org.[[username]].[[project-name]].yaml --force-clean
    ```
12. Run the newly generated and installed Flatpak application
    ```shell
    flatpak run com.github.[[username]].[[project]]
    ```

### Deploying to Flathub

> For distributing via Flathub, see
> the [Flathub - "For App Authors" documentation](https://docs.flathub.org/docs/category/for-app-authors).

## Snap

[Snap](https://snapcraft.io/about) is a self-updating Linux application packaging format for
both desktop applications and server software.

[Snapcraft](https://flathub.org/) is a proprietary Snap distribution server owned by Canonical Ltd. (the creators of
Ubuntu),
and is the default choice for Ubuntu and Ubuntu flavors to provide graphical software to users.

### Packaging and Deploying to Snapcraft

> For building the Snap package and distributing via Snapcraft,
> see [Snapcraft - Packaging for .NET Apps](https://snapcraft.io/docs/dotnet-apps)
