---
id: configuration-reference
title: Parcel configuration reference
description: Reference for the general, .NET, Windows, macOS, and Linux settings stored in an Avalonia Parcel project.
sidebar_label: Configuration reference
doc-type: reference
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

A `.parcel` file contains the settings that Parcel uses to publish, package, and sign an application. The file has five top-level sections: `GeneralSettings`, `PublishSettings`, `Win32Settings`, `MacOsSettings`, and `LinuxSettings`.

Parcel resolves relative paths from the location of the `.parcel` file. If you use **Save As** or **Move To**, Parcel updates relative paths for the new project location.

## Setting values

For most scalar settings, you can specify a literal value, an environment variable, or an MSBuild property. In the GUI, select the value source next to the setting. Use environment variables for passwords, access tokens, and other secrets. Do not store secrets directly in a `.parcel` file.

If the project does not define a supported setting, Parcel checks its automatic environment variable. The following tables give the exact variable names. Collection settings and structured-object settings do not have automatic environment-variable overrides.

The defaults in this reference describe the resulting package behavior. Parcel writes some defaults when it creates a project. It applies other defaults during packaging if a setting is empty.

## General settings

These settings apply to every target platform. They appear on the **Basics** page.

| Setting | `.parcel` property | Type or values | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Project | `GeneralSettings.NetProjectPath` | Path | Required | — | Path to the application `.csproj` file. Parcel manages this field. |
| Package Name | `GeneralSettings.PackageName` | String | Assembly name | `PARCEL_GENERAL_PACKAGE_NAME` | Package identifier and output file name. Platform-specific normalization may apply. |
| Assembly Name | `GeneralSettings.AssemblyName` | String | Project file name | `PARCEL_GENERAL_ASSEMBLY_NAME` | Name of the executable assembly. This advanced field is normally read from the .NET project. |
| Application Name | `GeneralSettings.ApplicationName` | String | Package name | `PARCEL_GENERAL_APPLICATION_NAME` | Display name used by installers, bundles, shortcuts, and desktop entries. |
| Version | `GeneralSettings.Version` | Version string | `1.0.0` | `PARCEL_GENERAL_VERSION` | Application and package version. Parcel converts it to the format required by each platform. |
| Application Icon | `GeneralSettings.Icon` | Path to an icon | Parcel default icon | `PARCEL_GENERAL_ICON` | Shared application icon. A platform icon overrides it when configured. |
| Company | `GeneralSettings.Company` | String | Package name where required | `PARCEL_GENERAL_COMPANY` | Sets the Windows publisher and Linux package maintainer unless a platform setting overrides it. Maximum 255 characters. |
| File Associations | `GeneralSettings.FileTypes` | Collection | None | — | File types registered by supported installers and bundles. |
| URL Schemes | `GeneralSettings.UrlTypes` | Collection | None | — | URL schemes registered by supported installers and bundles. |

### File associations <MinVersion version="1.1" isNewVersion="true" />

Each entry in `GeneralSettings.FileTypes` has the following properties:

| Property | Type | Required | Description |
|---|---|---|---|
| `GeneralSettings.FileTypes[].Name` | String | Yes | Human-readable file type name. |
| `GeneralSettings.FileTypes[].Extension` | String | Extension or MIME type | Extension with or without a leading period. After normalization, it must contain 1–10 lowercase letters or digits. |
| `GeneralSettings.FileTypes[].MimeType` | String | Extension or MIME type | MIME type such as `application/x-example`. Parcel generates one when Linux needs it and it is omitted. |

Each entry in `GeneralSettings.UrlTypes` has the following properties:

| Property | Type | Required | Description |
|---|---|---|---|
| `GeneralSettings.UrlTypes[].Name` | String | Yes | Human-readable name for the URL type. |
| `GeneralSettings.UrlTypes[].Schemes` | String | Yes | One or more RFC 3986 schemes without `://`, separated by commas, semicolons, or spaces. |

Parcel adds associations to NSIS and MSIX packages on Windows, application bundles on macOS, and DEB and RPM desktop entries on Linux.

