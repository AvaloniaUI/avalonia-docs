# Avalonia Docs Style Linter Checklist

Severity levels:
- `blocker`: must pass before publish.
- `major`: should pass; justify exceptions.
- `minor`: style drift warning.

## Checklist

| Rule ID | Severity | Scope | Pass criteria | Fail criteria |
|---|---|---|---|---|
| `STR-001` | blocker | all pages | Page has exactly one H1 (frontmatter `title` counts as H1 since Docusaurus renders it). No explicit `#` heading needed in body. | Missing frontmatter title, or both frontmatter title and explicit `# H1` (duplicate). |
| `STR-002` | major | new/updated pages | >=80% of headings are sentence case. | Page uses title-case heading system. |
| `STR-003` | blocker | tutorial | Contains `## Prerequisites` before first procedural section. | No prerequisites section in tutorial. |
| `STR-004` | major | reference | Contains `Syntax`, then return/value section, then `Remarks`. | Missing core sections or wrong order. |
| `STR-005` | major | all pages | Ends with navigation handoff section. | No `See also`, `Related content`, or `Next steps`. |
| `STR-009` | minor | all pages | Intro before first H2 is <=150 words. | Long preamble before first section. |
| `VOI-001` | major | tutorial, how-to, troubleshooting, migration | Uses `you`/`your` in task instructions. | Passive/impersonal voice only. |
| `VOI-002` | major | all pages | `we`/`our`/`us` is absent or very rare. | Frequent team-first narration. |
| `VOI-003` | minor | all pages | Intensifiers (`simply`, `obviously`, `just`) are rare. | Repeated intensifier usage. |
| `VOI-004` | major | release notes, migration | Roadmap terms include concrete context. | Vague future promises. |
| `MIC-001` | major | task pages | UI labels and click targets are **bolded**. | UI text unformatted in prose. |
| `MIC-002` | major | all pages | Code identifiers and literals use `backticks`. | Plain-text identifiers. |
| `MIC-003` | blocker | all pages with code | Every fenced block has language tag. | Untagged code fence. |
| `MIC-004` | major | all pages | Admonitions use `:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`. | Non-standard admonition or MS-style `> [!NOTE]`. |
| `MIC-005` | minor | task pages | Keyboard shortcuts use `<kbd>...</kbd>`. | Raw key names. |
| `TERM-001` | major | intros with acronyms | First mention expands acronym. | Acronym before expansion. |
| `TERM-002` | major | all pages | Uses `control` not `widget`. | Uses `widget` for UI components. |
| `TERM-003` | major | all pages | `must` for requirements; `should` for guidance. | `must` for optional advice. |
| `LINK-001` | blocker | all pages | No generic link labels (`click here`, `here`). | Generic link text. |
| `QUAL-001` | blocker | tutorial | Includes outcome verification step. | Tutorial ends without verification. |
| `QUAL-002` | major | troubleshooting, migration | Contains remediation and next-action pointer. | Only root cause, no action. |

## Automation notes

Fast automatable checks:
- H1 count (`STR-001`)
- Heading case analysis (`STR-002`)
- Prerequisites section presence (`STR-003`)
- Code fence language tags (`MIC-003`)
- Admonition syntax validation (`MIC-004`)
- Generic link label detection (`LINK-001`)
- Token frequency for `widget` (`TERM-002`)
- Intensifier frequency (`VOI-003`)
- `we`/`our`/`us` frequency (`VOI-002`)
- `<kbd>` presence for key names (`MIC-005`)
- Navigation handoff section (`STR-005`)
- Intro word count (`STR-009`)

Manual/semantic checks:
- UI label bolding (`MIC-001`)
- Code identifier backticks (`MIC-002`)
- Acronym expansion context (`TERM-001`)
- `must`/`should` intent correctness (`TERM-003`)
- Remediation quality (`QUAL-002`)
- Roadmap language context (`VOI-004`)
