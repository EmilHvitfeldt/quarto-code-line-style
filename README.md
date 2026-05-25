# code-style

A Quarto extension that applies **named visual treatments** to regions of
code blocks — lines, columns, or regex tokens — optionally stepped through
reveal.js fragments. Diff is a built-in preset; custom styles are one
cell-option away.

## Install

```bash
quarto add EmilHvitfeldt/quarto-code-diff
```

## Use

```yaml
---
format: code-style-revealjs
---
```

```` markdown
```{.r data-code-style="add:2-3, rem:5"}
df |>
  filter(cyl == 6) |>
  group_by(gear) |>
  summarise(m = mean(mpg)) |>
  arrange(desc(m))
```
````

## Examples

The [overview deck](index.html) links into focused example decks under
[`examples/`](examples/). Each demonstrates one concept end-to-end:

- **diff** — the 5 built-in styles (add / rem / chg / note / hi)
- **emphasis** — focus / dim / strong
- **custom-styles** — define your own styles inline
- **transitions** — timing, named modes, presence (enter / exit)
- **tokens** — regex and column targeting
- **annotations** — margin labels on a leader line
- **html-format** — non-revealjs output

## Spec cheatsheet

**Compact attribute (static blocks):**

```
{.r data-code-style="add:2-3, rem:5"}                # static
{.r data-code-style="|hi:2|rem:3,add:4-7|hi:8"}      # progressive
```

**YAML cell option (executable cells):**

```yaml
#| code-style:
#|   preset: emphasis
#|   styles:
#|     warn: { bg: "#fff3bf", gutter: "#f08c00", marker: "!" }
#|   transition: { duration: 400, mode: slide }
#|   steps:
#|     - focus: 3
#|     - warn: { line: 4, match: "bug", label: "this one" }
```

## Concepts

- **Style** — name → CSS class (preset) or inline primitives (`bg`, `fg`,
  `gutter`, `opacity`, `weight`, `marker`, `duration`, `easing`).
- **Region** — `at: 2-3`, `at: { line, match }`, `at: { line, cols }`,
  or short keys: `add: 2-3`.
- **Step** — top-level list = reveal.js fragments. Single object = static.

## Accessibility

- All transitions wrap `@media (prefers-reduced-motion: reduce)`.
- Every style ships a gutter `marker` character so colorblind / monochrome
  viewers can still read the decoration.
- Step labels are announced via an `aria-live` region.

## Debugging

Append `?cs-debug=1` to any rendered URL to surface inline error banners
above blocks with malformed specs, unknown style names, or out-of-range
line numbers.