On Windows, file association requires an extension. Windows cannot register an entry that contains only a MIME type.

On macOS, associations require `MacOsSettings.CreateBundle`.

## .NET publish settings

These settings control the `dotnet publish` operation Parcel runs before packaging.

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Configuration | `PublishSettings.Configuration` | String | .NET project default | `PARCEL_NET_CONFIGURATION` | Build configuration. It must begin with a letter and contain only letters, digits, `_`, or `-`. |
| Publish Single File | `PublishSettings.PublishSingleFile` | Boolean | Enabled for new Parcel projects | `PARCEL_NET_PUBLISH_SINGLE_FILE` | Publishes managed assemblies in a single executable. |
| Publish Trimmed | `PublishSettings.PublishTrimmed` | Boolean | .NET project default | `PARCEL_NET_PUBLISH_TRIMMED` | Enables trimming to reduce the package size. Testing the trimmed application is recommended. |
| Publish AOT | `PublishSettings.PublishAot` | Boolean | .NET project default | `PARCEL_NET_PUBLISH_AOT` | Enables Native AOT compilation. |
| Publish ReadyToRun | `PublishSettings.PublishReadyToRun` | Boolean | .NET project default | `PARCEL_NET_PUBLISH_READY_TO_RUN` | Precompiles assemblies to improve startup performance. |
| Publish Self-Contained | `PublishSettings.PublishSelfContained` | Boolean | `true` | `PARCEL_NET_PUBLISH_SELF_CONTAINED` | Includes the .NET runtime. This advanced field is not shown in the GUI. |
| MSBuild Properties | `PublishSettings.ExtraBuildProperties` | String dictionary | Empty | — | Additional properties passed to `dotnet publish`. |
| Exclude Files | `PublishSettings.ExcludeFilePatterns` | List of glob patterns | Empty | — | Removes matching files and directories from the published output before packaging. |

:::note
Parcel respects .NET publish properties defined in the *.csproj file. There is no need to duplicate them in the Parcel config.
:::

## Windows settings

### Installer and MSIX

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Installer Icon | `Win32Settings.InstallerIcon` | Path to ICO or SVG | Application Icon | `PARCEL_WINDOWS_INSTALLER_ICON` | Overrides the shared icon for the NSIS installer and generated MSIX assets. |
| Create Company Folder | `Win32Settings.CompanyFolder` | Boolean | `false` | `PARCEL_WINDOWS_COMPANY_FOLDER` | Adds a company directory to the NSIS installation and Start Menu paths. |
| License File | `Win32Settings.InstallerLicense` | Path to TXT or RTF | None | `PARCEL_WINDOWS_INSTALLER_LICENSE` | Displays a license acceptance page in the NSIS installer. |
| Requires Admin | `Win32Settings.InstallerRequiresAdmin` | Boolean | `true` | `PARCEL_WINDOWS_INSTALLER_REQUIRES_ADMIN` | Installs NSIS packages under Program Files with elevation. When disabled, installs for the current user. |
| Include uninstaller with the app | `Win32Settings.IncludeUninstaller` | Boolean | `true` | `PARCEL_WINDOWS_INCLUDE_UNINSTALLER` | Includes an NSIS uninstaller and registers the application in Windows installed-app listings. |
| Publisher | `Win32Settings.MsixPublisher` | Distinguished name | Company or application name | `PARCEL_WINDOWS_MSIX_PUBLISHER` | MSIX publisher identity. For signed packages, it must exactly match the certificate subject. |

### Signing

