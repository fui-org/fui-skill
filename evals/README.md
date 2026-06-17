# FUI Skill — Evaluation Suite

Mỗi eval là một scenario thực tế. AI được cho một prompt, kết quả được kiểm tra theo checklist.

## Cách dùng

1. Đưa prompt trong `input:` cho AI
2. So sánh output với `expect:` (phải có đủ) và `reject:` (không được xuất hiện)
3. Score: tính % expected items có mặt trong output

## Files

| File | Scenario |
|---|---|
| eval-01-basic-crud.md | Module CRUD cơ bản + f-table + dialog |
| eval-02-filter-toolbar.md | Toolbar filter + cascading watch |
| eval-03-chart-report.md | Module báo cáo với f-echart |
| eval-04-cross-window.md | Parent/child window data exchange |
| eval-05-tapi-sp.md | Thiết kế tAPI SP + wiring FUI |
| eval-06-inline-edit.md | ctrl-update CRUD inline trong bảng |
| eval-07-permission-gate.md | Permission-gated UI theo SystemRight |
| eval-08-multi-dialog.md | Module nhiều dialog + menuChucNang |
