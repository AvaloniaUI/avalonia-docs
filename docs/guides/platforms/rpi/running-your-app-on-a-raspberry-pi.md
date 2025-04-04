---
id: running-your-app-on-a-raspberry-pi
title: Running on Raspberry Pi
---

# Running on Raspberry Pi

### Step 1

Flash 8GB SD Card with Raspbian Stretch (2018-11-13). `balenaEtcher` is a nice tool for that.

Plug in the card and start the `Raspberry Pi`.

You can follow [this guide](https://blogs.msdn.microsoft.com/david/2017/07/20/setting_up_raspian_and_dotnet_core_2_0_on_a_raspberry_pi/), next steps are summarized below.

### Step 2

* Install `curl`, `libunwind8`, `gettext` and `apt-transport-https`. The `curl` and `apt-transport-https` often are up-to-date.

```bash
sudo apt-get install curl libunwind8 gettext apt-transport-https
```

* Download tar-ball.

```bash
curl -sSL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Runtime/release/2.0.0/dotnet-runtime-latest-linux-arm.tar.gz
```

* Unpack tarball to `/opt/dotnet`.

```bash
sudo mkdir -p /opt/dotnet && sudo tar zxf dotnet.tar.gz -C /opt/dotnet
```

* Link `dotnet` binary.

```bash
sudo ln -s /opt/dotnet/dotnet /usr/local/bin
```

Alternative: You can login as superuser (run "sudo su")

```bash
apt-get -y install curl libunwind8 gettext apt-transport-https
curl -sSL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Runtime/release/2.0.0/dotnet-runtime-latest-linux-arm.tar.gz
mkdir -p /opt/dotnet && sudo tar zxf dotnet.tar.gz -C /opt/dotnet
ln -s /opt/dotnet/dotnet /usr/local/bin
```

> Note: Take care of line endings of the script. It should use `LF` instead of `CR LF`. Save the script as `.sh` file and run it on the `Raspberry Pi` with bash `filename.sh`.

### Step 3

* To run an `Avalonia` application on `Raspberry Pi` you need to use this nuGet package:

[SkiaSharp.NativeAssets.Linux](https://www.nuget.org/packages/SkiaSharp.NativeAssets.Linux/)

It includes the `libSkiaSharp.so`.

* Now publish the app with the following command:

```bash
dotnet publish -r linux-arm -f netcoreapp2.0
```

* Copy publish directory to the `Raspberry Pi` and run it with `dotnet publish/ApplicationName.dll`
