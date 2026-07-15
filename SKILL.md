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

## MCP Tool Workflow

These are the MCP tools for working with FUI modules locally. The user may refer to them by informal names — map them to the correct tool.

> **Local file model.** Regardless of tool payload naming, the on-disk layout is the current one: config + logic in `index.vue` (`<fui-app>` + `<script>`), `body.html`, `style.css`, `header.html`, `components/uc-*.vue`, and system metadata under `.fuix/`. Map any legacy `module.json`/`script.js`/`_moduleInfo.json`/`_components.json`/`_imports.json` mentioned by a tool onto their new equivalents (see [module-structure.md](references/module-structure.md)).

| Tool | Also called | What it does |
| :--- | :--- | :--- |
| **Session** | | |
| `session_resolve` | "resolve target" | Resolve a /project/module path to real IDs |
| `session_get` | "module nào đang active", "đang làm module gì" | Show the currently active module target |
| `session_set` | "chọn module", "đổi module đang làm việc" | Set which module the session is working on |
| `session_clear` | "bỏ active module" | Clear the active module target |
| **Project** | | |
| `project_list` | "danh sách project" | List all FUI projects |
| `project_save` | "tạo project", "cập nhật project" | Create or update a project |
| `project_get_data` | "lấy project.json" | Get the runtime JSON config of a project |
| `project_update_data` | "cập nhật project.json" | Update project runtime config |
| `project_sync` | "đồng bộ project", "refresh project" | Force re-fetch project-level data (project.json, modules list, components, imports) |
| **Module** | | |
| `module_list` | "danh sách module" | List all modules in a project |
| `module_new` | "tạo module mới" | Create a new module; auto-syncs .fuix/modules.json |
| `module_get` | "xem module", "đọc module", "show module" | Fetch declarations: module metadata, the `<fui-app>` config + `<script>` (index.vue), imports list, component names, header.html, body.html, style.css |
| `module_checkout` | "lấy module về", "down", "clone module", "tải về local" | Fetch module + project data from FUI server → write to local workspace files |
| `module_sync` | "refresh", "cập nhật lại", "pull mới nhất" | Re-fetch module from server and overwrite the local workspace |
| `module_sync_list` | "sync danh sách module" | Re-fetch module list → overwrite local .fuix/modules.json |
| `module_get_ui` | "lấy config UI" | Get module UI JSON (the `<fui-app>` config in index.vue) |
| `module_get_html` | "lấy header/body html" | Get module header.html, body.html, and style.css |
| `module_update_ui` | "cập nhật config UI" | Update module UI JSON on server |
| `module_update_import` | "cập nhật import module" | Update module import config |
| `module_preview` | "xem trước", "kiểm tra trước khi up", "diff" | Compare local vs server — show what would change, generate approval token |
| `module_publish_staged` | "up module", "đẩy lên", "push", "lưu lên server" | Push local workspace changes to FUI server (requires approval token from preview) |
| `module_publish` | "publish trực tiếp" | Publish module directly without staged workflow |
| **Component** | | |
| `component_get` | "xem component", "đọc component vue" | Fetch .vue source of one specific component |
| `component_publish` | "up component", "push component" | Publish a Vue component; auto-syncs the component registry (.fuix) with real server IDs |
| `component_sync` | "sync component" | Re-fetch component list → overwrite local .fuix component registry |
| **Script** | | |
| `script_publish` | "up script", "push script" | Publish the module `<script>` (index.vue script block) |
| **Import Files** | | |
| `file_import_list` | "danh sách import file" | List JS/CSS import files for a project or module |
| `file_import_get` | "lấy nội dung file import" | Get source code of an inline import file |
| `file_import_upload` | "cập nhật nội dung file" | Update source code of an inline import file |
| `file_import_new` | "thêm import file" | Add a new import file; auto-syncs the import registry (.fuix) |
| `file_import_update` | "cập nhật import file" | Update metadata of an import file |
| `file_import_delete` | "xóa import file" | Delete an import file |
| `file_import_sync` | "sync import" | Re-fetch import list → overwrite local .fuix import registry |
| **Skill** | | |
| `skill_get` | "lấy skill rules" | Get FUI skill rules for the current project |
| **DB Credentials** | | |
| `db_user_token_set` | "lưu user token", "set userToken", "token để gọi API" | Save Bearer token (userToken) for calling deployed APIs (spAPI_*) — scans workspace if omitted |
| `db_token_rebuild` | "đổi password DB", "rebuild dbToken", "cập nhật kết nối DB" | Rebuild dbToken from uid+password (reads sqlServer/database from saved config) |
| **Design** | | |
| `design_list` | "danh sách design", "có style nào" | List all available brand design systems |
| `design_get` | "lấy design", "dùng style X" | Load DESIGN.md for a specific brand (e.g. `fui`, `linear`, `bmw`) |

