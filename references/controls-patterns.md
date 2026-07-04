# Controls Patterns & Logic

Guide to defining logic and layout in `module.json`.

---

## Ưu tiên FUI components — kiểm tra trước khi dùng `v-*`

FUI đã xây dựng sẵn các `f-*` component với nhiều tính năng mặc định (sort, search, CRUD, inline action, form validation, ...) — dùng `f-*` sẽ ít code hơn và tận dụng được toàn bộ tích hợp runtime. Chỉ dùng `v-*` khi FUI chưa có equivalent phù hợp.

| Ưu tiên dùng | Thay vì | Lý do ưu tiên |
|---|---|---|
| `f-table` | `v-data-table` (CRUD) | sort/search/inline action/CRUD tích hợp sẵn |
| `f-table-view` | `v-data-table` (readonly) | nhẹ hơn, tối ưu cho hiển thị thuần |
| `f-search` | `v-autocomplete` | API search, debounce, loading state có sẵn |
| `f-button` | `v-btn` (khi cần action FUI) | hỗ trợ CALL, hotkey, form validation |
| `f-date` / `f-time` | `v-text-field` + date parsing | picker + typed mask tích hợp sẵn |
| `f-menu` | `v-menu + v-btn` dropdown | cấu hình đơn giản hơn, tích hợp icon/action/link |
| `f-echart` | `f-chart` | `f-chart` đã bị loại khỏi FUI runtime |

> Trước khi dùng `v-*`, kiểm tra [component-quickref.md](component-quickref.md) — nếu có `f-*` equivalent thì ưu tiên dùng `f-*`.

**Default attrs tự động** — FUI inject sẵn default props cho mỗi `f-*` component (xem `defaultControlAttr` trong `scripts/component.js`). Chỉ khai báo prop khi muốn **override** giá trị mặc định, không cần lặp lại default:

| Component | Default đã có sẵn (không cần khai báo lại) |
|---|---|
| `f-table` | `:dense true` · `:show-search true` · `:fixed-header true` · `:items-per-page 50` · `:hide-default-footer true` · `mobile-breakpoint 0` |
| `f-table-view` | Tương tự `f-table` + `:disabled-update true` · `:show-select false` |
| `f-button` | `color primary` · `elevation 0` |
| `f-date` / `f-time` | `:dense true` · `:outlined true` · `:hide-details true` |
| `f-search` | `:dense true` · `:outlined true` · `:hide-details true` · `:auto-select-first true` |
| `f-menu` | `color primary` · `:depressed true` |

> **Cảnh báo CRUD:** Không dùng `f-button` + `f-dialog` để mở form thêm mới — không hoạt động ổn định trong FUI V2. Dùng `ctrl-update` của `f-table` (`:update-form` + `:update-api`) cho mọi CRUD inline. Chỉ dùng `v-dialog` riêng khi form có logic đặc biệt (dynamic controls, multi-step...).

---

## 0. Value Resolution Rules (Fundamental)

FUI dùng hàm `getVueData(value, src)` để giải thích mọi string value trong `data[]` và `IN` mapping. Hiểu đúng quy tắc này tránh lỗi set data sai.

### Quy tắc xác định kiểu value

| Dạng value | Cách xử lý | Kết quả |
|---|---|---|
| Primitive (number, boolean, object, array) | Lưu nguyên | Giá trị gốc |
| String bắt đầu bằng `` ` `` | Lodash template (literal + `{{ }}` interpolation) | String sau khi render |
| String có `{{ }}` | Lodash template với interpolation | String sau khi render |
| String có spaces (không có backtick, không có `{{ }}`) | Lodash template → trả về literal | String đó |
| String không có spaces, không backtick, không `{{ }}` | **Evaluated as JS expression** | Giá trị của expression |
| `""` (empty string) | Empty string | `""` |

### Ví dụ thực tế

```json
"data": [
  {
    "a": "Hang So",              // has space → literal string "Hang So"
    "b": 3,                      // number → 3
    "c": true,                   // boolean → true
    "d": null,                   // null → null
    "e": "val1",                 // no space → JS eval: giá trị của biến val1
    "f": "val4.prop2",           // JS eval: vueData.val4.prop2
    "g": "val5[1]",              // JS eval: phần tử thứ 2 của array val5
    "h": "[val1]",               // JS eval: tạo array [giá_trị_val1]
    "i": "[1,2,3].map(x=>x*2)", // no space → JS eval → [2,4,6]
    "j": "`Xin chào {{user.UserName}}",  // backtick → lodash template → "Xin chào Tuấn"
    "k": "tổng là {{a+b}} item", // {{ }} → lodash template → "tổng là 3 item"
    "l": "tuimuonghep{{val4.prop3}}chuoi" // {{ }} → "tuimuonghep10chuoi"
  }
]
```

> **Quan trọng**: `"val1"` (no spaces) → FUI lấy GIÁ TRỊ của biến `val1`, KHÔNG phải string "val1". Muốn literal string "val1", phải dùng `` "`val1" ``.

