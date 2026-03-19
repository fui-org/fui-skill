# Module Structure (Workspace Layout and Chat Output Target)

Use this structure when creating, refactoring, or reviewing a FUI module.

- In editor or extension contexts with workspace access, apply it as the real local folder structure.
- In chat or agent-chat contexts, use it as the target output layout and do not assume the files already exist on disk.

## Canonical Local Structure

```text
<module-name>/
|-- _info.json                    # Required: module metadata
|-- module.json                   # Required: data/watch/controls/set
|-- script.js                     # Recommended: helper logic for FUN/EXE/chart/transform
|-- dependencies.json             # Recommended: external js/css declarations
|-- header.html                   # Optional: css/header markup
|-- body.html                     # Optional: additional body markup
|-- components/                   # Optional: custom Vue components
|   |-- _components.json          # Required when using custom components
|   `-- uc-*.vue                  # Custom components (prefix uc-)
`-- styles/                       # Optional: if project supports local style folder
```

## Chat-Safe Usage

When working without local workspace access:

1. Present this tree as the target package layout, not as a claimed filesystem state.
2. Return file contents in separate code blocks or clearly labeled sections.
3. Ask the user to paste `_info.json`, `module.json`, `script.js`, or component files when a review or patch depends on existing code.
4. Scope recommendations to the files actually provided instead of inventing unseen surrounding files.

## Required vs Optional

1. Required:
- `_info.json`
- `module.json`

2. Recommended:
- `script.js`
- `dependencies.json`

3. Optional by use-case:
- `header.html`
- `body.html`
- `components/` (with `_components.json` and `uc-*.vue`)
- `styles/`

## File Responsibilities

### module.json (core)
- Keep all runtime config in `data`, `watch`, `controls`, `set`.
- Keep `controls` under FUI grid wrapper (`container > rows > cols`).
- Keep business actions in `data` and trigger with `CALL`.

### script.js (helper logic)
- Move complex transforms, chart builders, debounce helpers, parsing logic here.
- Expose functions for `FUN` actions or template helpers.
- Avoid large inline `EXE` blocks in `module.json` when reusable function is possible.

### _info.json (metadata)
- Keep `ProjectID`, `ModuleID`, `ModuleName`, `Framework` accurate.
- Keep update/load metadata current when publishing workflow requires it.

### dependencies.json
- Declare external library dependencies used by module/components.
- Keep only used dependencies to avoid bloat.

### components/_components.json
- Register `uc-*` components.
- Follow upsert rule:
  - Before publish: may only have `comName`.
  - After publish/sync: `comID` is server-managed.
- Do not handcraft random `comID`.

### components/uc-*.vue
- Use `uc-` prefix for custom components.
- Keep component-specific UI complexity here instead of bloating `module.json`.

## Naming and Prefix Rules

1. Module folder name:
- Use the same module id naming used by project conventions.

2. Custom component file:
- Use `uc-*.vue` kebab-case.

3. Component usage in `module.json`:
- Use `el: "uc-..."` for custom components.
- Keep prop binding in `attr` with kebab-case prop names.

## Practical Patterns

### Pattern A: Simple module (no custom component)

Use:
- `_info.json`
- `module.json`
- `script.js`
- `dependencies.json`

Skip `components/` unless needed.

### Pattern B: Dashboard/report module (recommended split)

Use:
- `module.json` for filters + action orchestration
- `script.js` for conversion/chart utilities
- `components/uc-*.vue` for chart/table dashboard presentation
- `header.html` for module-scoped styles when needed

This pattern matches large report modules and keeps `module.json` maintainable.

## Review Checklist (Structure)

1. If the module files are available, does module root contain `_info.json` and `module.json`?
2. Is heavy logic moved to `script.js` instead of oversized `EXE`?
3. If custom UI exists, is it moved to `components/uc-*.vue`?
4. If `components/` exists, does `_components.json` register them correctly?
5. Are dependencies listed in `dependencies.json` and actually used?
6. Are optional files (`header.html`, `body.html`) used intentionally, not as dumps?

