---
id: maintaining-stable-branch-pr-merge-process
title: Maintaining Stable Branch
---

:::warning
This Process MUST be followed during any period that `master` branch is allowing breaking changes.
:::

In order to maintain a stable branch it is required to follow a process on every PR that gets merged to ensure they are back ported.

:::warning
For a PR to be back ported it MUST reach the following criteria

* Contain no breaking API changes, (changing signatures, removing a method, etc)\
  Additional overloads, methods, classes and extension methods are allowable.
* Be suitable for the stable release, by default most changes and features should be considered.
:::

Provided the criteria are met:

1. Merge the PR to master generating a merge commit.&#x20;
2. i.e. "Merge pull request #5797 from AvaloniaUI/double-tapped-event-args"

At this point the git tree should look similar to this.

  <div style={{textAlign: 'center'}}>
    <img src="/img/guides/developer-guides/maintaining-stable-branch-pr-merge-process/image (6).png" />
  </div>

Now we need to get the new PR merged into the stable branch.

:::warning
Pay careful attention here, we don't just merge into the stable branch!
:::

* Checkout the `stable/0.10.x` branch.
* Cherrypick the merge commit from master.

The git tree should look like this now.

  <div style={{textAlign: 'center'}}>
    <img src="/img/guides/developer-guides/maintaining-stable-branch-pr-merge-process/image (13).png" />
  </div>

Please also use the `backport-candidate` and `backported 0.10.x` labels on the PRs themselves.