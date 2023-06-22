---
description: CONCEPTS - Input
---

# Clipboard

_Avalonia UI_ gives you access to the target platform's clipboard via the `IClipboard` interface. You can get an instance of this interface for your application from the `Application.Current.Clipboard` property. For example:

```csharp
await Application.Current.Clipboard.SetTextAsync("Hello World!");
var text = await Application.Current.Clipboard.GetTextAsync();
```

You can store objects on the clipboard on some platforms. (This is not supported on Android or iOS). For example, on a Windows app:

```csharp title='C#'
private async Task DoClipboard()
{ 
    var person = new Person("Peter Griffin", 58);

    var dataObject = new DataObject();
    dataObject.Set("my-app-person", person);

    if (Application.Current != null 
        && Application.Current.Clipboard!=null)
    {
        await Application.Current.Clipboard
                .SetDataObjectAsync(dataObject);
        var storedPerson = (Person) 
            await Application.Current.Clipboard
                .GetDataAsync("my-app-person");
    }
}
```

```csharp title='Person.cs'
internal class Person
{
    public string Name { get; set; } = String.Empty;   
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```

Objects are stored and retrieved using a key (string) that must be unique to your application and object type.

## More Information

For the complete API documentation about this interface, see [here](http://reference.avaloniaui.net/api/Avalonia.Input.Platform/IClipboard/).
