# FUI Table Components (Source-Based)

This file is derived from `scripts/componentTable.js`.
Focus: `f-table`, `f-table-view`, and `t-*` renderers.

## Prefix Reminder

- `f-table`, `f-table-view`: FUI components.
- `t-*`: FUI cell renderers for table columns.
- `v-data-table`: Vuetify internal implementation, but CRUD and table action flow comes from FUI wrappers.

## f-table

### Props (exact from source)

`value`, `headers`, `updateForm`, `updateFormAttr`, `updateApi`, `items`, `label`, `excel`, `showSearch`, `sumFormat`, `disabledHover`, `returnObject`, `itemKey`, `itemsPerPage`, `disabledUpdate`, `hideDefaultFooter`, `template`, `headercomponent`

### Real Behavior

1. If a header item has `el`, table creates custom slot renderer automatically.
2. If `updateApi.new` or `updateApi['new-action']` exists, add button appears.
3. CRUD action slots rely on header `value: "ctrl-update"`.
4. Editing dialog is `f-dialog` with `updateForm`.
5. Selection result emit:
- if `returnObject=false`: emit array of `itemKey`
- if `returnObject=true`: emit selected row objects
6. Emits row events from slots: `click:row`, `mouseover:row`, `mouseleave:row`.

### updateApi Keys Used By Source

- `new`
- `edit`
- `delete`
- `default-item`
- `new-action`
- `edit-action`
- `data-out`

### Minimal CRUD Example

```json
{
  "el": "f-table",
  "w": "12",
  "attr": {
    "label": "Danh sach nhan vien",
    ":items": "items",
    "item-key": "ID",
    ":return-object": false,
    "show-search": true,
    "excel": true,
    ":headers": [
      { "text": "Ho ten", "value": "FullName" },
      { "text": "Email", "value": "Email" },
      { "text": "Trang thai", "value": "Active", "el": "t-boolean", "align": "center", "width": "90px" },
      { "text": "Tac vu", "value": "ctrl-update", "align": "center", "width": "120px" }
    ],
    ":update-form": [
      { "el": "v-text-field", "attr": { "v-model": "FullName", "label": "Ho ten", ":required": true } },
      { "el": "v-text-field", "attr": { "v-model": "Email", "label": "Email", ":required": true } }
    ],
    ":update-api": {
      "default-item": { "FullName": "", "Email": "", "Active": true },
      "new": {
        "API": "/api/staff/create",
        "IN": { "FullName": "item.FullName", "Email": "item.Email", "Active": "item.Active" },
        "CALLBACK": { "CALL": "apiLoadItems" }
      },
      "edit": {
        "API": "/api/staff/update",
        "IN": { "ID": "item.ID", "FullName": "item.FullName", "Email": "item.Email", "Active": "item.Active" },
        "CALLBACK": { "CALL": "apiLoadItems" }
      },
      "delete": {
        "CONFIRM": "Xac nhan xoa?",
        "API": "/api/staff/delete",
        "IN": { "ID": "item.ID" },
        "CALLBACK": { "CALL": "apiLoadItems" }
      }
    }
  }
}
```

## f-table-view

### Props (exact from source)

`value`, `items`, `label`, `itemKey`, `excel`, `itemsPerPage`, `disabledUpdate`, `allwayVisible`, `showSearch`, `disabledHover`, `hideDefaultFooter`

### Real Behavior

1. Auto-build headers from data keys (`buildHeader`).
2. If `items` exists and `disabledUpdate=false`, auto-add delete column `ctrl-delete`.
3. If table does not use `show-select`, component emits full `dataItems` to `v-model`.
4. Supports search and excel export.

### Minimal Example

```json
{
  "el": "f-table-view",
  "w": "12",
  "attr": {
    "label": "Danh sach xem nhanh",
    ":items": "items",
    "item-key": "ID",
    "show-search": true,
    "excel": true,
    ":items-per-page": 20,
    ":allway-visible": true
  }
}
```

## t-* Cell Renderers

Use in `headers` by setting `el`.

Example header:

```json
{ "text": "Ngay tao", "value": "CreatedAt", "el": "t-time", "attr": { "format": "DD/MM/YYYY HH:mm" } }
```

### Supported `t-*` components

- `t-html`
- `t-label`
- `t-num`
- `t-time`
- `t-boolean`
- `t-check`
- `t-text`
- `t-select`
- `t-combobox`
- `t-menu`
- `t-link`
- `t-button`

### Notes

1. Editable renderers (`t-check`, `t-text`, `t-select`, `t-combobox`, `t-menu`, `t-button`) use `tableActionEvent`.
2. For dialog opening in row actions, use `target: "dialog"` plus `wid`, `url`, `title`, `onclose`.
3. Apply literal-string rule only in Action `IN` mapping.  
   Static component props without `:` are plain strings by default.
