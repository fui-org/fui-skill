# FUI UI Patterns — Real-World Design Reference

Các pattern được rút ra từ project **security-manager** — dùng làm tham chiếu khi thiết kế module mới.

---

## 1. Cấu trúc `data[]` trong module.json

`data` là mảng khởi tạo state + action. FUI xử lý tuần tự từ trên xuống dưới.

**Quy ước tổ chức:**
- Object **không có key action** (không có API, CALL, IF…) → khởi tạo state
- Object **có key là tên hàm** → định nghĩa named action (tái sử dụng)
- Object dạng `{ "API": ..., "OUT": ... }` hoặc `{ "CALL": ... }` ở cuối → tự chạy khi load xong

```json
"data": [
  {
    "dsUser": [],
    "dsGroup": [],
    "sDepartment": null,
    "dlUserInfo": false
  },
  {
    "getDepartment": { "API": "SM_DepartmentSelectAll", "OUT": "dsDepartment" },
    "getGroup":      { "API": "SM_Group_SelectAll",    "OUT": "dsGroup" },
    "getUser": {
      "API": "SM_Users_SelectByDepGroup",
      "IN": { "GroupID": "sGroup", "DepartmentID": "sDepartment" },
      "OUT": "dsUser"
    }
  },
  { "CALL": "getDepartment" },
  { "CALL": "getGroup" }
]
```

> **Auto-startup**: CALL ở cuối `data[]` sẽ tự chạy khi module load — không cần event handler riêng.

---

## 2. Cascading API Init

Dùng `CALLBACK` để set giá trị từ kết quả API đầu tiên, rồi API tiếp theo tự chạy qua `watch`.

```json
"data": [
  { "dsModule": [], "sModuleID": null },
  {
    "API": "/SM_Modules_SelectAll",
    "OUT": "dsModule",
    "CALLBACK": { "sModuleID": "dsModule[0].ModuleID" }
  }
],
"watch": {
  "sModuleID": { "CALL": "getFunctionRight" }
}
```

> `sModuleID` được set từ CALLBACK → watch tự kích hoạt `getFunctionRight`. Không cần gọi thủ công.

---

## 3. Watch — Cascading Filter

Khi filter thay đổi → tự reload data. Nhiều watch → mảng CALL.

```json
"watch": {
  "sDepartment": { "CALL": "getUser" },
  "sGroup":      { "CALL": "getUser" },
  "sModuleID": [
    { "CALL": "getUserModule" },
    { "CALL": "getSysRight" },
    { "CALL": "getFunctionRight" }
  ]
}
```

---

## 4. Toolbar / Filter Row Pattern

Row chứa filter fields và action buttons. Dùng `shrink` + `flex-md-grow-0` để giữ width cố định, `v-spacer` đẩy buttons về phải.

```json
{
  "prop": "",
  "cols": [
    {
      "el": "v-autocomplete",
      "col": { "shrink": "true", "class": "shrink" },
      "attr": {
        "class": "flex-md-grow-0",
        "style": "width:200px",
        "v-model": "sGroup",
        "label": "Group",
        ":items": "dsGroup",
        "item-text": "GroupName",
        "item-value": "GroupID",
        ":required": false
      },
      "w": "200"
    },
    {
      "el": "v-text-field",
      "col": { "shrink": "true", "class": "shrink" },
      "attr": {
        "class": "flex-md-grow-0",
        "style": "width:200px",
        "v-model": "UserID",
        "label": "User ID",
        "clearable": ""
      },
      "w": "200"
    },
    {
      "el": "f-button",
      "col": { "shrink": true },
      "attr": {
        ":checkvalid": false,
        "color": "primary",
        "label": "Tìm",
        "icon-text": "mdi-magnify",
        ":action": { "CALL": "getUser" }
      }
    },
    { "el": "v-spacer", "attr": {} },
    {
      "el": "f-button",
      "col": { "v-if": "vueData.user.SystemRight==9", "shrink": true },
      "attr": {
        ":checkvalid": false,
        ":disabled": "!sGroup",
        "color": "primary",
        "label": "Add User",
        "icon-text": "mdi-account-multiple-plus",
        ":action": [
          { "addNew": 1, "sUserID": "", "sUserName": "" },
          { "dlUserInfo": true }
        ]
      }
    }
  ]
}
```