`Win32Settings.SigningType` accepts `None`, `LocalCertificate`, `WindowsCertificateStore`, `AzureTrustedSigning`, `AzureKeyVault`, `AwsKeyManagementService`, `DigiCert`, `GoogleKeyManagementService`, or `ESigner`. The GUI names `AzureTrustedSigning` **Azure Artifact Signing**.

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Signing Type | `Win32Settings.SigningType` | Signing type | `None` | `PARCEL_WINDOWS_SIGNING_TYPE` | Selects the Authenticode signing provider. |
| Sign Installer | `Win32Settings.SignInstaller` | Boolean | `true` | `PARCEL_WINDOWS_SIGN_INSTALLER` | Signs the generated NSIS or MSIX package and the application files. Disable it when a store or later pipeline signs the package. |
| Additional signing patterns | `Win32Settings.AdditionalSignPatterns` | List of glob patterns | Empty | — | Includes additional code files in application signing. |
| Timestamp Server URL | `Win32Settings.SigningTimestampServer` | URL | None | `PARCEL_WINDOWS_SIGNING_TIMESTAMP_SERVER` | Timestamp authority used with a local certificate or the Windows certificate store. |
| Local Signing Certificate File | `Win32Settings.LocalSigningCertificate` | Path to PFX or P12 | Required for local certificate | `PARCEL_WINDOWS_LOCAL_SIGNING_CERTIFICATE` | Certificate and private key used for local signing. |
| Local Signing Certificate Password | `Win32Settings.LocalSigningCertificatePassword` | Secret string | Empty | `PARCEL_WINDOWS_LOCAL_SIGNING_CERTIFICATE_PASSWORD` | Password protecting the local certificate. |
| Store Certificate Name | `Win32Settings.StoreCertificateName` | String | Required for certificate store | `PARCEL_WINDOWS_STORE_CERTIFICATE_NAME` | Certificate subject or thumbprint in the Windows certificate store. |
| Use Local Machine Certificate Store | `Win32Settings.UseLocalMachineCertificateStore` | Boolean | `false` | `PARCEL_WINDOWS_USE_LOCAL_MACHINE_CERTIFICATE_STORE` | Searches Local Machine instead of Current User. Windows only. |
| Auto-Detect Matching Certificate | `Win32Settings.AutoDetectMatchingCertificate` | Boolean | `false` | `PARCEL_WINDOWS_AUTO_DETECT_MATCHING_CERTIFICATE` | Allows SignTool to choose a matching certificate. Windows only. |
| Azure Artifact Signing Endpoint | `Win32Settings.TrustedSigningEndpoint` | Azure signing URL | Required | `PARCEL_WINDOWS_TRUSTED_SIGNING_ENDPOINT` | Azure Artifact Signing service endpoint. |
| Azure Artifact Signing Certificate Profile Name | `Win32Settings.TrustedSigningCertificateProfileName` | String | Required | `PARCEL_WINDOWS_TRUSTED_SIGNING_CERTIFICATE_PROFILE_NAME` | Azure Artifact Signing certificate profile. |
| Azure Artifact Signing Account Name | `Win32Settings.TrustedSigningCodeSigningAccountName` | String | Required | `PARCEL_WINDOWS_TRUSTED_SIGNING_CODE_SIGNING_ACCOUNT_NAME` | Azure Artifact Signing account. |
| Azure Key Vault Name | `Win32Settings.AzureKeyVaultName` | String | Required unless URL identifies it | `PARCEL_WINDOWS_AZURE_KEY_VAULT_NAME` | Azure Key Vault name. |
| Azure Key Vault URL | `Win32Settings.AzureKeyVaultUrl` | Absolute HTTP(S) URL | Public Azure endpoint | `PARCEL_WINDOWS_AZURE_KEY_VAULT_URL` | Full vault URL, including sovereign-cloud endpoints. |
| Azure Key Vault Certificate Name | `Win32Settings.AzureKeyVaultCertificateName` | String | Required | `PARCEL_WINDOWS_AZURE_KEY_VAULT_CERTIFICATE_NAME` | Certificate stored in Azure Key Vault. |
| AWS Region Code | `Win32Settings.AwsSigningRegionCode` | String | Required | `PARCEL_WINDOWS_AWS_SIGNING_REGION_CODE` | AWS region containing the signing key. |
| AWS Signing Certificate File | `Win32Settings.AwsSigningCertificateFile` | Path | Required | `PARCEL_WINDOWS_AWS_SIGNING_CERTIFICATE_FILE` | Certificate corresponding to the private key in AWS KMS. |
| AWS Signing Key ID or Alias | `Win32Settings.AwsSigningKeyIdOrAlias` | String | Required | `PARCEL_WINDOWS_AWS_SIGNING_KEY_ID_OR_ALIAS` | AWS KMS key identifier or alias. |
| DigiCert API Key | `Win32Settings.DigiCertApiKey` | Secret string | Required | `PARCEL_WINDOWS_DIGI_CERT_API_KEY` | DigiCert ONE API key. |
| DigiCert Keystore | `Win32Settings.DigiCertKeystore` | Path to PKCS#12 | Required | `PARCEL_WINDOWS_DIGI_CERT_KEYSTORE` | Client-authentication keystore. |
| DigiCert Storepass | `Win32Settings.DigiCertStorepass` | Secret string | Required | `PARCEL_WINDOWS_DIGI_CERT_STOREPASS` | Password for the DigiCert keystore. |
| DigiCert Certificate Name or ID | `Win32Settings.DigiCertCertificateNameOrId` | String | Required | `PARCEL_WINDOWS_DIGI_CERT_CERTIFICATE_NAME_OR_ID` | Certificate name or ID in DigiCert ONE. |
| DigiCert Host | `Win32Settings.DigiCertHost` | HTTP(S) URL | US DigiCert ONE host | `PARCEL_WINDOWS_DIGI_CERT_HOST` | Overrides the DigiCert ONE service host. |
| Google Access Token | `Win32Settings.GoogleAccessToken` | Secret string | Required | `PARCEL_WINDOWS_GOOGLE_ACCESS_TOKEN` | OAuth 2.0 access token for Google Cloud KMS. |
| Google Signing Keyring | `Win32Settings.GoogleSigningKeyring` | Keyring resource path | Required | `PARCEL_WINDOWS_GOOGLE_SIGNING_KEYRING` | Resource path through `projects`, `locations`, and `keyRings`. |
| Google Signing Certificate File | `Win32Settings.GoogleSigningCertificateFile` | Path | Required | `PARCEL_WINDOWS_GOOGLE_SIGNING_CERTIFICATE_FILE` | Certificate corresponding to the Google Cloud KMS key. |
| Google Signing Certificate Version | `Win32Settings.GoogleSigningCertificateVersion` | String | Latest | `PARCEL_WINDOWS_GOOGLE_SIGNING_CERTIFICATE_VERSION` | Specific key version to use. |
| eSigner User Name | `Win32Settings.ESignerUserName` | String | Required | `PARCEL_WINDOWS_E_SIGNER_USER_NAME` | SSL.com account username. |
| eSigner Password | `Win32Settings.ESignerPassword` | Secret string | Required | `PARCEL_WINDOWS_E_SIGNER_PASSWORD` | SSL.com account password. |
| eSigner Key Password | `Win32Settings.ESignerKeyPassword` | Secret string | Required | `PARCEL_WINDOWS_E_SIGNER_KEY_PASSWORD` | Base64-encoded TOTP secret. |
| eSigner Credential ID | `Win32Settings.ESignerCredentialId` | String | Required | `PARCEL_WINDOWS_E_SIGNER_CREDENTIAL_ID` | SSL.com signing credential identifier. |
| eSigner Sandbox | `Win32Settings.ESignerSandbox` | Boolean | `false` | `PARCEL_WINDOWS_E_SIGNER_SANDBOX` | Uses the SSL.com sandbox service. |

