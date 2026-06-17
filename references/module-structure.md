# Module Structure (Canonical for Workspace and Chat)

Use this structure when creating, refactoring, or reviewing a FUI module.

- In editor or extension contexts with workspace access, apply it as the real local folder structure.
- In chat or agent-chat contexts, use it to virtualize the same module structure and organize the response, without assuming the files already exist on disk.

## Canonical Local Structure

The workspace is organized at two levels: **project** and **module**.

### Project-level (root of a checked-out project)

```text
{projectId}/
|-- _projectInfo.json             # Project metadata (ProjectID, ProjectName, Framework, etc.)
|-- project.json                  # Full project config (data/watch/controls/set at project scope)
|-- imports/                      # Project-scope import files
|   `-- _imports.json             # Declared project-level JS/CSS imports
|-- components/                   # Project-scope Vue components
|   |-- _components.json          # Component registry
|   `-- uc-*.vue                  # Project-level custom components
|-- modules/                      # All modules in this project
|   |-- _modules.json             # Module list metadata
|   `-- {moduleId}/               # One folder per module (see module-level below)
`-- skills/                       # FUI skill files (auto-copied on checkout)
```

### Module-level (inside `modules/{moduleId}/`)

```text
{moduleId}/
|-- _moduleInfo.json              # Required: module metadata + mTitle (page title) + HTMLOnly
|-- module.json                   # Required: data/watch/controls/set (unused when HTMLOnly=true)
|-- script.js                     # Recommended: helper logic for FUN/EXE/chart/transform
|-- header.html                   # Full <head> content: <link>, <style>, <script> tags
|-- body.html                     # HTMLOnly=false: supplementary body HTML
|                                 # HTMLOnly=true: entire page content (custom HTML/Vue app)
|-- imports/                      # Module-scope import files
|   `-- _imports.json             # Declared module-level JS/CSS imports
`-- components/                   # Optional: custom Vue components
    |-- _components.json          # Required when using custom components
    `-- uc-*.vue                  # Custom components (prefix uc-)