**Quy tắc:**
- Filter fields: `col: { shrink: "true", class: "shrink" }` + `attr: { class: "flex-md-grow-0", style: "width:Xpx" }`
- Nút tìm: ngay sau fields, `col: { shrink: true }`
- `v-spacer`: tách filter bên trái với buttons bên phải
- Nút Add/Delete admin: sau spacer, thêm `v-if` permission

---

## 5. Permission Gating

Ẩn/hiện phần tử theo `SystemRight` của user.

```json
"col": { "v-if": "vueData.user.SystemRight>1" }
"col": { "v-if": "vueData.user.SystemRight==9" }
```

- `>1` — visible với mọi user có quyền (không phải level thấp nhất)
- `==9` — chỉ admin cao nhất mới thấy

---

## 6. f-table Cơ Bản với Fixed Header

```json
{
  "el": "f-table",
  "attr": {
    "label": "User list",
    ":items-per-page": 50,
    ":height": "$( window ).height()-285",
    ":fixed-header": true,
    ":items": "dsUser",
    "item-key": "UserID",
    ":hide-default-footer": false,
    ":item-class": "item => item.ChuaKichHoat>0 ? 'danger' : ''",
    ":headers": [
      { "align": "center", "text": "UserID", "value": "UserID" },
      { "text": "Username",  "value": "UserName" },
      { "text": "Fullname",  "value": "FullName" }
    ]
  },
  "w": 12
}
```

**Kỹ thuật:**
- `:height`: tính động theo viewport — `"$( window ).height()-285"` (trừ đi chiều cao toolbar + filter)
- `:item-class`: highlight row theo điều kiện — `"item => item.Active==0 ? 'danger' : ''"`

---

## 7. t-check — Toggle trong Table Cell

Dùng trong `headers` để render checkbox/icon toggle, kích hoạt API khi click.

```json
{
  "text": "Active",
  "value": "Enable",
  "align": "center",
  "el": "t-check",
  "attr": {
    "on-icon": "mdi-check",
    "off-icon": "mdi-lock",
    ":action": [
      { "API": "/SM_Users_SetActive", "IN": { "UserID": "item.UserID" } },
      { "dsUser": [] },
      { "CALL": "getUser" }
    ]
  }
}
```

---

## 8. t-button — Button trong Table Cell

Dùng khi cần button/icon với action trong cell. Hỗ trợ icon động.

```json
{
  "text": "Allow",
  "value": "Locked",
  "align": "center",
  "el": "t-button",
  "attr": {
    "color": "primary",
    ":outlined": false,
    ":icon-text": "`${ item.Locked==0 ? 'mdi-check-bold':'mdi-lock'}`",
    ":action": [
      { "API": "/SM_Computer_SetLocked", "IN": { "ComputerID": "item.ComputerID" } },
      { "dsComputer": [] },
      { "CALL": "getComputer" }
    ]
  }
}
```

---

## 9. t-select — Dropdown Inline trong Table Cell

Dùng để edit field ngay trong bảng, trigger API khi chọn.

```json
{
  "text": "SystemRight",
  "value": "SysRight",
  "el": "t-select",
  "width": "250px",
  "attr": {
    "class": "flex-md-grow-0 my-2",
    ":items": "vueData.dsSystemRight",
    "item-text": "Note",
    "item-value": "SysRight",
    ":action": [
      {
        "CONFIRM": "Bạn có chắc cập nhật System Right cho user này không?",
        "API": "/SM_UserModule_UpdateSystemRight",
        "IN": {
          "ModuleID": "sModuleID",
          "UserID": "item.UserID",
          "SysRight": "item.SysRight"
        },
        "CALLBACK": { "MESS": "Cập nhật thành công." }
      }
    ]
  }
}
```

