---
id: build-and-run-your-application-on-a-simulator
title: How To Build and Run on the iOS Simulator
---

import IOSSimulatorScreenshot from '/img/guides/platforms/ios/run-ios-simulator.png';

# How To Build and Run on the iOS Simulator

Please ensure you have followed the guide [Building Cross-Platform Applications](../../building-cross-platform-applications).

Assuming you have created a project called `HelloWorld`. Enter the directory `HelloWorld.iOS` from the command line.

To build the project for iOS run the following command.

```bash
dotnet build
```

To run the project in a simulator, run the following command.

```bash
dotnet run
```

<img src={IOSSimulatorScreenshot} alt='Application running on iPad simulator'/>

If you use `JetBrains Rider` or `Visual Studio for Mac` you can open the solution and run, build and debug your program inside the simulator.
