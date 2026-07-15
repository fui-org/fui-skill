# Module Structure (Canonical for Workspace and Chat)

Use this structure when creating, refactoring, or reviewing a FUI module.

- In editor or extension contexts with workspace access, apply it as the real local folder structure.
- In chat or agent-chat contexts, use it to virtualize the same module structure and organize the response, without assuming the files already exist on disk.

> **Layout update (FUIX).** The FUIX extension now stores all system metadata in a single hidden `.fuix/` folder at the project root, and each module's config + logic are unified into one `index.vue` file. The old flat files (`module.json`, `script.js`, `_moduleInfo.json`, `_components.json`, `_imports.json`, `_projectInfo.json`) no longer exist as editable files — see the mapping table below.

## Old → New mapping

| Old file | New location | Notes |
|----------|--------------|-------|
| `module.json` (data/watch/controls/set) | `<fui-app lang="json">` block inside `index.vue` | Same four sections, now JSON inside the SFC |
| `script.js` (helper logic) | `<script>` block inside `index.vue` | Same purpose |
| CSS in `header.html` | `style.css` | Module CSS now lives in its own file |
| `_moduleInfo.json` | `.fuix/modules/{moduleId}/info.json` | System-managed, read-only |
| `_components.json` | `.fuix/modules/{moduleId}/components.json` (module) / `.fuix/components/components.json` (project) | System-managed |
| component folder map | `.fuix/modules/{moduleId}/tree.json` / `.fuix/components/tree.json` | System-managed |
| `_imports.json` | `.fuix/modules/{moduleId}/imports.json` (module) / `.fuix/imports/imports.json` (project) | System-managed |
| `_projectInfo.json` | `.fuix/project.json` | System-managed, read-only |
| `project.json` (runtime config) | `.fuix/runtime.json` | System-managed, read-only |
| `_modules.json` | `.fuix/modules.json` | System-managed |

## Canonical Local Structure

The workspace is organized at two levels: **project** and **module**.

### Project-level (root of a checked-out project)

```text
{projectId}/
|-- .fuix/                        # System metadata & cache — DO NOT hand-edit
|   |-- project.json              # Project metadata (ProjectID, ProjectName, Framework, pDomain...)
|   |-- runtime.json              # Project runtime config (apiDomain, login, userInfo, menu...)
|   |-- users.json                # Local test accounts (gitignored)
|   |-- modules.json              # Module list metadata
|   |-- .cache/                   # Sync baseline & auto-backups (gitignored)
|   |-- components/
|   |   |-- components.json        # Shared component registry (comID/comName)
|   |   `-- tree.json              # Shared component folder map
|   |-- imports/
|   |   `-- imports.json           # Shared import registry
|   `-- modules/
|       `-- {moduleId}/
|           |-- info.json          # Module metadata + HTMLOnly
|           |-- components.json     # Module component registry
|           `-- tree.json           # Module component folder map
|-- components/                   # Project-scope Vue components
|   `-- uc-*.vue                  # Project-level custom components
|-- imports/                      # Project-scope import asset files (JS/CSS)
`-- modules/                      # All modules in this project
    `-- {moduleId}/               # One folder per module (see module-level below)
```

### Module-level (inside `modules/{moduleId}/`)

```text
{moduleId}/
|-- index.vue                     # Required: <fui-app lang="json"> (data/watch/controls/set) + <script> (helper JS)
|-- body.html                     # HTMLOnly=false: supplementary body HTML
|                                 # HTMLOnly=true: entire page content (custom HTML/Vue app)
|-- style.css                     # Module-scope CSS
|-- header.html                   # Head inner content: <link>, <meta>, external <script> (NO <style>, NO <title>)
|-- imports/                      # Module-scope import asset files (JS/CSS)
`-- components/                   # Optional: custom Vue components
    `-- uc-*.vue                  # Custom components (prefix uc-)
```

Module metadata (including `HTMLOnly`) lives in `.fuix/modules/{moduleId}/info.json` and is managed by the extension — read it, do not hand-edit it.

## index.vue Anatomy

`index.vue` is a single-file component with two blocks:

```vue
<fui-app lang="json">
{
  "data": [],
  "watch": {},
  "controls": [],
  "set": {}
}
</fui-app>

<script>
// Helper logic for FUN/EXE actions, chart builders, transforms, parsing, debounce, etc.
</script>
```

- The `<fui-app lang="json">` block is the **core config** — it replaces the old `module.json`. Same four sections: `data`, `watch`, `controls`, `set`.
- The `<script>` block replaces the old `script.js` — expose helper functions used by `FUN`/`EXE` actions.
- Legacy `<fui-config>` tag is accepted for backward compatibility, but always write new modules with `<fui-app lang="json">`.

