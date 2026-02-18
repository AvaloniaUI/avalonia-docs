---
id: clipboard
title: Clipboard
---

## Data Formats

Before accessing the clipboard, it's important to understand the data format, represented by the `DataFormat<T>` class. It represents the format of a data item (e.g., text, HTML, PNG, etc.) and is used by various clipboard and drag-and-drop APIs.

A data format consists of a kind (`Universal`, `Platform`, or `Application`), an identifier, and a data type.

Data formats are considered equal if they have the same kind and identifier.

### Universal Formats

Universal formats are cross-platform formats that Avalonia directly understands.  
There are currently three universal formats:

| Format              | Identifier | Type           | Description         |
| --------------------|------------|----------------|---------------------|
| `DataFormat.Text`   | "Text"     | `string`       | Plain text data     |
| `DataFormat.File`   | "File"     | `IStorageItem` | A file or directory |
| `DataFormat.Bitmap` | "Bitmap"   | `Bitmap`       | A bitmap image      |

### Platform Formats

Platform format is compatible **only with the current platform** that the application is running on (e.g., Windows, Linux, iOS, etc.). Its identifier should be a name understood by the underlying platform. Use this format only when you need direct interoperability with the target platform and have precise knowledge of its encoding or serialization.

:::warning
Do **not** assume that a given identifier works for all platforms!  
For example, the HTML format is named `HTML format` on Windows, `text/html` on Linux and Android, and `public.html` on macOS and iOS. Always verify the intended operating system before using a platform-specific format.
:::

A platform format can be defined using `DataFormat.CreateBytesPlatformFormat` or `DataFormat.CreateStringPlatformFormat`, respectively using `byte[]` and `string` types. Avalonia does not perform automatic serialization.

Example:
```csharp
if (OperatingSystem.IsMacOS())
{
    var macOSHtmlFormat = DataFormat.CreateStringPlatformFormat("public.html");
}
```

### Application Formats

An application format is specific to your application and works with all platforms that allow custom data formats. Its identifier is restricted to ASCII letters, digits, plus dot and dash symbols (`A`-`Z`, `a`-`z`, `0`-`9`, `.`, `-`). This identifier will not be exposed directly to the underlying platform; instead, it will be internally prefixed to avoid conflicts with platform formats.

Use this format when you need to place application-specific data on the clipboard, for example, to share it between multiple instances of the program.

An application format can be defined using `DataFormat.CreateBytesApplicationFormat` or `DataFormat.CreateStringApplicationFormat`, respectively using `byte[]` and `string` types. Avalonia does not perform automatic serialization.

```csharp
var myFormat = DataFormat.CreateBytesApplicationFormat("mycompany-myapp-myformat");
```

## IClipboard

The `IClipboard` interface enables interaction with the system clipboard to set and retrieve text, image, and custom data formats.

An instance of `IClipboard` can be accessed through a [`TopLevel`](/docs/concepts/toplevel) object:
```csharp
var clipboard = window.Clipboard;
```

### Reading

#### TryGetDataAsync()

The clipboard's content is read by retrieving an instance of `IAsyncDataTransfer`. This object is responsible for providing data items of various formats on demand (see the [`IAsyncDataTransfer`](#iasyncdatatransfer--iasyncdatatransferitem) section below).

The `TryGetDataAsync` method asynchronously retrieves an `IAsyncDataTransfer` object representing the clipboard's contents. If the clipboard is empty, `null` is returned.

```csharp
using var data = await clipboard.TryGetDataAsync();
```

:::warning
Since the clipboard's contents may change at any time, it is recommended to use the returned `IAsyncDataTransfer` instance as soon as possible; do not store it for later use. After all the necessary operations are done on the object, it must be disposed of by the caller; a `using` statement is therefore recommended.
:::

#### Extension Methods

To retrieve data using a specific format, several extension methods are available. You can use the following for common formats, instead of `TryGetDataAsync()`:

- `TryGetValueAsync(DataFormat<T>)` returns a single value of type `T` matching the specified data format from the clipboard, or `null` if none is present.
- `TryGetValuesAsync(DataFormat<T>)` returns multiple values of type `T` matching the specified data format from the clipboard, or an empty array if none is present.
- `TryGetTextAsync()` returns a single `string` value matching the `DataFormat.Text` format, or `null` if none is present.
- `TryGetFileAsync()` returns a single `IStorageItem` object matching the `DataFormat.File` format, or `null` if none is present.
- `TryGetFilesAsync()` returns multiple `IStorageItem` objects matching the `DataFormat.File` format, or an empty array if none is present.
- `TryGetBitmapAsync()` returns a single `Bitmap` image matching the `DataFormat.Bitmap` format, or `null` if none is present.

