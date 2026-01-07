---
id: index
title: MacOS
---

import {DocsCardList} from '../../../../src/components/global/DocsCard';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Parcel provides comprehensive macOS application packaging with cross-platform support. Build, sign, and distribute macOS applications from Windows, Linux, or macOS—even without requiring a physical macOS machine.

## Supported Features

- **.NET SDK compilation**: Native .NET application building
- **Universal executables**: Fat-executable merging for Intel and Apple Silicon
- **Bundle creation**: Complete .app bundle generation with proper structure
- **Cross-platform signing**: Code signing using Developer ID certificates on any platform
- **Cross-platform notarization**: Apple notarization process from Windows or Linux (requires Apple Developer Account)
- **Distribution formats**: DMG installers and ZIP archives with proper permissions

## Platform Requirements

- **macOS**: Full native support for all features
- **Linux**: Complete support including DMG creation
- **Windows**: Full support with WSL2 required for DMG creation

<DocsCardList list={useCurrentSidebarCategory().items} />