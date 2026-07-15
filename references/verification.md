# FUI Definition-of-Done Checklists

Use these checklists before finishing any artifact. Each item is a gate — a module/SP/component is not ready if any required item is unchecked.

---

## Module Checklist

### Structure

- [ ] `index.vue` exists with a valid `<fui-app lang="json">` block (no trailing commas, no comments) — **validate trước khi ghi**: sau mỗi lần edit JSON dài, re-read để đảm bảo không có trailing comma sau element cuối cùng trong mảng/object
- [ ] Module metadata (`ModuleID`, `ModuleName`, `Framework`, `HTMLOnly`) present in `.fuix/modules/{moduleId}/info.json` (system-managed — do not hand-edit)
- [ ] Module CSS is in `style.css` (not in `header.html`, not in component `<style>` blocks)
- [ ] Import asset files are placed under `imports/` if the module uses external JS/CSS

### `<fui-app>` config — Data

- [ ] All reactive state variables declared in `data[]` before being referenced in actions
- [ ] All named actions are reachable (at least one `CALL` or `watch` or button click references each)
- [ ] No hardcoded IDs — inputs reference `vueData.someVar` not literal numbers
- [ ] `OUT` keys match declared state variable names exactly (case-sensitive)

### `<fui-app>` config — Actions

- [ ] Every `API` action has both `IN` and `OUT` (or `CALLBACK`) defined
- [ ] Every delete action has `CONFIRM` before `API`
- [ ] Every mutating action has a `CALLBACK` that either reloads data or shows `MESS`
- [ ] Literal string values in `IN` use backtick prefix or single-quote wrap: `` "`winId" `` or `"'text'"`
- [ ] `IF/THEN/ELSE` branches all have matching action structures
- [ ] No raw `EXE` blocks that duplicate logic already expressible in actions

### `<fui-app>` config — Controls

- [ ] `controls` array starts with `{ "prop": "fluid grid-list-md", "rows": [...] }`
- [ ] Every item in `cols` has a `w` property
- [ ] Events use `v-on:click` not `@click`
- [ ] No `children` key — nesting uses `innerHTML` array
- [ ] Permission gates use `col: { "v-if": "vueData.user.SystemRight>=N" }` (not on `attr`)
- [ ] All `v-if` expressions include `vueData.` prefix where referencing state
- [ ] Dialog containers use `el: "hidden-container"` — one per dialog

### `<fui-app>` config — Watch

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

### Before Publishing

- [ ] Local changes reviewed (diff) before pushing to the server
- [ ] User has explicitly approved the changes to be published

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
- [ ] No `DROP TABLE` / `ALTER TABLE` — table structure changes are the developer's responsibility

### Logic

- [ ] SP returns exactly what FUI `OUT` expects (column names match exactly)
- [ ] Error conditions use `RAISERROR` with severity 11+ (not silent failures)
- [ ] Transactions used for multi-step writes
- [ ] SP tested with representative input before deploy

### Before Deploy

- [ ] Full SP body reviewed before deploy
- [ ] Summary presented to user: SP name, operation type (CREATE/ALTER), affected tables
- [ ] User has explicitly confirmed the deploy

---

## Vue Component Checklist (`uc-*.vue`)

### File

- [ ] Filename starts with `uc-` prefix
- [ ] No `<style>` or `<style scoped>` block — module styles go in `style.css` (component `<style>` is dropped on publish)
- [ ] No backtick template strings inside `<template>`

### API Design

- [ ] All inputs declared as `props` with types
- [ ] Component emits events upward (`input`, `change`, `select`, `action`) rather than mutating parent state
- [ ] Props use neutral names (`items`, `value`, `label`) not screen-specific names
- [ ] Loading, empty, and error states handled (prop or slot)

### Behavior

- [ ] Component does not fetch data directly unless it is explicitly a data-owning component
- [ ] No hardcoded route/module paths inside the component
- [ ] No permission logic inside component — permission gating stays in the `<fui-app>` config

---

## Import File Checklist

- [ ] File type matches declared content type (`.js` → `application/javascript`, `.css` → `text/css`)
- [ ] `sort` >= 40 khi thêm import mới — giá trị 1–39 dành cho hệ thống, không dùng
- [ ] Content tested locally before pushing
- [ ] No sensitive data (tokens, passwords) in JS/CSS import files

---

## Debug Workflow — Sau khi publish có lỗi

Khi server báo lỗi hoặc trang hiển thị sai sau khi publish:

1. **Review file vừa sửa trước tiên** — đọc lại toàn bộ file đã chỉnh sửa trong lần publish đó, không nhảy sang nguyên nhân khác
2. Nếu file trông đúng: xem lại diff local-vs-server để kiểm tra server đang lưu gì so với local
3. Nếu diff báo `Controls: 0` / `Data keys: 0`: đó là server đang giữ bản cũ bị lỗi, không phải local — push lại để ghi đè
4. Chỉ khi local file đã xác nhận đúng mà lỗi vẫn còn: mới kiểm tra các file khác (`index.vue` `<script>`, `header.html`, `style.css`, `imports/`)
