# Project Config — project.json & module set

## Quan hệ project.json ↔ module.json `set`

`project.json` là config mặc định cho toàn bộ project. Mỗi module có object `set` riêng — khi runtime render một module, nó **merge** theo thứ tự:

```
effective_set = { ...project.json data } ← bị ghi đè bởi → { ...module.json "set" }
```

**Kết quả:** Module kế thừa toàn bộ config project (menu, style, apiDomain...) nhưng có thể override bất kỳ field nào cho riêng trang đó.

**Ví dụ:** Project có `menuLeft` dài, nhưng một trang landing page muốn ẩn menu:

```json
// module.json — set của trang đó
"set": {
  "menu": false
}
```

→ Trang này không hiển thị header menu, các trang khác vẫn bình thường.

---

## Cấu trúc project.json

`project.json` chứa một object `data` duy nhất (không phải array như module.json):

```json
{
  "data": {
    "ProjectName": "...",
    "title":       "...",
    "apiDomain":   "...",
    "login":       "...",
    "userInfo":    "...",
    "apiFile":     "...",
    "menuStyle":   { ... },
    "menu":        false | [ ... ],
    "menuLeft":    [ ... ],
    "menuComponent": [ ... ],
    "domainSetting": { ... }
  }
}
```

### Các field trong `data`

| Field | Kiểu | Mô tả |
|---|---|---|
| `ProjectName` | string | Tên project hiển thị |
| `title` | string | Tiêu đề mặc định cho các trang |
| `apiDomain` | string | Base URL tAPI kèm alias, ví dụ `https://tapi.lhbs.vn/` hoặc `https://tapi.lhu.edu.vn/acc/` |
| `login` | string | URL trang đăng nhập |
| `userInfo` | string | Endpoint lấy thông tin user đã đăng nhập |
| `apiFile` | string | Endpoint upload file (tùy chọn) |
| `fileDomain` | string | Base URL file server (tùy chọn) |
| `menuStyle` | object | Style cho menu top/left |
| `menu` | `false` hoặc array | Menu header ngang — `false` = ẩn hoàn toàn |
| `menuLeft` | array | Menu sidebar trái |
| `menuComponent` | array | Component tùy chỉnh nhúng vào vùng menu |
| `domainSetting` | object | Override config theo từng domain (đa domain) |

---

## menuStyle

Tùy chỉnh màu sắc cho top menu và left menu:

```json
"menuStyle": {
  "topmenu": {
    "bgcolor":   "#217D46",
    "textcolor": "white"
  },
  "leftmenu": {
    "bgcolor":   "#217D46",
    "textcolor": "white"
  }
}
```

---

## menu (top header)

- `false` → ẩn hoàn toàn thanh header chứa menu
- Array → danh sách menu item hiển thị ở thanh top

---

## menuLeft (sidebar)

Array các menu item hiển thị ở sidebar trái. Cấu trúc một item:

```json
{
  "name": "Tên mục",
  "icon": "mdi-folder-multiple",
  "url":  "/duong-dan-module",
  "submenu": [ ... ],
  "right": {
    "SystemRight":   [1, 2, 3, 5, 9],
    "FunctionRight": ["10", "20"]
  }
}
```

### Cấu trúc menu item

| Field | Bắt buộc | Mô tả |
|---|---|---|
| `name` | ✅ | Tên hiển thị |
| `url` | ❌ | Đường dẫn module (bỏ qua nếu chỉ là nhóm có submenu) |
| `icon` | ❌ | Icon Material Design (`mdi-*`) |
| `submenu` | ❌ | Mảng menu con (cùng cấu trúc) |
| `right` | ❌ | Điều kiện hiển thị theo quyền — thiếu = hiển thị cho tất cả |

### Kiểm tra quyền hiển thị menu (`right`)

```json
"right": {
  "SystemRight":   [1, 2, 5, 9],
  "FunctionRight": ["10", "20"]
}
```

