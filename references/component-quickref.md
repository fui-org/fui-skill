# FUI Component Quick Reference

Tra cứu nhanh toàn bộ component có sẵn trong FUI runtime. Ưu tiên dùng `f-*` trước — chỉ dùng `v-*` khi không có FUI equivalent.

| Component | Dùng khi nào | Reference |
|---|---|---|
| `f-table` | Bảng dữ liệu có sort/search/CRUD | [component-table.md](component-table.md) |
| `f-table-view` | Bảng chỉ xem (readonly, no edit) | [component-table.md](component-table.md) |
| `f-dialog` | Modal dialog với form, watch, button | [components-dialog.md](components-dialog.md) |
| `f-window` | Dialog mở URL trong iframe | [components-dialog.md](components-dialog.md) |
| `f-button` | Nút bấm có action, hotkey, form validation | [components-input.md](components-input.md) |
| `f-date` | Input ngày có date picker + typed mask | [components-input.md](components-input.md) |
| `f-time` | Input giờ có time picker + typed mask | [components-input.md](components-input.md) |
| `f-time-counter` | Đếm ngược / đồng hồ | [components-input.md](components-input.md) |
| `f-search` | Autocomplete tìm kiếm qua API | [components-input.md](components-input.md) |
| `f-menu` | Dropdown button menu có icon/action/link | [components-input.md](components-input.md) |
| `f-radiobox` | Radio group từ array items | [components-input.md](components-input.md) |
| `f-file-upload` | Upload file (Plupload, progress dialog) | [components-input.md](components-input.md) |
| `f-image-update` | Upload + crop ảnh | [components-input.md](components-input.md) |
| `f-excel-reader` | Đọc file Excel → JSON | [components-input.md](components-input.md) |
| `f-qrcode` | Render mã QR | [components-input.md](components-input.md) |
| `f-qrcode-reader` | Đọc QR bằng camera | [components-input.md](components-input.md) |
| `f-editor` | Rich text editor (CKEditor 5) | [components-dialog.md](components-dialog.md) |
| `f-editor-dialog` | Rich text editor trong modal | [components-dialog.md](components-dialog.md) |
| `f-echart` | Biểu đồ ECharts V5: bar/line/area/pie/doughnut/scatter/radar/gauge, multi Y-axis, theme, drilldown, realtime | [components-display.md](components-display.md) |
| `f-pdfmake` | Render PDF trong iframe | [components-display.md](components-display.md) |
| `f-label` | Chip/badge hiển thị tag, trạng thái | [components-display.md](components-display.md) |
| `f-box` | Hiển thị/chỉnh sửa key-value rows | [components-display.md](components-display.md) |
| `f-header` | Tiêu đề lớn (display-1, primary color) | [components-display.md](components-display.md) |
| `f-title` | Tiêu đề nhỏ (title, primary color) | [components-display.md](components-display.md) |
| `f-slider` | Carousel ảnh | [components-display.md](components-display.md) |

## Quy tắc chọn nhanh

- `f-button` thay `v-btn` khi cần action FUI (CALL, hotkey, form validation)
- `f-date` / `f-time` thay `v-text-field` + manual date parsing
- `f-search` thay `v-autocomplete` khi cần search qua API
- `f-menu` thay `v-menu + v-btn` khi cần dropdown actions
- `f-table` thay `v-data-table` cho mọi bảng CRUD (có thêm/sửa/xóa)
- `f-table-view` thay `v-data-table` cho bảng chỉ xem (readonly, không cần edit)
- `f-echart` cho **mọi** biểu đồ — `f-chart` đã bị loại khỏi skill
- `f-dialog` cho dialog có form phức tạp; `ctrl-update` cho inline edit 1-2 field trong bảng
