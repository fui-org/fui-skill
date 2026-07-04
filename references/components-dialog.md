# FUI Dialog & Overlay Components

Components liên quan đến dialog, overlay, và editor nội dung. Xem prefix/binding rules tại [components-display.md](components-display.md).

## f-window

- Props (source): `id`
- Behavior: internal iframe dialog host, thường được mở qua `openWindow(...)`
- Example:

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

## f-editor

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

## f-editor-dialog

- Props (source): `value`, `imageapi`, `label`, `width`, `toolbar`
- Runtime expectation: `value` là object (`open`, `text`, `object`, `ok`), không phải plain string
- Behavior: modal editor, write-back on OK
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

## f-dialog

Modal dialog tự build form từ mảng `controls`, có hỗ trợ watchers cục bộ, validation, và action buttons.

- Props:
  - `value` (Boolean, default: `false`) — v-model để mở/đóng dialog
  - `data` (Object, default: `{}`) — dữ liệu đầu vào, bind bằng `:data.sync`; khi dialog mở dữ liệu này được copy vào các field
  - `dataOut` (Object, default: `{}`) — dữ liệu đầu ra, bind bằng `:data-out.sync`; nhận instance component khi dialog mở
  - `title` (String, default: `''`) — tiêu đề dialog
  - `controls` (Array, default: `[]`) — mảng control definitions để build form; mỗi control có `el`, `attr`, `w` (col width); field nào có `v-model` không bắt đầu bằng `vueData.` sẽ được tạo data cục bộ tự động (khởi tạo `null`)
  - `watch` (Object, default: `{}`) — watchers cục bộ trong dialog; key là tên field, value là action chạy khi field thay đổi; watchers được đăng ký khi dialog mở và hủy khi đóng
  - `button` (Array, default: `[]`) — mảng button definitions (xem cấu trúc button bên dưới)
  - `disableValidate` (Boolean, default: `false`) — bỏ qua form validation khi `true`
  - `width` (Number, default: `800`) — chiều rộng dialog (px)
  - `openAction` (Object, default: `null`) — action chạy ngay khi dialog mở

- Emits:
  - `input` — mở/đóng dialog (dùng với v-model)
  - `update:data-out` — phát ra instance component khi dialog mở (để parent truy cập data cục bộ)
  - `update:data` — phát ra `v_outData` khi button có `getoutdata: true` được click (sau khi validation pass)

- Vòng đời khi mở (`value = true`):
  1. Reset tất cả field về giá trị từ `:data` (gọi `setDefaultData`)
  2. Đăng ký watchers từ prop `watch`
  3. Chạy `openAction` nếu có
  4. Emit `update:data-out` với instance component

- Vòng đời khi đóng (`value = false`):
  1. Hủy tất cả watchers đã đăng ký

- Cấu trúc button object:
  - `label` (String) — text hiển thị trên button
  - `color` (String, default: `"primary"`) — màu button
  - `elevation` (Number, default: `0`) — độ nổi
  - `text` (Boolean, default: `true`) — dạng text button
  - `type` (String) — ví dụ `"submit"`
  - `:disabled` (String) — biểu thức Vue để disable button, ví dụ `"!checkBoxValue"`
  - `v-if` (String) — biểu thức Vue để ẩn/hiện button, ví dụ `"ModuleID==1"`
  - `icon-text` (String) — icon MDI hiển thị bên trái label
  - `checkvalid` (Boolean) — validate form trước khi chạy action; nếu không pass thì dừng
  - `getoutdata` (Boolean) — sync field values vào `v_outData` rồi emit `update:data`; cũng trigger validation
  - `action` (Array | Function) — danh sách actions chạy khi click; context truyền vào gồm tất cả fields trong `v_outData` và key `dData` trỏ về `v_outData`

- Lưu ý:
  - Button click được debounce 500ms (leading edge) để tránh double-click
  - Controls hỗ trợ `br: true` để xuống hàng (row break)
  - Template được build tĩnh lúc `data()` init, không re-render khi prop `controls` thay đổi
  - `watch` trong prop template là `:watch` (bind động), khác với `watch` mặc định của Vue
  - **Không dùng `f-dialog` bên trong template của component:** `f-dialog` chỉ hoạt động khi được khai báo trực tiếp trong `controls` của cấu trúc JSON module. Nếu đặt trong template của một Vue component, nó sẽ không hoạt động đúng.
  - **Khai báo biến `vueData` trước khi dùng trong controls:** Nếu một control bind vào `vueData.someVar`, biến đó phải được khai báo trước trong `data` của module — Vue không thể thiết lập reactivity cho biến chưa tồn tại lúc init.

```json
"data": [
  { "projectList": [] }
],
"controls": [
  {
    "prop": "fluid pa-0",
    "rows": [{ "prop": "", "cols": [
      {
        "el": "v-autocomplete",
        "attr": {
          "v-model": "pid",
          "label": "Module name",
          ":items": "vueData.projectList",
          "item-text": "ModuleName",
          "item-value": "ModuleID"
        }
      }
    ]}]
  }
]
```

- Ví dụ đầy đủ:

```json
{
  "el": "f-dialog",
  "attr": {
    "v-model": "dialogOpen",
    ":data.sync": "dialogData",
    "title": "Nhap du lieu",
    ":open-action": { "MESSBOX": "Bạn vừa mở dialog" },
    ":controls": [
      { "el": "v-text-field", "attr": { "v-model": "Domain", "label": "Domain" }, "w": 4 },
      { "el": "v-text-field", "attr": { "v-model": "ModuleID", "label": "ModuleID" }, "w": 3 },
      { "el": "v-text-field", "attr": { "v-model": "ModuleName", "label": "ModuleName" }, "w": 8 },
      {
        "el": "v-checkbox",
        "attr": { ":label": "`Tôi đã hiểu và đồng ý: ${checkBoxValue}`", "v-model": "checkBoxValue" }
      },
      {
        "el": "v-select",
        "attr": {
          "label": "select", "v-model": "bienselect",
          ":items": "vueData.Mang", "item-text": "AppName", "item-value": "AppListID"
        }
      }
    ],
    ":watch": {
      "bienselect": { "MESSBOX": "Watch Select {{bienselect}}" },
      "Domain": { "MESSBOX": "Watch textbox {{Domain}}" }
    },
    ":button": [
      {
        "label": "Submit OK",
        "type": "submit",
        ":disabled": "!checkBoxValue",
        "action": [
          { "ModuleName": "gan gia tri cho ModuleName" },
          { "MESSBOX": "thong bao 1" },
          { "dialogOpen": false }
        ]
      },
      {
        "label": "Chay mot API",
        "checkvalid": true,
        "v-if": "ModuleID==1",
        "action": [{ "API": "/chaymotapi" }]
      },
      {
        "label": "Close",
        "action": [{ "dialogOpen": false }]
      }
    ]
  }
}
```