## macOS settings

### Bundle, DMG, and PKG

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Create Bundle | `MacOsSettings.CreateBundle` | Boolean | `true` for new projects | `PARCEL_MACOS_CREATE_BUNDLE` | Creates a macOS `.app` bundle. DMG, PKG, permissions, and associations require a bundle. |
| Bundle Identifier | `MacOsSettings.BundleIdentifier` | Reverse-DNS string | Derived from company and package name | `PARCEL_MACOS_BUNDLE_IDENTIFIER` | `CFBundleIdentifier` used for signing and distribution. |
| Team ID | `MacOsSettings.TeamId` | 10 uppercase letters or digits | None | `PARCEL_MACOS_TEAM_ID` | Apple Developer team identifier used for signing and notarization. |
| App Category | `MacOsSettings.BundleCategory` | Apple bundle category | `Other` | `PARCEL_MACOS_BUNDLE_CATEGORY` | macOS and App Store application category. |
| Application Icon | `MacOsSettings.AppIcon` | Path to ICNS or SVG | Application Icon | `PARCEL_MACOS_APP_ICON` | Overrides the shared icon for the app bundle. |
| Permissions | `MacOsSettings.Permissions` | Permission-description dictionary | Empty | — | Adds macOS usage descriptions for Camera, Microphone, Location, Contacts, Calendars, Desktop, Documents, Downloads, and Network. |
| Resource file patterns | `MacOsSettings.BundleResourcePatterns` | List of glob patterns | Empty | — | Moves matching files to `Contents/Resources` and replaces their original locations with symlinks. |
| Automatically Move Bundle Frameworks | `MacOsSettings.AutomaticallyMoveBundleFrameworks` | Boolean | `false` | `PARCEL_MACOS_AUTOMATICALLY_MOVE_BUNDLE_FRAMEWORKS` | Advanced compatibility option for relocating frameworks. Not shown in the GUI. |
| Automatically Move Bundle Resources | `MacOsSettings.AutomaticallyMoveBundleResources` | Boolean | `false` | `PARCEL_MACOS_AUTOMATICALLY_MOVE_BUNDLE_RESOURCES` | Advanced compatibility option for relocating resources. Not shown in the GUI. |
| DMG Background Image | `MacOsSettings.DmgBackground` | Path to TIFF | None | `PARCEL_MACOS_DMG_BACKGROUND` | Background displayed in the DMG window. |
| DMG Layout | `MacOsSettings.DmgLayout` | Layout object | Standard Parcel layout | — | Window, grid, icon, text, background color, app position, and Applications-link position settings. |
| DMG License File | `MacOsSettings.DmgLicense` | Path | None | `PARCEL_MACOS_DMG_LICENSE` | File embedded at the root of the DMG. |
| Install Location | `MacOsSettings.InstallerLocation` | Absolute path | `/Applications` | `PARCEL_MACOS_INSTALLER_LOCATION` | PKG installation directory. This advanced field is not shown in the GUI. |
| Install Scripts Directory | `MacOsSettings.InstallerScripts` | Directory path | None | `PARCEL_MACOS_INSTALLER_SCRIPTS` | Directory containing executable `preinstall` and `postinstall` scripts. This advanced field is not shown in the GUI. |
| Package Identifier | `MacOsSettings.InstallerIdentifier` | Reverse-DNS string | Bundle identifier | `PARCEL_MACOS_INSTALLER_IDENTIFIER` | Identifier registered by the PKG installer. This advanced field is not shown in the GUI. |

