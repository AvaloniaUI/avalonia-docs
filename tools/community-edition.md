---
id: community-edition
title: Community edition
sidebar_label: Community edition
---

The Accelerate Community Edition provides free access to professional development tools for individual developers, small organizations, and educational institutions. The aim of this license is to allow the majority of Avalonia developers to benefit from significantly improved tooling at no cost while ensuring the sustainable development of the Avalonia ecosystem.

## What's included

The Community License provides free access to three professional tools in the Avalonia Accelerate suite:

#### Visual Studio Extension

A completely rewritten Visual Studio XAML service built from scratch (not an update to the legacy FOSS extension).

| Feature | Community | Paid License |
|---------|-----------|--------------|
| XAML IntelliSense | ✓ | ✓ |
| XAML Previewer | ✓ | ✓ |
| Project Templates | ✓ | ✓ |
| Code Snippets | ✓ | ✓ |
| Advanced Refactoring | Limited | ✓ |
| Technical Support | ✗ | ✓ |

*An additional 30+ features are on the roadmap for the Visual Studio Extension, which are exclusive to users with a paid license.*

#### Avalonia Dev Tools

An entirely new application (not an update to the legacy FOSS solution) for debugging and inspecting Avalonia applications during development.

| Feature | Community | Paid License |
|---------|-----------|--------------|
| Visual Tree Inspector | ✓ | ✓ |
| Property Editor | ✓ | ✓ |
| Layout Debugging | ✓ | ✓ |
| Event Inspection | ✓ | ✓ |
| 3D View Debugging | ✗ | ✓ |
| Performance Profiling | ✗ | ✓ |
| Metrics Visualizer | ✗ | ✓ |
| Logging | ✗ | ✓ |
| Asset Manager | ✗ | ✓ |
| In App Overlays | Partial | ✓ |
| Technical Support | ✗ | ✓ |

#### Avalonia Parcel

A brand new packaging tool built specifically to make packaging Avalonia applications as easy as possible.

| Feature | Community | Paid License |
|---------|-----------|--------------|
| Windows (NSIS) Packaging | ✓ | ✓ |
| macOS (DMG) Packaging | ✓ | ✓ |
| Linux (DEB) Packaging | ✓ | ✓ |
| ZIP Archive Creation | ✓ | ✓ |
| Code Signing Support | ✗ | ✓ |
| macOS Notarization | ✗ | ✓ |
| Windows Trusted Signing | ✗ | ✓ |
| Custom Branding | ✗ | ✓ |
| CLI Support | ✗ | ✓ |
| Package Size Limit | 200MB | None |
| Technical Support | ✗ | ✓ |

In addition, community-license Parcel allows packaging for the current platform only.

## What's not included

- Accelerate UI components:
  - WebView
  - Media Player
  - Markdown viewer
  - TreeDataGrid
  - On-Screen Keyboard
- Technical support

## Eligibility

The Community Edition is free for:

#### Individual Developers
Individual developers working on their own equipment, including commercial projects.

#### Small Organizations
Non-Enterprise organizations where **up to five people** can use the software concurrently.

An "Enterprise" is defined as an organization with:
- More than 250 users/PCs, **OR**
- Annual revenues exceeding €1,000,000

#### Educational Institutions
Educational and research institutions with **unlimited users** for teaching and academic research.

Based on Avalonia's telemetry, **67% of current users** qualify for the Community License at no cost.

## Free Trial
A 30-day free trial is available that includes all functionality of paid tools as well as all pro UI components, including the On-Screen Keyboard.

#### Grace Period for Visual Studio Users
A 6-month grace period is provided for Visual Studio users. When you open Visual Studio, you can click **"Skip until April 13th 2026"** to continue using the new Visual Studio extension with full Community Edition access without requiring signups or license keys.

