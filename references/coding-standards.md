# FUI Coding Standards

## 1. Naming Conventions

### Components (`components/`)
-   **Prefix**: Use `uc-` (User Component) for custom module components to distinguish from standard FUI components (`f-`, `t-`).
-   **Format**: Kebab-case (e.g., `uc-trangthai-sukien.vue`, `uc-user-profile.vue`).
-   **Props**: Use camelCase in script, kebab-case in templates (e.g., `userProfile` -> `:user-profile`).
-   **Prefer reusable APIs**: Default to generic props, emits, and slots so the component can be reused across modules or screens.
-   **Avoid overfitting names**: Prefer neutral contracts like `items`, `value`, `label`, `loading`, `readonly`, `disabled`, `options`, `config` unless the business domain truly requires a specific prop name.
-   **Push orchestration upward**: Keep API calls, route changes, and page-specific coordination in `module.json` or the parent when possible. Let the component focus on presentation and local interaction.
-   **Emit upward**: Prefer `$emit(...)` for `input`, `change`, `select`, `submit`, `remove`, or explicit action events rather than mutating parent-owned state.

### CSS Classes
-   **No `<style>` Tags in `.vue`**: Do not use `<style>` or `<style scoped>` in `.vue` component files.
-   **Style Placement**: All custom styles must go in `header.html` using a `<style>` block in the head area. Do not place module/component CSS in `styles/index.css`.
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

-   **Canonical module structure**: Follow [module-structure.md](module-structure.md) as the default module layout in both workspace and chat contexts. In workspace-aware environments, apply it to real local files. In chat contexts, use it to virtualize the same module structure in the response.
-   **Required core files**: Keep `_info.json` and `module.json` at module root.
-   **`components/`**: Only place `.vue` files here. Do not sub-folder unless strictly necessary (FUI auto-scans this root).
-   **`components/_components.json`**: Maintain component registry when using `uc-*` components.
-   **`header.html`**: Use this as the canonical location for module and component CSS.
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

## 6. Vue Component Design

Xem toàn bộ quy tắc thiết kế `uc-*.vue` component tại [component-design.md](component-design.md), bao gồm:
- Không dùng `components: {}` để đăng ký
- Không dùng `<style>` trong file `.vue`
- Không dùng backtick trong `<template>`
- Không dùng `v-dialog` — dùng cấu trúc `v-overlay` thay thế
- Cấu trúc bắt buộc cho dialog component

## 7. Complex Module Architecture

When a module's `module.json` controls exceed ~200 lines:

-   **Extract to Vue component**: Move the UI into a `.vue` component. Keep `module.json` lean (data/API only + a single component call in `controls`).
-   **Props binding**: Pass all data from `module.json` via props. Use kebab-case for prop names in templates (`:nhan-vien="nhanVien"`).
-   **Design for reuse first**: Before naming props or methods, check whether the component can be expressed as a generic list, card, dialog body, filter panel, summary block, or form section reused by other modules.
-   **Configurable states**: Expose loading, empty, disabled, and readonly behavior through props or slots instead of hardcoding one workflow.
-   **Sticky headers**: When combining multiple sticky elements (e.g., hero + tabs), wrap them in **one parent div** with `position: sticky` instead of making each element sticky individually.
-   **Tab navigation vs Accordion**: For 5+ sections of data, prefer horizontal `v-tabs` over `v-expansion-panels`. Tabs show one section at a time, reduce cognitive overload, and support swipe gestures on mobile.
-   **Swipe gestures**: Attach `touchstart`/`touchend` listeners on the **outermost wrapper** (not on content area) so swipe works regardless of content height.
