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
| `VOI-002` | major | all except tutorial | `we`/`our`/`us` is absent or very rare. Tutorials excluded: Diataxis prescribes `we` for instructor-learner bond. | Frequent team-first narration (non-tutorial pages). |
| `VOI-003` | minor | all pages | Intensifiers (`simply`, `obviously`, `just`) are rare. | Repeated intensifier usage. |
| `VOI-004` | major | release notes, migration | Roadmap terms include concrete context. | Vague future promises. |
| `MIC-001` | major | task pages | UI labels and click targets are **bolded**. | UI text unformatted in prose. |
| `MIC-002` | major | all pages | Code identifiers and literals use `backticks`. | Plain-text identifiers. |
| `MIC-003` | blocker | all pages with code | Every fenced block has language tag. | Untagged code fence. |
| `MIC-004` | major | all pages | Admonitions use `:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`. | Non-standard admonition or MS-style `> [!NOTE]`. |
| `MIC-005` | minor | task pages | Keyboard shortcuts use `<kbd>` tags with platform symbols (e.g., `<kbd>⌘</kbd> <kbd>S</kbd>`). | Plain text like "Cmd+S" or raw symbols without `<kbd>` wrapper. |
| `TERM-001` | major | intros with acronyms | First mention expands acronym. | Acronym before expansion. |
| `TERM-002` | major | all pages | Uses `control` not `widget`. | Uses `widget` for UI components. |
| `TERM-003` | major | all pages | `must` for requirements; `should` for guidance. | `must` for optional advice. |
| `LINK-001` | blocker | all pages | No generic link labels (`click here`, `here`). | Generic link text. |
| `QUAL-001` | blocker | tutorial | Includes outcome verification step. | Tutorial ends without verification. |
| `QUAL-002` | major | troubleshooting, migration | Contains remediation and next-action pointer. | Only root cause, no action. |
| `TONE-001` | blocker | all pages | No banned marketing buzzwords (powerful, seamless, elegant, cutting-edge, etc.). | Marketing language in documentation. |
| `TONE-002` | blocker | all pages | Superlatives have measurable evidence in same sentence/paragraph. | Unsupported claims (the fastest, the best, unmatched). |
| `TONE-003` | major | all pages | Page describes behavior, not why reader should be excited. | Promotional framing or feature-selling language. |
| `TONE-004` | major | all pages | Future-tense claims include version, issue link, or timeline. | Vague future promises without concrete context. |
| `BOUND-001` | major | all pages | Page content aligns with one declared doc-type. | Mixed-purpose page spanning multiple Diataxis types. |
| `BOUND-002` | major | all pages | No content forbidden for the page's declared doc-type. | Contains content that belongs in a different page type. |
| `BOUND-003` | major | non-reference pages | Inline property/API lists limited to 3 items; larger sets link to reference. | Duplicated property tables instead of linking to reference. |
| `BOUND-004` | major | explanation | No numbered procedural sequences longer than 3 steps. | Extended procedure in an explanation page. |
| `BOUND-005` | major | all pages | Frontmatter includes `doc-type` field with valid value. | Missing `doc-type` in frontmatter. |
| `ACC-001` | major | all pages | All images have non-empty alt text. | `![](path)` with empty alt text. |
| `SEO-001` | major | all pages | Frontmatter `description` present, 50-160 characters, no marketing buzzwords. | Missing or malformed meta description. |
| `SEO-002` | minor | all pages | Frontmatter `title` is <= 60 characters. | Title too long for search result display. |
| `TERM-004` | major | tutorial, overview | Avalonia jargon explained inline or linked on first use. | Framework-specific terms used without introduction on introductory pages. |
| `QUAL-003` | minor | task pages | Average sentence length <= 25 words; no sentences over 40 words. | Dense, complex sentences on action-oriented pages. |
| `QUAL-004` | minor | all pages | ARI score <= 14 (college senior level) calculated over prose only, excluding code blocks and inline code. | ARI score > 14 indicates excessively dense prose. |
| `INC-001` | major | all pages | Text uses gender-neutral pronouns (they/them/their) and nouns; avoids gendered generic references and terms like "guys", "mankind", "man-hours". | Gendered pronouns (he/she/him/her) as generic references; "guys" as group address; "mankind", "manmade", "man-hours". |
| `INC-002` | major | all pages | Text uses inclusive technical terminology: "blocklist"/"allowlist", "primary"/"replica", "verify"/"check", "placeholder"/"sample". | Legacy terms: "blacklist"/"whitelist", "master"/"slave" in role context, "sanity check", "dummy" as example data. |
| `ACCU-001` | blocker | all pages | All API names, property names, method signatures, event names, enum values, and behavioral claims are verified against actual Avalonia source or documentation. No fabricated technical details. | Any technical detail that cannot be verified, or that is invented/guessed/hallucinated. |
| `ACCU-002` | blocker | all pages | Existing code snippets (fenced and inline) are preserved exactly as-is unless the user expressly asked for code changes. | Code snippets silently modified during lint/review without explicit user authorization. |
| `ACCU-003` | blocker | all pages | All API references validated against the Avalonia API reference using `lookup_avalonia_api` MCP tool. Every class, property, method, event, or enum value mentioned must be confirmed to exist. | API reference that cannot be validated via `lookup_avalonia_api`, or assumed to exist without verification. |

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
- `we`/`our`/`us` frequency (`VOI-002`, skip for tutorials)
- `<kbd>` presence for key names (`MIC-005`)
- Navigation handoff section (`STR-005`)
- Intro word count (`STR-009`)
- Marketing buzzword scan (`TONE-001`)
- Superlative detection (`TONE-002`, partial: detects terms but evidence check is manual)
- `doc-type` frontmatter presence (`BOUND-005`)
- Image alt text presence (`ACC-001`)
- Frontmatter `description` presence and length (`SEO-001`)
- Frontmatter `title` length (`SEO-002`)
- Sentence length statistics (`QUAL-003`, partial: word counts are automatable but flagged sentences need human review for splitting)
- ARI score calculation (`QUAL-004`: fully automatable once prose is isolated; requires stripping code blocks, inline code, and frontmatter before counting)

Partial automatable checks (term scan is fast; context judgment is manual):
- Gendered pronoun and gendered noun scan (`INC-001`)
- Legacy technical term scan (`INC-002`)

MCP-assisted checks (require Avalonia Docs MCP server):
- API reference validation (`ACCU-003`: use `lookup_avalonia_api` to verify every class, property, method, event, and enum value referenced in the page)

Manual/semantic checks:
- No fabricated technical details (`ACCU-001`: verify all API and behavioral claims against source or documentation)
- Code snippet preservation (`ACCU-002`: ensure no code blocks are modified without explicit user request)
- UI label bolding (`MIC-001`)
- Code identifier backticks (`MIC-002`)
- Acronym expansion context (`TERM-001`)
- `must`/`should` intent correctness (`TERM-003`)
- Remediation quality (`QUAL-002`)
- Roadmap language context (`VOI-004`)
- Promotional framing (`TONE-003`)
- Vague future promises (`TONE-004`)
- Single Diataxis responsibility (`BOUND-001`)
- Forbidden content for doc-type (`BOUND-002`)
- Property list duplication (`BOUND-003`)
- Procedural steps in explanation pages (`BOUND-004`)
- Framework jargon explanation on introductory pages (`TERM-004`)