The DMG layout object supports these advanced properties:

| `.parcel` property | Type | Default | Description |
|---|---|---|---|
| `MacOsSettings.DmgLayout.BackgroundColorRed` | Number | `1` | Red component of the window background color. |
| `MacOsSettings.DmgLayout.BackgroundColorGreen` | Number | `1` | Green component of the window background color. |
| `MacOsSettings.DmgLayout.BackgroundColorBlue` | Number | `1` | Blue component of the window background color. |
| `MacOsSettings.DmgLayout.GridOffsetX` | Integer | `0` | Horizontal grid offset. |
| `MacOsSettings.DmgLayout.GridOffsetY` | Integer | `0` | Vertical grid offset. |
| `MacOsSettings.DmgLayout.GridSpacing` | Integer | `100` | Spacing between grid positions. |
| `MacOsSettings.DmgLayout.X` | Integer | `100` | Horizontal position of the DMG window. |
| `MacOsSettings.DmgLayout.Y` | Integer | `100` | Vertical position of the DMG window. |
| `MacOsSettings.DmgLayout.Width` | Integer | `660` | DMG window width. |
| `MacOsSettings.DmgLayout.Height` | Integer | `422` | DMG window height. |
| `MacOsSettings.DmgLayout.IconSize` | Integer | `128` | Icon size in pixels. |
| `MacOsSettings.DmgLayout.TextSize` | Integer | `12` | Icon-label text size. |
| `MacOsSettings.DmgLayout.BundlePositionX` | Integer | `173` | Horizontal position of the app bundle. |
| `MacOsSettings.DmgLayout.BundlePositionY` | Integer | `231` | Vertical position of the app bundle. |
| `MacOsSettings.DmgLayout.ApplicationsPositionX` | Integer | `485` | Horizontal position of the Applications link. |
| `MacOsSettings.DmgLayout.ApplicationsPositionY` | Integer | `231` | Vertical position of the Applications link. |

