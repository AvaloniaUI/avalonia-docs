---
id: packaging-for-linux
title: Packaging apps for Linux
sidebar_label: Linux
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

Parcel packages Linux applications into multiple distribution formats optimized for different Linux package managers and use cases.

## Supported Package Formats

- **DEB**: Debian/Ubuntu packages (`.deb`) - installable via `apt`
- **RPM**: Red Hat/Fedora packages (`.rpm`) - installable via `dnf`/`yum`
- **ZIP**: Compressed archive for manual installation
- **AppImage**: Portable single-file application *(planned for future release)*

Parcel automatically generates a `.desktop` file for proper application launcher integration.

## Dependencies

Parcel includes following dependencies in DEB/RPM packages to ensure compatibility across Linux distributions:

### Runtime Dependencies
- `libc6` - GNU C Library
- `libgcc1` or `libgcc-s1` - GCC runtime library
- `libgssapi-krb5-2` - Kerberos authentication
- `libstdc++6` - GNU Standard C++ Library
- `zlib1g` - Compression library
- `libssl1.0.0 | libssl1.0.2 | libssl1.1 | libssl3` - SSL/TLS library (multiple versions supported)
- `libicu` - Unicode and internationalization support (multiple versions supported)

### Avalonia-Specific Dependencies
- `libx11-6` - X11 client library
- `libice6` - Inter-Client Exchange library
- `libsm6` - X11 Session Management library
- `libfontconfig1` - Font configuration library

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