---

## 10. t-menu — Context Menu trong Table (menuChucNang Pattern)

Định nghĩa menu items trong `data[]`, ref qua `t-menu` trong headers.

**Bước 1 — Định nghĩa `menuChucNang` trong `data[]`:**

```json
{
  "menuChucNang": [
    {
      "color": "primary",
      "icon-text": "mdi-account-details",
      "text": "Update Info",
      "action": [
        {
          "addNew": 0,
          "dongChon": "item",
          "sUserID":    "item.UserID",
          "sUserName":  "item.UserName",
          "sLastName":  "item.LastName",
          "sFirstName": "item.FirstName"
        },
        { "dlUserInfo": true }
      ]
    },
    {
      "color": "primary",
      "icon-text": "mdi-shield-account-outline",
      "text": "User Permission",
      "action": [
        {
          "dongChon":   "item",
          "sUserID":    "item.UserID",
          "sFullName":  "item.FullName"
        },
        {
          "FUN": "openWindow",
          "IN": {
            "id":    "`WinPer",
            "title": "`User Permission",
            "url":   "`/UserPermission"
          }
        }
      ]
    }
  ]
}
```

**Bước 2 — Dùng `t-menu` trong `headers`:**

```json
{
  "el": "t-menu",
  "width": "120px",
  "align": "center",
  "text": "Update",
  "value": "Update",
  "attr": { ":items": "vueData.menuChucNang" }
}
```

**Pattern xử lý:**
- `"dongChon": "item"` — lưu bản ghi hiện tại vào `dongChon`
- Các field khác `"sUserID": "item.UserID"` — copy field từ item vào state
- `{ "dlXxx": true }` — mở dialog sau khi state đã sẵn sàng

---

## 11. ctrl-update CRUD Pattern

CRUD trực tiếp trong bảng — không cần viết dialog thủ công.

```json
{
  "el": "f-table",
  "attr": {
    ":items": "dsFunctionRight",
    "item-key": "FunctionID",
    ":headers": [
      { "text": "Code",   "value": "FunctionCode" },
      { "text": "Name",   "value": "FunctionName" },
      { "text": "Update", "value": "ctrl-update" }
    ],
    ":update-form": [
      {
        "el": "v-text-field", "w": 12,
        "attr": { "v-model": "FunctionCode", "label": "Function Code", ":required": true }
      },
      {
        "el": "v-text-field", "w": 12,
        "attr": { "v-model": "FunctionName", "label": "Function Name" }
      }
    ],
    ":update-api": {
      "new": {
        "API": "/SM_Function_Insert",
        "IN": { "ModuleID": "sModuleID", "FunctionCode": "item.FunctionCode", "FunctionName": "item.FunctionName" },
        "CALLBACK": { "CALL": "getFunctionRight" }
      },
      "edit": {
        "API": "/SM_Function_Update",
        "IN": { "FunctionID": "item.FunctionID", "FunctionCode": "item.FunctionCode", "FunctionName": "item.FunctionName" },
        "CALLBACK": { "CALL": "getFunctionRight" }
      },
      "delete": {
        "CONFIRM": "Bạn có chắc muốn xóa quyền này không?",
        "API": "/SM_Function_Delete",
        "IN": { "FunctionID": "item.FunctionID" },
        "CALLBACK": [
          { "MESS": "Xóa thành công" },
          { "CALL": "getFunctionRight" }
        ]
      }
    }
  }
}
```

**Khi nào dùng ctrl-update:** Khi form edit đơn giản (2-5 fields) và không cần layout phức tạp.

---

## 12. f-table với show-select (Multi-select)

```json
{
  "el": "f-table",
  "attr": {
    ":show-select": true,
    "v-model": "sUserSelected",
    ":items": "dsUsers",
    "item-key": "UserID",
    ":items-per-page": -1,
    ":hide-default-footer": true,
    ":update-api": { "default-item": { "xAA": [] } },
    ":headers": [...]
  }
}
```

- `v-model`: nhận array các item được chọn
- `:update-api.default-item`: inject default field vào mỗi item khi load (ở đây `xAA: []` cho chip-group)

---

## 13. v-chip-group trong Table Cell

Hiển thị danh sách tags trong cell, click để mở dialog.

```json
{
  "text": "FunctionRight",
  "value": "FunctionName",
  "el": "v-chip-group",
  "attr": {
    "v-model": "item.xAA",
    "column": true,
    "v-if": "item.FunctionName"
  },
  "innerHTML": [
    {
      "el": "v-chip",
      "attr": {
        ":small": true,
        "color": "primary",
        "outlined": "",
        "v-for": "fn in item.FunctionName",
        ":key": "fn",
        "v-on:click": "vueData.dlFunction = true; CALL(setFunction(item, item.FunctionName));"
      },
      "innerHTML": "<div>{{fn.FunctionCode}}-{{fn.FunctionName}}</div>"
    }
  ]
}
```

---

## 14. Dialog Pattern — hidden-container

Dialogs luôn đặt trong container riêng với `prop: "hidden-container"` — không nằm trong rows chính.

**Cấu trúc chuẩn:**

```json
{
  "prop": "hidden-container",
  "rows": [
    {
      "prop": "",
      "cols": [
        {
          "el": "v-dialog",
          "attr": {
            "v-model": "dlUserInfo",
            "width": 650
          },
          "innerHTML": [
            {
              "el": "v-card",
              "attr": { "style": "padding: 0px;" },
              "innerHTML": [
                {
                  "el": "v-toolbar",
                  "attr": { "dense": "", "flat": "" },
                  "innerHTML": [
                    { "el": "v-toolbar-title", "attr": {}, "innerHTML": "Update User Info" },
                    { "el": "v-spacer", "attr": {} },
                    {
                      "el": "v-btn",
                      "innerHTML": "<v-icon>mdi-close</v-icon>",
                      "attr": { "icon": "", "v-on:click": "vueData.dlUserInfo = false" }
                    }
                  ]
                },
                {
                  "el": "v-card-text",
                  "attr": { "class": "px-4" },
                  "innerHTML": [...]
                },
                {
                  "el": "v-card-actions",
                  "attr": {},
                  "innerHTML": [
                    { "el": "v-spacer", "attr": {} },
                    {
                      "el": "f-button",
                      "attr": {
                        ":checkvalid": true,
                        "color": "primary",
                        "label": "Save",
                        "icon-text": "mdi-content-save",
                        ":action": {
                          "API": "SM_Users_Update",
                          "IN": { "UserID": "sUserID", "UserName": "sUserName" },
                          "CALLBACK": [
                            { "MESS": "Cập nhật thành công." },
                            { "dlUserInfo": false },
                            { "CALL": "getUser" }
                          ]
                        }
                      }
                    }
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

**Quy tắc dialog:**
- `v-card[style="padding: 0px;"]` — xóa padding mặc định
- `v-toolbar[dense flat]` — thanh tiêu đề mỏng
- Nút đóng: `v-btn[icon]` + `v-on:click: "vueData.dlXxx = false"`
- `v-card-actions` với `v-spacer` trước nút Save → nút nằm phải
- CALLBACK của Save: MESS → đóng dialog → reload data

---

## 15. Mở Dialog với Dữ Liệu Row

Pattern 2 bước: copy dữ liệu vào state → set `dlXxx = true`.

**Từ menuChucNang:**
```json
"action": [
  {
    "addNew": 0,
    "dongChon": "item",
    "sUserID":    "item.UserID",
    "sUserName":  "item.UserName",
    "sLastName":  "item.LastName"
  },
  { "dlUserInfo": true }
]
```

**Từ f-button:**
```json
":action": [
  { "addNew": 1, "sUserID": "", "sUserName": "" },
  { "dlUserInfo": true }
]
```

> `addNew: 0` = edit mode, `addNew: 1` = new mode. Trong dialog, dùng `:disabled="addNew==0"` để khóa field ID khi edit.

---

## 16. Mở Sub-window (openWindow) — Đầy đủ

Mở module khác như popup window riêng biệt. `id` là định danh để tham chiếu sau này.

```json
{
  "FUN": "openWindow",
  "IN": {
    "id":     "`Win1",
    "title":  "`User Permission",
    "url":    "`/UserPermission",
    "data":   "danhSachChoTable",
    "width":  "`800px",
    "height": "`600px",
    "onclose": {
      "CALL": "reloadData"
    }
  }
}
```

| Param | Bắt buộc | Mô tả |
|---|---|---|
| `id` | ✅ | Định danh window (backtick = literal) — dùng để ref qua `#Win1` |
| `url` | ✅ | URL module — không truyền `?menu=0`; module con tự khai báo `"set": { "menu": false }` |
| `title` | ❌ | Tiêu đề dialog |
| `data` | ❌ | Truyền dữ liệu vào window con — window con đọc qua `#PARENT.data` |
| `width` / `height` | ❌ | Kích thước window (`"800px"`, `"50%"`) |
| `onclose` | ❌ | Action chạy sau khi sub-window đóng |

> **Module con mở qua openWindow:** Không truyền `?menu=0` trong URL. Module con tự khai báo `"set": { "menu": false }` trong module.json để ẩn menu vĩnh viễn cho module đó — bất kể cách mở. URL chỉ truyền ID cần thiết để query DB.

**`onclose` targeting window khác:**

```json
"onclose": {
  "#Win1": { "CALL": "cmdThongBao" }
}
```

> Khi Win2 đóng → chạy `cmdThongBao` trong Win1 (không phải trong window hiện tại).

---

## 17. Cross-window Data Exchange — Đầy đủ

FUI dùng `#PARENT` và `#WinID` để trao đổi dữ liệu giữa các window (iframe). Hoạt động cả same-domain và cross-domain (qua `postMessage`).

### Đọc dữ liệu từ window khác (value position)

```json
"data": [
  {
    "sUserID":      "#PARENT.sUserID",
    "sFullName":    "#PARENT.sFullName",
    "dataFromWin1": "#Win1.apiChart"
  }
]
```

| Cú pháp | Ý nghĩa |
|---|---|
| `"#PARENT.field"` | Đọc `vueData.field` từ window cha |
| `"#Win1.field"` | Đọc `vueData.field` từ iframe có id `Win1` |

### Ghi dữ liệu vào window khác (key position)

```json
"data": [
  {
    "#PARENT.abcdef": 1234567890,
    "#Win1.dulieuTuForm2": "`huynh cao tuan"
  }
]
```

```json
":action": {
  "#PARENT.val4": "DauRaTuCauTruc_IN"
}
```

| Cú pháp | Ý nghĩa |
|---|---|
| `"#PARENT.field": value` | Ghi value vào `vueData.field` của parent |
| `"#Win1.field": value` | Ghi value vào `vueData.field` của Win1 |

### Gọi action trong window khác

```json
":action": {
  "#PARENT": { "CALL": "cmdSETData" }
}
```

```json
"#Win1": { "CALL": "cmdThongBao" }
```

- `"#PARENT"` (không có field) với value là action → `runAction(value)` trong parent
- `"#Win1"` với value là action → `runAction(value)` trong Win1

### Nhận dữ liệu được truyền khi openWindow

Khi window cha mở con với `"data": "sourceData"`:

```json
"data": [
  {
    "LayDuLieuWinCha": "#PARENT.Win1"
  }
]
```

> `#PARENT.Win1` đọc biến `Win1` từ parent. Khi cha gọi `openWindow` với `id: "Win1"`, FUI tự set `vueData.Win1 = data_đã_truyền` trong parent trước khi mở window.

### Pattern đầy đủ — Sub-window nhận data từ parent

**Module cha (ex-v3-1SetData):**
```json
":action": {
  "FUN": "openWindow",
  "IN": {
    "id":   "`Win1",
    "url":  "`/ex/ex-v3-2CauTruc",
    "data": "danhSachChoTable"
  }
}
```

**Module con (ex-v3-2CauTruc):**
```json
"data": [
  {
    "IF": "typeof menu != 'undefined' && menu=='0'",
    "THEN": { "v_Set.menu": false }
  },
  {
    "LayDuLieuWinCha":    "#PARENT.Win1",
    "GiaTriTuCHA.thu.xem": "#PARENT.val7",
    "GiaTriSetTuCHA":      null
  }
]
```

> Đặt `#PARENT.*` TRƯỚC các CALL startup để data sẵn sàng trước khi API đầu tiên chạy.

---

## 18. IF/THEN/ELSE — Conditional Action

Rẽ nhánh logic trong action hoặc CALLBACK.

```json
{
  "IF": "TypeLoad==1",
  "THEN": { "CALL": "getComputer" },
  "ELSE": {
    "IF": "TypeLoad==2",
    "THEN": { "CALL": "getComputerDinied" },
    "ELSE": { "CALL": "getComputerNotVisited" }
  }
}
```

- Condition: JavaScript expression dùng vueData fields trực tiếp (không cần `vueData.`)
- Dùng nested IF/ELSE cho switch-case nhiều nhánh

**Ứng dụng thực tế:** Module có nhiều chế độ xem (`TypeLoad`) — sau khi update, refresh đúng danh sách đang hiển thị.

```json
"data": [
  { "TypeLoad": 1 }
]
```

---

## 19. CALLBACK Chaining

CALLBACK là array → thực thi tuần tự.

```json
"CALLBACK": [
  { "MESS": "Cập nhật thành công." },
  { "dlUserInfo": false },
  { "CALL": "getUser" }
]
```

```json
"CALLBACK": [
  { "CALL": "getUserModule" },
  { "sUserDeptSelected": [], "dlAddUser": false },
  { "MESS": "Thêm user thành công." }
]
```

**Thứ tự thông dụng:** reload data → reset state → hiển thị message.

---

## 20. Khởi tạo Date với moment()

```json
"data": [
  {
    "TuNgay":  "moment().format('YYYY-MM-DD')",
    "DenNgay": "moment().format('YYYY-MM-DD')"
  }
]
```

> Giá trị là JS expression string — FUI sẽ eval nó khi khởi tạo. `moment()` có sẵn trong FUI runtime.

---

## 21. page-container + page-navigation Layout

Dùng khi cần filter bar cố định phía trên, nội dung bên dưới scroll.

```json
{
  "prop": "page-container grid-list-md fluid",
  "rows": [
    {
      "prop": "page-navigation",
      "cols": [
        { "el": "f-date", "attr": { "v-model": "TuNgay", "label": "Từ ngày", "date-add": 0 }, "w": "2" },
        { "el": "f-date", "attr": { "v-model": "DenNgay", "label": "Tới ngày", "date-add": 0 }, "w": "2" },
        {
          "el": "f-button",
          "attr": { "color": "primary", "icon-text": "mdi-filter", "label": "Tìm", ":action": { "CALL": "getLogData" } },
          "w": 3
        }
      ]
    },
    {
      "prop": "",
      "cols": [
        { "el": "f-table-view", "attr": { "label": "Log viewer", ":items": "LogData", "disabled-update": true } }
      ]
    }
  ]
}
```

- `page-container` + `page-navigation` → filter bar sticky top
- `f-table-view` với `disabled-update: true` → readonly view

---

## 22. set — Cấu hình Module Level

`set` ở root module.json — cấu hình behavior của toàn module.

```json
"set": {
  "menu": false
}
```

- `menu: false` — ẩn menu navigation (dùng cho sub-window, log viewer)

Trong sub-window, set dynamically từ `data[]`:
```json
{ "IF": "typeof menu != 'undefined' && menu=='0'", "THEN": { "v_Set.menu": false } }
```

---

## 23. CALLBACK với JavaScript Expression

Dùng `{{ expression }}` trong CALLBACK để chạy code phức tạp sau API.

```json
"CALLBACK": "{{ _.forEach(dsUsers, (x)=> x.FunctionName = JSON.parse(x.FunctionName)) }}"
```

```json
"CALLBACK": "{{ _.forEach(dsUserFunction, (x)=> x.FunctionName = JSON.parse(x.FunctionName)), _.forEach(dsUserFunction, (x)=> x.UserSysItem = JSON.parse(x.UserSysItem)) }}"
```

> Dùng khi API trả về JSON string cần parse thành object/array trước khi render.

---

## 24. script.js — Helper Functions

`script.js` chứa helper functions gọi từ `v-on:click` hoặc action.

```javascript
// script.js
function setFunction(user, fc) {
    vueData.sFunctionSelected = [];
    vueData.sUserSelected = [];
    vueData.sUserSelected.push(user);
    if (!fc) return;
    vueData.dsFunctionRight.map((item) => {
        if (fc.some(fci => fci.FunctionID == item.FunctionID)) {
            vueData.sFunctionSelected.push(item.FunctionID.toString());
        }
    });
}
```

Gọi từ `v-on:click` trong header:
```json
"v-on:click": "vueData.dlFunction = true; CALL(setFunction(item, item.FunctionName));"
```

> Functions trong `script.js` có thể access `vueData` trực tiếp. Dùng để xử lý logic phức tạp không thể làm bằng action JSON thuần.

---

## 25. Checkbox List Dialog Pattern

Dialog chứa danh sách checkbox để chọn nhiều items, lưu ngay khi click.

```json
{
  "el": "v-card-text",
  "attr": {},
  "innerHTML": [
    {
      "el": "v-layout",
      "attr": { "class": "fluid row justify-center grid-list-lg fill-height mt-3" },
      "innerHTML": [
        {
          "el": "div",
          "attr": { "v-for": "fc in vueData.dsFunctionRight", ":key": "fc.FunctionID" },
          "innerHTML": [
            {
              "el": "v-checkbox",
              "attr": {
                "color": "primary",
                "v-model": "sFunctionSelected",
                ":value": "`${fc.FunctionID}`",
                ":label": "`${fc.FunctionName}`",
                "v-on:click": "CALL(saveFunction)"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

> `v-on:click` trên checkbox → save ngay không cần nút Save. `v-model` nhận array, `:value` dùng backtick literal.

---

## 26. Dynamic Label từ State

Dùng `:label` với expression để hiển thị thông tin context.

```json
{
  "el": "f-title",
  "attr": {
    ":label": "sFullName + ` - ` + sDepartment"
  }
}
```

```json
{
  "el": "f-table",
  "attr": {
    ":label": "`${fTableTitle==''? 'Computer list' : fTableTitle}`"
  }
}
```

---

## 27. v-switch — Toggle với Label

```json
{
  "el": "v-layout",
  "attr": {},
  "innerHTML": [
    {
      "el": "v-switch",
      "attr": {
        "v-model": "switchResetPassword",
        ":required": false,
        "label": "Đặt lại mật khẩu"
      },
      "w": "12"
    }
  ]
}
```

Dùng với `v-if` để hiện/ẩn field bổ sung:
```json
{
  "el": "v-layout",
  "attr": { "v-if": "switchResetPassword" },
  "innerHTML": [...]
}
```

---

## 28. Master-Detail 2 Cột

Pattern layout cha-con: bảng trái chọn row → watch → load bảng phải. Không cần mở window mới.

**Khi nào dùng `t-button` vs `t-menu`:**
- **`t-button`**: hành động duy nhất là xem/load dữ liệu liên quan → 1 click trực tiếp
- **`t-menu`**: có nhiều hành động **hoặc** hành động thay đổi trạng thái (Kích hoạt, Chốt điểm, Xóa...)

> Không bọc "Xem chi tiết" trong `t-menu` — thêm 1 click thừa. Dùng `t-button` thay.

**`data[]` và watch:**

```json
"data": [
  { "dsParent": [], "dsDetail": [], "selectedId": null },
  {
    "getParent": { "API": "/SM_Parent_Select", "OUT": "dsParent" },
    "getDetail": {
      "API": "/SM_Detail_Select",
      "IN": { "ParentID": "selectedId" },
      "OUT": "dsDetail"
    }
  },
  { "CALL": "getParent" }
],
"watch": {
  "selectedId": { "CALL": "getDetail" }
}
```

**Cột `t-button` trong bảng trái:**

```json
{
  "text": "Chi tiết",
  "value": "ParentID",
  "align": "center",
  "el": "t-button",
  "attr": {
    "icon-text": "mdi-eye",
    "color": "primary",
    ":outlined": true,
    ":action": { "selectedId": "item.ParentID" }
  }
}
```

**Layout 2 cột:**

```json
{
  "prop": "fluid grid-list-md",
  "rows": [
    {
      "prop": "row wrap",
      "cols": [
        { "w": 5, "el": "f-table",      "attr": { ":items": "dsParent", "item-key": "ParentID", ":headers": [...] } },
        { "w": 7, "el": "f-table-view", "attr": { ":items": "dsDetail", "item-key": "DetailID", ":headers": [...] } }
      ]
    }
  ]
}
```

---

## 29. Sub-window Checklist

Module được mở qua `openWindow` cần:

- `"set": { "menu": false }` — ẩn navigation header (khai báo trong module.json, không dùng `?menu=0` trong URL)
- URL params tự động inject vào `vueData` trước khi `data[]` chạy — `{ "CALL": "apiLoad" }` ở cuối `data[]` là đủ
- URL chỉ truyền **ID** của record cha mà module con thực sự dùng — không truyền name hay field có thể tra lại từ DB

```json
// module.json của module con
"set": { "menu": false },
"data": [
  { "ContestID": null },
  {
    "getDetail": {
      "API": "/SM_Contest_Detail",
      "IN": { "ContestID": "ContestID" },
      "OUT": "dsDetail"
    }
  },
  { "CALL": "getDetail" }
]
// ContestID tự động inject từ URL ?ContestID=xxx trước khi data[] chạy
```

---

## Checklist Thiết Kế Module

1. **data[]**: state → named actions → auto-startup CALLs
2. **Toolbar row**: shrink filters + v-spacer + permission-gated buttons
3. **f-table**: fixed-header, item-class cho row highlight, item-key đúng
4. **Dialogs**: luôn trong hidden-container, v-card[padding:0] + v-toolbar[dense flat]
5. **menuChucNang**: định nghĩa trong data[], ref bằng t-menu trong headers
6. **ctrl-update**: cho CRUD đơn giản, dialog thủ công cho form phức tạp
7. **CALLBACK**: chaining array — reload → reset state → MESS
8. **Watch**: mọi filter dropdown đều có watch → CALL reload
9. **#PARENT**: set ngay đầu data[] trước các CALL startup
10. **Permission**: `v-if: "vueData.user.SystemRight>1"` cho admin-only sections
