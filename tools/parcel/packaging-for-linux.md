---
id: packaging-for-linux
title: Packaging apps for Linux
description: Package Avalonia applications for Linux using Parcel, with support for DEB, RPM, ZIP, and AppImage formats, including dependency management and desktop integration.
sidebar_label: Linux
doc-type: reference
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

Parcel packages Linux applications into multiple distribution formats optimized for different Linux package managers and use cases.

## Supported Package Formats

- **DEB**: Debian/Ubuntu packages (`.deb`) - installable via `apt`
- **RPM**: Red Hat/Fedora packages (`.rpm`) - installable via `dnf`/`yum`
- **ZIP**: Compressed archive for manual installation
- **AppImage**: Portable single-file application *(not yet available)*

Parcel automatically generates a `.desktop` file for proper application launcher integration.

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

The package identifier used as the output filename, and `/usr/share/` app entry. Must not include spaces.

### DEB/RPM Specific Properties

Additional configuration properties for Debian and RPM packages.

**Application Icon**:

Path to the application icon file. Parcel automatically:
- Generates hicolor icon theme entries at appropriate resolutions
- Links the icon in the `.desktop` file

**Supported formats**: PNG, SVG

**Company/Maintainer**:

The package maintainer or company name. This appears in package metadata and is displayed by package managers.

:::note
If not specified, defaults to the Package Name value.
:::

**Desktop Category**:

Application category for desktop environment menus and launchers. Determines where the application appears in the application menu hierarchy.

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
