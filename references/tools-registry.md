# FUI MCP Tools — Safety Registry

Mọi tool được phân loại theo 2 chiều:

- **ReadOnly** (`R`) / **Mutating** (`M`) — tool có ghi dữ liệu không?
- **Safe** (`✅`) / **RequiresConfirm** (`⚠️`) / **Destructive** (`🔴`) — mức độ rủi ro

> **Nguyên tắc mặc định**: Tool là Mutating và cần xác nhận TRỪ KHI được đánh dấu rõ là ReadOnly/Safe.  
> **Per-call rule**: Safety đánh giá theo input thực tế của từng lần gọi — cùng tool có thể safe hay không tùy ngữ cảnh.

---

## Session Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `session_get` | R | ✅ | Chỉ đọc session hiện tại |
| `session_set` | M | ✅ | Set active target — reversible |
| `session_clear` | M | ✅ | Clear target — không xóa data |
| `session_resolve` | R | ✅ | Resolve path string, không ghi |

---

## Project Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `project_list` | R | ✅ | Chỉ đọc |
| `project_get_data` | R | ✅ | Chỉ đọc |
| `project_save` | M | ⚠️ | Tạo/cập nhật project — tóm tắt trước khi gọi |
| `project_update_data` | M | ⚠️ | Ghi đè project.json — preview với user |
| `project_sync` | M | ✅ | Refresh từ server — không mất data local |

---

## Module Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `module_list` | R | ✅ | Chỉ đọc |
| `module_get` | R | ✅ | Chỉ đọc JSON declarations |
| `module_get_ui` | R | ✅ | Chỉ đọc module.json |
| `module_get_html` | R | ✅ | Chỉ đọc header/body html |
| `module_new` | M | ⚠️ | Tạo module mới — xác nhận ID và tên |
| `module_checkout` | M | ✅ | Fetch từ server → ghi local — overwrite local files |
| `module_sync` | M | ✅ | Re-fetch và overwrite local — chỉ ghi local workspace |
| `module_sync_list` | M | ✅ | Overwrite _modules.json local |
| `module_update_ui` | M | ⚠️ | Ghi module.json lên **server** — dùng preview trước |
| `module_update_import` | M | ⚠️ | Ghi import config lên server |
| `module_preview` | R | ✅ | Diff local vs server — chỉ đọc + tạo token |
| `module_publish_staged` | M | ⚠️ | **Push lên server** — phải có approval token từ preview |
| `module_publish` | M | 🔴 | Push trực tiếp không qua staged — chỉ khi user yêu cầu rõ ràng |

### Quy trình bắt buộc cho module_publish_staged

```
module_preview → user xem diff → user approve → module_publish_staged
```

Không được gọi `module_publish_staged` hoặc `module_publish` khi chưa có approval từ user.

---

## Component Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `component_get` | R | ✅ | Đọc .vue source |
| `component_sync` | M | ✅ | Refresh list từ server — ghi local |
| `component_publish` | M | ⚠️ | **Push .vue lên server** — xác nhận trước |

---

## Script Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `script_publish` | M | ⚠️ | Push script.js lên server — xác nhận trước |

---

## Import File Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `file_import_list` | R | ✅ | Chỉ đọc |
| `file_import_get` | R | ✅ | Chỉ đọc source |
| `file_import_new` | M | ⚠️ | Tạo import file mới trên server |
| `file_import_update` | M | ⚠️ | Cập nhật metadata import file |
| `file_import_upload` | M | ⚠️ | Ghi nội dung file lên server |
| `file_import_delete` | M | 🔴 | **Xóa import file** — không khôi phục được; yêu cầu xác nhận rõ ràng |
| `file_import_sync` | M | ✅ | Refresh list local |

---

