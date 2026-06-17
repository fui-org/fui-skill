# Full-Stack Module Workflow

Quy trình 5 bước để thiết kế một FUI module hoàn chỉnh: có cả UI (FUI) lẫn backend API (tAPI).

Đọc [tapi-reference.md](tapi-reference.md) trước khi bắt đầu bước 2.

---

## Bước 1 — Phân tích yêu cầu

Trước khi viết bất kỳ dòng code nào, xác định rõ:

**1.1 Nghiệp vụ cần làm gì?**
- Danh sách / tìm kiếm / lọc dữ liệu?
- Thêm / sửa / xoá bản ghi?
- Báo cáo / thống kê?
- Workflow (duyệt, từ chối, trạng thái)?

**1.2 Dữ liệu liên quan:**
- Table chính là gì? Các table liên kết?
- Khoá chính là gì? (ID, Code, hay composite key?)
- Trường nào hiển thị, trường nào nhập liệu?

**1.3 Quyền và xác thực:**
- Module có cần login không? (nếu không → dùng `AUTH_` trong SP)
- Có phân quyền theo `sys_SystemRight` không? → xử lý trong thân SP

**Output bước 1:** Danh sách tính năng + tên các entity chính.

---

## Bước 2 — Thiết kế API endpoints

Từ danh sách tính năng, map sang các SP tAPI cần tạo.

**Pattern đặt tên:**
```
spAPI_{Entity}{Action}
```

**Bảng mapping thường gặp:**

| Tính năng | SP name | Params chính |
|---|---|---|
| Lấy danh sách | `spAPI_{Entity}List` | Filter params (custom) |
| Lấy chi tiết | `spAPI_{Entity}Get` | `@url1_{EntityID}` |
| Thêm mới | `spAPI_{Entity}Insert` | Các field của entity |
| Cập nhật | `spAPI_{Entity}Update` | ID + các field cần cập nhật |
| Xoá | `spAPI_{Entity}Delete` | `@url1_{EntityID}` |
| Lookup / dropdown | `spAPI_AUTH_{Entity}Options` | Không cần auth, trả danh sách |

**Ví dụ cho module "Quản lý Sinh viên":**

```
spAPI_StudentList       -- danh sách, lọc theo ClassID + Keyword
spAPI_StudentGet        -- chi tiết theo url1=StudentID
spAPI_StudentInsert     -- thêm mới
spAPI_StudentUpdate     -- cập nhật
spAPI_StudentDelete     -- xoá theo url1=StudentID
spAPI_AUTH_ClassOptions -- dropdown danh sách lớp (không cần auth)
```

**Output bước 2:** Danh sách đầy đủ SP, tên + params.

---

## Bước 3 — Viết SQL Stored Procedures

Viết SP theo đúng quy tắc tAPI. Xem chi tiết tại [tapi-reference.md](tapi-reference.md).

**Template SP SELECT (danh sách):**

```sql
CREATE PROCEDURE spAPI_StudentList
    @Keyword    nvarchar(200) = NULL,
    @ClassID    varchar(20)   = NULL,
    @sys_UserID varchar(9)
AS BEGIN
    SELECT s.StudentID, s.FullName, s.ClassID, c.ClassName, s.GPA
    FROM tblStudent s
    JOIN tblClass c ON s.ClassID = c.ClassID
    WHERE (@Keyword IS NULL OR s.FullName LIKE '%' + @Keyword + '%')
      AND (@ClassID IS NULL OR s.ClassID = @ClassID)
    ORDER BY s.FullName
END
```

**Template SP INSERT:**

```sql
CREATE PROCEDURE spAPI_StudentInsert
    @StudentID  varchar(9),
    @FullName   nvarchar(100),
    @ClassID    varchar(20),
    @sys_UserID varchar(9)
AS BEGIN
    IF EXISTS (SELECT 1 FROM tblStudent WHERE StudentID = @StudentID)
    BEGIN
        RAISERROR(N'Mã sinh viên đã tồn tại', 16, 1)
        RETURN
    END
    INSERT INTO tblStudent (StudentID, FullName, ClassID, CreateUser, CreateTime)
    VALUES (@StudentID, @FullName, @ClassID, @sys_UserID, GETDATE())
    SELECT mess = N'Thêm thành công', id = @StudentID
END
```

**Template SP DELETE:**

```sql
CREATE PROCEDURE spAPI_StudentDelete
    @url1_StudentID varchar(9),
    @sys_UserID     varchar(9)
AS BEGIN
    DELETE FROM tblStudent WHERE StudentID = @url1_StudentID
    SELECT mess = N'Đã xoá', id = @url1_StudentID
END
```

**Template SP GET (chi tiết, dùng convert_to_object):**

```sql
CREATE PROCEDURE spAPI_StudentGet
    @url1_StudentID varchar(9),
    @sys_UserID     varchar(9)
AS BEGIN
    SELECT convert_to_object = '',
           s.StudentID, s.FullName, s.ClassID, c.ClassName, s.GPA, s.Email
    FROM tblStudent s
    JOIN tblClass c ON s.ClassID = c.ClassID
    WHERE s.StudentID = @url1_StudentID
END
```

> Dùng `convert_to_object = ''` khi SP trả về đúng một record → response dạng object thay vì `data[0][0]`.

**Sau khi CREATE PROCEDURE, phải GRANT quyền:**

```sql
GRANT EXECUTE ON [dbo].[spAPI_StudentList] TO [public] AS [dbo]
```

**Output bước 3:** Toàn bộ SQL script cho các SP đã thiết kế ở bước 2.

