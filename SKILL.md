---
name: fui-skill
description: Use this skill when developing, structuring, reviewing, or modifying FUI web modules. It provides strict guidelines for the metadata-driven architecture (the <fui-app> config block of index.vue), mandatory grid layout system, action protocols, and environment-aware workflow rules. Apply the canonical module structure in both editor and chat contexts. In editor or extension contexts with workspace access, work with the real module files. In chat or agent-chat contexts without workspace access, work from pasted artifacts while virtualizing the same module structure in the response.
---

# FUI Skill

Develop web modules using FUI's metadata-driven approach where UI and logic are defined in JSON.

## Execution Context

Apply this skill differently depending on the environment:

- **Editor / extension / workspace context**: Read, create, and modify local module folders and files when the environment actually exposes them. Apply the canonical local module structure directly.
- **Chat app / agent chat context**: Do not assume local file access, an existing workspace, or that the module folder already exists. Work from pasted JSON, snippets, screenshots, or explicit file attachments. Still apply the canonical module structure to virtualize the expected files, organize the response, and reason about what is missing.
- **Unclear context**: Infer from the available tools and artifacts. If no workspace or local files are explicitly available, default to chat-safe behavior and avoid pretending to read or update files that were never provided.

## Module Structure

The workspace is organized at two levels. In editor or extension contexts, create or update these files directly. In chat contexts, use the same structure to virtualize the module, explain which files are involved, and provide the relevant file contents inline.

### Project root (`{projectId}/`)

```text
{projectId}/
|-- .fuix/                        (System metadata — DO NOT hand-edit)
|   |-- project.json              (Project metadata)
|   |-- runtime.json              (Project-level runtime config: apiDomain/login/menu...)
|   |-- modules.json              (Module list)
|   |-- components/               (Shared component registry + tree)
|   |-- imports/                  (Shared import registry)
|   `-- modules/{moduleId}/       (Per-module metadata: info.json, components.json, tree.json)
|-- components/uc-*.vue           (Project-scope custom components)
|-- imports/                      (Project-scope JS/CSS asset files)
`-- modules/                      (All modules live here)
    `-- {moduleId}/               (One folder per module — see below)
```

### Module folder (`modules/{moduleId}/`)

```text
{moduleId}/
|-- index.vue                     (Required: <fui-app lang="json"> config + <script> helper logic)
|-- body.html                     (HTMLOnly=false: supplementary; HTMLOnly=true: full page)
|-- style.css                     (Module CSS)
|-- header.html                   (Head inner content: <link>/<meta>/external <script> — NO <style>)
|-- imports/                      (Module-scope JS/CSS asset files)
`-- components/uc-*.vue           (Optional custom components, use `uc-` prefix)
```

Module metadata (`ProjectID`, `ModuleID`, `Framework`, `HTMLOnly`...) lives in `.fuix/modules/{moduleId}/info.json` — read it, do not hand-edit it.

For full structure rules, the old→new mapping table, and the checklist, see [module-structure.md](references/module-structure.md). Apply that reference in both workspace-aware and chat environments.

## index.vue Anatomy

`index.vue` unifies config and logic in one file:

- `<fui-app lang="json">` block — the **core config** (replaces the old `module.json`). Four sections:

- **`data`**: Reactive state and named Actions
- **`watch`**: Observers triggering actions on change
- **`controls`**: UI layout (containers > rows > cols > elements)
- **`set`**: Module settings (title, menu)

The `<script>` block (replaces the old `script.js`) holds helper logic for `FUN`/`EXE` actions, chart builders, and transforms.

## Action Protocol

Define logic in `data` as named action objects. Execute with `CALL`.

| Key            | Description                                   |
| :------------- | :-------------------------------------------- |
| `API`          | Endpoint to call                              |
| `IN`           | Input params (use `vueData.` or `item.` refs) |
| `OUT`          | Store response (e.g., `"myList"`)             |
| `CALLBACK`     | Action after success                          |
| `CONFIRM`      | Show confirmation first                       |
| `MESS`         | Toast message                                 |
| `CALL`         | Execute another named action                  |
| `IF/THEN/ELSE` | Conditional logic                             |
| `EXE`          | Raw JS (use sparingly)                        |

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

| Key             | Type          | Description                                                                    |
| :-------------- | :------------ | :----------------------------------------------------------------------------- |
| **`el`**        | String        | HTML tag (`div`, `span`), Vue component, or FUI component.                     |
| **`attr`**      | Object        | Attributes/directives (`class`, `style`, `v-model`, `v-on:click`). **NO `@`**. |
| **`w`**         | Number/String | Column width. `1-12` (grid) or `pixel value`. REQUIRED for items in `cols`.    |
| **`col`**       | Object        | Wrapper config. Attributes for the grid column (`class`, `style`).             |
| **`innerHTML`** | String/Array  | Content. Can be recursive array of Control Objects.                            |