```

## Chat-Safe Usage

When working without local workspace access:

1. Present this tree as the canonical module layout, not as a claimed filesystem state.
2. Return file contents in separate code blocks or clearly labeled sections.
3. Ask the user to paste `_moduleInfo.json`, `module.json`, `script.js`, or component files when a review or patch depends on existing code.
4. Scope recommendations to the files actually provided instead of inventing unseen surrounding files.

## Required vs Optional

1. Required (module-level):
- `_moduleInfo.json`
- `module.json`

2. Recommended:
- `script.js`
- `imports/_imports.json`

3. Optional by use-case:
- `header.html`
- `body.html`
- `components/` (with `_components.json` and `uc-*.vue`)

## File Responsibilities

### module.json (core)
- Keep all runtime config in `data`, `watch`, `controls`, `set`.
- Keep `controls` under FUI grid wrapper (`container > rows > cols`).
- Keep business actions in `data` and trigger with `CALL`.
- **When `HTMLOnly=true`: leave this file empty (`data:[], watch:{}, controls:[], set:{}`). The FUI runtime does not use it.**
- **JSON content patterns** (data[], watch, controls, actions, dialogs, navigation): see [`examples/module-patterns.json`](../examples/module-patterns.json)
- **f-table props and header types**: see [`examples/f-table-patterns.json`](../examples/f-table-patterns.json)

### script.js (helper logic)
- Move complex transforms, chart builders, debounce helpers, parsing logic here.
- Expose functions for `FUN` actions or template helpers.
- Avoid large inline `EXE` blocks in `module.json` when reusable function is possible.

### _moduleInfo.json (metadata)
- Keep `ProjectID`, `ModuleID`, `ModuleName`, `Framework` accurate.
- Contains `mTitle` (page title). To update the module's page title, edit the `mTitle` field in `_moduleInfo.json`. This value is sent to the server as `title` when publishing via `publish_staged_module`.
- Contains `HTMLOnly` (boolean). **Read this first before deciding how to structure the module.**

### header.html (head content)
- Contains everything that goes **inside** the `<head>` tag — do NOT include the `<head>` wrapper itself.
- Can contain: `<link>` CSS imports, `<style>` blocks, `<script>` imports, `<meta>` tags.
- Do NOT put a `<title>` tag here — page title is managed via `mTitle` in `_moduleInfo.json`.
- For `HTMLOnly=false`: typically only CSS (`<link>` and `<style>`). Framework and project-level scripts are injected automatically by the server.
- For `HTMLOnly=true`: often includes full JS library imports (`<script>` tags) since the developer manages the runtime manually.

### body.html (body content)
- Contains everything that goes **inside** the `<body>` tag — do NOT include the `<body>` wrapper itself.
- **When `HTMLOnly=false`**: supplementary HTML rendered alongside the FUI Vue runtime. Usually empty or minimal.
- **When `HTMLOnly=true`**: the **entire page content**. Can be plain HTML or a fully custom Vue app (own `<div id="app">`, own `<v-app>`, etc.). The FUI default Vue mount point is hidden in this mode.
- Both `header.html` and `body.html` store only the **inner content** (no wrapper tags). The server strips wrappers automatically on save, and the publish tool does the same preprocessing.

### imports/_imports.json (module imports)
- Declares module-scope JS/CSS import files.
- Each entry: `{ name, type, contentType, fileID, scope, sort }`.
- `sort` — thứ tự load. **Khi thêm import mới: đặt `sort` từ 40 trở lên** (40, 50, 60...). Giá trị nhỏ (1–39) dành cho import hệ thống/framework được load trước — không dùng để tránh xung đột.
- Only module-scope imports are stored here (project-scope imports are at `{projectId}/imports/_imports.json`).

### components/_components.json
- Register `uc-*` components.
- Follow upsert rule:
  - Before publish: may only have `comName`.
  - After publish/sync: `comID` is server-managed.
- Do not handcraft random `comID`.

### components/uc-*.vue
- Use `uc-` prefix for custom components.
- Keep component-specific UI complexity here instead of bloating `module.json`.
- Prefer reusable component contracts: props for input, emits for output, slots for extensibility.
- Avoid baking page-specific API calls or route logic into the component unless that coupling is intentional and unavoidable.
- Never place `<style>` or `<style scoped>` blocks inside the component. Move all CSS to `header.html`.
- Never use backtick template strings inside the component `<template>`.

### _projectInfo.json (project metadata)
- Saved at project root on checkout (`{projectId}/_projectInfo.json`).
- Contains `ProjectID`, `ProjectName`, `GroupName`, `Framework`, `pDomain`, `fetchedAt`.
- Read-only for module editing — do not modify.

### project.json (project config)
- Contains a single `data` object — project-level defaults for all modules: `apiDomain`, `login`, `userInfo`, `menu`, `menuLeft`, `menuStyle`, `menuComponent`, `domainSetting`, etc.
- **Relationship with `module.json` `set`**: runtime merges `project.json data` + `module.json set`, with module values taking priority. A module only needs to declare fields that differ from the project default.
- See [project-config.md](project-config.md) for full field reference, menu item structure, and `right` permission rules.

## Naming and Prefix Rules

1. Module folder name:
- Use the same module ID naming used by project conventions.

2. Custom component file:
- Use `uc-*.vue` kebab-case.

3. Component usage in `module.json`:
- Use `el: "uc-..."` for custom components.
- Keep prop binding in `attr` with kebab-case prop names.

## HTMLOnly Mode

`HTMLOnly` is a boolean flag in `_moduleInfo.json`. **Always check this first** before editing a module.

### HTMLOnly=false (default — FUI Vue module)

- `module.json` is the core: FUI runtime reads `data`, `watch`, `controls`, `set` and bootstraps a Vue app.
- `body.html` is supplementary HTML rendered in the body alongside the Vue controls (often empty).
- `header.html` typically contains CSS only (`<link>`, `<style>`). Framework and project-level scripts are auto-injected by the server.
- Vue components (`uc-*.vue`) are fully supported.
- `script.js` exposes helper functions used by `FUN`/`EXE` actions.

### HTMLOnly=true (custom HTML/Vue page)

- `module.json` is **ignored** at runtime — keep it empty (`data:[], watch:{}, controls:[], set:{}`).
- `body.html` is the **entire page content**. The developer has full control — can write plain HTML or a completely custom Vue app (own `<div id="app">`, own `<v-app>`, own Vue instance).
- `header.html` typically imports all required libraries manually (`<link>`, `<style>`, `<script>`), since framework-level and project-level imports are NOT auto-injected.
- Do NOT attempt to use FUI's `controls`/`data`/`watch` JSON system — it has no effect.
- Use this mode for: standalone tools, custom editors, pages that need their own runtime or layout that doesn't fit the FUI grid system.

## Practical Patterns

### Pattern A: Simple module (no custom component)

Use:
- `_moduleInfo.json`
- `module.json`
- `script.js`
- `imports/_imports.json`

Skip `components/` unless needed.

### Pattern B: Dashboard/report module (recommended split)

Use:
- `module.json` for filters + action orchestration
- `script.js` for conversion/chart utilities
- `components/uc-*.vue` for chart/table dashboard presentation
- `header.html` for module-scoped and component-scoped CSS

This pattern matches large report modules and keeps `module.json` maintainable.

### Pattern C: HTMLOnly custom page

Use:
- `_moduleInfo.json` (with `HTMLOnly: true`)
- `module.json` (empty skeleton only)
- `header.html` for all CSS + JS library imports
- `body.html` for the entire page — plain HTML or a self-contained Vue app

Skip `components/` and `script.js` unless the custom app needs them.

## Review Checklist (Structure)

1. Check `HTMLOnly` in `_moduleInfo.json` first — it determines which files matter.
2. If `HTMLOnly=false`: does `module.json` have valid `data/watch/controls/set`?
3. If `HTMLOnly=true`: is `module.json` empty? Is all content in `body.html`?
4. Is heavy logic moved to `script.js` instead of oversized `EXE`?
5. If custom UI exists, is it moved to `components/uc-*.vue`?
6. If `components/` exists, does `_components.json` register them correctly?
7. Are imports declared in `imports/_imports.json`?
8. Do `header.html` and `body.html` contain only inner content (no `<head>`/`<body>` wrapper tags)?
