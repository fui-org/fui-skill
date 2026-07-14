# FUI Skill 🚀

> AI Operating Manual & Developer Guide for FUI (Framework UI) metadata-driven web module development.

**FUI Skill** là bộ cẩm nang và công cụ hỗ trợ AI Agent cũng như nhà phát triển xây dựng các module web theo kiến trúc **metadata-driven** của FUI — nơi giao diện và logic nghiệp vụ được định nghĩa chủ yếu bằng JSON (`module.json`), giúp giảm thiểu việc viết code lặp lại và tối ưu hóa tốc độ triển khai.

---

## ✨ Tính năng cốt lõi

- 📐 **Kiến trúc Metadata-driven**: Định nghĩa giao diện UI, reactive state (`data`), reactive watcher (`watch`), và logic nghiệp vụ trong file cấu hình JSON.
- 🧱 **Hệ thống Grid bắt buộc**: Quy định chặt chẽ cấu trúc layout `container > rows > cols` đảm bảo giao diện luôn nhất quán và phản hồi tốt (responsive).
- ⚡ **Action Protocol**: Khai báo và chuỗi hóa các hành động (gọi API, điều kiện rẽ nhánh, callback, điều hướng) một cách trực quan, mạch lạc mà không cần viết JS thuần.
- 🧩 **Thư viện Component & Design System đa dạng**: Tận dụng các component dựng sẵn của FUI (`f-*`) và tích hợp hơn 70+ Brand Design Systems trong thư mục `design-md/`.
- 🔍 **Quy trình QA & Kiểm soát an toàn**: Đảm bảo chất lượng qua các bộ tiêu chuẩn kiểm thử tự động, checklist chất lượng và cơ chế xác thực an toàn đối với các tác vụ có tính thay đổi hệ thống.

---

## 📦 Hướng dẫn cài đặt

Để nạp bộ skill này cho AI Agent trong không gian làm việc của bạn, chạy lệnh sau:

```bash
npx skills add fui-org/fui-skill
```

---

## 📁 Cấu trúc thư mục dự án

```text
fui-skill/
├── SKILL.md              # Chỉ dẫn hành vi cốt lõi của Skill cho AI Agent
├── metadata.json         # Metadata cấu hình kích hoạt và phân nhóm tài liệu
├── examples/             # Bộ template và mã nguồn mẫu chuẩn
│   ├── component.vue         # Vue component mẫu (uc-*.vue)
│   ├── f-table-patterns.json # Cấu hình f-table & f-table-view nâng cao
│   ├── module-patterns.json  # Bản thiết kế module.json hoàn chỉnh
│   └── project-patterns.json # Thiết kế mẫu project.json toàn dự án
├── references/           # Tài liệu chi tiết các phân hệ (Xem danh mục bên dưới)
├── design-md/            # Hướng dẫn thiết kế theo 73 phong cách thương hiệu
│   ├── fui/                  # Style mặc định cho trang quản trị (Admin/CRUD)
│   ├── linear.app/           # Style tối giản hiện đại
│   ├── stripe/               # Style cao cấp cho thanh toán/landing page
│   └── ...                   # Hơn 70 phong cách thương hiệu nổi tiếng khác
├── evals/                # Kịch bản kiểm thử & đánh giá năng lực Agent
│   ├── README.md             # Hướng dẫn chạy đánh giá
│   └── eval-*.md             # 8 kịch bản từ cơ bản đến nâng cao
├── scripts/              # Runtime JS hoạt động dưới nền
└── assets/               # CSS global dùng chung cho hệ thống
```

---

## 🚀 Các khái niệm quan trọng

### 1. Cấu trúc module chuẩn
Mỗi module FUI được đóng gói độc lập trong một thư mục tại đường dẫn `modules/{moduleId}/`:
- **`_moduleInfo.json`**: Định nghĩa thông tin chung (tên, tiêu đề hiển thị, cài đặt `HTMLOnly`).
- **`module.json`**: Trái tim của module, chứa 4 thành phần chính: `data`, `watch`, `controls` (giao diện), và `set` (cài đặt trang).
- **`script.js`**: Chứa logic bổ trợ nâng cao bằng JS.

### 2. Quy tắc Grid Layout bắt buộc
Mọi phần tử UI trong danh sách `controls` của `module.json` đều phải được bọc trong hệ thống Grid:
```json
"controls": [
  {
    "prop": "fluid grid-list-md",
    "rows": [
      {
        "prop": "row",
        "cols": [
          // Các Control Object được định nghĩa tại đây
        ]
      }
    ]
  }
]
```

