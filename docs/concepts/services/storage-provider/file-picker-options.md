---
id: file-picker-options
title: File Picker Options
---

# File Picker Options

## Common PickerOptions

### Title

Gets or sets the text that appears in the title bar of a picker.

### SuggestedStartLocation

Gets or sets the initial location where the file open picker looks for files to present to the user.
Can be obtained from previously picked folder or using `StorageProvider.TryGetFolderFromPathAsync` or `StorageProvider.TryGetWellKnownFolderAsync`.

:::note
This is a suggestion for the system, that can ignore this parameter, if application doesn't have access to the folder or it doesn't exist.
:::
:::note
On Linux some DBus file picker don't support start location. For using GTK Free Desktop disable `UseDBusFilePicker` in `X11PlatformOptions`
:::

## FilePickerOpenOptions

### AllowMultiple

Gets or sets an option indicating whether open picker allows users to select multiple files.

### FileTypeFilter

Gets or sets the collection of file types that the file open picker displays.

To create a list of file types for the file picker:

```cs
//This can also be applied for SaveFilePicker.
var files = await _target.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions()
{
 Title = title,
//You can add either custom or from the built-in file types. See "Defining custom file types" on how to create a custom one.
 FileTypeFilter = new[] { ImageAll, FilePickerFileTypes.TextPlain }
});
```

## FilePickerSaveOptions

### SuggestedFileName

Gets or sets the file name that the file save picker suggests to the user.

### DefaultExtension

Gets or sets the default extension to be used to save the file.

### FileTypeChoices

Gets or sets the collection of valid file types that the user can choose to assign to a file.

### ShowOverwritePrompt

Gets or sets a value indicating whether file open picker displays a warning if the user specifies the name of a file that already exists.

## FolderPickerOpenOptions

### AllowMultiple

Gets or sets an option indicating whether open picker allows users to select multiple folders.

## Platform compatibility:

| Feature        | Managed |  Windows | macOS | Linux | Browser | Android |  iOS |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| `Title` | ✔ | ✔ | ✔ | ✔ | ✖ | ✔ | ✔ |
| `SuggestedStartLocation` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `AllowMultiple` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `FileTypeFilter` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| `SuggestedFileName` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✖ |
| `DefaultExtension` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✖ |
| `FileTypeChoices` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✖ |
| `ShowOverwritePrompt` | ✔ | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ |

# Defining custom file types

Avalonia has set of built-in file types:

- FilePickerFileTypes.All - all files
- FilePickerFileTypes.TextPlain - txt files
- FilePickerFileTypes.ImageAll - all images
- FilePickerFileTypes.ImageJpg - jpg images
- FilePickerFileTypes.ImagePng - png images
- FilePickerFileTypes.Pdf - pdf documents

However it is possible to define custom file types that can be used by the picker.

For instance, the built-in ImageAll type is defined as:

```cs
public static FilePickerFileType ImageAll { get; } = new("All Images")
{
    Patterns = new[] { "*.png", "*.jpg", "*.jpeg", "*.gif", "*.bmp" },
    AppleUniformTypeIdentifiers = new[] { "public.image" },
    MimeTypes = new[] { "image/*" }
};
```

Where each file type has the following hints that are used by the different platforms:

- `Patterns` are used by most Windows, Linux and Browser platforms, and is a basic GLOB patten that can be matched on types.
- `AppleUniformTypeIdentifiers` is a standard identifier defined by Apple and is used on macOS and iOS platforms.
- `MimeTypes` is a web identifier for the files used on most platforms, but not Windows and iOS.

Defining all hints is recommended if the information is known.

:::note
If specific hint is not known, don't set random values or "*.*" wildcard, instead keep this collection null. It will tell the platform to ignore this collection and instead try to use another one.
:::
