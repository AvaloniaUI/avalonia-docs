---
id: maintaining-stable-branch-pr-merge-process
title: How To Maintain a Stable Branch
---

# How To Maintain a Stable Branch

This guide describes how to deal with merging pull requests while maintaining a stable branch.

{% hint style="warning" %}
This process **must** be followed during any period that the master branch is allowing breaking changes.
:::

In order to maintain a stable branch, you are required to follow this process on **every** pull request that is merged, to ensure they can be backported correctly.

{% hint style="warning" %}
For a pull request to be backported it **must** meet the following criteria:

* Contain no API changes that will break compatibility (i.e. changing signatures, removing a method, etc.). Additional overloads, methods, classes and extension methods are allowable.
* Be suitable for the stable release, by default most changes and features will be considered.
:::

Provided the above criteria are met, follow this procedure: merge the pull request to the master branch - generating a merge commit. For example:

```
merge pull request #5797 from feature/my-new-feature
```

Now the git tree should look something like this:

<!-- ![](<../../../.gitbook/assets/image (6) (1) (1) (1).png>) -->

Now we need to get the new pull request merged into the stable branch.

{% hint style="warning" %}
Pay careful attention here, we do not simply merge into the stable branch!
:::

* Checkout the stable branch (example: `stable/0.10.x`).
* Cherry-pick the merge commit from the master branch.

The git tree should look like this now.

<!-- ![](<../../../.gitbook/assets/image (13) (1).png>) -->

{% hint style="warning" %}
Please also always add the labels `backport-candidate` and `backported [version]` to the pull requests themselves.&#x20;

Where `[version]` is `0.10.x` for example.
:::

