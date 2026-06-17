---
id: eval-06
name: Inline CRUD với ctrl-update
difficulty: beginner
---

## Input

> Tạo module quản lý danh mục loại tài liệu. Chỉ cần bảng với 2 cột: MaLoai và TenLoai. Có thể thêm/sửa/xóa trực tiếp trong bảng mà không cần mở dialog.

## Expect

- [ ] `f-table` với header `{ "text": "Update", "value": "ctrl-update" }`
- [ ] `:update-form` array với ít nhất 1 field input
- [ ] `:update-api` object có 3 keys: `new`, `edit`, `delete`
- [ ] `update-api.new` có `API`, `IN`, `CALLBACK`
- [ ] `update-api.edit` có `API`, `IN`, `CALLBACK`
- [ ] `update-api.delete` có `CONFIRM`, `API`, `IN`, `CALLBACK`
- [ ] CALLBACK của mỗi operation có `CALL` reload data
- [ ] `item-key` được set đúng primary key
- [ ] `IN` của edit/delete dùng `item.MaLoai` (không phải hardcode)

## Reject

- [ ] Dùng dialog + menuChucNang khi form chỉ có 1-2 fields (ctrl-update phù hợp hơn)
- [ ] `update-api` thiếu bất kỳ key nào trong new/edit/delete
- [ ] Không có CONFIRM trong delete
- [ ] `update-form` fields không có `v-model` đúng