If several values are present on the clipboard when the methods returning a single value are called, the first one is used.

Examples:

```csharp
var text = await clipboard.TryGetTextAsync();
Console.WriteLine($"Clipboard text: {text}");

var file = await clipboard.TryGetFileAsync();
Console.WriteLine($"Clipboard file: {file?.Path}");

var bitmap = await clipboard.TryGetBitmapAsync();
Console.WriteLine($"Clipboard image: {bitmap?.PixelSize}");
```

:::tip
Each of these extension methods calls `TryGetDataAsync()` under the hood. If you plan to use several of these in a row, consider calling [`TryGetDataAsync()`](#trygetdataasync) once instead to obtain an `IAsyncDataTransfer`, then read the expected values from that object.
:::

#### TryGetInProcessDataAsync()

This method retrieves the exact `IAsyncDataTransfer` instance previously placed on the clipboard by `SetDataAsync()` if it's still present. If the clipboard's content has changed, has been flushed, or if the platform does not support lazily provided values, this method returns `null`.

Calling this method avoids accessing the underlying platform's clipboard, which can be useful when fine-grained control is needed. For most scenarios, using `TryGetDataAsync()` is the preferred option.

This method is supported on Windows, macOS, and X11.

### Writing

#### SetDataAsync()

To place data on the clipboard, call the `IClipboard.SetDataAsync(IAsyncDataTransfer)` method. It accepts an implementation of `IAsyncDataTransfer` that is responsible for providing data items of various formats on demand (see the [`IAsyncDataTransfer`](#iasyncdatatransfer--iasyncdatatransferitem) section below).

Example:
```csharp
var data = new DataTransfer();
data.Add(DataTransferItem.CreateText("Copied from Avalonia!"));
await clipboard.SetDataAsync(data);
```

:::note
Placing a new object on the clipboard always clears any previous data.
:::

:::warning
The `IAsyncDataTransfer` object must stay valid while it's on the clipboard. Do **not** call `Dispose()` on it! Avalonia will automatically dispose of the instance once it is certain it's no longer in use.
:::

#### Extension Methods

To write a single specific format, several extension methods are available for convenience. You can use the following for common formats:

- `SetValueAsync(DataFormat<T>, T)` sets a single value of type `T` with the specified data format on the clipboard.
- `SetValuesAsync(DataFormat<T>, IEnumerable<T>)` sets multiple values of type `T` with the specified data formats on the clipboard.
- `SetTextAsync(string)` sets a single `string` value with the `DataFormat.Text` format on the clipboard.
- `SetFileAsync(IStorageItem)` sets a single `IStorageItem` object with the `DataFormat.File` format on the clipboard.
- `SetFilesAsync(IEnumerable<IStorageItem>)` sets multiple `IStorageItem` objects with the `DataFormat.File` format on the clipboard.
- `SetBitmapAsync(Bitmap)` sets a single `Bitmap` image with the `DataFormat.Bitmap` format on the clipboard.

#### ClearAsync()

Calling the `ClearAsync()` method clears the clipboard of all contents.

#### FlushAsync()

On Windows, macOS, and X11, the data is retrieved lazily on demand from the `IAsyncDataTransfer` placed on the clipboard.
If the Avalonia application terminates, the data becomes unavailable.

On Windows, calling `FlushAsync()` allows the system to query all the data present on the clipboard and persist it. On other platforms, this method does nothing.

## IAsyncDataTransfer & IAsyncDataTransferItem

The `IAsyncDataTransfer` interface represents the contents of the clipboard and exposes the following properties:
- `Formats`, returning a list of `DataFormat` instances representing all formats present inside the object.
- `Items`, returning a list of `IAsyncDataTransferItem` instances representing all items present inside the object.

The `IAsyncDataTransferItem` interface represents a single item inside an `IAsyncDataTransfer` and exposes the following members:
- `Formats`, returning a list of `DataFormat` instances representing all formats present inside the object.
- `TryGetRawAsync(DataFormat)`, used to retrieve a single value in a given data format asynchronously.

:::info
A single item can have multiple formats.  
For example, rich text might be represented in RTF, HTML, and plain text.
:::

### Getting values

#### Raw

To read values from an `IAsyncDataTransferItem` object, call the `TryGetRawAsync(DataFormat)` method by specifying the requested data format.

:::tip
The returned value is untyped (`object`).   
Consider using the extension methods described below to get typed results.
:::

#### Typed

Several extension methods are provided to retrieve typed values from `IAsyncDataTransfer` and `IAsyncDataTransferItem`:
- `TryGetValueAsync(DataFormat<T>)` returns a single value of type `T` matching the specified data format, or `null` if none is present.
- `TryGetTextAsync()` returns a single `string` value matching the `DataFormat.Text` format, or `null` if none is present.
- `TryGetFileAsync()` returns a single `IStorageItem` object matching the `DataFormat.File` format, or `null` if none is present.
- `TryGetBitmapAsync()` returns a single `Bitmap` image matching the `DataFormat.Bitmap` format, or `null` if none is present.

When called on `IAsyncDataTransfer`, if multiple items match the requested format, the first is used.

In addition, the following extension methods exist only for `IAsyncDataTransfer`:
- `TryGetValuesAsync(DataFormat<T>)` returns multiple values of type `T` matching the specified data format, or an empty array if none is present.
- `TryGetFilesAsync()` returns multiple `IStorageItem` objects matching the `DataFormat.File` format, or an empty array if none is present.

### Implementation

#### DataTransfer & DataTransferItem

To provide values to write to the clipboard, both `IAsyncDataTransfer` and `IAsyncDataTransferItem` must be implemented.

Avalonia provides implementations of those interfaces with the `DataTransfer` and `DataTransferItem` types, respectively:
- The `DataTransfer` class is a list of items. It provides an `Add(DataTransferItem)` method used to add new items.
- The `DataTransferItem` class can be considered a dictionary of format and value pairs. It provides a `Set<T>(DataFormat, T)` method used to set the value for a given format.

Example:

```csharp
// Creates an item with both text and HTML formats.
var item = new DataTransferItem();
item.Set(DataFormat.Text, "From Avalonia!");
item.Set(DataFormat.CreateStringPlatformFormat("text/html"), "From <b>Avalonia</b>!");

// Adds the item to the DataTransfer.
var data = new DataTransfer();
data.Add(item);
```

The `Set<T>` method also has an overload `Set<T>(DataFormat, Func<T>)`, allowing the value to be provided lazily.

For convenience, `DataTransferItem` provides methods to set the value for common formats:
- `SetText(string)` sets a `string` value for the `DataFormat.Text` format.
- `SetFile(IStorageItem)` sets an `IStorageItem` object for the `DataFormat.File` format.
- `SetBitmap(Bitmap)` sets a `Bitmap` image for the `DataFormat.Bitmap` format.

Additionally, static factories exist to create items with a single format:
- `DataTransferItem.Create<T>(DataFormat<T>, T)` for a given format.
- `DataTransferItem.CreateText(string)` for the `DataFormat.Text` format.
- `DataTransferItem.CreateFile(IStorageItem)` for the `DataFormat.File` format.
- `DataTransferItem.CreateBitmap(Bitmap)` for the `DataFormat.Bitmap` format.

#### Custom

For advanced scenarios, you can implement `IAsyncDataTransfer` and `IAsyncDataTransferItem` manually. One possible use is to dynamically provide a variety of formats for a given item.

When writing the implementation, be certain that:
- [`DataTransfer` and `DataTransferItem`](#datatransfer--datatransferitem) are not enough for your needs.
- `IAsyncDataTransfer.Formats` contains the formats of all items, without duplicates.
- You are aware `IAsyncDataTransferItem.TryGetRawAsync()` can be called from any thread and does not use the dispatcher.
- You have considered implementing `IDataTransfer` and `IDataTransferItem`, as some platforms can only access the clipboard synchronously.

:::warning
`IAsyncDataTransferItem.TryGetRawAsync()` may or may not be called on the UI thread depending on the underlying platform. Do **not** call anything on the UI thread, including via `Dispatcher.Invoke/InvokeAsync`. Doing so will result in deadlocks!
:::