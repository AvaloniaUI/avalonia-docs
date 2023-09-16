---
info: build-and-run-your-application-on-a-simulator
title: Build and run your application on a Simulator
---

import SimulatoriPadScreenshot from '/img/tutorials/developing-for-mobile/ios/build-and-run-your-application-on-a-simulator/image (34).png';

Please ensure you have followed the guide [create-a-cross-platform-solution.md](../create-a-cross-platform-solution.md "mention").

Assuming you have created a project called `HelloWord`. Enter the directory `HelloWorld.iOS` from the command line.

To build the project for iOS run the following command.

```bash
dotnet build
```

To run the project in a simulator, run the following command.

```bash
dotnet run
```

<img className="center" src={SimulatoriPadScreenshot} alt="Application running on iPad simulator" />

If you use `JetBrains Rider` or `Visual Studio for Mac` you can open the solution and run, build and debug your program inside the simulator.