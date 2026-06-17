---
id: eval-04
name: Cross-window Data Exchange
difficulty: intermediate
---

## Input

> Module A (danh sách nhân viên) có nút "Xem quyền" trên mỗi dòng. Khi bấm, mở sub-window Module B để xem/edit quyền của nhân viên đó. Module B cần nhận UserID và FullName từ Module A. Khi đóng Module B, Module A phải tự reload danh sách.

## Expect

**Module A:**
- [ ] `menuChucNang` có item "Xem quyền" với action 2 bước: copy field → openWindow
- [ ] `sUserID: "item.UserID"` và `sFullName: "item.FullName"` trước khi openWindow
- [ ] `FUN: "openWindow"` với `id: "\`WinPer"` (backtick literal)
- [ ] `url` có `?menu=0` để ẩn nav trong sub-window
- [ ] `onclose` trong openWindow IN có action CALL reload
- [ ] id truyền vào openWindow có backtick prefix

**Module B (sub-window):**
- [ ] `data[]` item đầu kiểm tra `typeof menu != 'undefined'` → set `v_Set.menu: false`
- [ ] `sUserID: "#PARENT.sUserID"` và `sFullName: "#PARENT.sFullName"` để nhận data
- [ ] `#PARENT.*` đặt TRƯỚC các CALL startup
- [ ] `set: { menu: false }` trong module.json
- [ ] Auto-startup CALL ngay sau khi nhận data từ parent

## Reject

- [ ] Module B dùng URL params (`?userID=xxx`) thay vì `#PARENT`
- [ ] `#PARENT.*` đặt SAU CALL startup (data chưa có khi API gọi)
- [ ] `id` trong openWindow không có backtick: `"id": "WinPer"` (sẽ bị eval như biến)
- [ ] Module A không có `onclose` callback
