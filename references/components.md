# FUI Components (Source-Based)

This file is derived from `scripts/component.js` and focuses on FUI components with prefix `f-`.
If docs and source differ, follow source.

## Prefix and Binding Rules

- `f-*`: FUI components (defined in FUI runtime).
- `v-*`: Vuetify components (Vuetify props/events).
- `uc-*`: Custom module components from `components/`.
- In `module.json`, pass component props via `attr`.
- Prefer kebab-case in JSON for custom props (`api-upload`, `item-value`, `time-add`).
- For dynamic values use `:prop`.
- Use `v-on:*` in JSON (not `@*`).
- For component props without `:` (for example `url`, `api-upload`, `imageapi`), value is a plain string prop by default.
- Backtick/quote literal forcing is for Action `IN` mapping, not normal static component props.

## Minimal Control Pattern

```json
{
  "el": "f-date",
  "w": "6",
  "attr": {
    "v-model": "formData.fromDate",
    "label": "From date"
  }
}
```

## Component Catalog

### f-label

- Props (source): `items`, `text`, `color`, `iconText`
- Behavior: renders `v-chip` from `text` and/or `items`
- Example:

```json
{
  "el": "f-label",
  "w": "12",
  "attr": {
    "text": "Trang thai",
    "icon-text": "mdi-information"
  }
}
```

### f-box

- Props (source): `rowFormat`, `items`, `label`, `edit`, `saveclick`
- Emit: `input` when internal edited data changes
- Behavior: display/edit key-value rows, auto-build row format from data if missing
- Example:

```json
{
  "el": "f-box",
  "w": "12",
  "attr": {
    "label": "Thong tin",
    ":items": "detailData",
    ":edit": "isEditMode"
  }
}
```

### f-header

- Props (source): `label`
- Example:

```json
{
  "el": "f-header",
  "w": "12",
  "attr": { "label": "Bao cao tong hop" }
}
```

### f-title

- Props (source): `label`
- Example:

```json
{
  "el": "f-title",
  "w": "12",
  "attr": { "label": "Danh sach ho so" }
}
```

### f-radiobox

- Props (source): `label`, `items`, `itemValue`, `itemText`
- Emit: `input` on change
- Example:

```json
{
  "el": "f-radiobox",
  "w": "6",
  "attr": {
    "label": "Loai",
    "v-model": "formData.loai",
    ":items": "loaiOptions",
    "item-value": "value",
    "item-text": "text"
  }
}
```

### f-menu

- Props (source): `items`, `label`, `iconText`, `menuAttr`
- Behavior: each item can run `item.action` through `runAction`
- Example:

```json
{
  "el": "f-menu",
  "w": "3",
  "attr": {
    "label": "Tac vu",
    ":items": "menuActions",
    "icon-text": "mdi-dots-vertical"
  }
}
```

### f-search

- Props (source): `api`, `apiData`, `items`
- Emit: `input` when selection changes
- Behavior: debounced API search (500ms), ignores keyword length < 2
- Example:

```json
{
  "el": "f-search",
  "w": "6",
  "attr": {
    "v-model": "filter.userID",
    "api": "/api/user/search",
    ":api-data": { "Keyword": "TEXT", "GroupID": "vueData.groupID" },
    "item-text": "UserName",
    "item-value": "UserID"
  }
}
```

### f-button

- Props (source): `label`, `checkvalid`, `ctrlhotkey`, `iconText`, `action`, `includeData`
- Behavior:
  - debounced click (500ms, leading)
  - validates form when `checkvalid=true`
  - if `$attrs.target == 'dialog'`, opens window by attrs (`wid`, `title`, `url`, `onclose`)
- Example:

```json
{
  "el": "f-button",
  "w": "3",
  "attr": {
    "label": "Luu",
    "color": "primary",
    ":action": { "CALL": "handleSubmit" }
  }
}
```

### f-slider

- Props (source): `items`, `itemAttr`
- Behavior: wraps `v-carousel` and `v-carousel-item`
- Example:

```json
{
  "el": "f-slider",
  "w": "12",
  "attr": {
    ":items": "slideItems",
    ":item-attr": { "contain": true }
  }
}
```

### f-file-upload

- Props (source): `label`, `url`, `autoclose`, `iconText`, `filters`, `resize`, `onclose`
- Emit: `input` on upload complete
- Behavior:
  - uses Plupload
  - auto-upload on file selection
  - runs `onclose` action when dialog closes
- Example:

```json
{
  "el": "f-file-upload",
  "w": "4",
  "attr": {
    "label": "Tai tep",
    "url": "/api/upload/file",
    ":filters": {
      "max_file_size": "20mb",
      "mime_types": [{ "title": "PDF", "extensions": "pdf" }]
    },
    ":onclose": { "CALL": "handleUploadClosed" }
  }
}
```

### f-qrcode

- Props (source): `value`, `logo`, `color`, `size`
- Behavior: renders QR image from value
- Example:

```json
{
  "el": "f-qrcode",
  "w": "4",
  "attr": {
    "v-model": "formData.qrText",
    ":size": 200,
    "color": "#1e90ff"
  }
}
```

### f-qrcode-reader

- Props (source): `value`, `label`, `width`
- Emit: `input` (close dialog), `update` (decoded content)
- Example:

```json
{
  "el": "f-qrcode-reader",
  "w": "12",
  "attr": {
    "v-model": "scanDialog",
    "label": "Doc ma QR",
    "v-on:update": "CALL(vueData.handleScanResult, { item: $event })"
  }
}
```

### f-image-update

