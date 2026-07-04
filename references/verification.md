# FUI Definition-of-Done Checklists

Use these checklists before publishing any artifact. Each item is a gate — a module/SP/component is not ready if any required item is unchecked.

---

## Module Checklist

### Structure

- [ ] `_moduleInfo.json` exists with `ModuleID`, `ModuleName`, `Framework`, `mTitle`, `HTMLOnly`
- [ ] `module.json` exists and is valid JSON (no trailing commas, no comments) — **validate trước khi ghi**: sau mỗi lần edit JSON dài, mentally check hoặc re-read để đảm bảo không có trailing comma sau element cuối cùng trong mảng/object
- [ ] If custom components are used: `components/_components.json` exists and lists all `uc-*.vue` files
- [ ] `imports/_imports.json` exists if module imports external JS/CSS

### module.json — Data

- [ ] All reactive state variables declared in `data[]` before being referenced in actions
- [ ] All named actions are reachable (at least one `CALL` or `watch` or button click references each)
- [ ] No hardcoded IDs — inputs reference `vueData.someVar` not literal numbers
- [ ] `OUT` keys match declared state variable names exactly (case-sensitive)

### module.json — Actions

- [ ] Every `API` action has both `IN` and `OUT` (or `CALLBACK`) defined
- [ ] Every delete action has `CONFIRM` before `API`
- [ ] Every mutating action has a `CALLBACK` that either reloads data or shows `MESS`
- [ ] Literal string values in `IN` use backtick prefix or single-quote wrap: `` "`winId" `` or `"'text'"`
- [ ] `IF/THEN/ELSE` branches all have matching action structures
- [ ] No raw `EXE` blocks that duplicate logic already expressible in actions

### module.json — Controls

- [ ] `controls` array starts with `{ "prop": "fluid grid-list-md", "rows": [...] }`
- [ ] Every item in `cols` has a `w` property
- [ ] Events use `v-on:click` not `@click`
- [ ] No `children` key — nesting uses `innerHTML` array
- [ ] Permission gates use `col: { "v-if": "vueData.user.SystemRight>=N" }` (not on `attr`)
- [ ] All `v-if` expressions include `vueData.` prefix where referencing state
- [ ] Dialog containers use `el: "hidden-container"` — one per dialog

### module.json — Watch

- [ ] Watch keys reference declared state variables
- [ ] `deep-watch` used for nested object/array observation
- [ ] No watch entry calls an action that also triggers the same watch (infinite loop risk)

### UI Quality

- [ ] Vuetify 2 classes/props used before inline `style`
- [ ] `f-*` components chosen over raw `v-*` when FUI equivalent exists
- [ ] Tables use `f-table` (not `v-data-table`) for CRUD scenarios
- [ ] Tables use `f-table-view` (not `v-data-table`) for read-only display
- [ ] Charts use `f-echart` (not `f-chart`) when drilldown or advanced types are needed
- [ ] Date/time fields use `f-date`/`f-time` (not `v-text-field` + manual parsing)

### Publish Workflow

- [ ] `module_preview` run and diff reviewed before publishing
- [ ] User has explicitly approved the diff
- [ ] `module_publish_staged` called only after approval token received from preview

---

## Stored Procedure Checklist

### Naming

- [ ] Prefix is `spAPI_` (e.g., `spAPI_ContractList`, `spAPI_ContractInsert`)
- [ ] Name follows pattern: `spAPI_{Entity}{Action}` where Action is `List`/`Select`/`Insert`/`Update`/`Delete`/`Save`
- [ ] No spaces, no lowercase prefix (`sp_`, `SP_`, etc.)

### Parameters

- [ ] `@sys_UserID int` present in all write operations (INSERT/UPDATE/DELETE)
- [ ] `@sys_SystemRight int` present when permission check is needed
- [ ] Input parameters declared before system parameters
- [ ] No unused parameters

### Security

- [ ] Permission check at top: `IF @sys_SystemRight < N BEGIN RAISERROR('[Unauthorized]...', 11, 1) RETURN END`
- [ ] No direct string concatenation for SQL (use parameterized queries)
- [ ] `GRANT EXECUTE ON [spName] TO [public]` present after `CREATE PROCEDURE`
- [ ] `ALTER PROCEDURE` scripts do NOT include a new `GRANT EXECUTE` (not needed)

### Logic

- [ ] SP returns exactly what FUI `OUT` expects (column names match exactly)
- [ ] Error conditions use `RAISERROR` with severity 11+ (not silent failures)
- [ ] Transactions used for multi-step writes
- [ ] SP tested with representative input before deploy

### Deploy Workflow

- [ ] `db_sp_save` called first (save to local, no DB change)
- [ ] Full SP body reviewed in local file before deploy
- [ ] Summary presented to user: SP name, operation type (CREATE/ALTER), affected tables
- [ ] User has explicitly confirmed before `db_sp_deploy`

---

## Vue Component Checklist (`uc-*.vue`)

### File

- [ ] Filename starts with `uc-` prefix
- [ ] Registered in `_components.json`
- [ ] No `<style>` or `<style scoped>` block — styles go in `header.html`
- [ ] No backtick template strings inside `<template>`

### API Design

- [ ] All inputs declared as `props` with types
- [ ] Component emits events upward (`input`, `change`, `select`, `action`) rather than mutating parent state
- [ ] Props use neutral names (`items`, `value`, `label`) not screen-specific names
- [ ] Loading, empty, and error states handled (prop or slot)

### Behavior

- [ ] Component does not fetch data directly unless it is explicitly a data-owning component
- [ ] No hardcoded route/module paths inside the component
- [ ] No permission logic inside component — permission gating stays in `module.json`

---

## Import File Checklist

- [ ] File type matches declared `ContentType` (`.js` → `application/javascript`, `.css` → `text/css`)
- [ ] `sort` >= 40 khi thêm import mới — giá trị 1–39 dành cho hệ thống, không dùng
- [ ] Content tested locally before `file_import_upload`
- [ ] No sensitive data (tokens, passwords) in JS/CSS import files
- [ ] If updating an existing file: `file_import_get` called first to review current content

---

## Debug Workflow — Sau khi publish có lỗi

Khi server báo lỗi hoặc trang hiển thị sai sau khi publish:

1. **Review file vừa sửa trước tiên** — đọc lại toàn bộ file đã chỉnh sửa trong lần publish đó, không nhảy sang nguyên nhân khác
2. Nếu file trông đúng: chạy `module_preview` để xem diff — kiểm tra server đang lưu gì so với local
3. Nếu preview báo `Controls: 0` / `Data keys: 0`: đó là server đang giữ bản cũ bị lỗi, không phải local — push lại để ghi đè
4. Chỉ khi local file đã xác nhận đúng mà lỗi vẫn còn: mới kiểm tra các file khác (header.html, script.js, imports)

---

## Quick Risk Gate

Before any mutating tool call, answer:

| Question | If NO → |
|---|---|
| Is this a ReadOnly tool? | Confirm intent with user |
| Have I shown the user a summary? | Show summary first, then wait |
| Is this a 🔴 Destructive tool? | Require explicit user confirmation |
| For `module_publish_staged`: do I have an approval token? | Run `module_preview` first |
| For `db_sp_deploy`: has user seen the SP body? | Show SP body, wait for OK |

See [tools-registry.md](tools-registry.md) for the full per-tool classification.
