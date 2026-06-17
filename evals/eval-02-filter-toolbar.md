---
id: eval-02
name: Filter Toolbar + Cascading Watch
difficulty: beginner
---

## Input

> Tạo module danh sách đơn hàng. Có filter theo: Phòng ban (dropdown từ API), Nhân viên (autocomplete từ API phụ thuộc vào phòng ban đã chọn), Từ ngày / Đến ngày, ô tìm kiếm text. Nút "Tìm" và nút "Xuất Excel" (admin only). Bảng kết quả full height.

## Expect

- [ ] `data[]` có state: `sDepartment: null`, `sStaff: null`, `sTuNgay`, `sDenNgay`, `sKeyword`
- [ ] `sTuNgay` và `sDenNgay` init với `moment().format('YYYY-MM-DD')`
- [ ] Named action `getDepartment` với auto-startup CALL
- [ ] Named action `getStaff` nhận `DepartmentID: "sDepartment"` làm IN param
- [ ] `watch` có entry cho `sDepartment` → `{ "CALL": "getStaff" }`
- [ ] Toolbar row: `col: { shrink: "true", class: "shrink" }` trên filter fields
- [ ] Filter fields có `attr: { class: "flex-md-grow-0", style: "width:...px" }`
- [ ] `v-spacer` giữa filter group và action buttons
- [ ] Nút "Xuất Excel" có `col: { "v-if": "vueData.user.SystemRight==9" }`
- [ ] `f-date` cho Từ ngày / Đến ngày (không dùng v-text-field)
- [ ] `f-table` với `:height: "$( window ).height()-285"` hoặc tương tự
- [ ] `:fixed-header: true` trên f-table

## Reject

- [ ] `v-text-field` cho input ngày
- [ ] `v-autocomplete` thay vì `f-search` cho autocomplete search API
- [ ] Không có `watch` cho cascading filter
- [ ] Không có `v-spacer` trong toolbar
- [ ] `v-if` trực tiếp trên element (phải trên `col`)