- Props (source): `value`, `label`, `title`, `apiUpload`, `iconText`, `imageType`, `size`, `quality`, `dialogWidth`, `dialogHeight`, `imageBoxAttr`, `imageAttr`, `buttonAttr`, `croperAttr`
- Emit: `update` after successful API upload (`{ returnData, imageData }`)
- Example:

```json
{
  "el": "f-image-update",
  "w": "4",
  "attr": {
    "v-model": "formData.avatar",
    "label": "Anh dai dien",
    "api-upload": "/api/upload/avatar",
    ":dialog-width": 600,
    ":dialog-height": 420
  }
}
```

### f-date

- Props (source): `value`, `label`, `dateAdd`, `required`
- Emit: `input` with normalized date (or `null`)
- Behavior:
  - supports typed mask and picker
  - accepts multiple input formats in initialization
  - `dateAdd` auto-sets date relative to today
- Example:

```json
{
  "el": "f-date",
  "w": "6",
  "attr": {
    "v-model": "filter.fromDate",
    "label": "Tu ngay",
    ":required": false,
    ":date-add": -7
  }
}
```

### f-time

- Props (source): `value`, `label`, `timeAdd`, `required`
- Emit: `input` with `HH:mm` (or `null`)
- Behavior: typed mask + time picker
- Example:

```json
{
  "el": "f-time",
  "w": "6",
  "attr": {
    "v-model": "formData.startTime",
    "label": "Gio bat dau",
    ":required": false,
    ":time-add": 30
  }
}
```

### f-time-counter

- Props (source): `value`, `type`, `labelFormat`, `format`
- Emit:
  - `input` (countdown seconds) when counting from seconds
  - `time-end` when timer reaches 0
- Example:

```json
{
  "el": "f-time-counter",
  "w": "4",
  "attr": {
    ":value": 300,
    ":type": 1,
    ":format": { "label": "Con lai: ", "second": " giay" }
  }
}
```

### f-chart

- Props (source): `data`, `type`, `options`, `reverseData`
- Behavior: wraps Chart.js and rebuilds chart when `data` changes
- Example:

```json
{
  "el": "f-chart",
  "w": "12",
  "attr": {
    ":data": "chartData",
    "type": "bar",
    ":options": "chartOptions",
    ":reverse-data": false
  }
}
```

### f-chart-data-viewer

- Props (source): `label`, `data`
- Behavior: computes percentage display from dataset
- Example:

```json
{
  "el": "f-chart-data-viewer",
  "w": "12",
  "attr": {
    "label": "Chi tiet bieu do",
    ":data": "chartViewerData"
  }
}
```

### f-window

- Props (source): `id`
- Behavior: internal iframe dialog host, usually opened by `openWindow(...)`
- Recommended action example:

```json
{
  "FUN": "openWindow",
  "IN": {
    "id": "`winUser",
    "url": "'/fp/module?mid=123'",
    "title": "Chi tiet user",
    "width": 1100
  }
}
```

### f-editor

- Props (source): `value`, `imageapi`, `height`, `toolbar`
- Emit: `input` with HTML content
- Behavior: wraps CKEditor with upload auth header
- Example:

```json
{
  "el": "f-editor",
  "w": "12",
  "attr": {
    "v-model": "formData.contentHtml",
    "imageapi": "/api/editor/upload",
    ":height": 360
  }
}
```

### f-editor-dialog

- Props (source): `value`, `imageapi`, `label`, `width`, `toolbar`
- Runtime expectation: `value` is used as object (`open`, `text`, `object`, `ok`), not plain string
- Behavior: modal editor and write-back on OK
- Example:

```json
{
  "el": "f-editor-dialog",
  "w": "6",
  "attr": {
    ":value": "editorState",
    "label": "Noi dung mo rong",
    ":width": 1000,
    "imageapi": "/api/editor/upload"
  }
}
```

### f-dialog

- Props (source): `value`, `data`, `dataOut`, `title`, `controls`, `watch`, `button`, `disableValidate`, `width`, `openAction`
- Emit:
  - `input` to open/close dialog
  - `update:data-out` when default data is prepared
  - `update:data` when button has `getoutdata=true`
- Behavior:
  - dynamically builds form from `controls`
  - supports local dialog watchers via `watch`
  - supports `openAction` when dialog opens
- Example:

```json
{
  "el": "f-dialog",
  "w": "12",
  "attr": {
    "v-model": "dialogOpen",
    ":data.sync": "dialogData",
    ":data-out.sync": "dialogOut",
    "title": "Cap nhat",
    ":controls": "dialogControls",
    ":button": "dialogButtons",
    ":open-action": { "CALL": "loadDialogDefaults" }
  }
}
```

### f-pdfmake

- Props (source): `data`
- Behavior: renders PDF in iframe, rerenders on deep `data` changes
- Example:

```json
{
  "el": "f-pdfmake",
  "w": "12",
  "attr": {
    ":data": "pdfDefinition",
    "height": "550"
  }
}
```

### f-excel-reader

- Props (source): `dateFormat`, `headerFormat`, `rawFormat`, `action`, `label`
- Emit: `input` with parsed sheet JSON
- Behavior: reads first sheet, optional `CALL(action)` after parse
- Example:

```json
{
  "el": "f-excel-reader",
  "w": "4",
  "attr": {
    "label": "Doc Excel",
    ":header-format": 1,
    ":raw-format": false,
    ":action": { "CALL": "handleExcelImported" },
    "v-model": "excelRows"
  }
}
```

## Practical Notes

1. Most `f-*` components pass unknown attrs through `v-bind=\"$attrs\"`; Vuetify attrs can still work if child is a Vuetify control.
2. Apply literal-string rule only when API/path strings are passed inside Action `IN` mapping.
3. For table-specific components, use `references/component-table.md`.
