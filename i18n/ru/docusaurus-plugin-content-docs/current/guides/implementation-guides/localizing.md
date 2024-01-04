---
id: localizing
title: Localizing using ResX
---

Localization is a crucial step in delivering a great user experience for a global audience. In .NET, the `ResXResourceReader` and `ResXResourceWriter` classes are used to read and write resources in an XML-based format (.resx). This guide will walk you through the process of localizing an Avalonia application using ResX files.

<GitHubSampleLink title="Localization" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/Localization/"/>


## Add ResX Files to the Project

Before localizing, you need to include ResX files for each language you want to support. For this guide, we'll consider three ResX files, one for each of the following cultures:

* `Resources.fil-PH.resx` (Filipino)
* `Resources.ja-JP.resx` (Japanese)
* `Resources.resx` (Default language, usually English)

Each ResX file will contain translated text that corresponds to the keys used in the application.

In this example, we added new files to the `Assets` folder. Since .NET generator creates namespaces depending on folder structure, it might be different for you.  

## Set the Culture

To use a specific language in the application, you need to set the current culture. This can be done in the `App.axaml.cs` file. The following example sets the culture to Filipino (`fil-PH`):

```cs title="App.xaml.cs"
public partial class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        // highlight-start
        Assets.Resources.Culture = new CultureInfo("fil-PH");
        // highlight-end
        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        {
            desktop.MainWindow = new MainWindow
            {
                DataContext = new MainWindowViewModel(),
            };
        }

        base.OnFrameworkInitializationCompleted();
    }
}
```
Replace "fil-PH" with the appropriate culture code as required.

## Use Localized Text in the View

To use the localized text in a view, you can refer to the resources statically in XAML:

```xml
<TextBlock Text="{x:Static assets:Resources.GreetingText}"/>
```

In the above example, `GreetingText` is the key that corresponds to a string in the ResX file. The `{x:Static}` markup extension is used to reference a static property that's been defined in a .NET class, which, in this case, is the resources file (`assets:Resources.GreetingText`).

That's it! You've now successfully localized your Avalonia application using ResX. By setting the culture to a different locale, you can display the user interface in the selected language, thereby creating an application that supports multiple languages and caters to a global audience.
