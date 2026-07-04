---
id: eval-05
name: tAPI SP Design + FUI Wiring
difficulty: intermediate
---

## Input

> Thiết kế stored procedure và wiring FUI module.json cho tính năng: lấy danh sách hợp đồng theo phòng ban, thêm mới hợp đồng, và xóa hợp đồng (cần xác nhận). SP cần bảo vệ: chỉ user có SystemRight >= 2 mới được thêm/xóa.

## Expect

**SP naming:**
- [ ] SP list dùng `spAPI_ContractList` hoặc `spAPI_ContractSelect` (không phải `spAPIGetContracts`)
- [ ] SP insert dùng `spAPI_ContractInsert` hoặc `spAPI_ContractAdd`
- [ ] SP delete dùng `spAPI_ContractDelete`
- [ ] Prefix `spAPI_` bắt buộc trên tất cả SPs
- [ ] `@sys_UserID` có mặt trong SP insert và delete (audit trail)
- [ ] Kiểm tra quyền: `IF @sys_SystemRight < 2 BEGIN RAISERROR('[Unauthorized]...', 11, 1) RETURN END`
- [ ] `GRANT EXECUTE ON [spName] TO [public]` sau CREATE PROCEDURE

**FUI wiring:**
- [ ] Named action `getContract` với `API`, `IN` có DepartmentID, `OUT`
- [ ] Named action `addContract` với `API`, `IN` mapping từ state vars, `CALLBACK`
- [ ] Named action `deleteContract` với `CONFIRM` trước `API`
- [ ] CALLBACK của addContract: MESS + đóng dialog + reload
- [ ] CALLBACK của deleteContract: MESS + reload
- [ ] Buttons thêm/xóa có `col: { "v-if": "vueData.user.SystemRight>=2" }`

## Reject

- [ ] SP tên `sp_GetContracts` (thiếu API prefix)
- [ ] SP insert không có `@sys_UserID`
- [ ] Không có kiểm tra quyền trong SP
- [ ] CALLBACK của delete không có CONFIRM
- [ ] Không có permission gate trên buttons
