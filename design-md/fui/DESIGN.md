---
version: 1
name: FUI-design-system
description: "FUI design system dựa trên Vuetify 2 + Material Design 2, rút ra từ codebase thực tế. Light mode, enterprise admin. Primary blue (#1976D2) là màu duy nhất cho action chính. Input fields dùng outlined+dense+hide-details theo defaultControlAttr (FUI runtime tự apply — không cần viết lại trong module.json). Toolbar bên trong dialog dùng dense+flat không có color. Card trong dialog không dùng elevation hay outlined — chỉ style padding:0. f-button mặc định elevation:0, color:primary, checkvalid:false."

colors:
  primary: "#1976D2"
  primary-text: "primary--text"
  warning: "#FB8C00"
  success: "#4CAF50"
  error: "#FF5252"
  action-main: "primary"
  action-delete: "warning"
  action-positive: "success"
  action-register: "green"
  conditional: "(condition ? 'red' : 'primary')"

icons:
  save: "mdi-content-save"
  delete: "mdi-delete"
  search: "mdi-magnify"
  close: "mdi-close"
  add-user: "mdi-account-multiple-plus"
  remove-user: "mdi-account-multiple-minus"
  edit: "mdi-pencil"
  filter: "mdi-filter"
  refresh: "mdi-refresh"
  upload: "mdi-cloud-upload-outline"
  download: "mdi-download"
  print: "mdi-printer"
  settings: "mdi-cog"
  eye: "mdi-eye"
  lock: "mdi-lock"
  check: "mdi-check-bold"

layout:
  main-container: "grid-list-md fluid"
  dialog-container: "hidden-container"
  centered-narrow: "grid-list-md mw-1000"
  page-with-nav: "page-container grid-list-md fluid"
  dialog-inner: "grid-list-md px-4"
---

# FUI Design System

Tài liệu này mô tả cách viết UI chuẩn cho FUI modules. Tất cả patterns rút từ codebase thực tế, không phải lý thuyết.

---

## 1. Defaults do FUI Runtime tự apply (không cần viết trong module.json)

`defaultControlAttr` trong FUI runtime tự inject các attr sau khi render. **Không cần** viết lại trong module.json:

| Component | Defaults tự inject |
|---|---|
| `v-text-field` | `outlined, dense, hide-details, required:true` |
| `v-textarea` | `outlined, dense` |
| `v-select` | `outlined, dense, hide-details, required:true, menu-props:{offsetY:true}` |
| `v-combobox` | `outlined, dense, hide-details, required:true, menu-props:{offsetY:true}` |
| `v-autocomplete` | `outlined, dense, hide-details, auto-select-first:true` |
| `v-checkbox` | `class:mt-1, hide-details` |
| `v-switch` | `dense, hide-details, class:my-1 mx-0` |
| `v-card` | `outlined:true` |
| `v-btn` | `elevation:0` |
| `f-button` | `elevation:0, color:primary` |
| `f-table` | `dense, fixed-header, hide-default-footer, show-search, items-per-page:50` |
| `f-table-view` | `dense, fixed-header, hide-default-footer, show-search, disabled-update:true` |
| `f-dialog` | `outlined, dense` |
| `f-date` | `outlined, dense, hide-details, picker.locale:vi` |
| `f-time` | `outlined, dense, hide-details` |
| `f-search` | `outlined, dense, hide-details, auto-select-first:true` |

**Hệ quả thực tế:** Khi viết module.json, một input field chỉ cần:
```json
{ "el": "v-text-field", "attr": { "v-model": "vueData.form.Name", "label": "Họ và tên" }, "w": 12 }
```
Không cần thêm `outlined`, `dense`, `hide-details` — runtime tự thêm.

---

## 2. Colors — Quy tắc dùng màu

| Màu | Khi nào dùng |
|---|---|
| `primary` | Mọi action chính: Save, Add, Search, View, mở dialog |
| `warning` | Delete, Permission denied, Remove — destructive nhưng không nguy hiểm cao |
| `success` | Action positive không xóa dữ liệu: Update permission, Scan |
| `green` | Đăng ký, Register — dùng với `:outlined:true` |
| conditional | `"(vueData.item.Active == 0 ? 'red' : 'primary')"` — trạng thái toggle |

