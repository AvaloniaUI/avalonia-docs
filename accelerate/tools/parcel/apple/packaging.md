# MacOS Packaging

Parcel creates macOS application bundles (.app) that can be distributed via DMG images or ZIP archives. The tool handles bundle structure, Info.plist generation, and file permissions. Parcel can create macOS bundles on Windows and Linux platforms.

## Bundle Configuration

### Bundle Properties

Essential bundle metadata that defines how the application appears and behaves on macOS.

**Bundle Identifier**:

A unique reverse-DNS identifier for the application (e.g., `com.Company.AppName`). Must follow Apple's reverse DNS notation guidelines. Avoid special characters except dots and hyphens, and start with a letter.

**App Category**:

Application category for macOS and App Store classification. Maps to Apple's `public.app-category.*` identifiers.

**App Icon**:

Application icon in **ICNS** or **SVG** format. ICNS files should include multiple resolutions from 16x16 to 1024x1024 pixels. Parcel generates the bundle icon structure from the source file.

**DMG Background**:

Background image for DMG installer in TIFF format.

Parcel uses a fixed DMG window size of **660x422** pixels with the following layout:

- **App Bundle icon**: positioned at coordinates (180, 170) with 160px icon size
- **Applications folder**: positioned at coordinates (480, 170) with 160px icon size  
- **Text size**: 12px for icon labels

Design background images to accommodate these fixed positions and the drag-and-drop workflow.

:::note
DMG customization is currently limited to background images. More flexible editor is planned, let us know if we need to prioritize it.
:::

**Permissions**:

System permissions with custom usage descriptions. Each permission requires a usage description that appears in macOS permission dialogs.

:::note
Usage descriptions are mandatory, otherwise the OS may deny access to system resources.
:::

**File Type Associations**:

Associate the application with specific file types by specifying file extensions (e.g., `.myfile`) and optionally adding MIME types.

To handle these files in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

**URL Scheme Handlers**:

Register custom URL schemes for deep linking by defining custom schemes (e.g., `myapp://`, `myprotocol://`). Enables other applications to launch the app with specific parameters.

To handle URL schemes in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

### Custom Info.plist Configuration

Parcel supports custom Info.plist files for advanced bundle configuration.

1. Create an `Info.plist` file in the project's root directory
2. Add custom keys and values following Apple's documentation
3. Parcel merges custom properties with generated ones
4. Existing properties in the custom file take precedence
5. Missing properties are automatically added based on project configuration

## DMG Creation

Parcel creates DMG installers with drag-and-drop interface, custom backgrounds, and symbolic links.

:::warning
WSL2 is required for DMG creation on Windows. ZIP packages can be created without WSL2.
:::

## ZIP Creation

Parcel maintains executable permissions during ZIP creation. Bundle structure remains intact when extracted on macOS, and applications remain executable without additional steps.

## Troubleshooting

### Getting Help

For issues not covered here:

1. Review Parcel's build logs for error information
2. Check the [Apple Bundle Programming Guide](https://developer.apple.com/library/archive/documentation/CoreFoundation/Conceptual/CFBundles/Introduction/Introduction.html) for bundle requirements