### String interpolation với `{{ }}`

`{{ }}` dùng lodash template — có thể chứa bất kỳ JS expression nào:

```json
"label": "Còn {{items.length}} bản ghi",
"title": "Ngày {{moment().format('DD/MM/YYYY')}}",
"flag": "Là array: {{Array.isArray(myList)}}"
```

---

## 1. Khai báo và gán dữ liệu trong `data[]`

### Key notation — Dot, Bracket, và Cross-window

Key trong `data[]` mapping không chỉ là tên biến đơn giản — FUI's `setValue` hỗ trợ đầy đủ path notation:

```json
"data": [
  {
    "val":             "Hang So",   // biến đơn
    "obj.prop":        "val1",      // dot notation → vueData.obj.prop
    "obj.nested.deep": true,        // multi-level dot
    "arr[0].name":     "Tuan",      // bracket với literal index
    "arr[val2].name":  "abc",       // bracket với biến index (val2 = 3 → arr[3])
    "arr[0][val1].x":  "y",         // bracket với variable key (val1 = "Hang So")
    "#PARENT.field":   "val1",      // ghi vào parent window
    "#Win1.field":     "val1"       // ghi vào iframe Win1
  }
]
```

> Khi key là `#...`, FUI gọi `setWindowData` thay vì `setValue` — xem [ui-patterns.md](ui-patterns.md) §Cross-window.

### Gán giá trị liên kết (alias)

```json
"GanLienGiaTri": "val1"   // GanLienGiaTri = giá trị hiện tại của val1
```

Không reactive — chỉ snapshot tại thời điểm `data[]` chạy. Muốn reactive → dùng `watch`.

### Data initialization với JS expressions

```json
"data": [
  {
    "today":     "moment().format('YYYY-MM-DD')",
    "ids":       "[1,2,3,4].map(x=>x*2)",
    "firstItem": "dsUser[0]",
    "total":     "dsItems.length"
  }
]
```

---

## 2. Component Actions (`data`)

Actions are the "methods" of your module. They handle APIs, dialogs, and logic flow.

### Standard API Call
```json
"apiLoadData": {
  "API": "/api/controller/action",
  "IN": {
    "Page": 1,
    "Search": "vueData.searchText",
    "ID": "item.ID"
  },
  "OUT": "items",
  "CALLBACK": {
    "MESS": "Loaded!",
    "CALL": "anotherAction"
  }
}
```

> **Không gán nested object trực tiếp trong action:** `{ "form": { "field": "item.field" } }` sẽ không hoạt động — dùng dot notation cho từng field: `{ "form.field": "item.field" }`. Nếu đang dùng `ctrl-update`, không cần quản lý form thủ công.

### API URL Interpolation

`{{ }}` trong URL API được interpolate từ vueData:

```json
"getDetail": {
  "API": "/ts/Student/{{StudentID}}",
  "OUT": "studentDetail"
},
"getReport": {
  "API": "/ts/Report/{{sYear}}/{{sMonth}}",
  "OUT": "reportData"
}
```

### API Error Handling — ERROROUT / ERRORCALLBACK

Mặc định, API lỗi sẽ hiện dialog lỗi toàn màn hình. Dùng `ERROROUT` + `ERRORCALLBACK` để bắt lỗi và xử lý thủ công:

```json
"saveData": {
  "API": "/ts/Student_Insert",
  "IN": { "Name": "sName" },
  "ERROROUT": {
    "errStatus":  "status",
    "errMessage": "responseJSON"
  },
  "ERRORCALLBACK": {
    "MESS": "Lưu thất bại: {{errMessage.Message}}"
  }
}
```

- `ERROROUT`: map từ XHR error object — các key thông dụng: `status` (HTTP status code), `responseJSON` (parsed error body)
- `ERRORCALLBACK`: action chạy sau khi map ERROROUT (không hiện dialog mặc định)
- Khi có `ERROROUT`, lỗi sẽ KHÔNG tự hiện — bạn phải xử lý hoàn toàn

### API Method và Header override

```json
"getPublicData": {
  "API": "/ts/PublicData",
  "METHOD": "GET",
  "HEADER": { "x-api-key": "`my-api-key" },
  "OUT": "publicData"
}
```

- Mặc định: `METHOD = "POST"`, `HEADER = { authorization: token }`
- Override khi cần GET hoặc custom header cho external API

### Literal String Values (Important)

Apply this rule only for values passed inside action `IN` mapping.
If a string has no spaces, FUI can treat it like an expression/variable in `IN`.  
When you need a plain literal string, force it with:
- Backtick prefix: ``"`myValue"`` (or closed ``"`myValue`"``)
- Single quotes inside JSON string: `"'myValue'"`

