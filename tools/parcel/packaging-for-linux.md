---
id: packaging-for-linux
title: Packaging apps for Linux
description: Package Avalonia applications for Linux using Parcel, with support for DEB, RPM, and ZIP formats, including dependency management and desktop integration.
sidebar_label: Linux
doc-type: reference
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

Parcel creates packages for different Linux package managers and distribution methods.

## Supported Package Formats

| Format | CLI code | Best suited for |
|---|---|---|
| DEB package (`.deb`) | `deb` | Debian, Ubuntu, and other Debian-based distributions |
| RPM package (`.rpm`) | `rpm` | Fedora, RHEL, and other RPM-based distributions |
| ZIP archive (`.zip`) | `zip` | Portable distribution without package manager integration |

DEB and RPM packages include a `.desktop` entry. They can also register icons, file associations, URL schemes, package dependencies, and an optional `/usr/bin` symlink.

For a complete list of setting names, types, defaults, and environment variables, see the [Parcel configuration reference](/tools/parcel/configuration-reference#linux-settings).

## Dependencies

Parcel declares the following runtime dependencies in the package metadata. Use the additional dependency settings to add libraries for your application or Linux distribution.

### DEB dependencies

- `libc6`
- `libgcc1`
- `libgssapi-krb5-2`
- `libstdc++6`
- `zlib1g`
- One of `libssl1.0.0`, `libssl1.0.2`, `libssl1.1`, or `libssl3`
- `libicu` or a versioned `libicu` package

### RPM dependencies

- `glibc`
- `libgcc`
- `krb5-libs`
- `libstdc++`
- `zlib`
- `openssl-libs`
- `libicu`

## Bundle Configuration

Use the Linux settings to configure desktop integration and branding.

### Common Properties

**Application Name**:

Display name in application launchers and desktop menus. Parcel adds this name to the `.desktop` entry.

**Package Name**:

The package identifier used in package metadata and output filenames. Parcel normalizes this identifier to lowercase for Linux packages.

**Install Directory Name**:

Name of the application directory under `/usr/share`. The default is `app-{package-name}`. Use only lowercase letters, numbers, dashes, underscores, or periods. The name must start and end with a letter or number.

### DEB/RPM Specific Properties

Additional configuration properties for Debian and RPM packages.

**Application Icon**:

Optional Linux icon that overrides **Application Icon**. Parcel automatically does the following tasks:

- Generates hicolor icon theme entries at appropriate resolutions
- Links the icon in the `.desktop` file

**Supported formats**: PNG, SVG

**Maintainer**:

Package maintainer or company name. Parcel adds this value to the package metadata.

:::note
If you do not set this value, Parcel uses **Company**. If **Company** is empty, Parcel uses **Package Name**.
:::

**Desktop Category**:

Category for desktop menus and launchers. This value controls where the application appears in the menu. Parcel uses the [freedesktop.org category registry](https://specifications.freedesktop.org/menu-spec/latest/category-registry.html).

**Copyright**:

Path to a copyright or license file. Parcel includes this file in the DEB and RPM package metadata.

**Create `/usr/bin/` symlink**:

Creates a symlink to the application executable. The symlink lets users start the application from a terminal. This setting is enabled by default.

**Additional DEB Dependencies** and **Additional RPM Dependencies**:

Add dependencies that are not in the Parcel defaults. Configure DEB and RPM dependencies separately. For DEB, separate alternative package names with `|`. For RPM, enter package names or capabilities.

### Desktop integration

Configure file associations and URL schemes under **Basics**. Parcel adds the related MIME metadata and launch information to DEB and RPM packages. To handle activation in an Avalonia application, see [File associations and URL schemes](/tools/parcel/configuration-reference#file-associations) and [Activatable lifetime](/docs/services/activatable-lifetime#handling-uri-activation).

## Installation & Removal

### DEB Packages (Debian/Ubuntu)

**Install**:
```bash
sudo apt install ./my-app.deb
```

**Remove**:
```bash
sudo apt remove my-app
```

### RPM Packages (Fedora/RHEL)

**Install**:
```bash
sudo dnf install ./my-app.rpm
# or
sudo rpm -i ./my-app.rpm
```

**Remove**:
```bash
sudo dnf remove my-app
# or
sudo rpm -e my-app
```

### ZIP Archives

**Extract and Run**:
```bash
unzip my-app.zip
cd my-app
./my-awesome-app
```

## See also

- [Parcel setup](/tools/parcel/setup)
- [Parcel configuration reference](/tools/parcel/configuration-reference)
- [Parcel command line reference](/tools/parcel/command-line-reference)
