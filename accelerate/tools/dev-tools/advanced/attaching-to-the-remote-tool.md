# Attaching to the remote tool

`Developer Tools` can be connected to applications running on different machines. This guide covers two scenarios:
1. Local network access (e.g., Virtual Machines or devices on same Wi-Fi)
2. Internet access using VPN (recommended for security)

`Developer Tools` runs an HTTP server on port `29414`. The key is ensuring this server is accessible from the connecting machine.

## Local Network access

1. Retrieve local-network IP address of the machine running `Developer Tools`:
- Windows: Open Command Prompt and run `ipconfig`
- macOS/Linux: Open Terminal and run `ip addr` or `ifconfig`
  Look for IPv4 address that starts with:
- `192.168.` (most home networks)

2. Configure your application to use this IP:

```csharp
this.AttachDeveloperTools(o =>
{
    o.Protocol = DeveloperToolsProtocol.CreateHttp(IPAddress.Parse("YOUR_LOCAL_NETWORK_HOST_IP"));
});
```
3. Start `Developer Tools` (via avdt command)
4. In the settings, make sure that `Allow Any IP` is enabled (if not, you would need to restart the app)
5. Launch your application on second machine press `F12` to connect.

:::note

Ensure firewalls on both machines allow port 29414

:::

## Internet access via VPN

While it's possible to avoid VPN, and just setup port forwarding on the public network, it's not recommended. Keeping ports opened is generally considered a bad practice.

Instead, this tutorial will use VPN to setup a limited access between machines, specifically `Tailscape` will be used as one of the simplest options.
Also ensure that `Tailscape CLI` can be used on the machine with developer tools. See [Tailscale CLI](https://tailscale.com/kb/1080/cli) for reference.

1. Please follow `Tailscape` [Quick Start guide](https://tailscale.com/kb/1017/install) to install it on both machines, and setup access between them. We will specifically focus on `MagicDNS` feature.
2. Once `Tailscape` is installed and connected on both devices, it's necessary to serve our `29414` port from the machine with installed `Developer Tools`. Run
   `tailscale serve 29414`
   or
   `/Applications/Tailscale.app/Contents/MacOS/Tailscale serve 29414` on macOS
   CLI will output something similar to:

```bash
Available within your tailnet:

https://machinename.tail.ts.net/
|-- proxy http://127.0.0.1:29414

Press Ctrl+C to exit.
```

This `https://machinename.tail.ts.net/` is the most important part here which is going to be used in the next step.

3. Use URL from the previous step in your `AttachDeveloperTools` options:

```csharp
this.AttachDeveloperTools(o =>
{
    o.Protocol = DeveloperToolsProtocol.CreateHttp(new Uri("https://machinename.tail.ts.net"));
});
```

4. Start `Developer Tools` (via avdt command)
5. Launch your application on second machine press `F12` to connect.

![Connected via VPN](../../../../static/img/dev-tools/remote-connect-via-vpn.png)


## Changing default port

Under some conditions, `29414` default port might not be available.

To change the port, both `Developer Tools` and `AttachDeveloperTools` needs to be adjusted.

On `Developer Tools`, change `HTTP port` parameter on the settings page and restart the app. See [Settings](../settings.md) for more details.

On `AttachDeveloperTools` side, specify new port in the `DeveloperToolsProtocol.CreateHttp` method as an optional parameter.
