---
description: REFERENCE
---

# JetBrains Rider Setup

To set up _JetBrains Rider_ for developing with _Avalonia UI,_ follow this procedure:&#x20;

* [ ] Download and install the .NET SDK of your choice from _Microsoft_. This contains the runtime, development kit (compiler, etc) that is used to build _Avalonia UI_ applications.
* [ ] Install the _Avalonia UI_ templates by running the command `dotnet new install Avalonia.Templates` from the command prompt on your machine.&#x20;

{% hint style="info" %}
For the latest .NET SDK downloads, see [here](https://dotnet.microsoft.com/download).
{% endhint %}

{% hint style="info" %}
For SDK versions before .NET 7, you will need to run the command `dotnet new -i Avalonia.Templates`&#x20;
{% endhint %}

The output will look similar to this.

```bash
$ dotnet new install Avalonia.Templates
  Determining projects to restore...
  Restored /Users/danwalmsley/.templateengine/dotnetcli/v5.0.200/scratch/restore.csproj (in 706 ms).

Templates                                     Short Name            Language    Tags
.....

Avalonia Resource Dictionary                  avalonia.resource                 ui/xaml/avalonia/avaloniaui
Avalonia Styles                               avalonia.styles                   ui/xaml/avalonia/avaloniaui

Examples:
    dotnet new mvc --auth Individual
    dotnet new mstest
    dotnet new --help
    dotnet new avalonia.mvvm --help
$
```

{% hint style="info" %}
To download _JetBrains Rider,_ see [here](https://www.jetbrains.com/rider/).&#x20;
{% endhint %}

Rider will give you the very best development experience available for _Avalonia UI_. It is available for Windows, Linux, and macOS. Rider supports XAML out of the box. However, if you want to use the XAML previewer, you will need the Avalonia plugin.

## Install the Avalonia Plugin

Once Rider loads you will see the <mark style="color:green;">**Welcome to JetBrains Rider**</mark> screen.&#x20;

* [ ] Click <mark style="color:green;">**Configure**</mark>, and then click <mark style="color:green;">**Plugins**</mark> on the dropdown menu.

![](../../.gitbook/assets/jetbrains-rider-setup-1-rider-welcome.png)

The <mark style="color:green;">**Preferences**</mark> screen will open.&#x20;

* [ ] Click the settings (gear wheel) icon and then click <mark style="color:green;">**Manage Plugin Repositories...**</mark> on the popup menu.

![](../../.gitbook/assets/jetbrains-rider-setup-2-configure-plugin-repos.png)

* [ ] In the <mark style="color:green;">**Custom Plugin Repositories**</mark> dialog, click the plus (+) icon and enter the URL `https://plugins.jetbrains.com/plugins/dev/14839`, and then click <mark style="color:green;">**OK**</mark>.

![](../../.gitbook/assets/jetbrains-rider-setup-3-enter-plugin-repo.png)

* [ ] Back at the Preferences window, click <mark style="color:green;">**Marketplace**</mark> enter 'Avalonia' in the search. Click <mark style="color:green;">**AvaloniaRider**</mark> when it appears in the search results pane, then click <mark style="color:green;">**Install**</mark>.&#x20;

![](../../.gitbook/assets/jetbrains-rider-setup-4-plugin-install.png)

* [ ] After the installation has completed, click <mark style="color:green;">**Restart IDE**</mark> (button appears).

&#x20;Now _JetBrains Rider_ is ready to develop _Avalonia UI_ applications.
