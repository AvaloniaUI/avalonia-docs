---
id: debugging-previewer
title: Debugging Previewer
---

By default, even if you would put a breakpoint in Avalonia main repo directly it would not be hit when Previewer executes this code. This is because Previewer is a completely different process usually run by IDE.

**Debugging with JetBrains Rider**

First of all to debug previewer process you will need to attach debugger to the process. To do that you may use Ctrl+Alt+P shortcut or click "..." button and then click "Attach to the Process".

![image](https://github.com/AvaloniaUI/avalonia-docs/assets/53405089/767a290d-905a-483d-bfa4-e8ee918c6bca)

Then in the search field you will need to type Avalonia and find this process,you may identify it by the Avalonia.Designer.HostApp.dll in the name.

![image](https://github.com/AvaloniaUI/avalonia-docs/assets/53405089/bf29bb6a-76a3-4290-944c-be06e2cb0eb4)

Then you click "Attach with .NET Core Debugger" and after that by using "Search everywhere" Rider feature you may place breakpoints in the previewer code and debug it.


**Debugging with Visual Studio**

To start debugging you would need a process ID. To get it you need to switch the output to Avalonia Diagnostics. Then you copy the number before the "Connection initialized" message. This number is the previewer process ID.
![image](https://github.com/AvaloniaUI/avalonia-docs/assets/53405089/0b77cb87-2454-458e-9722-0659525feeb9)


Then you may find process by the process id in the process explorer or some other program and attach the debugger manually.

![image](https://github.com/AvaloniaUI/avalonia-docs/assets/53405089/2c50bf8d-047c-481c-af01-00474acc73fe)


When you know the process id you can simply click "Debug" in process explorer. But sometimes previewer process may crash even before you would attach your debugger. Then you will need to add this code th the Main method in the Program.cs.

```csharp
Debugger.Launch();
while (!Debugger.IsAttached)
  Thread.Sleep(100);
```

This code will attach debugger to the previewer programmatically.

But if you need to place breakpoints in the previewer code you may need to use [dnSpy](https://github.com/dnSpy/dnSpy) or something similar because Visual Studio doesen't support that.

**How would I understand that I have launched a debugger?**

You should see a window like this.

  <div style={{textAlign: 'center'}}>
    <img src="/img/guides/developer-guides/debugging-previewer/132686320-958f30a6-49f8-498f-853c-b9dd17262b54.png" />
  </div>
