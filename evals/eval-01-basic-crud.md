---
id: eval-01
name: Basic CRUD Module
difficulty: beginner
---

## Input

> Tạo module quản lý sinh viên. Có bảng danh sách sinh viên gồm các cột: MaSV, HoTen, NgaySinh, Email. Có thể thêm mới, sửa, xóa sinh viên qua dialog.

## Expect

Tất cả các điểm sau phải xuất hiện trong output:

- [ ] `"data"` array có state init: `dsStudent: []`, `dlStudent: false`, `dongChon: null`
- [ ] Named action `getStudent` với `API` và `OUT: "dsStudent"`
- [ ] Auto-startup: `{ "CALL": "getStudent" }` ở cuối `data[]`
- [ ] `f-table` với `:items: "dsStudent"` và `item-key`
- [ ] `t-menu` header trong f-table, `:items: "vueData.menuChucNang"`
- [ ] `menuChucNang` array với ít nhất 2 items: edit + delete
- [ ] Edit menu item set state rồi `{ "dlStudent": true }`
- [ ] Delete menu item có `CONFIRM` trước API delete
- [ ] Dialog trong `hidden-container`
- [ ] `v-card[style="padding: 0px;"]` bên trong dialog
- [ ] `v-toolbar[dense flat]` trong v-card
- [ ] Nút đóng dialog: `v-on:click: "vueData.dlStudent = false"`
- [ ] CALLBACK của Save: đóng dialog + reload data
- [ ] Nút Save dùng `f-button` với `:checkvalid: true`
- [ ] Tất cả input fields dùng `v-model` tham chiếu đến state vars (vd: `sHoTen`)

## Reject

Các anti-pattern không được xuất hiện:

- [ ] `v-data-table` thay vì `f-table`
- [ ] `v-btn` thay vì `f-button` cho nút có action FUI
- [ ] Dialog đặt trực tiếp trong rows chính (không có hidden-container)
- [ ] `@click` thay vì `v-on:click`
- [ ] Comment trong JSON (`//` hoặc `/* */`)
- [ ] `children` thay vì `innerHTML`
