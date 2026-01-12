# Windows Packaging

Parcel creates Windows installers (NSIS executable) and portable executables that can be distributed via setup files or ZIP archives. The tool handles executable configuration, registry entries, and can create Windows packages on all supported platforms.

## Package Configuration

### Common Properties

**Application Name**:

Display name used for the application install directory, Start Menu entry, and shortcut file name.

:::note
Currently cannot be localized.
:::

**Package Name**:

The output installer file name (without extension).

### NSIS Installer Properties

Parcel uses NSIS (Nullsoft Scriptable Install System) that creates lightweight, self-extracting installers with flexible installation options.

**Company**:

The publisher name displayed in Windows properties, installers, and system dialogs. This name is used to organize applications in Program Files and registry entries when **Create Company Folder** is enabled.

**Create Company Folder**:

When enabled, the application will be installed in a company-specific subdirectory:
- Admin install: `Program Files\[Company]\[Application Name]\`
- User install: `%LocalAppData%\[Company]\[Application Name]\`

This also affects the Start Menu shortcut location, organizing shortcuts under `Start Menu\Programs\[Company]\[Application Name]`.

Default: false.

**Installer Icon**:

The installer icon in **ICO** or **SVG** format. ICO files should include multiple resolutions from 16x16 to 256x256 pixels. This icon appears in Windows Explorer for the installer executable, during installation, and in the Windows uninstaller list.

:::note
This is separate from the application icon. 

Application icon is defined by the standard .NET `<ApplicationIcon>file.ico</ApplicationIcon>` property in the .csproj file.
:::

**Requires Admin**:

Controls whether the installer requires administrator privileges for installation.

When enabled (default), the application is installed to `Program Files` and requires User Account Control (UAC) elevation. When disabled, the application is installed to the current user's `%LocalAppData%` directory without requiring elevation.

Default: true.

**Include Uninstaller**:

When enabled, Parcel includes an uninstaller executable with the application and creates an entry in Windows Settings > Apps & Features (or Control Panel > Programs and Features on older Windows versions).

Default: true.

**License File**:

Optional license file to be displayed during installation. Supported formats:
- Plain text (.txt)
- Rich Text Format (.rtf)

The license is displayed on a dedicated page during installation, and users must accept it to proceed.

<!--- NOT YET AVAILABLE IN STABLE PARCEL

**File Type Associations**:

Associate the application with specific file types by specifying file extensions (e.g., `.myfile`) and optionally adding MIME types and custom icons. This creates registry entries for proper Windows Explorer integration.

To handle these files in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

**URL Scheme Handlers**:

Register custom URL schemes for deep linking by defining custom schemes (e.g., `myapp://`, `myprotocol://`). This creates registry entries that enable other applications and web browsers to launch your app with specific parameters.

To handle URL schemes in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

--->