```json
{
  "FUN": "openWindow",
  "IN": {
    "id":    "`winUser",
    "url":   "'/fp/module?mid=123'",
    "title": "`Tiêu đề cố định"
  }
}
```

For component props in `attr` without `:`, value is already a plain string prop and usually does not need wrapping.

### Confirmation + CANCEL

`CONFIRM` hiện dialog xác nhận trước khi thực thi. `CANCEL` (optional) chạy khi user bấm Hủy:

```json
"deleteItem": {
  "CONFIRM": "Bạn có chắc muốn xóa {{dongChon.Name}}?",
  "API": "/api/delete",
  "IN": { "id": "dongChon.ID" },
  "CALLBACK": { "CALL": "reloadData" },
  "CANCEL": { "MESS": "Đã hủy thao tác" }
}
```

> `CONFIRM` string hỗ trợ `{{ }}` interpolation từ vueData.

### Conditional Logic
```json
"checkStatus": {
  "IF": "status === 1",
  "THEN": { "MESS": "Active" },
  "ELSE": {
    "IF": "status === 2",
    "THEN": { "MESS": "Pending" },
    "ELSE": { "MESS": "Inactive" }
  }
}
```

> Condition: JS expression, truy cập vueData trực tiếp (không cần `vueData.` prefix).  
> THEN/ELSE có thể là string JS: `"THEN": "vueData.x = 1"`.

### MESS vs MESSBOX

| | MESS | MESSBOX |
|---|---|---|
| Hiển thị | Toast (góc trên, tự đóng) | Modal dialog (user phải đóng) |
| Dùng khi | Thông báo thành công/thất bại | Cần user đọc và xác nhận đã thấy |

```json
{ "MESS": "Lưu thành công!" }
{ "MESSBOX": "Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại." }
```

Cả hai hỗ trợ `{{ }}` interpolation.

### FUN: showMessage — Dialog thông báo có onclose

```json
{
  "FUN": "showMessage",
  "IN": {
    "title": "`Xác nhận thành công",
    "message": "`Dữ liệu đã được lưu. Tiếp tục?",
    "onclose": {
      "CALL": "reloadData"
    }
  }
}
```

- `title`: tiêu đề dialog
- `message`: nội dung chi tiết (optional)
- `onclose`: action chạy sau khi user đóng dialog (thay thế `MESS` khi cần làm gì sau khi đọc xong)

### EXE — Raw JavaScript

```json
{ "EXE": "vueData.items = vueData.items.filter(x => x.active); " }
```

> Dùng khi cần logic phức tạp không thể diễn tả bằng action JSON. Có thể access `vueData` trực tiếp. Kết thúc bằng `;`.

---

## 3. Watchers (`watch`)

Trigger actions automatically when data changes.

For production-grade cascading and filter watcher design, see [watcher-patterns.md](watcher-patterns.md).

```json
"watch": {
  "searchText": { "CALL": "apiLoadData" },
  "selectedGroup": { "CALL": "apiLoadUsers" }
}
```

### v_old — Giá trị trước khi thay đổi

Trong CALLBACK hoặc action của watch, `v_old` chứa giá trị CŨ (trước khi thay đổi):

```json
"watch": {
  "taoID": {
    "backupID": "v_old.taoID",
    "BAC": 12345
  }
}
```

### deep-watch — Watch nested object/array

Mặc định watch là shallow (chỉ detect thay đổi reference). Dùng `deep-watch` để detect thay đổi bên trong:

```json
"watch": {
  "deep-watch": {
    "formData": { "CALL": "autoSave" },
    "selectedItems": { "CALL": "recalcTotal" }
  },
  "sModuleID": { "CALL": "reload" }
}
```

> `deep-watch` được xử lý trước các watch thông thường. Tốn hiệu năng hơn — chỉ dùng khi cần thiết.

---

## 4. Table Cell Action Context

Khi action chạy từ cell trong `f-table` (t-button, t-check, t-select, t-menu, v-on:click), FUI inject thêm:

| Variable | Giá trị |
|---|---|
| `item` | Object của row hiện tại |
| `index` | Index của row trong array |
| `$row` | Có thể set thủ công: `{ "$row": "item" }` |

```json
{
  "el": "t-button",
  "text": "Tên",
  "value": "ten",
  "attr": {
    ":label": "`${item.ten}-${vueData.val1}`",
    ":action": [
      { "$row": "item" },
      {
        "API": "/api/getDetail",
        "OUT": "DETAIL",
        "CALLBACK": {
          "danhSach[index].kohienthi": true
        }
      },
      { "MESS": "Row {{danhSach[index].ten}}" }
    ]
  }
}
```

> `danhSach[index].kohienthi` — update trực tiếp item trong array bằng `index` inject từ context. Đây là pattern chuẩn để update 1 item cụ thể trong table.

---

## 5. URL Parameters → vueData

URL query params tự động được inject vào `vueData` khi module load:

```
URL: /ex/MyModule?menu=0&mode=edit&id=123
→ vueData.menu = "0"
→ vueData.mode = "edit"  
→ vueData.id = "123"
```

Dùng trong `data[]` để đọc URL params:
```json
"data": [
  {
    "IF": "typeof menu != 'undefined' && menu=='0'",
    "THEN": { "v_Set.menu": false }
  }
]
```

---

## 6. Controls Layout (`controls`)

**MANDATORY**: All UI elements MUST be nested within a Grid System structure: **Container** > **Row** > **Col** > **Element**. Do NOT place elements directly at the root.

### Default prop cho Container và Row

| Phần | Default | Ghi chú |
|---|---|---|
| Container `prop` | `"fluid grid-list-md"` | Dùng mặc định này trước — chỉ thêm class khác khi có lý do cụ thể |
| Row `prop` | `"row wrap"` hoặc `""` | Dùng mặc định này trước — chỉ thêm `align-*`, `mb-*`... khi layout thực sự cần |

> Spacing và alignment ưu tiên đặt trong `col` hoặc `el attr` hơn là trong container/row prop.

### Basic Grid Structure
```json
{
  "prop": "fluid grid-list-md",
  "rows": [
    {
      "prop": "row wrap",
      "cols": [
        { "w": "6", "el": "v-text-field", "attr": { ... } },
        { "w": "6", "el": "v-btn", "innerHTML": "Submit" }
      ]
    }
  ]
}
```

### `innerHTML` Supports `{{ }}`
```json
{ "el": "div", "w": "12", "innerHTML": "Xin chao {{formData.fullName}}" }
```

### Responsive Forms
```json
"attr": {
  ":width": "$vuetify.breakpoint.mdAndUp ? '500px' : '100%'"
}
```

---

## 7. Common Element Patterns

- **HTML Content**: Use `innerHTML` for text or simple HTML.
- **Events**: `v-on:click`, `v-on:change`. wrap logic in `CALL()`.
- **Visibility**: Use `v-if` (pre-render) or `v-show` (CSS toggle).
- **Loops**: `v-for` is rarely used directly in `module.json`. Use `f-table` for lists or recursive partials.

Trigger actions automatically when data changes.

For production-grade cascading and filter watcher design, see [watcher-patterns.md](watcher-patterns.md).

```json
"watch": {
  "searchText": {            // Variable to watch
    "CALL": "apiLoadData"    // Action to run (debounce is auto-handled by FUI usually)
  },
  "selectedGroup": {
    "CALL": "apiLoadUsers"
  }
}
```

## 3. Controls Layout (`controls`)

**MANDATORY**: All UI elements MUST be nested within a Grid System structure: **Container** > **Row** > **Col** > **Element**. Do NOT place elements directly at the root.

Container prop mặc định: `"fluid grid-list-md"` — không thêm `pa-*`/`ma-*`. Row prop mặc định: `"row wrap"` hoặc `""` — không thêm `align-*`/`mb-*`/`mt-*`.

### Basic Grid Structure
```json
{
  "prop": "fluid grid-list-md", // CONTAINER (v-container)
  "rows": [
    {
      "prop": "row wrap",       // ROW (v-layout)
      "cols": [
        {
          "w": "6",             // COLUMN (v-flex) - Nested Element goes here
          "el": "v-text-field",
          "attr": { ... }
        },
        {
          "w": "6",
          "el": "v-btn",
          "innerHTML": "Submit"
        }
      ]
    }
  ]
}
```

### `innerHTML` Supports `{{ }}`
Use Vue interpolation in `innerHTML` for text pulled from `data`.

```json
{
  "el": "div",
  "w": "12",
  "innerHTML": "Xin chao {{formData.fullName}}"
}
```

### Responsive Forms
Control form width dynamically using breakpoints.

**Step 1: Define Config**
```json
"data": [
  {
    "configForm": {
      "xs": { "width": "100%" }, // Mobile
      "md": { "width": "500px" } // Desktop
    }
  }
]
```

**Step 2: Apply to Dialog/Form**
```json
"attr": {
  ":width": "$vuetify.breakpoint.mdAndUp ? configForm.md.width : configForm.xs.width"
}
```

## 4. Common Element Patterns

-   **HTML Content**: Use `innerHTML` for text or simple HTML.
-   **Events**: `v-on:click`, `v-on:change`. wrap logic in `CALL()`.
-   **Visibility**: Use `v-if` (pre-render) or `v-show` (CSS toggle).
-   **Loops**: `v-for` is rarely used directly in `module.json`. Use `f-table` for lists or recursive partials.