**Rule cốt lõi:** Chỉ một màu accent trên một màn hình. Không mix nhiều màu cùng cấp.

---

## 3. Toolbar — Chỉ dùng trong dialog

Toolbar trong FUI module **không bao giờ có** `color` hay `dark`. Pattern chuẩn bên trong `v-card`:

```json
{
  "el": "v-toolbar",
  "attr": { "dense": "", "flat": "" },
  "innerHTML": [
    { "el": "v-toolbar-title", "innerHTML": "Tên Dialog" },
    { "el": "v-spacer" },
    {
      "el": "v-btn",
      "attr": { "icon": "", "v-on:click": "vueData.dlTen = false" },
      "innerHTML": [{ "el": "v-icon", "innerHTML": "mdi-close" }]
    }
  ]
}
```

**Không dùng:** `color="primary"`, `dark`, `elevation`, `tile` trên toolbar trong dialog.

---

## 4. Dialog — Cấu trúc chuẩn

Dialog luôn nằm trong `hidden-container`. Cấu trúc đầy đủ:

```json
{
  "prop": "hidden-container",
  "rows": [
    {
      "prop": "",
      "cols": [
        {
          "el": "v-dialog",
          "col": {},
          "attr": { "v-model": "vueData.dlTen", "width": 650 },
          "innerHTML": [
            {
              "el": "v-card",
              "attr": { "style": "padding: 0px;" },
              "innerHTML": [
                {
                  "el": "v-toolbar",
                  "attr": { "dense": "", "flat": "" },
                  "innerHTML": [
                    { "el": "v-toolbar-title", "innerHTML": "Tiêu đề" },
                    { "el": "v-spacer" },
                    { "el": "v-btn", "attr": { "icon": "", "v-on:click": "vueData.dlTen = false" },
                      "innerHTML": [{ "el": "v-icon", "innerHTML": "mdi-close" }] }
                  ]
                },
                {
                  "el": "v-container",
                  "attr": { "class": "grid-list-md px-4" },
                  "innerHTML": [
                    {
                      "el": "v-layout",
                      "w": 12,
                      "attr": { "row": "", "wrap": "" },
                      "innerHTML": [
                        { "el": "div", "attr": { "class": "mt-2" }, "innerHTML": "Họ tên", "w": 3 },
                        { "el": "v-text-field", "col": {}, "attr": { "class": "flex-md-grow-0 ml-2", "v-model": "vueData.form.Name" }, "w": 9 }
                      ]
                    }
                  ]
                },
                {
                  "el": "v-card-actions",
                  "innerHTML": [
                    { "el": "v-spacer" },
                    { "el": "f-button", "attr": { "label": "Lưu", "icon-text": "mdi-content-save",
                        ":checkvalid": false, "action": { "API": "...", "IN": {}, "CALLBACK": {} } }, "w": 2 }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**Width conventions:**
| Width | Dùng cho |
|---|---|
| 400 | Dialog nhỏ: confirm, function right, module select |
| 550 | Dialog trung bình: department update |
| 600 | Add right, department |
| 650 | Form user info chuẩn |
| 800 | Dialog lớn có table bên trong |

**Không dùng:** `persistent`, `fullscreen`, `scrollable`, `transition` trừ khi có lý do cụ thể.

---

## 5. Form Layout bên trong Dialog

Pattern chuẩn: label `div` (w:3) + input (w:9). Không dùng `v-label` hay component label riêng.

```json
{ "el": "v-layout", "w": 12, "attr": { "row": "", "wrap": "" }, "innerHTML": [
    { "el": "div", "attr": { "class": "mt-2" }, "innerHTML": "Họ và tên", "w": 3 },
    { "el": "v-text-field", "col": {}, "attr": { "class": "flex-md-grow-0 ml-2", "v-model": "vueData.form.FullName" }, "w": 9 },

    { "el": "div", "attr": { "class": "mt-2" }, "innerHTML": "Phòng ban", "w": 3 },
    { "el": "v-select", "col": {}, "attr": { "class": "flex-md-grow-0 ml-2", "v-model": "vueData.form.DeptID",
        ":items": "vueData.deptList", "item-text": "DeptName", "item-value": "DeptID" }, "w": 9 }
]}
```

**CSS classes hay dùng trong form:**
- Label div: `class: "mt-2"` (margin top để căn chỉnh với input)
- Input col: `class: "flex-md-grow-0 ml-2"` (shrink + margin left)

---

## 6. Toolbar chính của màn hình (row filter + buttons)

Row đầu tiên của màn hình thường chứa filter + action buttons:

```json
{
  "prop": "",
  "cols": [
    {
      "el": "v-autocomplete",
      "col": { "class": "shrink" },
      "attr": { "class": "flex-md-grow-0 my-2", "v-model": "vueData.sFilter",
          "label": "Lọc theo...", ":items": "vueData.dsList",
          "item-text": "Name", "item-value": "ID", ":required": false },
      "w": "350"
    },
    {
      "el": "f-button",
      "col": { "class": "shrink" },
      "attr": { "class": "my-2", "label": "Tìm", "icon-text": "mdi-magnify",
          ":checkvalid": false, "action": { "CALL": "vueData.search" } }
    },
    {
      "el": "f-button",
      "col": { "class": "shrink" },
      "attr": { "class": "my-2", "label": "Thêm", "icon-text": "mdi-account-multiple-plus",
          ":checkvalid": false, "action": { "EXE": "vueData.dlThem = true" } }
    }
  ]
}
```

**Width cho filter inputs trên toolbar:** Dùng pixel (`"w": "350"`, `"w": "200"`) thay vì grid columns.

---

## 7. f-button — Quy tắc

```json
{
  "el": "f-button",
  "attr": {
    "label": "Lưu",
    "icon-text": "mdi-content-save",
    ":checkvalid": false,
    "action": { "API": "/me/Save", "IN": { "Name": "vueData.form.Name" }, "CALLBACK": { "MESS": "Đã lưu" } }
  },
  "w": 2
}
```

**`:checkvalid`:**
- `false` (default): **Hầu hết buttons** — không cần validate form trước
- `true`: Chỉ khi button là Save của form có validation (user registration, connection string)

**Color mapping:**
| color | label | icon-text | Khi nào |
|---|---|---|---|
| `primary` (default) | Lưu | mdi-content-save | Lưu dữ liệu |
| `primary` | Tìm | mdi-magnify | Search/filter |
| `primary` | Thêm | mdi-account-multiple-plus | Mở dialog thêm |
| `warning` | Xóa | mdi-delete | Xóa dữ liệu |
| `warning` | Từ chối | mdi-cancel | Permission denied |
| `success` | Cập nhật | mdi-shield-edit | Update quyền |

---

## 8. f-table — Cấu trúc chuẩn

```json
{
  "el": "f-table",
  "col": { "v-if": "vueData.user.SystemRight > 1" },
  "attr": {
    "label": "Danh sách",
    ":items": "vueData.dataList",
    "item-key": "ID",
    ":items-per-page": -1,
    ":hide-default-footer": true,
    ":fixed-header": true,
    ":height": "$( window ).height()-285"
  },
  "w": 12
}
```

**`:items-per-page`:**
- `-1` (default): Hiển thị tất cả, không phân trang — dùng khi có `hide-default-footer: true`
- `50`: Khi cần phân trang, bỏ `hide-default-footer`

**Permission guard:** Luôn đặt `v-if` trên `col` wrapper, không phải trên element:
```json
"col": { "v-if": "vueData.user.SystemRight > 1" }
```

**Dynamic height:** `":height": "$( window ).height()-285"` hoặc `"window.innerHeight - 250"` — điều chỉnh số tùy chiều cao header.

**Inline column types (trong `headers` array):**
| el | Dùng cho |
|---|---|
| `t-button` | Action button trong row |
| `t-select` | Dropdown inline edit |
| `t-check` | Toggle on/off |
| `t-menu` | Context menu cho row |
| `v-icon` | Icon indicator (conditional color) |
| `v-chip-group` | Nhóm chip tags |

---

## 9. Layout — Container Patterns

**Main page container:**
```json
{ "prop": "grid-list-md fluid", "rows": [...] }
```

**Centered narrow (form/login page):**
```json
{ "prop": "grid-list-md mw-1000", "rows": [...] }
```

**Page với side navigation:**
```json
{ "prop": "page-container grid-list-md fluid", "rows": [
    { "prop": "page-navigation", "cols": [...] },
    { "prop": "row", "cols": [...] }
]}
```

**Container chứa dialogs (bắt buộc):**
```json
{ "prop": "hidden-container", "rows": [
    { "prop": "", "cols": [ { "el": "v-dialog", ... } ] }
]}
```

---

## 10. Context Menu — t-menu pattern

Khi một row có nhiều actions, dùng `t-menu` thay vì nhiều `t-button`:

```json
// Trong headers array:
{ "el": "t-menu", "width": "120px", "align": "center", "text": "Tác vụ", "value": "Actions",
  "attr": { ":items": "vueData.menuActions" } }

