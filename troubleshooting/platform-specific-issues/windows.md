---
id: windows
title: Windows issues
sidebar_label: Windows
---

## Packaging and signing

#### Signed executable still triggers SmartScreen warnings

This is normal for new certificates and applications. Different certificate types have different trust timelines:
- **EV Certificates & Microsoft Trusted Signing**: Immediate SmartScreen bypass
- **OV Certificates**: Require reputation building (typically 3-6 months of consistent distribution)

#### Azure authentication failures

1. Verify environment variables are set correctly: `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`
2. Consider installing [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) and folowing [az login](https://learn.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az-login) flow.