## Database Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `db_config_get` | R | ✅ | Đọc DB connection config |
| `db_connect` | M | ✅ | Kết nối DB + tự fetch schema — ghi config.json và schema.json local |
| `db_user_token_set` | M | ✅ | Lưu userToken vào config local — không ảnh hưởng server |
| `db_token_rebuild` | M | ⚠️ | Rebuild dbToken từ uid/password mới — overwrite token hiện tại; xác nhận server/database đúng trước khi gọi |
| `db_schema_fetch` | M | ✅ | Fetch schema từ DB → cache local |
| `db_schema_get` | R | ✅ | Đọc cached schema |
| `db_sp_list` | R | ✅ | Liệt kê SPs |
| `db_sp_get` | R | ✅ | Đọc SP source |
| `db_sql_execute` | R | ⚠️ | SELECT query — xác nhận trước khi chạy; TOP 20; không SELECT binary/max columns; **DROP TABLE/ALTER TABLE bị block ở code** |
| `db_sp_save` | M | ⚠️ | Lưu SP vào local — chưa deploy |
| `db_sp_rename` | M | ⚠️ | Đổi tên SP trong DB — tóm tắt trước khi gọi |
| `db_sp_deploy` | M | 🔴 | **Deploy SP vào DB** — tự lưu history trước khi ghi; tóm tắt SP nào, loại thao tác (CREATE/ALTER); chờ user xác nhận |
| `db_sp_delete` | M | 🔴 | **Xóa SP khỏi DB** — không khôi phục được; yêu cầu xác nhận rõ ràng |
| `db_sql_execute_nonquery` | M | 🔴 | **Chạy DDL/DML không trả về rows** — xác nhận trước khi chạy; **DROP TABLE/ALTER TABLE bị block**; **DELETE/UPDATE không WHERE bị block** (chỉ hiển thị SQL) |

### Quy tắc bắt buộc cho DB tools

**Áp dụng cho tất cả `db_sql_execute` và `db_sql_execute_nonquery`:**
1. Trình bày tóm tắt: query làm gì, dữ liệu nào bị ảnh hưởng
2. Đợi user xác nhận trước khi gọi tool

**Guards được enforce ở code level (không thể bypass):**
- `DROP TABLE` / `ALTER TABLE` → blocked hoàn toàn, trả về lỗi
- `DELETE` / `UPDATE` không có `WHERE` → blocked, trả về SQL dạng display-only để user copy thủ công
- `db_sp_deploy` → tự lưu SP history vào `_db/sp-history/` trước khi overwrite

**Khi dùng `db_sql_execute`:**
- Luôn thêm `TOP 20` (hoặc ít hơn nếu chỉ cần xem cấu trúc) — dữ liệu thực tế có thể rất lớn, vượt quá khả năng xử lý của context
- Không SELECT cột kiểu `varbinary(max)`, `image`, `nvarchar(max)` dữ liệu lớn

**Không test spAPI_* trừ khi user yêu cầu rõ ràng** — tốn chi phí không cần thiết. Để kiểm tra logic SP phức tạp: chạy từng sub-query nhỏ qua `db_sql_execute` với `TOP 10–20`, xác nhận đúng rồi mới ghép lại và deploy.

---

## Skill & Design Tools

| Tool | R/M | Safety | Ghi chú |
|---|---|---|---|
| `skill_get` | R | ✅ | Đọc skill rules |
| `skill_sync` | M | ✅ | Refresh skill từ server |
| `design_list` | R | ✅ | Liệt kê brand design systems có sẵn |
| `design_get` | R | ✅ | Đọc DESIGN.md của một brand |

---

## Concurrency Rules

Các tools có thể chạy song song (parallel):
- Tất cả ReadOnly (`R`) tools
- `session_get`, `session_set`, `project_list`, `module_list`

Không được chạy song song:
- Bất kỳ Destructive (🔴) tool nào
- `module_publish_staged` / `module_publish` với bất kỳ tool nào khác
- `db_sp_deploy` với `db_sp_deploy` khác

---

## Tóm tắt Risk Matrix

```
✅ Safe         → Gọi tự do, không cần hỏi
⚠️ RequiresConfirm → Tóm tắt cho user trước, chờ OK
🔴 Destructive  → Tóm tắt đầy đủ + chờ xác nhận rõ ràng từ user
```