### Application signing

`MacOsSettings.SigningCredentialsType` accepts `None`, `AdHoc`, `KeyChainIdentity`, `P12Certificate`, or `PemCertificate`.

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Signing Credentials | `MacOsSettings.SigningCredentialsType` | Credential type | `AdHoc` | `PARCEL_MACOS_SIGNING_CREDENTIALS_TYPE` | Selects how the app bundle, code, and optionally DMG are signed. |
| Enable App Sandbox | `MacOsSettings.EnableSandbox` | Boolean | `false` | `PARCEL_MACOS_ENABLE_SANDBOX` | Runs the application in the macOS App Sandbox. The application can access only resources covered by its entitlements. Required for Mac App Store distribution. |
| Sign DMG | `MacOsSettings.SignDmg` | Boolean | `true` | `PARCEL_MACOS_SIGN_DMG` | Signs the generated DMG using the application-signing credentials. |
| Additional signing patterns | `MacOsSettings.AdditionalSignPatterns` | List of glob patterns | Empty | — | Includes additional code files in bundle signing. |
| Signing Identity | `MacOsSettings.SigningIdentity` | Keychain identity | Required for Keychain | `PARCEL_MACOS_SIGNING_IDENTITY` | Application-signing identity in the macOS Keychain. |
| Signing P12 Certificate | `MacOsSettings.SigningP12Certificate` | Path to P12 | Required for P12 | `PARCEL_MACOS_SIGNING_P12_CERTIFICATE` | Portable application-signing certificate and private key. |
| Signing Password | `MacOsSettings.SigningP12Password` | Secret string | Empty | `PARCEL_MACOS_SIGNING_P12_PASSWORD` | Password protecting the application P12 certificate. |
| Signing PEM Certificate | `MacOsSettings.SigningPemCertificate` | Path to PEM | Required for PEM | `PARCEL_MACOS_SIGNING_PEM_CERTIFICATE` | PEM application-signing certificate. |
| Deep Signing | `MacOsSettings.SignDeep` | Boolean | `false` | `PARCEL_MACOS_SIGN_DEEP` | Advanced compatibility option for deep signing. Not shown in the GUI. |

### Installer signing