## Chat-Safe Usage

When working without local workspace access:

1. Present this tree as the canonical module layout, not as a claimed filesystem state.
2. Return the `index.vue` blocks (fui-app JSON + script), `body.html`, `style.css`, and `header.html` in separate, clearly labeled sections.
3. Ask the user to paste `index.vue` (or its `<fui-app>` JSON), `body.html`, `style.css`, or component files when a review or patch depends on existing code.
4. Scope recommendations to the files actually provided instead of inventing unseen surrounding files.
5. Never fabricate `.fuix/` metadata contents — treat them as system-managed.

## Required vs Optional

1. Required (module-level):
- `index.vue` (with a valid `<fui-app lang="json">` block)

2. Recommended:
- `<script>` block inside `index.vue` for helper logic
- `style.css` for module CSS

3. Optional by use-case:
- `header.html` (external CSS/JS links, meta)
- `body.html`
- `components/` (with `uc-*.vue`)
- `imports/`

## File Responsibilities

### index.vue — `<fui-app lang="json">` block (core)
- Keep all runtime config in `data`, `watch`, `controls`, `set`.
- Keep `controls` under FUI grid wrapper (`container > rows > cols`).
- Keep business actions in `data` and trigger with `CALL`.
- **When `HTMLOnly=true`: leave this block empty (`data:[], watch:{}, controls:[], set:{}`). The FUI runtime does not use it.**
- **JSON content patterns** (data[], watch, controls, actions, dialogs, navigation): see [`examples/module-patterns.json`](../examples/module-patterns.json)
- **f-table props and header types**: see [`examples/f-table-patterns.json`](../examples/f-table-patterns.json)

### index.vue — `<script>` block (helper logic)
- Move complex transforms, chart builders, debounce helpers, parsing logic here.
- Expose functions for `FUN` actions or template helpers.
- Avoid large inline `EXE` blocks in the `<fui-app>` JSON when a reusable function is possible.

### .fuix/modules/{moduleId}/info.json (metadata — read-only)
- Contains `ProjectID`, `ModuleID`, `ModuleName`, `Framework`, `HTMLOnly`, `mDomain`, `url`.
- **Read `HTMLOnly` first before deciding how to structure the module.**
- Managed by the extension on clone/sync/push — do not hand-edit.

### header.html (head content)
- Contains everything that goes **inside** the `<head>` tag — do NOT include the `<head>` wrapper itself.
- Use for: `<link>` CSS imports, external `<script>` imports, `<meta>` tags.
- Do **NOT** put `<style>` blocks here — module CSS belongs in `style.css`.
- Do NOT put a `<title>` tag here.
- For `HTMLOnly=false`: usually only external `<link>` imports. Framework and project-level scripts are injected automatically by the server.
- For `HTMLOnly=true`: often includes full JS library imports (`<script>` tags) since the developer manages the runtime manually.

### style.css (module CSS)
- Holds all module-scoped CSS. On publish, the server merges it back into the page head as a `<style>` block.
- Prefer plain CSS classes; keep selectors scoped by a module/root class to avoid leaking styles.

### body.html (body content)
- Contains everything that goes **inside** the `<body>` tag — do NOT include the `<body>` wrapper itself.
- **When `HTMLOnly=false`**: supplementary HTML rendered alongside the FUI Vue runtime. Usually empty or minimal.
- **When `HTMLOnly=true`**: the **entire page content**. Can be plain HTML or a fully custom Vue app (own `<div id="app">`, own `<v-app>`, etc.). The FUI default Vue mount point is hidden in this mode.
- `header.html` and `body.html` store only the **inner content** (no wrapper tags). The server strips wrappers automatically on save, and the publish tool does the same preprocessing.

### imports/ (import asset files)
- Holds the actual JS/CSS asset files (module-scope here, project-scope at `{projectId}/imports/`).
- Declared metadata is system-managed in `.fuix/.../imports.json` — do not hand-edit it; add/remove import files and let the extension sync the registry on push.
- `sort` order for new imports: **use `sort` 40 and up** (40, 50, 60...). Values 1–39 are reserved for system/framework imports loaded first.

### components/uc-*.vue
- Use `uc-` prefix for custom components.
- Keep component-specific UI complexity here instead of bloating the `<fui-app>` JSON.
- Prefer reusable component contracts: props for input, emits for output, slots for extensibility.
- Avoid baking page-specific API calls or route logic into the component unless that coupling is intentional and unavoidable.
- **Never place `<style>` / `<style scoped>` blocks inside a component** — they are dropped on publish. Put CSS in `style.css`.
- Never use backtick template strings inside the component `<template>`.
- Component registration (`comID`/`comName`) is tracked in `.fuix/.../components.json` and managed by the extension — do not handcraft `comID`.

