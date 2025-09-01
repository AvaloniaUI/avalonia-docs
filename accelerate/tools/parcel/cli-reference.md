---
id: cli-reference
title: Parcel CLI reference
---

## parcel

```
Description:
   Runs Parcel UI tool

Usage:
  parcel <project> [command] [options]

Arguments:
  <project>  Parcel project file to load config from.
```

## parcel pack

```
Description:
  Builds and packs project according to the pre-defined settings and input parameters.

Usage:
  parcel <project> [command] [options]

Arguments:
  <project>  Parcel project file to load config from.

Options:
  -?, -h, --help                                                                                    Show help and usage information
  --version                                                                                         Show version information
  --license-key                                                                                     License key necessary to run Parcel. If unset, Parcel CLI will attempt to restore previous Parcel GUI session, or fail.
  -o, --output                                                                                      Output directory. By default, "$project/bin/packages" is used.
  -r, --runtimes <linux-arm|linux-arm64|linux-x64|osx|osx-arm64|osx-x64|win-arm64|win-x64|win-x86>  Runtimes identifiers to pack application with. Can be multiple. By default, current machine runtime identifier is used.
  -p, --packages <deb|dmg|nsis|zip>                                                                 Package formats to output. Can be multiple. By default, nsis, dmg, deb are used. [default: nsis]
  --no-build                                                                                        When set, Parcel will not recompile input project. Note, publish related settings (trimming, aot, single-file) must be identical between your     
                                                                                                    build and parcel configuration. [default: False]
```

## parcel tool-restore

```
Description:
  Downloads or updates tool dependencies necessary for the packaging configuration. Useful for restoring packages once before running Parcel offline.

Usage:
  parcel <project> tool-restore <project> [options]

Arguments:
  <project>  Parcel project file to load config from.

Options:
  --license-key                                                                                     License key necessary to run Parcel. If unset, Parcel CLI will attempt to restore previous Parcel GUI session, or fail.
  -r, --runtimes <linux-arm|linux-arm64|linux-x64|osx|osx-arm64|osx-x64|win-arm64|win-x64|win-x86>  Runtimes identifiers to pack application with. Can be multiple. By default, current machine runtime identifier is used.
  -p, --packages <deb|dmg|nsis|zip>                                                                 Package formats to output. Can be multiple. By default, nsis, dmg, deb are used. [default: nsis]
  -?, -h, --help                                                                                    Show help and usage information

```

## parcel mcp

```
Description:
  Runs Model Context Protocol server, allowing to run Parcel commands from the LLM AI session.

Usage:
  parcel mcp [options]

Options:
  -?, -h, --help  Show help and usage information
```