**Example:**

```json
{
  "el": "v-btn",
  "w": 6,
  "col": { "class": "text-center" },
  "attr": {
    ":disabled": "true",
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

- **Wrapper**: ALWAYS start with the Grid Wrapper.
- **No `children`**: Use `innerHTML` (array) for nesting.
- **Attributes**: Use `attr` for element attributes. Use `col` for grid column attributes.
- **Events**: Use `v-on:click` (valid JSON), not `@click`.

## Vuetify 2 Styling Rule

Priority: component props (`color`, `outlined`, `dense`, `elevation`) → utility classes (`pa-*`, `ma-*`, `d-flex`, `text-*`, `primary--text`) → custom class → inline `style` last. Never write `<style>` blocks inside component `.vue` files (they are dropped on publish) — put module CSS in `style.css`. Never use backtick template strings inside `<template>`.

## Instructions

0.  **Bắt buộc nạp reference trước khi làm — KHÔNG bỏ qua bước này**:

    Trước khi bắt đầu bất kỳ FUI task nào, phải đọc các reference liên quan. Không được bắt đầu viết code/JSON dựa thuần vào training data.

    | Loại task | Phải đọc trước |
    |---|---|
    | Bất kỳ task nào liên quan FUI | Tier A: `controls-patterns.md` · `ui-patterns.md` · `module-structure.md` |
    | Thiết kế UI, chọn component | + Tier B: `component-quickref.md` · `component-table.md` · `components-input.md` |
    | Gọi API, viết SP | + Tier C: `tapi-reference.md` |

    **Lý do**: Các rule trong reference thay đổi theo thời gian. Training data không phản ánh rule hiện tại — chỉ reference mới là nguồn sự thật. Việc làm sai rồi mới tra cứu tốn chi phí sửa gấp đôi.

1.  **Match the environment before acting**:
    - In editor or extension contexts with workspace access, create or update the real module root directory first (for example, `my-module/`) and keep all module files inside it.
    - In chat or agent-chat contexts, do not claim to have created folders or edited files unless the environment actually supports it. Instead, use the same module structure virtually, present the folder tree when helpful, and provide the file contents the user should use.
    - When reviewing an existing module in chat, ask for the specific files or snippets that are needed instead of assuming they are readable from disk.

2.  **Creating New Modules**:

    **Bước đầu tiên — Chọn phương án thiết kế UI**: Trước khi viết bất kỳ code nào, hỏi user hoặc tự đề xuất một trong hai phương án:

    | Phương án | Khi nào dùng |
    |---|---|
    | **A — `<fui-app>` config thuần** | Trang đơn giản: hiển thị dữ liệu, CRUD một bảng, form nhập liệu cơ bản. Ít file, dễ maintain. |
    | **B — Vue component (`uc-*.vue`)** | Giao diện phức tạp: dashboard nhiều vùng, layout tùy chỉnh, logic UI lặp lại nhiều nơi, hoặc `controls` trong `<fui-app>` vượt ~200 dòng. Component giúp AI và developer kiểm soát tốt hơn. |

    > Nếu user không chỉ định: **tự đề xuất** dựa trên mô tả yêu cầu — đừng tự ý chọn mà không thông báo. Giải thích ngắn lý do đề xuất và chờ xác nhận.

    - `index.vue` (Required): `<fui-app lang="json">` block for UI + logic config, `<script>` block for helper JS.
    - `style.css` (Optional): Module CSS.
    - `header.html` (Optional): Head inner content — external CSS/JS links, `<meta>`. Check `HTMLOnly` in `.fuix/modules/{moduleId}/info.json` first to know what belongs here.
    - `body.html` (Optional for HTMLOnly=false; the whole page for HTMLOnly=true).
    - `components/` (Optional): Custom Vue components.
    - If the environment is chat-only, return these as separate file payloads or clearly labeled code blocks.
    - When creating a custom Vue component, default to a reusable prop/event/slot API unless the user clearly needs a one-off component tied to a single screen.
    - Never add `<style>` or `<style scoped>` inside component files (dropped on publish). Put module CSS in `style.css`.
    - Never use backtick template strings inside Vue `<template>` markup.

3.  **Reference Docs & Component Selection**: Ưu tiên FUI `f-*` components — FUI đã xây dựng sẵn nhiều tính năng mặc định nên ít code hơn và tận dụng tốt hơn runtime. Chỉ dùng `v-*` khi không có FUI equivalent phù hợp. Tra cứu [component-quickref.md](references/component-quickref.md) và bảng ưu tiên trong [controls-patterns.md](references/controls-patterns.md).

    **Quy tắc chọn nhanh:** `f-button` thay `v-btn` · `f-date`/`f-time` thay text-field + date parsing · `f-search` thay `v-autocomplete` · `f-table` (CRUD) / `f-table-view` (readonly) thay `v-data-table` · `f-echart` cho **mọi** biểu đồ (`f-chart` đã bị loại).

    **Tier A — Core** (nạp đầu tiên cho bất kỳ FUI task):
    [controls-patterns.md](references/controls-patterns.md) · [ui-patterns.md](references/ui-patterns.md) · [module-structure.md](references/module-structure.md)

    **Tier B — Components** (khi thiết kế UI):
    [component-quickref.md](references/component-quickref.md) · [component-table.md](references/component-table.md) · [components-input.md](references/components-input.md) · [components-dialog.md](references/components-dialog.md) · [components-display.md](references/components-display.md) · [component-design.md](references/component-design.md) · [project-config.md](references/project-config.md)

    **Tier C — Domain** (khi cần đến):
    [tapi-reference.md](references/tapi-reference.md) · [pdfmake.md](references/pdfmake.md) · [watcher-patterns.md](references/watcher-patterns.md) · [advanced-techniques.md](references/advanced-techniques.md) · [coding-standards.md](references/coding-standards.md) · [fastproject.md](references/fastproject.md) · [default-function.md](references/default-function.md) · [script-map.md](references/script-map.md) · [ui-templates.md](references/ui-templates.md)

    **Tier D — Verification** (trước khi bàn giao):
    [verification.md](references/verification.md)

4.  **Design System**: Khi cần đưa ra quyết định thiết kế giao diện, áp dụng theo thứ tự ưu tiên sau:

    **Ưu tiên 1 — Project-local DESIGN.md**: Kiểm tra xem thư mục gốc của project (`{projectId}/DESIGN.md` trong workspace) có file DESIGN.md không. Nếu có, dùng file đó — bỏ qua mọi lựa chọn bên dưới.

    **Ưu tiên 2 — User chỉ định style**: Nếu user yêu cầu dùng một brand/style cụ thể (ví dụ "dùng style BMW", "theo phong cách Linear"), đọc `design-md/<brand>/DESIGN.md` để load design system tương ứng.

    **Ưu tiên 3 — AI tự phân tích và chọn**: Nếu không có file local và user không chỉ định, xem các thư mục con trong `design-md/` để biết các brand có sẵn, sau đó tự phân tích context (loại trang, mục đích, đối tượng người dùng) để chọn brand phù hợp nhất:
    - Module admin, CRUD, quản lý dữ liệu → đọc `design-md/fui/DESIGN.md`
    - Trang HTML công khai, landing page, trang giới thiệu → chọn brand phù hợp với tone/ngành của project
    - Không chắc → hỏi user trước khi chọn

5.  **Module Assessment**: When asked to review or assess a module, check structure, JSON standards, separation of concerns, edge cases, and best practices based on the FUI coding standards.

6.  **Editing the `<fui-app>` config**: Use valid JSON. Reference state with `vueData.` prefix.
    - In workspace-aware environments, edit the `<fui-app lang="json">` block inside `index.vue`.
    - In chat contexts, return the updated JSON content or a focused patch snippet without implying filesystem access.

7.  **UI Templates**: Reuse the templates from `examples/`, then modify APIs and fields.
    - In workspace-aware environments, copy or adapt the template files directly.
    - In chat contexts, inline the adapted template content in the response.

    **Available examples:**

    | File | Dùng khi |
    |---|---|
    | `component.vue` | Custom Vue component mẫu (uc-*) |
    | `module-patterns.json` | **Tham chiếu module hoàn chỉnh** — data/watch/controls kết hợp: menuChucNang, TypeLoad, addNew flag dialog, nested IF/THEN/ELSE, bulk action, openWindow+button+ctrlhotkey, _.find, pushRouter, f-menu inline, row-prop-object |
    | `f-table-patterns.json` | **Tham chiếu f-table chuyên sâu** — tất cả props, mọi loại header (t-check/t-select/t-button/t-link/t-menu/v-chip-group/v-icon/divider), ctrl-update đầy đủ, f-table trong dialog, default-item-only |
    | `project-patterns.json` | **Tham chiếu project runtime config** (`.fuix/runtime.json`) — cấu trúc đầy đủ: menuLeft/menu/menuStyle/menuComponent/domainSetting, right theo SystemRight+FunctionRight, quan hệ với `<fui-app>` set (override title/menu/apiDomain per page) |

## Continuous Improvement

After a complex task: ask _"Có bài học hay pattern nào cần bổ sung vào FUI skill không?"_. Nếu user chỉ ra sai lầm hoặc cách tốt hơn: cập nhật hoặc xóa thông tin trong `references/` ngay lập tức. Không để thông tin lỗi thời tồn tại trong skill.