- **`SystemRight`**: User phải có `sys_SystemRight` nằm trong mảng này mới thấy menu item
- **`FunctionRight`**: User phải có ít nhất một code trong `sys_FunctionRight` (dạng `[10][20]`) mới thấy
- Khi cả hai cùng khai báo: user phải thỏa **cả hai** điều kiện
- Không khai báo `right` → item hiển thị cho tất cả user đã đăng nhập

**Ví dụ thực tế — menu chỉ cho Tổ trưởng/BGH cấp 1:**
```json
{
  "name": "Cấp 1 - Tổ trưởng",
  "icon": "mdi-account-tie",
  "right": {
    "FunctionRight": ["10"],
    "SystemRight":   [5, 9]
  },
  "submenu": [ ... ]
}
```
→ Chỉ user có `FunctionRight` chứa `"10"` (cấp 1) VÀ `SystemRight` là 5 hoặc 9 mới thấy mục này.

---

## menuComponent

Mảng các custom Vue component được nhúng vào vùng menu (ví dụ: dropdown chọn niên khóa, chọn vai trò):

```json
"menuComponent": [
  { "el": "uc-nien-khoa" },
  { "el": "uc-vaitro" }
]
```

Component phải được đăng ký trong `components/_components.json` của project.

---

## domainSetting (đa domain)

Khi một project chạy trên nhiều domain khác nhau (mỗi domain có tAPI server và DB riêng), dùng `domainSetting` để override config theo domain:

```json
"domainSetting": {
  "sec.lhu.edu.vn": {
    "apiDomain":  "https://tapi.lhu.edu.vn/acc/",
    "fileDomain": "https://file.lhu.edu.vn/acc/",
    "login":      "https://app.lhu.edu.vn",
    "userInfo":   "https://tapi.lhu.edu.vn/acc/UserInfo/acc"
  },
  "sec.fap.vn": {
    "apiDomain":  "https://api.fap.vn/acc/",
    "fileDomain": "https://file.fap.vn/acc/",
    "login":      "https://login.fap.vn",
    "userInfo":   "https://api.fap.vn/acc/UserInfo/acc"
  }
}
```

Key là hostname của domain. Runtime tự phát hiện domain hiện tại và áp dụng override tương ứng.

---

## module.json `set` — Override cho từng trang

`set` trong module.json có thể override bất kỳ field nào từ project.json. Các field thường dùng:

```json
"set": {
  "title":    "Trang quản lý sinh viên",
  "menu":     false,
  "menuLeft": [ ... ]
}
```

| Dùng `set` khi | Ví dụ |
|---|---|
| Trang có tiêu đề riêng | `"title": "Nhập điểm Tiểu học"` |
| Trang ẩn menu header | `"menu": false` |
| Trang cần menu sidebar khác | Override `"menuLeft"` với danh sách rút gọn |
| Trang landing / public | `"menu": false, "menuLeft": []` |

**Không cần ghi lại các field không thay đổi** — module chỉ cần khai báo những gì khác với project default.

---

## Tóm tắt quan hệ file

```
project.json.data          ← config mặc định cho toàn project
    ↓ bị override bởi
module.json.set             ← config riêng cho từng trang

Effective config = merge(project.json.data, module.json.set)
                   (module.set được ưu tiên)
```

---

## openWindow — Quy tắc truyền tham số URL

Khi mở sub-window bằng `openWindow`, URL chỉ truyền **ID của record cha** mà module con thực sự dùng để query DB. Không truyền name, label hay field nào có thể tra lại từ DB trong module con.

```json
// ✅ Đúng — chỉ truyền ID cần thiết
"url": "`/ContestDetail?ContestID={{sContestID}}"

// ❌ Sai — truyền thừa field có thể tra từ DB
"url": "`/ContestDetail?ContestID={{sContestID}}&ContestName={{sContestName}}"
```

**Lý do:** Module con load dữ liệu đầy đủ từ DB theo ID — truyền thêm field thừa làm URL dài, dữ liệu có thể lỗi thời, và tạo dependency không cần thiết giữa 2 module.