**Sequential fetch workflow** (khi không checkout về local):
1. `module_get` → nhận JSON declarations + HTML + script (payload nhỏ, không có .vue code)
2. `component_get` → gọi riêng từng component cần xem/sửa

**Workspace workflow** (recommended cho editing):
`module_checkout` → edit files in local workspace → `module_preview` → user approves → `module_publish_staged`

## Instructions

0.  **Bắt buộc nạp reference trước khi làm — KHÔNG bỏ qua bước này**:

    Trước khi bắt đầu bất kỳ FUI task nào, phải đọc các reference liên quan. Không được bắt đầu viết code/JSON dựa thuần vào training data.

    | Loại task | Phải đọc trước |
    |---|---|
    | Bất kỳ task nào liên quan FUI | Tier A: `controls-patterns.md` · `ui-patterns.md` · `module-structure.md` |
    | Thiết kế UI, chọn component | + Tier B: `component-quickref.md` · `component-table.md` · `components-input.md` |
    | Gọi API, viết SP | + Tier C: `tapi-reference.md` |
    | Kết nối DB | + Tier C: `db-workflow.md` |

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
    [tapi-reference.md](references/tapi-reference.md) · [db-workflow.md](references/db-workflow.md) · [pdfmake.md](references/pdfmake.md) · [watcher-patterns.md](references/watcher-patterns.md) · [advanced-techniques.md](references/advanced-techniques.md) · [coding-standards.md](references/coding-standards.md) · [fastproject.md](references/fastproject.md) · [default-function.md](references/default-function.md) · [script-map.md](references/script-map.md) · [ui-templates.md](references/ui-templates.md)

    **Tier D — Operations** (khi publish/deploy):
    [tools-registry.md](references/tools-registry.md) · [verification.md](references/verification.md)

4.  **Design System**: Khi cần đưa ra quyết định thiết kế giao diện, áp dụng theo thứ tự ưu tiên sau:

    **Ưu tiên 1 — Project-local DESIGN.md**: Kiểm tra xem thư mục gốc của project (`{projectId}/DESIGN.md` trong workspace) có file DESIGN.md không. Nếu có, dùng file đó — bỏ qua mọi lựa chọn bên dưới.

    **Ưu tiên 2 — User chỉ định style**: Nếu user yêu cầu dùng một brand/style cụ thể (ví dụ "dùng style BMW", "theo phong cách Linear"), gọi `design_get("<brand>")` để load design system tương ứng.

    **Ưu tiên 3 — AI tự phân tích và chọn**: Nếu không có file local và user không chỉ định, gọi `design_list` để xem danh sách các style có sẵn, sau đó tự phân tích context (loại trang, mục đích, đối tượng người dùng) để chọn brand phù hợp nhất:
    - Module admin, CRUD, quản lý dữ liệu → `design_get("fui")`
    - Trang HTML công khai, landing page, trang giới thiệu → chọn brand phù hợp với tone/ngành của project
    - Không chắc → hỏi user trước khi chọn

