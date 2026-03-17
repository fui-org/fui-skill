---
name: fui-skill
description: Use this skill when developing, structuring, or modifying FUI web modules. It provides strict guidelines for the metadata-driven architecture (module.json), mandatory grid layout system, action protocols, and includes specific tools for saving and publishing modules/components.
---

# FUI Skill

Develop web modules using FUI's metadata-driven approach where UI and logic are defined in JSON.

## Module Structure

```text
<module-name>/
|-- _info.json                    (Required: module metadata)
|-- module.json                   (Required: core data/watch/controls/set)
|-- script.js                     (Recommended: helper logic)
|-- dependencies.json             (Recommended: external js/css)
|-- header.html                   (Optional)
|-- body.html                     (Optional)
|-- components/                   (Optional custom components)
|   |-- _components.json          (Required when using components/)
|   `-- uc-*.vue                  (Custom components, use `uc-` prefix)
`-- styles/                       (Optional)
```

For full local structure rules and checklist, see [module-structure.md](references/module-structure.md).

## module.json Anatomy

The core file has four sections:
-   **`data`**: Reactive state and named Actions
-   **`watch`**: Observers triggering actions on change
-   **`controls`**: UI layout (containers > rows > cols > elements)
-   **`set`**: Module settings (title, menu)
## Action Protocol

Define logic in `data` as named action objects. Execute with `CALL`.

| Key | Description |
|:---|:---|
| `API` | Endpoint to call |
| `IN` | Input params (use `vueData.` or `item.` refs) |
| `OUT` | Store response (e.g., `"myList"`) |
| `CALLBACK` | Action after success |
| `CONFIRM` | Show confirmation first |
| `MESS` | Toast message |
| `CALL` | Execute another named action |
| `IF/THEN/ELSE` | Conditional logic |
| `EXE` | Raw JS (use sparingly) |

**Example:**
```json
"fetchUsers": {
  "API": "/api/users",
  "IN": { "GroupID": "vueData.selectedGroup" },
  "OUT": "userList",
  "CALLBACK": { "MESS": "Loaded!" }
}
```

### Literal String Rule (CRITICAL)

This rule applies when passing values inside Action Protocol `IN` blocks.
In `IN`, FUI core may evaluate string values as expressions/variables when the value has no spaces.

To force a literal string value, use one of these patterns:
- Prefix with backtick: ``"id": "`winUser"`` or ``"id": "`winUser`"``
- Wrap with single quotes inside JSON string: `"id": "'winUser'"`

Recommended for fields like `id`, `url`, or any key inside `IN` that must stay as plain text:

