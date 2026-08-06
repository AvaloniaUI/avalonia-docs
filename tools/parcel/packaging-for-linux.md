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

Parcel packages Linux applications into multiple distribution formats optimized for different Linux package managers and use cases.

## Supported Package Formats

| Format | CLI code | Best suited for |
|---|---|---|
| DEB package (`.deb`) | `deb` | Debian, Ubuntu, and other Debian-based distributions |
| RPM package (`.rpm`) | `rpm` | Fedora, RHEL, and other RPM-based distributions |
| ZIP archive (`.zip`) | `zip` | Portable distribution without package-manager integration |

DEB and RPM packages include a `.desktop` entry and can register icons, file associations, URL schemes, package dependencies, and an optional `/usr/bin` symlink.


## Dependencies

Parcel declares the following runtime dependencies in package metadata. Add any application- or distribution-specific libraries with the additional dependency settings.

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

Parcel provides configuration options to customize your Linux application packages for proper desktop integration and branding.

### Common Properties

**Application Name**:

Display name shown in application launchers and desktop menus. This is used in the `.desktop` entry file.

**Package Name**:

The package identifier used in package metadata and output filenames. Parcel normalizes it to lower case for Linux packages.

**Install Directory Name**:

Name of the application directory under `/usr/share`. It defaults to `app-{package-name}` and must contain only lowercase letters, numbers, dashes, underscores, or dots.

### DEB/RPM Specific Properties

Additional configuration properties for Debian and RPM packages.

**Application Icon**:

Optional Linux-specific icon that overrides the shared Application Icon. Parcel automatically:
- Generates hicolor icon theme entries at appropriate resolutions
- Links the icon in the `.desktop` file

**Supported formats**: PNG, SVG

**Company/Maintainer**:

The package maintainer or company name. This appears in package metadata and is displayed by package managers.

:::note
If not specified, defaults to the shared Company setting and then to the Package Name.
:::

**Desktop Category**:

Application category for desktop environment menus and launchers. Determines where the application appears in the application menu hierarchy. Parcel follows the [freedesktop.org category registry](https://specifications.freedesktop.org/menu-spec/latest/category-registry.html).

**Copyright**:

Path to a copyright or license file included in DEB and RPM package metadata.

**Create `/usr/bin` Symlink**:

Creates a symlink to the application executable so it can be started from a terminal. Enabled by default.

**Additional Dependencies**:

Add dependencies beyond Parcel's runtime defaults separately for DEB and RPM. DEB entries accept alternative package names separated with `|`; RPM entries accept package names or capabilities.

### Desktop integration

File associations and URL schemes are configured once under Basics. Parcel adds matching MIME metadata and launch information to DEB and RPM packages. See [File associations and URL schemes](/tools/parcel/configuration-reference#file-associations) and [Activatable lifetime](/docs/services/activatable-lifetime#handling-uri-activation) for handling activations in an Avalonia application.

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
- [Parcel command line reference](/tools/parcel/command-line-reference)
