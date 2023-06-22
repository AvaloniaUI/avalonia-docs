---
id: clipboard
title: Clipboard
---

Avalonia provides access to the Clipboard via the `IClipboard` interface. You can get an instance of this interface for the current Application with `Application.Current.Clipboard`.

```csharp
await Application.Current.Clipboard.SetTextAsync("Hello World!");

var text = await Application.Current.Clipboard.GetTextAsync();
```

You can also store objects in the Clipboard but this is not supported on Android and iOS.

```csharp
record Person(string Name, int Age);

var person = new Person("Peter Griffin", 58);

var dataObject = new DataObject();
dataObject.Set("my-app-person", person);

await Application.Current.Clipboard.SetDataObjectAsync(dataObject);

var storedPerson = (Person) await clipboard.GetDataAsync("my-app-person");
```

Objects are stored and retrieved with a format string that should be unique to your Application and object type.

### Reference

[IClipboard](http://reference.avaloniaui.net/api/Avalonia.Input.Platform/IClipboard/)

### Source code

- [IClipboard.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Input/Platform/IClipboard.cs)
- [Avalonia.Win32/ClipboardImpl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Windows/Avalonia.Win32/ClipboardImpl.cs)
- [Avalonia.X11/X11Clipboard.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.X11/X11Clipboard.cs)
- [Avalonia.Native/ClipboardImpl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Native/ClipboardImpl.cs)
- [Avalonia.Android/Platform/ClipboardImpl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Android/Avalonia.Android/Platform/ClipboardImpl.cs)
- [Avalonia.iOS/ClipboardImpl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/iOS/Avalonia.iOS/ClipboardImpl.cs)