### .fuix/project.json & .fuix/runtime.json (project metadata & config — read-only)
- `.fuix/project.json`: project metadata (`ProjectID`, `ProjectName`, `GroupName`, `Framework`, `pDomain`). Read-only for module editing.
- `.fuix/runtime.json`: project-level runtime defaults for all modules — `apiDomain`, `login`, `userInfo`, `menu`, `menuLeft`, `menuStyle`, `menuComponent`, `domainSetting`, etc.
- **Relationship with the module `set`**: runtime merges project runtime config + the module's `set`, with module values taking priority. A module only needs to declare fields that differ from the project default.
- See [project-config.md](project-config.md) for the full field reference, menu item structure, and `right` permission rules.

## Naming and Prefix Rules

1. Module folder name:
- Use the same module ID naming used by project conventions.

2. Custom component file:
- Use `uc-*.vue` kebab-case.

3. Component usage in the `<fui-app>` JSON:
- Use `el: "uc-..."` for custom components.
- Keep prop binding in `attr` with kebab-case prop names.

## HTMLOnly Mode

`HTMLOnly` is a boolean flag in `.fuix/modules/{moduleId}/info.json`. **Always check this first** before editing a module.

### HTMLOnly=false (default — FUI Vue module)

- The `<fui-app lang="json">` block is the core: FUI runtime reads `data`, `watch`, `controls`, `set` and bootstraps a Vue app.
- `body.html` is supplementary HTML rendered in the body alongside the Vue controls (often empty).
- `header.html` typically contains external CSS `<link>` only; module CSS is in `style.css`. Framework and project-level scripts are auto-injected by the server.
- Vue components (`uc-*.vue`) are fully supported.
- The `<script>` block exposes helper functions used by `FUN`/`EXE` actions.

### HTMLOnly=true (custom HTML/Vue page)

- The `<fui-app lang="json">` block is **ignored** at runtime — keep it empty (`data:[], watch:{}, controls:[], set:{}`).
- `body.html` is the **entire page content**. The developer has full control — plain HTML or a completely custom Vue app (own `<div id="app">`, own `<v-app>`, own Vue instance).
- `header.html` typically imports all required libraries manually (`<link>`, external `<script>`), since framework-level and project-level imports are NOT auto-injected. Module CSS still goes in `style.css`.
- Do NOT attempt to use FUI's `controls`/`data`/`watch` JSON system — it has no effect.
- Use this mode for: standalone tools, custom editors, pages that need their own runtime or layout that doesn't fit the FUI grid system.

## Practical Patterns

### Pattern A: Simple module (no custom component)

Use:
- `index.vue` (`<fui-app>` JSON + `<script>`)
- `style.css` (if any module CSS)
- `imports/` (if external assets)

Skip `components/` unless needed.

### Pattern B: Dashboard/report module (recommended split)

Use:
- `index.vue` `<fui-app>` JSON for filters + action orchestration
- `index.vue` `<script>` for conversion/chart utilities
- `components/uc-*.vue` for chart/table dashboard presentation
- `style.css` for module-scoped CSS

This pattern keeps the `<fui-app>` JSON maintainable for large report modules.

### Pattern C: HTMLOnly custom page

Use:
- `.fuix/modules/{moduleId}/info.json` with `HTMLOnly: true` (set by the platform)
- `index.vue` with an empty `<fui-app>` skeleton
- `header.html` for JS library imports, `style.css` for CSS
- `body.html` for the entire page — plain HTML or a self-contained Vue app

Skip `components/` and the `<script>` helper block unless the custom app needs them.

## Review Checklist (Structure)

1. Check `HTMLOnly` in `.fuix/modules/{moduleId}/info.json` first — it determines which files matter.
2. If `HTMLOnly=false`: does the `<fui-app>` JSON in `index.vue` have valid `data/watch/controls/set`?
3. If `HTMLOnly=true`: is the `<fui-app>` block empty? Is all content in `body.html`?
4. Is heavy logic moved to the `<script>` block instead of oversized `EXE`?
5. If custom UI exists, is it moved to `components/uc-*.vue`?
6. Is module CSS in `style.css` (not in `header.html` and not in component `<style>` blocks)?
7. Are import asset files placed under `imports/` (metadata syncs to `.fuix/` on push)?
8. Do `header.html` and `body.html` contain only inner content (no `<head>`/`<body>` wrapper tags)?
9. Are `.fuix/` metadata files left untouched (system-managed)?