---

## Bước 4 — Thiết kế FUI module.json

Thiết kế UI theo cấu trúc FUI. Xem [SKILL.md](../SKILL.md) và [controls-patterns.md](controls-patterns.md) để biết chi tiết.

**4.1 Khai báo data và actions**

```json
"data": [
  { "keyword": "" },
  { "classId": "" },
  { "studentList": [] },
  { "form": {} },
  { "dialogOpen": false },

  {
    "fetchStudents": {
      "API": "/{alias}/StudentList",
      "IN": { "Keyword": "vueData.keyword", "ClassID": "vueData.classId" },
      "OUT": "studentList"
    }
  },
  {
    "saveStudent": {
      "API": "/{alias}/StudentInsert",
      "IN": {
        "StudentID": "vueData.form.StudentID",
        "FullName":  "vueData.form.FullName",
        "ClassID":   "vueData.form.ClassID"
      },
      "CALLBACK": {
        "CALL": "vueData.fetchStudents",
        "MESS": "Thêm thành công",
        "EXE":  "vueData.dialogOpen = false"
      }
    }
  },
  {
    "deleteStudent": {
      "API": "/{alias}/StudentDelete/`{{vueData.selectedID}}",
      "CONFIRM": "Bạn có chắc muốn xoá sinh viên này?",
      "CALLBACK": { "CALL": "vueData.fetchStudents" }
    }
  }
]
```

**4.2 Khai báo watch để tự load khi filter thay đổi**

```json
"watch": {
  "keyword": { "CALL": "vueData.fetchStudents" },
  "classId":  { "CALL": "vueData.fetchStudents" }
}
```

**4.3 Thiết kế controls**

Dùng `f-table` cho danh sách, `v-dialog` cho form thêm/sửa. Xem [component-table.md](component-table.md) và [ui-templates.md](ui-templates.md) để lấy template.

**Output bước 4:** File `module.json` hoàn chỉnh.

---

## Bước 5 — Kiểm tra wiring và hoàn thiện

Checklist trước khi publish:

**API:**
- [ ] Tất cả SP đã `GRANT EXECUTE TO [public]`
- [ ] SP có `AUTH_` cho các endpoint không cần login
- [ ] Kiểm tra quyền trong thân SP bằng `RAISERROR` nếu cần
- [ ] Test endpoint bằng cách gọi trực tiếp qua URL

**FUI module.json:**
- [ ] `API` path trong mỗi action khớp đúng `/{alias}/{FunctionName}`
- [ ] `IN` params khớp đúng tên param trong SP (phân biệt hoa thường)
- [ ] Route params (url1, url2) được truyền qua URL, không phải qua `IN`
- [ ] `OUT` nhận đúng kiểu dữ liệu (array hay object tuỳ SP)
- [ ] `watch` đã khai báo cho các filter tự động reload
- [ ] `set.onLoad` gọi action fetch ban đầu khi module mở

**Output bước 5:** Module hoạt động end-to-end, UI ↔ API thông suốt.

---

## Ví dụ đầu ra hoàn chỉnh

### SP cần tạo (bước 3 output)

```sql
-- 1. Danh sách
CREATE PROCEDURE spAPI_StudentList @Keyword nvarchar(200) = NULL, @ClassID varchar(20) = NULL, @sys_UserID varchar(9)
AS BEGIN
    SELECT s.StudentID, s.FullName, s.ClassID, s.GPA
    FROM tblStudent s WHERE (@Keyword IS NULL OR s.FullName LIKE '%'+@Keyword+'%') AND (@ClassID IS NULL OR s.ClassID = @ClassID)
END
GRANT EXECUTE ON [dbo].[spAPI_StudentList] TO [public] AS [dbo]

-- 2. Thêm mới
CREATE PROCEDURE spAPI_StudentInsert @StudentID varchar(9), @FullName nvarchar(100), @ClassID varchar(20), @sys_UserID varchar(9)
AS BEGIN
    INSERT INTO tblStudent(StudentID, FullName, ClassID, CreateUser, CreateTime) VALUES(@StudentID, @FullName, @ClassID, @sys_UserID, GETDATE())
    SELECT mess = N'Thêm thành công'
END
GRANT EXECUTE ON [dbo].[spAPI_StudentInsert] TO [public] AS [dbo]
```

### module.json actions (bước 4 output)

```json
"fetchStudents": { "API": "/me/StudentList", "IN": { "Keyword": "vueData.keyword" }, "OUT": "studentList" },
"addStudent":    { "API": "/me/StudentInsert", "IN": { "StudentID": "vueData.form.StudentID", "FullName": "vueData.form.FullName", "ClassID": "vueData.form.ClassID" }, "CALLBACK": { "CALL": "vueData.fetchStudents", "MESS": "Đã thêm" } }
```

---

## Lưu ý quan trọng

- **`{alias}`** trong API path là tên app alias trong tAPI (ví dụ `me`, `lms`, `hr`). Hỏi người dùng nếu chưa biết.
- **Route params** (`@url1_`) truyền qua URL, không qua `IN`: dùng backtick prefix trong API path: `"API": "/me/StudentDelete/\`{{vueData.selectedID}}"`
- **Response từ SP có nhiều SELECT** → `data[0]`, `data[1]`... — khai báo rõ trong `OUT` hoặc dùng `EXE` để tách.
- **`convert_to_object = ''`** → response là object phẳng, đọc trực tiếp `vueData.studentDetail.FullName` thay vì `vueData.studentDetail[0].FullName`.
