---
id: release-process
title: Release Process
---

import ReleaseGitTreeScreenshot from '/img/guides/developer-guides/release-process/image (4).png';
import ReleasePipelineScreenshot from '/img/guides/developer-guides/release-process/image (1).png';
import ReleaseBranchScreenshot from '/img/guides/developer-guides/release-process/image (11).png';
import ReleaseNugetBadgeScreenshot from '/img/guides/developer-guides/release-process/image (17) (1) (1) (1).png';
import ReleaseDeployScreenshot from '/img/guides/developer-guides/release-process/image (16).png';

* Create a branch named `release/0.10.2` for example. This branch should be level with the `master` commit that the release will be based on.
* Update the version number in the file `SharedVersion.props` i.e. `<Version>0.10.2</Version>`.
* Push the release branch.

If this is the first release of a major version change, i.e. `0.9.0` or `0.10.0` or the point at which breaking changes will start to be merged to `master` then before continuing we need to create a `stable/0.10.x` branch. This should be level with `master` at the same point that the `release/0.10.2`branched off from `master`

The git tree should now look like this:

<img className="center" src={ReleaseGitTreeScreenshot} alt="" />

* Now login at `dev.azure.com` to access the azure pipelines. Wait for the CI to finish the build.
* The package for `0.10.2` should now be on the `avalonia-all` nuget feed. You should run a due diligence test on this build to ensure you are happy with the release and the packages work.

:::danger
Don't assume the Nuget packages will work just because master was working. In the past some technical changes i.e. Strong Naming broke nuget packages.
:::

* Now click on "Releases" and select "Avalonia (master / release)" pipeline as shown below.

<img className="center" src={ReleasePipelineScreenshot} alt="" />

* On the release for your release branch `release/0.10.2` click on the badge for "Nuget Release"

<img className="center" src={ReleaseBranchScreenshot} alt="" />

<img className="center" src={ReleaseNugetBadgeScreenshot} alt="" />

* Then click on `Deploy`.

<img className="center" src={ReleaseDeployScreenshot} alt="" />

:::info
At this point the packages will deploy to Nuget, it can take between 10 and 20 minutes for them to be indexed and publicly available. [https://www.nuget.org/packages/Avalonia/](https://www.nuget.org/packages/Avalonia/)
:::

* Make a release on Github releases, this will set a tag named: `0.10.2` for you. You can add release notes here.
* Update the dotnet templates and visual studio plugin templates
* Announce on gitter, twitter, etc

:::info
Now that the release is done, it is important to understand the process for maintaining the stable branch. Please see [Maintaining stable branch guide](maintaining-stable-branch-pr-merge-process.md)
:::