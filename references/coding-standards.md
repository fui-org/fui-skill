# FUI Coding Standards

## 1. Naming Conventions

### Components (`components/`)
-   **Prefix**: Use `uc-` (User Component) for custom module components to distinguish from standard FUI components (`f-`, `t-`).
-   **Format**: Kebab-case (e.g., `uc-trangthai-sukien.vue`, `uc-user-profile.vue`).
-   **Props**: Use camelCase in script, kebab-case in templates (e.g., `userProfile` -> `:user-profile`).

### CSS Classes
-   **No `<style>` Tags in `.vue`**: Do not use `<style>` or `<style scoped>` in `.vue` component files.
-   **Style Placement**: All custom styles must go in `styles/index.css` OR `header.html` (using `<style>` tag). Both are valid targets.
-   **Vuetify Utilities**: Prioritize Vuetify helper classes (e.g., `ma-2`, `pa-0`, `d-flex`, `primary--text`).
-   **Custom Classes**: Use meaningful prefixed names (e.g., `ep-hero`, `ep-field-grid`). Avoid generic names like `.box` or `.red`.
-   **State Classes**: Use descriptive names for state (e.g., `.is-active`, `.has-error`).

### Action Keys (`module.json`)
-   **API Actions**: Predix with `api` (e.g., `apiGetDSSuKien`, `apiUpdateUser`).
-   **Event Handlers**: Prefix with `handle` (e.g., `handleOpenReport`, `handleSubmit`).
-   **Dialog Actions**: Prefix with verb (e.g., `openUploadDialog`, `closeSettings`).

## 2. Menu Configuration (`set.menu`)

Define the application menu in the `set` object of `module.json`.

```json
"menu": [
  {
    "name": "Main Group",
    "icon": "mdi-home",    // Material Design Icons
    "url": "/dashboard",   // Route
    "right": {             // Permission check
      "SystemRight": [1, 2] // Array of allowed Right IDs
    }
  },
  {
    "name": "Management",
    "icon": "mdi-cog",
    "submenu": [           // Nested menu items
      {
        "name": "Users",
        "url": "/users"
      },
      {
        "name": "Settings",
        "url": "/settings"
      }
    ]
  }
]
```

## 3. Project Structure

-   **Canonical module structure**: Follow [module-structure.md](module-structure.md) as the default module layout. In workspace-aware environments, apply it to real local files. In chat contexts, use it as the target output contract.
-   **Required core files**: Keep `_info.json` and `module.json` at module root.
-   **`components/`**: Only place `.vue` files here. Do not sub-folder unless strictly necessary (FUI auto-scans this root).
-   **`components/_components.json`**: Maintain component registry when using `uc-*` components.
-   **`styles/`**: Custom CSS files. Ensure `index.css` is the entry point if multiple files exist.
-   **`module.json`**: Keep this file clean. Move large static lists to the database or separate JSON files if supported.

## 4. Best Practices

-   **Data Binding**: Avoid complex logic in JSON attributes. Use computed properties in components or simpler `vueData` structures.
-   **Event Handling**: Use `CALL(vueData.actionName)` for all complex interactions. Avoid inline JS like `vueData.count++` for anything beyond simple toggles.
-   **Mobile Responsiveness**: Always configure `configForm.xs` and `configForm.md` for responsive form widths.

## 5. Component Registration (`_components.json`)

Components are registered using an **upsert pattern**:

-   **New component** (before publish): Only `comName` is required. Do NOT manually assign `comID`.
    ```json
    [
      { "comName": "hr-employee-profile" }
    ]
    ```
-   **After publish & sync**: The server auto-assigns `comID`. The file gets updated on sync:
    ```json
    [
      { "comID": 7813, "comName": "hr-employee-profile" }
    ]
    ```

> **Rule**: Never manually create or modify `comID`. It is server-generated.

## 6. Vue Template Syntax Constraints

Inside `<template>` of `.vue` files:

-   **No template strings (backticks)**: Use string concatenation instead.
    ```html
    <!-- ❌ WRONG -->
    :label="`Total (${items.length})`"
    <!-- ✅ CORRECT -->
    :label="'Total (' + items.length + ')'"
    ```
-   **No arrow functions**: Use `function()` syntax for broader compatibility.
    ```js
    // ❌ WRONG
    props: { items: { default: () => [] } }
    // ✅ CORRECT
    props: { items: { default: function() { return [] } } }
    ```

## 7. Complex Module Architecture

When a module's `module.json` controls exceed ~200 lines:

-   **Extract to Vue component**: Move the UI into a `.vue` component. Keep `module.json` lean (data/API only + a single component call in `controls`).
-   **Props binding**: Pass all data from `module.json` via props. Use kebab-case for prop names in templates (`:nhan-vien="nhanVien"`).
-   **Sticky headers**: When combining multiple sticky elements (e.g., hero + tabs), wrap them in **one parent div** with `position: sticky` instead of making each element sticky individually.
-   **Tab navigation vs Accordion**: For 5+ sections of data, prefer horizontal `v-tabs` over `v-expansion-panels`. Tabs show one section at a time, reduce cognitive overload, and support swipe gestures on mobile.
-   **Swipe gestures**: Attach `touchstart`/`touchend` listeners on the **outermost wrapper** (not on content area) so swipe works regardless of content height.