### 3. Action Protocol & Quy tắc Chuỗi Ký tự Nguyên bản (Literal String)
Logic nghiệp vụ được khai báo dưới dạng Action Object trong phần `data`.
> ⚠️ **Chú ý (Cực kỳ quan trọng)**: Khi truyền chuỗi nguyên bản (không chứa khoảng trắng) trong block `IN` của Action, bộ chuyển đổi FUI có thể hiểu lầm là biến số. Để ép kiểu chuỗi nguyên bản, hãy sử dụng ký tự huyền (\`) hoặc nháy đơn:
> - Sử dụng ký tự huyền: `"id": "\`winUser"`
> - Sử dụng dấu nháy đơn: `"url": "'/fp/module?mid=123'"`

---

## 📚 Danh mục tài liệu tham khảo (`references/`)

Tài liệu hướng dẫn phát triển được phân chia theo 4 mức độ ưu tiên hỗ trợ quá trình lập trình:

### 🌟 Tier A: Core Concept & Rules (Đọc trước khi làm)
- [Cấu trúc Module chuẩn](references/module-structure.md) — Quy tắc tổ chức thư mục & file.
- [Mẫu Control & Action](references/controls-patterns.md) — Khai báo layout grid và action.
- [Mẫu thiết kế UI/UX](references/ui-patterns.md) — Thư viện các pattern thiết kế giao diện chuẩn.

### 🧩 Tier B: Component Selection & Layout (Thiết kế giao diện)
- [Bảng tra cứu nhanh Component](references/component-quickref.md) — Phân loại component FUI (`f-*`) & ưu tiên sử dụng.
- [Cấu hình f-table chuyên sâu](references/component-table.md) — Hướng dẫn tạo bảng hiển thị, CRUD, lọc.
- [Input Components](references/components-input.md) — Cấu hình các bộ nhập liệu (`f-search`, `f-date`,...).
- [Dialog & Modal Components](references/components-dialog.md) — Thiết kế popup, dialog nhập liệu và thông báo.
- [Display Components](references/components-display.md) — Cấu hình hiển thị dữ liệu, biểu đồ `f-echart`.
- [Thiết kế Custom Vue Component](references/component-design.md) — Quy tắc viết component tùy chỉnh (`uc-*.vue`).
- [Cấu hình hệ thống Project.json](references/project-config.md) — Quản lý menu, phân quyền toàn cục.

### ⚙️ Tier C: Logic & Domain Integration (Tích hợp chức năng)
- [Web API & Stored Procedure (tAPI)](references/tapi-reference.md) — Định nghĩa kết nối backend API.
- [Quy trình làm việc với CSDL](references/db-workflow.md) — Hướng dẫn truy vấn dữ liệu & triển khai SP an toàn.
- [Watcher Patterns](references/watcher-patterns.md) — Bắt sự kiện thay đổi dữ liệu reactive.
- [Các hàm tiện ích hệ thống](references/default-function.md) — Danh sách hàm helper có sẵn của FUI.
- [Kỹ thuật lập trình nâng cao](references/advanced-techniques.md) — Xử lý logic phức tạp.
- [Sinh tài liệu PDF](references/pdfmake.md) — Xuất file PDF động sử dụng `pdfmake`.
- [Chi tiết Core Action Engine](references/fastproject.md) — Cơ chế hoạt động của Action Engine.
- [Bản đồ Mapping Script](references/script-map.md) — Cơ chế ánh xạ runtime script.
- [Quy trình phát triển Fullstack](references/fullstack-workflow.md) — Cách tích hợp End-to-End.

### 🛡️ Tier D: Quality Assurance & Operations (Phát hành)
- [Danh mục Công cụ (MCP Tools)](references/tools-registry.md) — Danh sách tool hỗ trợ và quy định an toàn thao tác.
- [Quy trình nghiệm thu (Verification)](references/verification.md) — Checklist kiểm tra chất lượng trước khi publish.

---

## 🎨 Brand Design Systems (`design-md/`)

FUI Skill tích hợp sẵn **73 hệ thống thiết kế** của các thương hiệu nổi tiếng toàn cầu nhằm hỗ trợ Agent sinh giao diện mang tính thẩm mỹ cao và đồng bộ. 

Khi triển khai dự án hoặc yêu cầu AI thiết kế giao diện:
1. **Ưu tiên 1**: Sử dụng tệp tin cấu hình phong cách cục bộ của dự án (`{projectId}/DESIGN.md`) nếu có.
2. **Ưu tiên 2**: Bạn có thể yêu cầu AI áp dụng một phong cách cụ thể (ví dụ: *"hãy sử dụng style của Linear"* hoặc *"thiết kế theo phong cách Apple"*). Agent sẽ nạp tài liệu tương ứng từ `design-md/<brand>` để thiết kế UI.
3. **Ưu tiên 3**: Nếu không có yêu cầu đặc thù, AI sẽ tự phân tích mục đích trang để chọn style tối ưu nhất (ví dụ: `design-md/fui` dành cho các trang quản trị dữ liệu, admin dashboard).

---

## 🤝 Đóng góp & Cải tiến liên tục

Hệ thống tài liệu này được thiết kế theo dạng **tài liệu sống** (living documentation). Khi Agent thực hiện xong các task phức tạp và đúc rút được bài học mới, nó sẽ đề xuất cập nhật thêm các pattern, hướng dẫn tối ưu vào thư mục `references/` để skill ngày càng hoàn thiện và thông minh hơn.

---

## 📄 Giấy phép

Hệ thống được phân phối theo giấy phép **MIT**.
