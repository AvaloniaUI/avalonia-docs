---
id: how-to-use-web-assembly
title: Web Assembly
---


# 👉 Web Assembly

在浏览器中使用WebAssembly

1. 安装 `wasm-tools` 工作负载工具。请参阅 [dotnet 文档](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install)，如果你安装了旧版的.NET SDK，它可能会要求你安装其他工作负载，比如 `wasm-experimental`。

```bash
dotnet workload install wasm-tools
```

2. 安装或更新dotnet模板到最新版本。

```bash
dotnet new install avalonia.templates
```

3. 创建一个新目录用于项目。

```bash
mkdir BrowserTest
cd BrowserTest
```

4. 生成一个支持在浏览器中运行的新项目。

```bash
dotnet new avalonia.xplat
```

5. 为了运行，请执行以下操作：

```bash
cd BrowserTest.Browser
dotnet run
```

6. 在控制台输出中，您将看到打开应用程序的HTTP和HTTPS链接。

## 互操作性

可以从Avalonia Web应用程序调用JavaScript代码。Avalonia应用程序与Microsoft的标准 **\[JSImport]/\[JSExport]** 互操作性兼容。您可以在 [它们的文档](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop?view=aspnetcore-7.0) 上找到更多信息。

## 传统的Blazor后端

从Avalonia 11.0 开始，[Avalonia.Browser](https://www.nuget.org/packages/Avalonia.Browser/) 包依赖于内置的.NET互操作性，具有更好的稳定性和性能。传统的Blazor后端仍然可用于兼容性，并且可以通过引用 [Avalonia.Browser.Blazor](https://www.nuget.org/packages/Avalonia.Browser.Blazor/) 包来使用。

## 故障排除

如果您尚未执行安装所需工作负载的步骤，后续在浏览器中运行应用程序时将可能遇到错误（例如 `System.DllNotFoundException: libSkiaSharp`），您需要重新构建才能运行该应用程序。

请记住，WebAssembly 作为一种技术总体上是有限的。任何浏览器都不支持 .NET 多线程，只从 .NET 8 开始才支持多线程。任何普通应用程序都必须遵守浏览器沙盒机制。虽然 Avalonia 会尽力保持高性能，但在某些情况下，任何 WebAssembly GUI应用程序的运行速度都可能较慢，或者在使用旧版浏览器时也是如此。
