---
id: release-process
title: How To Release Avalonia UI
---

# How To Release Avalonia UI

This guide shows you how to release a version of _Avalonia UI_. You **must** follow this procedure:

* [ ] Create a branch named `release/[Version]` where \[Version ] is `0.10.2` for example. This branch must be level with the master commit that the release is to be based on.
* [ ] Update the version number in the file <mark style="color:green;">**SharedVersion.props**</mark>. For example: `<Version>0.10.2</Version>`.
* [ ] Push the release branch.

If this is the first release of a major version change (zero minor version number - for example `0.9.0` or `0.10.0`) or the point at which breaking changes will start to be merged to the master branch, then before you continue you **must** create a stable branch for your release. The format for the name of this branch is `stable/0.10.x` where `0.10` is the major version number. This branch should be level with the master branch at the point that the `release/[Version]` version branched off from the master branch.

For an example`release/0.10.2` the git tree will now look like this:

<!-- ![](<../../../.gitbook/assets/image (4) (1) (1) (1).png>) -->

* [ ] Now login at [http://dev.azure.com](http://dev.azure.com) to access the _Avalonia UI_ Azure DevOps. Wait for build to finish on the new release.
* [ ] The package your new release will now be on the `avalonia-all` _NuGet_ feed. You should run a due diligence test on this build to ensure you are happy with the release and the packages work.

{% hint style="danger" %}
Do not assume the _NuGet_ packages will work just because master was working. In the past some technical changes, for example 'strong naming' have broken a NuGet package.
{% endhint %}

* [ ] Now click <mark style="color:green;">**Releases**</mark> and then the <mark style="color:green;">**Avalonia (master / release)**</mark> pipeline as shown below:

<!-- ![](<../../../.gitbook/assets/image (1) (1) (1).png>) -->

* [ ] Locate your release branch (for example `release/0.10.2` in the illustration below) and click  the badge <mark style="color:green;">**Nuget Release**</mark>

<!-- ![](<../../../.gitbook/assets/image (11) (1).png>) -->

<!-- ![](<../../../.gitbook/assets/image (17) (1) (1) (1).png>) -->

* [ ] Now click <mark style="color:green;">**Deploy**</mark>.

<!-- ![](<../../../.gitbook/assets/image (16) (1).png>) -->

{% hint style="info" %}
At this point the packages will deploy to NuGet, it can take between 10 and 20 minutes for them to be indexed and publicly available. Once deployed the package will be at  [https://www.nuget.org/packages/Avalonia/](https://www.nuget.org/packages/Avalonia/)
{% endhint %}

* [ ] Make a release on GitHub releases, this will set a tag named for your release version. In this example: `0.10.2` You should add release notes here.
* [ ] Update the .NET templates and Visual Studio plugin templates if necessary.
* [ ] Announce the release.

{% hint style="info" %}
Now that the release is done, it is important to understand the process for maintaining the stable branch. This is the subject of the next page.
{% endhint %}