## Registration
Community License registration is available at the [Avalonia portal](https://portal.avaloniaui.net).

## Telemetry and Data Collection

To improve Avalonia and ensure continued support for free community tools, Avalonia Accelerate collects usage telemetry and crash reports. This data helps us understand tool usage and identify issues.

#### Build Telemetry

During the build process, Avalonia collects anonymous usage statistics. **All telemetry data is stored and processed in Europe** and complies with GDPR requirements. Telemetry is only collected during builds and does not impact your applications built with Avalonia.

#### Data Collected

The following information is collected during builds:

- **RecordId**: Unique identifier for the telemetry record (GUID)
- **TimeStamp**: When the build occurred (DateTimeOffset)
- **Machine**: Anonymous machine identifier (GUID)
- **ProjectRootHash**: Hashed project root path (string)
- **ProjectHash**: Hashed project identifier (string)
- **Ide**: Development environment being used (enum: Visual Studio, Rider, VS Code, etc.)
- **CiProvider**: CI/CD system if applicable (enum: GitHub Actions, Azure DevOps, etc.)
- **OutputType**: Application output type (string: exe, library, etc.)
- **Tfm**: Target framework moniker - .NET version (string)
- **Rid**: Runtime identifier - platform and architecture (string)
- **AvaloniaMainPackageVersion**: Version of Avalonia being used (string)
- **OSDescription**: Operating system information (string)
- **ProcessorArchitecture**: CPU architecture (enum: x64, ARM64, etc.)
- **DeviceUniqueId**: Anonymous device identifier (string)
- **AccelerateTier**: License tier (enum: Community, Business, Enterprise, etc.)
- **OperatingSystem**: Operating system name (string)

#### How Telemetry Works

The telemetry system looks for license keys in the `LicenseTickets` directory to determine your license tier and telemetry settings. Uninstalling Accelerate tools is not sufficient to restore pre-Accelerate telemetry behavior (see "Uninstalling the Community Edition" below).

#### Verifying Telemetry Data

For complete transparency, we've made the telemetry collection code open source:

- **Source code**: [AvaloniaStatsTask.cs](https://github.com/AvaloniaUI/Avalonia.BuildServices/blob/main/BuildTask/AvaloniaStatsTask.cs) - Review exactly what data is collected and how.
- **Telemetry Inspector**: A utility application for viewing the telemetry data being collected. Clone and build from [GitHub](https://github.com/AvaloniaUI/Avalonia.BuildServices/tree/main/TelemetryInspector) to verify the data yourself.

## Crash Reporting (Parcel and Dev Tools Only)

Avalonia Parcel and Dev Tools use Sentry for crash reporting. This is separate from usage telemetry and **only applies to crashes in the Avalonia Accelerate tools themselves**, not your applications built with Avalonia.

#### What's Collected

When a crash occurs in Parcel or Dev Tools, the following diagnostic information is sent to Sentry:

- Exception messages and stack traces
- Environment metadata (OS version, .NET version, etc.)
- Machine identifiers (random GUID)
- Context about the operation that crashed

#### Privacy Safeguards

1. **Scope**: Crash reporting only applies to Dev Tools and Parcel, **not applications you build** with Avalonia, or the Visual Studio extension. 

2. **Automatic Data Scrubbing**: We use Sentry's server-side Advanced Data Scrubbing to automatically remove common personally identifiable information (PII) patterns before or at ingestion, including:
   - Email addresses
   - IP addresses
   - Authentication tokens
   - Credit card numbers

3. **Residual PII Disclosure**: Despite these safeguards, we acknowledge that incidental PII may remain embedded in crash data, for example, usernames or machine names appearing in file paths or custom error messages. Under GDPR, such residual data is treated as personal data and handled accordingly.

4. **Data Location**: All crash data is processed in Europe, in compliance with GDPR requirements.

## Data Transparency Commitment

While telemetry helps us improve Avalonia and justify the resources invested in free community tools, we respect your choice to opt out. See the "Uninstalling the Community Edition" section below for complete removal instructions.

## Uninstalling the Community Edition

If you wish to remove the Accelerate tools and restore telemetry behavior, please follow these steps carefully.

#### Step 1: Uninstall the Tools

First, uninstall the Avalonia Accelerate tools using standard uninstallation methods:

**For .NET Tools (Parcel, Dev Tools):**
```bash
dotnet tool uninstall -g Avalonia.Parcel
dotnet tool uninstall -g Avalonia.DevTools
```

**For Visual Studio Extension:**
1. Open Visual Studio
2. Go to Extensions > Manage Extensions
3. Find the Avalonia extension and click Uninstall
4. Restart Visual Studio

#### Step 2: Remove License Data (CRITICAL)

**⚠️ IMPORTANT**: Simply uninstalling the tools is **NOT sufficient** to restore pre-Accelerate telemetry settings. 

Due to a general limitation of .NET tools, license data is not automatically removed during uninstallation. You must manually delete the license data directory to completely restore previous telemetry behavior.

**Windows:**

Delete the following directory:
```
%LOCALAPPDATA%\AvaloniaUI\Licensing
```

To delete this folder:
1. Press `Win + R` to open the Run dialog
2. Type `%LocalAppData%\AvaloniaUI\Licensing` and press Enter
3. Delete the entire `Licensing` folder

**macOS:**

Delete the following directory:
```bash
~/Library/Application Support/AvaloniaUI/Licensing
```

To delete this folder:
```bash
rm -rf ~/Library/Application Support/AvaloniaUI/Licensing
```

**Linux:**

Delete the following directory:
```bash
~/.local/share/AvaloniaUI/Licensing
```

To delete this folder:
```bash
rm -rf ~/.local/share/AvaloniaUI/Licensing
```

#### Why This Manual Step Is Necessary

The Avalonia telemetry task ([source code](https://github.com/AvaloniaUI/Avalonia.BuildServices/blob/main/BuildTask/AvaloniaStatsTask.cs)) looks for license keys in the `LicenseTickets` directory to determine your license tier and telemetry settings. 

When you uninstall .NET tools, this directory is not automatically removed due to a limitation of .NET tools. This means the telemetry system continues to operate under Community License settings even after uninstalling the tools.

By manually removing this directory, you ensure that:
- License information is completely cleared from your system.
- Telemetry reverts to pre-Accelerate behavior.

## Startup Program for Growing Companies

For privately held companies **less than 5 years old** with annual revenue or total institutional funding below **€10M**, Avalonia offers a **50% discount** on Accelerate Enterprise through the [Startup Program](https://avaloniaui.net/startups).


## License Compliance

By using the Avalonia Community License, you agree to:
- Accurately represent your eligibility status.
- Use the tools only for qualifying purposes.
- Comply with all telemetry and data collection terms.
- Upgrade to a paid license if your circumstances change and you no longer qualify.

For complete legal terms, refer to the [Accelerate Community License Agreement](https://avaloniaui.net/legal-center/accelerate-community-license).
