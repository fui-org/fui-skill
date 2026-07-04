---
id: eval-03
name: Chart / Report Module
difficulty: intermediate
---

## Input

> Tạo module báo cáo thống kê điểm sinh viên theo khoa. Có filter năm học và kỳ học. Hiển thị biểu đồ cột so sánh điểm trung bình giữa các khoa, có thể drill-down xem chi tiết từng khoa. Bên cạnh biểu đồ là bảng số liệu chi tiết.

## Expect

- [ ] `f-echart` (không phải `f-chart`) vì cần drilldown
- [ ] `:config` của f-echart có `type: 'bar'`
- [ ] `v-on:drilldown` handler trên f-echart
- [ ] `:data` bind đến vueData variable chứa rows từ API
- [ ] Named action lấy data chart với API + OUT
- [ ] `watch` trên năm học và kỳ học → reload chart data
- [ ] Layout 2 cột: f-echart `w: 8` và bảng `w: 4` (hoặc tỷ lệ hợp lý)
- [ ] Filter toolbar theo pattern chuẩn (shrink cols + v-spacer + buttons)
- [ ] Auto-startup CALL data khi load xong

## Reject

- [ ] `f-chart` thay vì `f-echart` (f-chart đã bị loại khỏi skill — luôn dùng f-echart)
- [ ] Hardcode data thay vì bind từ API
- [ ] Không có watch cho cascading reload khi filter thay đổi
- [ ] `:config` là string JSON thay vì expression object
