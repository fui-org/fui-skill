---
id: eval-07
name: Permission-gated UI
difficulty: beginner
---

## Input

> Module xem danh sách người dùng. Người dùng thường chỉ thấy bảng. Admin (SystemRight > 1) thấy thêm filter phòng ban và nút "Thêm". Superadmin (SystemRight == 9) thấy thêm nút "Xóa hàng loạt".

## Expect

- [ ] Filter phòng ban: `col: { "v-if": "vueData.user.SystemRight>1" }`
- [ ] Nút "Thêm": `col: { "v-if": "vueData.user.SystemRight>1" }`
- [ ] Nút "Xóa hàng loạt": `col: { "v-if": "vueData.user.SystemRight==9" }`
- [ ] `v-if` đặt trên `col` object, không phải trên `attr` của element
- [ ] Bảng f-table hiển thị cho tất cả (không có v-if)
- [ ] Nếu có cột xóa riêng trong bảng: cột đó cũng có v-if hoặc chỉ admin thấy

## Reject

- [ ] `attr: { "v-if": "..." }` (v-if trên attr của element thay vì col)
- [ ] `"v-if": "SystemRight > 1"` thiếu `vueData.` prefix
- [ ] `"v-if": "vueData.user.systemRight>1"` (sai case: systemRight thay vì SystemRight)
- [ ] Hardcode user role check bằng cách khác (vd: `user.role == 'admin'`)