// Trong data section:
"menuActions": [
  { "color": "primary", "icon-text": "mdi-pencil", "text": "Chỉnh sửa",
    "action": { "EXE": "vueData.openEdit(item)" } },
  { "color": "warning", "icon-text": "mdi-delete", "text": "Xóa",
    "action": { "CONFIRM": "Bạn có chắc muốn xóa?", "API": "...", "IN": { "ID": "item.ID" } } }
]
```

---

## 11. Destructive Actions — Luôn có CONFIRM

Mọi action xóa dữ liệu phải có `CONFIRM`:

```json
{
  "CONFIRM": "Bạn có chắc muốn xóa?",
  "API": "/me/Delete",
  "IN": { "ID": "vueData.selectedID" },
  "CALLBACK": { "CALL": "vueData.loadData" }
}
```

Update có tác động lớn (system right, connection string) cũng cần `CONFIRM`.

---

## 12. Icons — Bảng chuẩn

| Icon | Dùng cho |
|---|---|
| `mdi-content-save` | Save / Lưu |
| `mdi-delete` | Xóa |
| `mdi-magnify` | Tìm kiếm |
| `mdi-close` | Đóng dialog |
| `mdi-refresh` | Tải lại |
| `mdi-plus` | Thêm mới (generic) |
| `mdi-pencil` | Sửa |
| `mdi-account-multiple-plus` | Thêm user |
| `mdi-account-multiple-minus` | Xóa user |
| `mdi-account-details` | Chi tiết user |
| `mdi-shield-edit` | Cập nhật quyền |
| `mdi-shield-account-outline` | User permission |
| `mdi-lock-open-plus` | Cấp quyền |
| `mdi-lock-open-remove` | Thu hồi quyền |
| `mdi-check-bold` | Trạng thái active |
| `mdi-lock` | Trạng thái locked |
| `mdi-cancel` | Từ chối / Denied |
| `mdi-cloud-upload-outline` | Upload file |
| `mdi-download` | Tải xuống |
| `mdi-filter` | Lọc |
| `mdi-folder-edit-outline` | Xem/sửa chi tiết |

---

## 13. Do's and Don'ts

### Do
- Dùng `hidden-container` để wrap tất cả dialogs.
- Dùng `dense flat` cho toolbar bên trong dialog — không thêm color hay dark.
- Dùng `style="padding: 0px;"` cho v-card trong dialog.
- Đặt `v-if` permission guard trên `col` wrapper, không phải trên element.
- Dùng `:items-per-page: -1` + `hide-default-footer: true` cho table không cần phân trang.
- Dùng `CONFIRM` trước mọi action xóa dữ liệu.
- Dùng pixel width (`"w": "350"`) cho filter inputs trên toolbar row.
- Dùng `class: "mt-2"` cho label div và `class: "flex-md-grow-0 ml-2"` cho input trong form 3+9.
- Dùng `:checkvalid: false` cho hầu hết f-button (chỉ `true` khi cần validate form đăng ký).
- Conditional color: `"(item.Active == 0 ? 'red' : 'primary')"` cho status toggles.

### Don't
- Đừng viết lại `outlined`, `dense`, `hide-details` trong module.json — runtime tự inject từ `defaultControlAttr`.
- Đừng dùng `color="primary" dark` cho toolbar trong dialog.
- Đừng thêm `elevation` hay `outlined` cho v-card trong dialog.
- Đừng dùng `persistent`, `fullscreen` cho dialog thông thường.
- Đừng dùng nhiều màu accent trên cùng một màn hình — chỉ primary + một màu semantic.
- Đừng để button xóa màu `error` (đỏ) — dùng `warning` (cam).
- Đừng hardcode height cho table — dùng `$( window ).height()-N` để responsive.
- Đừng dùng `@click` trong JSON — luôn dùng `v-on:click`.