```json
{
  "FUN": "openWindow",
  "IN": {
    "id": "`winUser",
    "url": "'/fp/module?mid=123'"
  }
}
```

For Vue component props (`f-*`, `t-*`, `v-*`) without `:` in `attr`, values are plain strings by default.
Example: `"url": "/fp/module?mid=123"` is already a literal string prop.

## Layout System (Grid & Controls)

**CRITICAL RULE**: The `controls` array MUST follow the **Mandatory Grid System** structure at the top level.

### 1. Mandatory Grid Wrapper
All controls must be wrapped in a container > rows > cols structure:
```json
"controls": [
  {
    "prop": "fluid grid-list-md",
    "rows": [
      {
        "prop": "row",
        "cols": [
          // Control Objects go here
        ]
      }
    ]
  }
]
```

### 2. Control Object Structure
Inside the `cols` array (or nested `innerHTML`), every item is a **Control Object**:

| Key | Type | Description |
|:---|:---|:---|
| **`el`** | String | HTML tag (`div`, `span`), Vue component, or FUI component. |
| **`attr`** | Object | Attributes/directives (`class`, `style`, `v-model`, `v-on:click`). **NO `@`**. |
| **`w`** | Number/String | Column width. `1-12` (grid) or `pixel value`. REQUIRED for items in `cols`. |
| **`col`** | Object | Wrapper config. Attributes for the grid column (`class`, `style`). |
| **`innerHTML`** | String/Array | Content. Can be recursive array of Control Objects. |

**Example:**
```json
{
  "el": "v-btn",
  "w": 6,
  "col": { "class": "text-center" },
  "attr": {
    "color": "primary",
    "v-on:click": "CALL(vueData.submit)"
  },
  "innerHTML": "Submit"
}
```

### `innerHTML` Supports `{{ }}`

`innerHTML` string can use Vue template interpolation for reactive text binding.

```json
{
  "el": "div",
  "w": 12,
  "innerHTML": "Xin chao {{formData.fullName}}"
}
```

## Layout Rules

-   **Wrapper**: ALWAYS start with the Grid Wrapper.
-   **No `children`**: Use `innerHTML` (array) for nesting.
-   **Attributes**: Use `attr` for element attributes. Use `col` for grid column attributes.
-   **Events**: Use `v-on:click` (valid JSON), not `@click`.

## Vuetify 2 Styling Rule

-   **Prefer Vuetify 2 classes first**: Always try Vuetify 2 utility classes, helper classes, and standard component props before writing inline `style`.
-   **Use inline style only as fallback**: Only add `style` when Vuetify 2 classes/props cannot express the requirement cleanly.
-   **Common preference order**:
    1. Vuetify component props (`color`, `outlined`, `dense`, `elevation`, `rounded`, `tile`, `justify`, `align`)
    2. Vuetify/helper classes (`pa-*`, `ma-*`, `d-flex`, `flex-*`, `justify-*`, `align-*`, `text-*`, `primary--text`, `rounded-*`)
    3. Custom class names
    4. Inline `style` as the last option

## UI Templates

Copy templates from `examples/` as starting points. See [ui-templates.md](references/ui-templates.md) for usage guide.

| Template | Type | Use Case |
|:---|:---|:---|
| [form-basic.json](examples/form-basic.json) | JSON | Simple input forms |
| [table-crud.json](examples/table-crud.json) | JSON | Data tables with CRUD |
| [dialog-form.json](examples/dialog-form.json) | JSON | Modal dialogs |
| [component.vue](examples/component.vue) | Vue | Custom component starter |

## Instructions

1.  **Creating New Modules**: ALWAYS create a ROOT DIRECTORY with the module name first (e.g., `my-module/`). All files (`module.json`, `script.js`, etc.) MUST be inside this directory.
    -   `module.json` (Required): Define UI and Logic.
    -   `_info.json` (Required): Metadata (ID, Name, Framework).
    -   `dependencies.json` (Optional): External libs.
    -   `styles/index.css` (Optional): Custom CSS.
    -   `components/` (Optional): Custom Vue components.

2.  **Reference Docs**: See `references/` for component and function details:
    -   [fastproject.md](references/fastproject.md) - Core action engine
    -   [default-function.md](references/default-function.md) - Utility functions
    -   [module-structure.md](references/module-structure.md) - Canonical local module structure
    -   [components.md](references/components.md) - FUI `f-*` component catalog with examples
    -   [component-table.md](references/component-table.md) - `f-table` and `f-table-view` reference
    -   [script-map.md](references/script-map.md) - Quick lookup map for scripts/functions
    -   [coding-standards.md](references/coding-standards.md) - Class naming & Menu config
    -   [controls-patterns.md](references/controls-patterns.md) - Action patterns & Logic
    -   [watcher-patterns.md](references/watcher-patterns.md) - Cascading and filter watcher best practices
    -   [ui-templates.md](references/ui-templates.md) - Template usage guide
    -   [advanced-techniques.md](references/advanced-techniques.md) - Advanced Logic & PDF patterns
    -   [quality-assurance.md](references/quality-assurance.md) - Code Review & Edge Case Analysis

3.  **Module Assessment**: When asked to review/assess a module, follows the [Quality Assurance Protocol](references/quality-assurance.md) to identify issues, propose clean solutions, and analyze edge cases.

4.  **Editing module.json**: Use valid JSON. Reference state with `vueData.` prefix.

5.  **UI Templates**: Copy from `examples/`, modify APIs and fields.

## Continuous Improvement

This skill is a living document. The Agent MUST actively maintain and improve it based on user feedback and project evolution.

### Workflow
1.  **Post-Task Review**: After completing a complex task, ask the user: *"Are there any lessons, patterns, or corrections from this task that should be added to the FUI skill?"*
2.  **Correction & Refinement**: If the user points out a mistake or a better way to do something:
    -   **Update**: Modify existing guidelines/references immediately.
    -   **Delete**: Remove obsolete or incorrect information.
    -   **Add**: Create new reference files for novel techniques.
3.  **Knowledge Consolidation**: Periodically review `references/` to merge scattered tips into cohesive guides.

**Goal**: Ensure `fui-skill` always reflects the most up-to-date, best-practice way to build FUI modules.

## Common Components

### f-table (Data Table with CRUD)

The `f-table` component supports built-in CRUD operations using `update-api` and `update-form`.

**Configuration:**
- **`ctrl-update`**: Add a header with `value: "ctrl-update"` to show Action buttons.
- **`update-form`**: Array of controls for the Add/Edit dialog.
- **`update-api`**: Object defining logic for `new`, `edit`, `delete` keys. Logic passed as string expressions.

**Example:**
```json
{
  "el": "f-table",
  "attr": {
    ":items": "vueData.list",
    ":headers": [
      { "text": "Name", "value": "name" },
      { "text": "Actions", "value": "ctrl-update" }
    ],
    ":update-form": [
      { "el": "v-text-field", "attr": { "v-model": "name", "label": "Name" } }
    ],
    ":update-api": {
      "new": { "list": "[...list, item]" },
      "edit": { "list": "list.map(i => i.id === item.id ? item : i)" },
      "delete": { "list": "list.filter(i => i.id !== item.id)" }
    }
  }
}
```