5.  **DB Tools — Quy trình và quy tắc bắt buộc**:

    **Phân loại tool:** Tra cứu [tools-registry.md](references/tools-registry.md) để biết mức độ rủi ro chính xác của từng tool trước khi gọi.

    **Quy tắc 0 — Xác nhận projectId trước khi kết nối DB:**
    Thông tin kết nối lưu vào `{projectId}/_db/` — projectId thường tương ứng với alias của database. Nếu user không chỉ rõ hoặc chưa rõ alias thuộc project nào → **hỏi xác nhận** trước khi gọi `db_connect`. Không tự đoán rồi gọi luôn.

    **Quy tắc 1 — Cấm DROP TABLE / ALTER TABLE:**
    Không được thực thi và không được gợi ý `DROP TABLE` hay `ALTER TABLE` trong bất kỳ ngữ cảnh nào — kể cả bên trong script tạo SP/function. Các thay đổi cấu trúc bảng phải do lập trình viên tự thực hiện. Code đã block ở level tool.

    **Quy tắc 2 — Cấm DELETE / UPDATE không có WHERE:**
    Không gọi `db_sql_execute_nonquery` với câu DELETE hoặc UPDATE không có mệnh đề WHERE. Nếu có yêu cầu dạng này, chỉ hiển thị SQL để user copy và tự quyết định — không thực thi tự động. Code đã block ở level tool.

    **Quy tắc 3 — Auto-log trước khi sửa SP/function:**
    `db_sp_deploy` tự động lưu định nghĩa hiện tại của SP vào `_db/sp-history/{name}_{timestamp}.sql` trước khi deploy. Nếu cần rollback: đọc file history cũ, đặt lại vào `_db/sp/{name}.sql` và deploy lại.

    **Quy tắc 4 — Xác nhận trước khi thực thi SQL:**
    Trước khi gọi `db_sql_execute` (SELECT lấy dữ liệu user) hoặc `db_sql_execute_nonquery` với INSERT/UPDATE/DELETE, phải:
    1. Trình bày ngắn gọn: query làm gì, dữ liệu nào bị ảnh hưởng, số dòng ước tính nếu có
    2. Đợi xác nhận từ lập trình viên trước khi gọi tool

    **GRANT EXECUTE:** `db_sp_deploy` chỉ tự động `GRANT EXECUTE TO public` khi script chứa `CREATE PROCEDURE`. Với `ALTER PROCEDURE` thì **không cần** grant lại.

    **Giới hạn dữ liệu khi truy vấn (CRITICAL):** Dữ liệu thực tế có thể rất lớn — nếu không giới hạn, response sẽ vượt quá khả năng xử lý của context.

    - **`db_sql_execute`**: Luôn thêm `TOP 20` (hoặc ít hơn nếu chỉ cần xem cấu trúc). Không SELECT cột kiểu binary, image, varbinary(max), nvarchar(max) trừ khi được yêu cầu cụ thể.

    **Quy trình viết SP phức tạp — không test API trực tiếp:**
    Không gọi `spAPI_*` để test trừ khi user yêu cầu rõ ràng (tốn chi phí). Thay vào đó, kiểm tra logic bằng cách:
    1. Viết và chạy từng sub-query nhỏ riêng lẻ qua `db_sql_execute` với `TOP 10–20` để xác nhận dữ liệu đúng
    2. Từng bước ghép các sub-query lại thành query hoàn chỉnh
    3. Chỉ deploy SP khi đã xác nhận logic đúng qua các bước trên

6.  **Module Assessment**: When asked to review or assess a module, check structure, JSON standards, separation of concerns, edge cases, and best practices based on the FUI coding standards.

7.  **Editing the `<fui-app>` config**: Use valid JSON. Reference state with `vueData.` prefix.
    - In workspace-aware environments, edit the `<fui-app lang="json">` block inside `index.vue`.
    - In chat contexts, return the updated JSON content or a focused patch snippet without implying filesystem access.

8.  **UI Templates**: Reuse the templates from `examples/`, then modify APIs and fields.
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

## Skill Sync — Cập nhật memory sau khi sync

Sau mỗi lần `skill_sync` hoặc `skill_get` trả về nội dung mới, thực hiện ngay:

1. **Đọc lại các file reference đã thay đổi** — so sánh với những gì đã biết trong session
2. **Cập nhật memory** nếu có kiến thức mới đáng ghi nhớ lâu dài:
   - Pattern mới trong `references/` → ghi vào `project` hoặc `feedback` memory
   - Tool mới hoặc thay đổi hành vi tool → cập nhật memory liên quan
   - Quy tắc mới được bổ sung → ghi ngay để áp dụng từ lần sau
3. **Xóa memory cũ** nếu skill đã override thông tin lỗi thời

**Trigger tự động:** Sau `skill_sync` thành công, không cần user nhắc — tự đọc lại `SKILL.md` và các reference đã cập nhật, sau đó ghi memory tương ứng.

**Ưu tiên ghi nhớ:**
- Quy tắc bắt buộc (CRITICAL, bắt buộc, cấm) → ghi vào `feedback` memory
- Pattern thực tế từ codebase → ghi vào `project` memory
- Thông tin đã có trong memory mà skill vừa mâu thuẫn → cập nhật/xóa memory cũ

