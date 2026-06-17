# FUI Skill

> Agent Skill hỗ trợ AI phát triển web module theo kiến trúc metadata-driven của FUI — nơi giao diện và logic được định nghĩa hoàn toàn bằng JSON.

## ✨ Tổng quan

**FUI Skill** cung cấp cho AI agent các hướng dẫn và công cụ để xây dựng FUI web module, bao gồm:

- 📐 **Kiến trúc metadata-driven** — Giao diện và logic định nghĩa trong `module.json`
- 🧱 **Hệ thống grid bắt buộc** — Cấu trúc container > rows > cols nhất quán
- ⚡ **Action Protocol** — Gọi API, điều kiện, callback theo cách khai báo
- 🧩 **Template có sẵn** — Form, CRUD table, dialog, Vue component
- 🔍 **Đảm bảo chất lượng** — Review code và phân tích edge-case tích hợp
- 🛠️ **Công cụ module** — Lưu và publish module/component qua script

## 📦 Cài đặt

```bash
npx skills add fui-labs/fui-skill
```

## 📁 Cấu trúc thư mục

```
fui-skill/
├── SKILL.md              # Hướng dẫn chính của skill
├── examples/             # Template mẫu
│   ├── form-basic.json       # Form nhập liệu cơ bản
│   ├── table-crud.json       # Bảng dữ liệu với CRUD
│   ├── dialog-form.json      # Dialog dạng modal
│   └── component.vue         # Component Vue mẫu
├── references/           # Tài liệu tham khảo chi tiết
│   ├── fastproject.md        # Core action engine
│   ├── default-function.md   # Các hàm tiện ích
│   ├── coding-standards.md   # Quy tắc đặt tên & cấu hình menu
│   ├── controls-patterns.md  # Mẫu action & logic
│   ├── ui-templates.md       # Hướng dẫn sử dụng template
│   ├── components.md         # Tham khảo component
│   ├── component-table.md    # Hướng dẫn f-table
│   ├── advanced-techniques.md # Logic nâng cao & PDF
│   └── quality-assurance.md  # Quy trình review code
├── scripts/              # Mã nguồn runtime
│   ├── component.js
│   ├── componentTable.js
│   ├── defaultfunction.js
│   └── fastproject.js
└── assets/
    └── projectdefaultstyle.css
```

## 🚀 Bắt đầu nhanh

Sau khi cài đặt, agent sẽ tự động sử dụng skill này khi bạn yêu cầu **tạo, chỉnh sửa hoặc review FUI module**.

### Tạo module mới

> *"Tạo module `user-management` có bảng dữ liệu và dialog thêm/sửa."*

Agent sẽ:
1. Tạo thư mục module với `module.json`, `_info.json`, `script.js`
2. Áp dụng hệ thống grid layout bắt buộc
3. Sử dụng Action Protocol để tích hợp API
4. Tuân theo coding standards và best practices

### Các khái niệm chính

| Khái niệm | Mô tả |
|:---|:---|
| **module.json** | File chính định nghĩa `data`, `watch`, `controls`, và `set` |
| **Action Protocol** | Khai báo action bằng `API`, `IN`, `OUT`, `CALL`, `IF/THEN/ELSE` |
| **Grid System** | Cấu trúc bắt buộc `container > rows > cols` cho mọi layout |
| **Control Object** | Phần tử UI được định nghĩa bởi `el`, `attr`, `w`, `col`, `innerHTML` |

### Ví dụ — Lấy dữ liệu bằng Action

```json
{
  "fetchUsers": {
    "API": "/api/users",
    "IN": { "GroupID": "vueData.selectedGroup" },
    "OUT": "userList",
    "CALLBACK": { "MESS": "Tải thành công!" }
  }
}
```

## 📚 Tài liệu tham khảo

| Tài liệu | Mô tả |
|:---|:---|
| [fastproject.md](references/fastproject.md) | Tài liệu core action engine |
| [default-function.md](references/default-function.md) | Các hàm tiện ích có sẵn |
| [coding-standards.md](references/coding-standards.md) | Quy tắc đặt tên & cấu hình menu |
| [controls-patterns.md](references/controls-patterns.md) | Mẫu action & logic điều kiện |
| [ui-templates.md](references/ui-templates.md) | Hướng dẫn sử dụng template |
| [advanced-techniques.md](references/advanced-techniques.md) | Logic nâng cao & tạo PDF |
| [quality-assurance.md](references/quality-assurance.md) | Review code & phân tích edge-case |

## 🤝 Đóng góp

Skill này là **tài liệu sống**, liên tục được cập nhật. Sau khi hoàn thành các task phức tạp, agent sẽ hỏi:

> *"Có bài học, pattern hoặc chỉnh sửa nào từ task này cần bổ sung vào FUI skill không?"*

Phản hồi sẽ được tích hợp bằng cách cập nhật hướng dẫn, thêm tài liệu mới, hoặc loại bỏ thông tin lỗi thời — đảm bảo skill luôn phản ánh best practices mới nhất.

## 📄 Giấy phép

MIT