A PKG installer requires a separate installer certificate. `MacOsSettings.InstallerSigningCredentialsType` accepts the same credential types as [application signing](#application-signing). Ad hoc signing cannot create a signed PKG.

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Installer Signing Credentials | `MacOsSettings.InstallerSigningCredentialsType` | Credential type | `None` | `PARCEL_MACOS_INSTALLER_SIGNING_CREDENTIALS_TYPE` | Selects the certificate used to sign PKG installers. |
| Installer Signing Identity | `MacOsSettings.InstallerSigningIdentity` | Keychain identity | Required for Keychain | `PARCEL_MACOS_INSTALLER_SIGNING_IDENTITY` | Installer identity in the macOS Keychain. |
| Installer Signing P12 Certificate | `MacOsSettings.InstallerSigningP12Certificate` | Path to P12 | Required for P12 | `PARCEL_MACOS_INSTALLER_SIGNING_P12_CERTIFICATE` | Portable installer certificate and private key. |
| Installer Signing Password | `MacOsSettings.InstallerSigningP12Password` | Secret string | Empty | `PARCEL_MACOS_INSTALLER_SIGNING_P12_PASSWORD` | Password protecting the installer P12 certificate. |
| Installer Signing PEM Certificate | `MacOsSettings.InstallerSigningPemCertificate` | Path to PEM | Required for PEM | `PARCEL_MACOS_INSTALLER_SIGNING_PEM_CERTIFICATE` | PEM installer-signing certificate. |

### Notarization

`MacOsSettings.NotaryCredentialsType` accepts `None`, `KeyChainProfile`, or `AppleAccount`.

| Setting | `.parcel` property | Type | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Notary Credentials | `MacOsSettings.NotaryCredentialsType` | Credential type | `None` | `PARCEL_MACOS_NOTARY_CREDENTIALS_TYPE` | Selects authentication for Apple's notary service. |
| Notary Keychain Profile | `MacOsSettings.NotaryKeychainProfile` | String | Required for Keychain profile | `PARCEL_MACOS_NOTARY_KEYCHAIN_PROFILE` | `notarytool` profile stored in the macOS Keychain. |
| Notary Apple ID | `MacOsSettings.NotaryAppleId` | Email address | Required for Apple account | `PARCEL_MACOS_NOTARY_APPLE_ID` | Apple ID used for notarization. |
| Notary App Password | `MacOsSettings.NotaryAppPassword` | Secret string | Required for Apple account | `PARCEL_MACOS_NOTARY_APP_PASSWORD` | App-specific password used by the notary service. |

## Linux settings

| Setting | `.parcel` property | Type or values | Default | Environment variable | Description |
|---|---|---|---|---|---|
| Install Directory Name | `LinuxSettings.InstallDirName` | Lowercase package-directory name | `app-{package-name}` | `PARCEL_LINUX_INSTALL_DIR_NAME` | Directory created under `/usr/share`. It must start and end with a letter or number. Maximum 100 characters. |
| Application Icon | `LinuxSettings.AppIcon` | Path to PNG or SVG | Application Icon | `PARCEL_LINUX_APP_ICON` | Overrides the shared icon for DEB and RPM packages. |
| Maintainer | `LinuxSettings.Maintainer` | String | Company, then package name | `PARCEL_LINUX_MAINTAINER` | Package maintainer, preferably in `Name <email@example.com>` format. Maximum 255 characters. |
| Copyright | `LinuxSettings.CopyrightFile` | Path | None | `PARCEL_LINUX_COPYRIGHT_FILE` | Copyright file included in DEB and RPM metadata. |
| Desktop Category | `LinuxSettings.DesktopCategory` | Linux desktop category | `Application` | `PARCEL_LINUX_DESKTOP_CATEGORY` | Category used in desktop menus and mapped to package-manager metadata. |
| Create `/usr/bin/` symlink | `LinuxSettings.CreateBinSymlink` | Boolean | `true` | `PARCEL_LINUX_CREATE_BIN_SYMLINK` | Creates a command-line symlink to the application executable. |
| Additional DEB Dependencies | `LinuxSettings.AdditionalDebDependencies` | List | Empty | — | Adds Debian package dependencies. Separate alternatives with a vertical bar. |
| Additional RPM Dependencies | `LinuxSettings.AdditionalRpmDependencies` | List | Empty | — | Adds RPM package names or capabilities. |

You can use the main [freedesktop categories](https://specifications.freedesktop.org/menu-spec/latest/category-registry.html) and common additional categories, e.g., `Development`, `Education`, `Game`, `Graphics`, `Network`, `Office`, `Science`, `Settings`, `System`, `Utility`, `WebBrowser`, `TextEditor`, `TerminalEmulator`.

## See also

- [Parcel setup](/tools/parcel/setup)
- [Parcel command line reference](/tools/parcel/command-line-reference)
- [Packaging for Windows](/tools/parcel/packaging-for-windows)
- [Packaging for macOS](/tools/parcel/packaging-for-macos)
- [Packaging for Linux](/tools/parcel/packaging-for-linux)
