---
id: faq
title: FAQ
---

## General

#### Do I need a license to use Avalonia?

No. **Avalonia UI itself remains entirely open-source under the MIT license.** You can build and ship commercial applications with Avalonia completely free, forever. The Community License only applies to the professional tooling (Visual Studio extension, Dev Tools, Parcel), not the framework itself.

#### What if I don't want any of this?

That's completely fine. All the legacy tooling remains open-source and available on GitHub:
- The existing Visual Studio extension
- Dev Tools
- TreeDataGrid

You can continue using them as they are today, or fork and maintain them independently if you prefer.

#### Can I continue using the legacy tools?

Yes. The legacy FOSS Visual Studio extension remains available to clone and build at [github.com/AvaloniaUI/AvaloniaVS](https://github.com/AvaloniaUI/AvaloniaVS). The legacy Dev Tools source remains available. The original TreeDataGrid remains available. All are MIT licensed and can be used, forked, or maintained by anyone.

#### When does my Community License expire?

Community Licenses do not expire as long as you remain eligible. However, if your circumstances change (e.g., your organization grows beyond the eligibility thresholds), you must upgrade to a paid license.

#### What happens after the Visual Studio grace period?

After April 13th 2026, if you haven't registered for a Community License or purchased a paid license, you can:
- Continue using the legacy FOSS Visual Studio extension
- Switch to Visual Studio Code or JetBrains Rider (extensions remain freely available)
- Register for a Community License if eligible
- Purchase a paid license

#### I have another question. Where can I ask?

Feel free to leave your questions or feedback on [Community Hub](https://avaloniaui.community/dev-tools-hvq32ub8) and [Avalonia Support](https://support.avaloniaui.net/).

## Developer tools

#### Is it possible to connect multiple instances to the Developer Tools?

Yes, while a single instance of Developer Tools is running and activated, you can connect one or many apps to it.
Each new connection will open a new Developer Tools window, working independently from each other.

#### Does it work with Browser/Android/iOS?

It does work with mobile and browser applications.
See [Attaching Browser or Mobile application](/docs/development-optimization/developer-tools/attaching-applications) for more details.

#### Can I use Developer Tools and DiagnosticsPackage with NativeAOT app?

Yes. DiagnosticsPackage is fully trimming friendly. Even though it does use reflection, the tool was tested with AOT.

#### Does `AvaloniaUI.DiagnosticsSupport` replace `Avalonia.Diagnostics` package? Or do I need both?

You only need `AvaloniaUI.DiagnosticsSupport`.
`Avalonia.Diagnostics` is an old package used for legacy developer tools. It can be safely removed from the project.
If for some reason necessary, both packages can be referenced, but you might want to setup different gestures for each tool.

#### Can everybody build project referencing `AvaloniaUI.DiagnosticsSupport`, even without a license?

Yes, `AvaloniaUI.DiagnosticsSupport` is an integration package, a bridge between `Developer Tools` and user app. On its own, it doesn't require any license, and can be referenced in public projects.

But to actually open `Developer Tools`, you would need the license and Avalonia portal account.

#### Is it necessary to exclude `AvaloniaUI.DiagnosticsSupport` package from Release/Production build?

Tool can be useful for internal testing of Release builds. And it's not necessary to only include it with Debug builds.

Unlike the legacy Avalonia DevTools, this package is not shipped with heavy dependencies that might break Release compilation.

But it is still advised to exclude this package on production builds for security and bundle size reasons.

To do that, `Condition="'$(Configuration)' == 'Debug'"'` can be used:
```xml
<PackageReference Include="AvaloniaUI.DiagnosticsSupport" Version="" Condition="'$(Configuration)' == 'Debug'" />
```

Combined with `#if DEBUG` for the `this.AttachDeveloperTools()` or `.WithDeveloperTools()`.

#### Are arm64 and x86 builds of the tool available or planned?

Only **x64** builds for Windows and Linux are available at the moment.
macOS build is an universal bundle with both **x64** and **arm64** architectures.

## TreeDataGrid

### Data Updates

#### TreeDataGrid doesn't update when I change model properties

**Problem**: You're modifying properties on your data objects, but the grid doesn't reflect the changes.

**Solution**: Your data model must implement `INotifyPropertyChanged`. The TreeDataGrid relies on property change notifications to update the UI.

```csharp
// ❌ Wrong - No property change notifications
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// ✅ Correct - Implements INotifyPropertyChanged
public class Person : INotifyPropertyChanged
{
    private string _name;
    private int _age;

    public string Name
    {
        get => _name;
        set
        {
            if (_name != value)
            {
                _name = value;
                OnPropertyChanged();
            }
        }
    }

    public int Age
    {
        get => _age;
        set
        {
            if (_age != value)
            {
                _age = value;
                OnPropertyChanged();
            }
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

#### New items don't appear when I add them to the collection

**Problem**: You're adding items to a `List<T>` or array, but the grid doesn't show new items.

**Solution**: Use `ObservableCollection<T>` instead, which automatically notifies the grid of collection changes.

```csharp
// ❌ Wrong - List doesn't notify of changes
private List<Person> _people = new List<Person>();

// ✅ Correct - ObservableCollection notifies of changes
private ObservableCollection<Person> _people = new ObservableCollection<Person>();
```

### Cell Editing

#### Cell editing doesn't work when I click on cells

**Problem**: Clicking cells doesn't begin editing.

**Solution**: Make sure you've provided both a getter and setter in the column definition:

```csharp
// ❌ Wrong - No setter, column is read-only
new TextColumn<Person, string>("Name", x => x.Name)

// ✅ Correct - Has both getter and setter
new TextColumn<Person, string>(
    "Name",
    x => x.Name,
    (row, value) => row.Name = value)
```

You may also need to specify the edit gesture:

```csharp
new TextColumn<Person, string>(
    "Name",
    x => x.Name,
    (row, value) => row.Name = value,
    options: new TextColumnOptions<Person>
    {
        BeginEditGestures = BeginEditGestures.Tap
    })
```

## WebView

#### Is offscreen rendering supported? To avoid airspace issue?

No, offscreen rendering is not currently supported. However, we are considering it as an optional feature for future releases.

#### Why is NativeWebView control not supported on Linux?

`NativeWebView` requires a system browser that can be embedded into Avalonia. Unlike Windows and macOS, Linux has more complex native control embedding, which doesn't work reliably on Wayland-based desktop environments.

**Recommended Solution:** Design your app with `NativeWebDialog` as a fallback. This component provides a similar API to `NativeWebView` but operates in a dedicated window.

#### Can I use WebAuthenticationBroker for Google Auth or Microsoft.Identity Auth?

Yes, both authentication providers are supported. You can either:
- Build request and redirect `Uri`s manually
- Integrate with `Google.Apis.Auth` and `Microsoft.Identity.Client` NuGet packages

Integration samples are available in our [sample repository](https://github.com/AvaloniaUI/Accelerate.Samples/tree/main/WebAuthenticationBrokerSample/WebAuthenticationBrokerSample).

#### Why use WebAuthenticationBroker over other options?

While `Microsoft.Identity.Client` and `Google.Apis.Auth` include their own Web-UI dialogs, these are limited to specific platforms and providers. WebAuthenticationBroker offers:
- Provider-independent implementation
- Desktop platform support without special framework requirements
- Full macOS support without mac-catalyst limitations

#### Does NativeWebView support camera/microphone/screenshare access via getUserMedia() API?

Yes, `getUserMedia()` API is supported across platforms. Users will receive permission prompts for camera, microphone, or screen sharing access, similar to desktop browsers. macOS support was added in version `11.2.4`.

Some platforms also require developer to configure permissions on the application bundle. If any particular permission is necessary for a main application, it's likely to be necessary for a web view. For example, [NSCameraUsageDescription](https://developer.apple.com/documentation/bundleresources/information-property-list/nscamerausagedescription?language=objc) is necessary for macOS/iOS on bundled apps.
