# Windows Packaging

Parcel creates Windows installers (MSI) and portable executables that can be distributed via setup files or ZIP archives. The tool handles executable configuration, registry entries, and file associations. Parcel can create Windows packages on all supported platforms.

## Package Configuration

### Application Properties

Essential application metadata that defines how the application appears and behaves on Windows.

**Company**:

Publisher name displayed in Windows properties, installers, and system dialogs. Used for organizing applications in Program Files and registry entries.

**App Icon**:

Application icon in **ICO** or **SVG** format. ICO files should include multiple resolutions from 16x16 to 256x256 pixels. Parcel generates the executable icon and installer resources from the source file.

**File Type Associations**:

Associate the application with specific file types by specifying file extensions (e.g., `.myfile`) and optionally adding MIME types and custom icons. Creates registry entries for proper Windows Explorer integration.

To handle these files in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

**URL Scheme Handlers**:

Register custom URL schemes for deep linking by defining custom schemes (e.g., `myapp://`, `myprotocol://`). Creates registry entries enabling other applications to launch your app with specific parameters.

To handle URL schemes in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

### Installer Configuration

**Installation Directory**:

Default installation path, typically under `Program Files` or `Program Files (x86)`. Users can change this during installation unless restricted by enterprise policies.

**Start Menu Integration**:

Automatic creation of Start Menu shortcuts with optional folder organization. Supports both user and system-wide installations.

**Desktop Shortcut**:

Optional desktop shortcut creation with user consent during installation process.

**Uninstaller**:

Automatic uninstaller registration in Windows Add/Remove Programs with proper cleanup of files, registry entries, and shortcuts.
