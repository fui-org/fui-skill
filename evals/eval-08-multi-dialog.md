---
id: eval-08
name: Module nhiều dialog + menuChucNang
difficulty: advanced
---

## Input

> Module quản lý máy tính. Bảng danh sách máy tính có context menu (3 tác vụ): "Cập nhật phòng ban" (mở dialog 1), "Xem lịch sử" (mở dialog 2 readonly), "Xóa máy tính" (confirm rồi xóa không cần dialog). Module có 2 chế độ xem: danh sách thường và danh sách máy không hoạt động 6 tháng — sau khi thao tác cần refresh đúng chế độ đang xem.

## Expect

**State:**
- [ ] `TypeLoad: 1` trong state init (tracking chế độ xem)
- [ ] `dlDepartment: false` và `dlHistory: false` trong state
- [ ] `dongChon: null` hoặc tương đương

**menuChucNang:**
- [ ] 3 menu items trong `menuChucNang` array
- [ ] Item "Cập nhật phòng ban": copy `item.ComputerID` → `dlDepartment: true`
- [ ] Item "Xóa": `CONFIRM` trong action, không có dialog
- [ ] Không set `dlHistory/dlDepartment: true` cho item xóa

**Dialogs:**
- [ ] 2 khối `hidden-container` riêng biệt (mỗi dialog 1 container)
- [ ] Mỗi dialog có `v-card[style="padding: 0px;"]`

**Conditional refresh (IF/THEN/ELSE):**
- [ ] CALLBACK sau thao tác có `IF: "TypeLoad==1"` → gọi action đúng
- [ ] Nested IF/ELSE cho nhiều hơn 2 chế độ xem
- [ ] Buttons chuyển chế độ xem set `TypeLoad` tương ứng trước khi gọi API

**t-menu:**
- [ ] Header dùng `el: "t-menu"` với `:items: "vueData.menuChucNang"`

## Reject

- [ ] Tất cả dialogs trong cùng 1 hidden-container
- [ ] Không có TypeLoad tracking
- [ ] CALLBACK dùng CALL cứng (gọi cùng 1 action) thay vì IF/THEN/ELSE
- [ ] menuChucNang trong `controls` thay vì `data[]`
