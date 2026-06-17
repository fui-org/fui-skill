# tAPI Reference — Transparent Query API

tAPI tự sinh API từ SQL Stored Procedures. Tên SP quyết định endpoint URL, kiểu xác thực, và quyền truy cập. Không cần viết controller hay route — chỉ cần đặt tên SP đúng quy tắc.

tAPI hỗ trợ cả **GET và POST** — không cần chỉ định HTTP method khi viết SP. FUI module.json tự quyết định method dựa trên cách gọi.

## 1. Quy tắc đặt tên SP

### Cấu trúc tên

```
spAPI_[AUTH_]FunctionName
```

| Phần | Bắt buộc | Ý nghĩa |
|---|---|---|
| `spAPI_` | ✅ | Đánh dấu SP được phép gọi qua API. Thiếu prefix này → API không gọi được |
| `AUTH_` | ❌ | Không yêu cầu xác thực. Bỏ qua → bắt buộc phải có token hợp lệ |
| `FunctionName` | ✅ | Tên hàm API, dùng trong URL. Ví dụ: `MessageHome`, `UserSetting` |

**Ví dụ tên SP:**

```sql
spAPI_MessageHome       -- có auth
spAPI_AUTH_SelectChat   -- không cần auth
```

### File API

```
spAPIFILE_Document         -- SP để GET file
spAPIFILE_UPLOAD_Document  -- SP để nhận file upload
```

---

## 2. Tham số SP

Ba loại tham số:

### `@url1_`, `@url2_`, `@url3_`... — Route params

Giá trị lấy trực tiếp từ URL theo thứ tự:

```
https://api.domain.vn/app/FunctionName/value1/value2
```

```sql
@url1_GroupID varchar(50),  -- nhận "value1"
@url2_Mode    varchar(50),  -- nhận "value2"
```

### `@sys_` — System params (tAPI tự inject, không cần truyền từ client)

| Tham số | Kiểu | Mô tả |
|---|---|---|
| `@sys_UserID` | varchar(9) | Mã người dùng đã xác thực |
| `@sys_UserName` | varchar(50) | Tên đăng nhập |
| `@sys_GroupID` | int | Nhóm của user |
| `@sys_DepartmentID` | varchar(9) | Mã đơn vị |
| `@sys_SystemRight` | int | Quyền phân tầng (1=thấp, 9=cao) |
| `@sys_FunctionRight` | varchar(2000) | Quyền chức năng dạng `[AD][RPT][MGR]` |
| `@sys_SessionID` | varchar(50) | Mã phiên xác thực |
| `@sys_RawData` | nvarchar(max) | Toàn bộ JSON body từ client |
| `@sys_Header_RequestID` | varchar(200) | RequestID từ HTTP header |

> **CRITICAL — Không truyền `@sys_` vào `IN` của module.json:**
> tAPI backend tự gán toàn bộ tham số `@sys_*` từ session đã xác thực. Nếu client truyền vào `IN`, giá trị sẽ bị **bỏ qua hoặc ghi đè** bởi server — truyền vào là thừa và có thể gây nhầm lẫn.
>
> ```json
> // ❌ SAI — không đưa sys_ vào IN
> "IN": { "ModuleID": "sModuleID", "sys_UserID": "vueData.user.UserID" }
>
> // ✅ ĐÚNG — chỉ truyền custom params
> "IN": { "ModuleID": "sModuleID" }
> ```
>
> `@sys_UserID`, `@sys_SystemRight`, `@sys_FunctionRight`... đều được tAPI tự điền — SP nhận đúng giá trị mà không cần client gửi.

### Custom params — Tham số nghiệp vụ do lập trình viên định nghĩa

Tên tham số = tên field trong JSON body gửi lên:

```sql
@StudentID  varchar(9),
@SemesterID int,
@Keyword    nvarchar(200)
```

Client gửi: `POST /app/FunctionName` với body `{ "StudentID": "SV001", "SemesterID": 1 }`

---

## 3. URL gọi API

```
{domain}/{alias}/{FunctionName}/{url1}/{url2}...
{domain}/{alias}/auth/{FunctionName}/{url1}/{url2}...
```

| Phần | Ý nghĩa |
|---|---|
| `domain` | Domain API, ví dụ `https://api.lhu.edu.vn` |
| `alias` | Tên alias của ứng dụng: `me`, `congvan`, `calen`... |
| `auth` | Thêm segment này khi SP có `AUTH_` (không cần token) |
| `FunctionName` | Phần tên sau prefix của SP |
| `url1`, `url2`... | Route params tương ứng `@url1_`, `@url2_` |

**Ví dụ:**

```
SP:  spAPI_AUTH_Select_Chat
URL: https://api.lhu.edu.vn/me/auth/Select_Chat

SP:  spAPI_GetStudentList
URL: https://api.lhu.edu.vn/me/GetStudentList

SP:  spAPI_GetStudentDetail  (@url1_StudentID)
URL: https://api.lhu.edu.vn/me/GetStudentDetail/SV001
```

---

## 4. Format dữ liệu trả về

### 4.1 Một SELECT — trả về array

```sql
SELECT StudentID, FullName, GPA FROM tblStudent WHERE ClassID = @ClassID
```

```json
{
  "data": [
    { "StudentID": "SV001", "FullName": "Nguyen Van A", "GPA": 3.5 },
    { "StudentID": "SV002", "FullName": "Tran Thi B",   "GPA": 3.2 }
  ]
}
```

### 4.2 Nhiều SELECT — trả về array of arrays

Mỗi `SELECT` trong SP tạo thành một mảng con trong `data`:

```sql
SELECT TotalCount = COUNT(*) FROM tblStudent WHERE ClassID = @ClassID
SELECT StudentID, FullName FROM tblStudent WHERE ClassID = @ClassID
```

```json
{
  "data": [
    [{ "TotalCount": 42 }],
    [
      { "StudentID": "SV001", "FullName": "Nguyen Van A" },
      { "StudentID": "SV002", "FullName": "Tran Thi B" }
    ]
  ]
}
```

**Trong FUI module.json**, đọc từng mảng con qua index:
```json
"OUT": "studentList",
"CALLBACK": { "EXE": "vueData.total = vueData.studentList[0][0].TotalCount; vueData.students = vueData.studentList[1]" }
```

### 4.3 `convert_to_object` — convert một dòng thành object

Dùng khi muốn trả về record dạng object thay vì array. Một SP có thể có **nhiều SELECT** dùng `convert_to_object` — tất cả được merge vào cùng một object response.

> ⚠️ **Quy tắc quan trọng**: Khi SELECT có `convert_to_object` **và** cột `json_data` chứa JSON string, SELECT đó chỉ được trả về **đúng 1 dòng**. Nếu nhiều hơn 1 dòng → tAPI trả về `{}` (object rỗng).

**Hai dạng giá trị:**
- `convert_to_object = 'key'` → tạo nested object với tên key đó
- `convert_to_object = ''` → merge thẳng vào root object

**Ví dụ 1 — Kết hợp named key và root merge:**

```sql
SELECT convert_to_object = 'sinhvien',
       sys_SystemRight = @sys_SystemRight,
       sys_FunctionRight = @sys_FunctionRight

SELECT convert_to_object = '',
       ngaythang = GETDATE(), count = 10
```

```json
{
  "sinhvien": {
    "sys_SystemRight": 9,
    "sys_FunctionRight": "[11][3]"
  },
  "ngaythang": "2018-09-11T11:20:47.397",
  "count": 10
}
```

**Ví dụ 2 — `json_data` override field cùng tên:**

```sql
SELECT convert_to_object = '',
       ProjectName = N'abc',
       stt = 123,
       json_data = '{"ProjectName":"T-A-P-I","menu":[{"name":"Croatia","link":"vn"},{"name":"England","link":"/tuyensinh"}]}'
```

```json
{
  "ProjectName": "T-A-P-I",
  "stt": 123,
  "menu": [
    { "name": "Croatia", "link": "vn" },
    { "name": "England", "link": "/tuyensinh" }
  ]
}
```

> `json_data` được parse và merge sau — nếu có field trùng tên với cột SQL (`ProjectName`), **giá trị từ `json_data` sẽ override**.

**Ví dụ 3 — Nhiều SELECT cùng `convert_to_object = ''` đều merge vào root:**

```sql
SELECT convert_to_object = '',
       ProjectName = N'abc', stt = 123,
       json_data = '{"ProjectName":"T-A-P-I","menu":[{"name":"Croatia","link":"vn"},{"name":"England","link":"/tuyensinh"}]}'

SELECT convert_to_object = '',
       TruyVan2 = N'Dữ liệu của truy vấn 2',
       json_data = '{"TruyVan2_json_string": 99}'
```

```json
{
  "ProjectName": "T-A-P-I",
  "stt": 123,
  "menu": [
    { "name": "Croatia", "link": "vn" },
    { "name": "England", "link": "/tuyensinh" }
  ],
  "TruyVan2": "Dữ liệu của truy vấn 2",
  "TruyVan2_json_string": 99
}
```

Tất cả SELECT trong SP đều merge vào **cùng 1 object** — không tạo array như SELECT thông thường.

---

## 5. Xử lý lỗi trong SP

### Lỗi 500 — Server error

```sql
RAISERROR(N'Dữ liệu không hợp lệ', 16, 1)
```

```json
{ "Message": "Dữ liệu không hợp lệ" }
```

### Lỗi 401 — Unauthorized

```sql
IF @sys_SystemRight < 2
BEGIN
    RAISERROR(N'[Unauthorized]Bạn không có quyền', 11, 1)
    RETURN
END
```

HTTP 401 Unauthorized.

---

## 5b. Kiểm tra quyền người dùng (Permission Check Patterns)

### Tham số hệ thống liên quan đến quyền

tAPI tự inject các tham số sau — không cần client truyền lên:

| Tham số | Kiểu | Mô tả |
|---|---|---|
| `@sys_UserID` | varchar(9) | Mã người dùng đang đăng nhập |
| `@sys_SystemRight` | int | Mức quyền của user trên module hiện tại |
| `@sys_FunctionRight` | varchar(2000) | Quyền chức năng dạng `[AD][RPT][MGR]` |

**Khai báo trong SP** — luôn đặt cuối danh sách tham số, có thể cho `= null` với `@sys_UserID`:

```sql
CREATE PROCEDURE spAPI_EntityAction
    @BusinessParam1 int,
    @BusinessParam2 nvarchar(100),
    @sys_UserID varchar(9) = null,
    @sys_SystemRight int
AS
```

### Các mức `@sys_SystemRight`

| Giá trị | Ý nghĩa thực tế |
|---|---|
| `0` | Không có quyền / chưa được cấp quyền trên module |
| `1` | Quyền xem cơ bản |
| `2` | Quyền thao tác chuẩn (đọc, thêm, sửa thông thường) |
| `3` | Quyền nâng cao (quản lý nội bộ, thao tác nhạy cảm) |
| `9` | Module Admin / Project Admin |

### Helper function kiểm tra quyền theo module cụ thể

```sql
dbo.getSystemRight(@ModuleID, @sys_UserID)
```

Trả về mức `SysRight` mà user được assign cho một module xác định — dùng khi cần kiểm tra quyền trên module **khác** với module hiện tại.

---

### Pattern 1 — Chặn truy cập cơ bản (READ operations)

Dùng cho mọi SP đọc dữ liệu cần đăng nhập. Yêu cầu ít nhất `SysRight = 2`.

```sql
If @sys_SystemRight < 2
Begin
    Raiserror(N'Bạn không có quyền trên chức năng này.', 16, 1)
    Return
End
```

### Pattern 2 — Chặn user hoàn toàn không có quyền (minimal check)

Dùng khi muốn cho phép cả `SysRight = 1` thao tác, chỉ chặn `SysRight = 0`.

```sql
If @sys_SystemRight = 0
Begin
    Raiserror(N'Bạn không có quyền trên chức năng này.', 16, 1)
    Return
End
```

### Pattern 3 — Kiểm tra 2 tầng: global + module admin (WRITE operations)

Dùng cho các thao tác ghi có tác động đến cấu hình module hoặc dữ liệu người dùng khác. User phải đạt **một trong hai điều kiện**:
- `@sys_SystemRight >= 3` (quyền cao toàn hệ thống), **hoặc**
- Là Module Admin (`getSystemRight >= 9`) của module đó.

```sql
-- Tầng 1: phải có quyền cơ bản
If @sys_SystemRight < 2
Begin
    Raiserror(N'Bạn không có quyền trên chức năng này.', 16, 1)
    Return
End

-- Tầng 2: phải là admin hệ thống hoặc admin của module đó
If @sys_SystemRight < 3 and dbo.getSystemRight(@ModuleID, @sys_UserID) < 9
Begin
    Raiserror(N'Bạn không có quyền trên Module này.', 16, 1)
    Return
End
```

### Pattern 4 — Kiểm tra logic nghiệp vụ trước khi thực thi

Dùng khi thao tác hợp lệ về quyền nhưng vi phạm ràng buộc dữ liệu (ví dụ: xóa cha khi còn con).

```sql
-- Kiểm tra ràng buộc trước khi xóa
If exists(Select * from tblChild WHERE ParentID = @ParentID)
Begin
    Raiserror(N'Phải xóa dữ liệu liên quan trước khi thực hiện thao tác này.', 16, 1)
    Return
End

DELETE tblParent WHERE ParentID = @ParentID
```

### Pattern 5 — Kiểm tra `@sys_FunctionRight`

Dùng khi phân quyền theo chức năng cụ thể (không chỉ theo mức số).

```sql
If CHARINDEX('[ADMIN]', @sys_FunctionRight) = 0
Begin
    Raiserror(N'Bạn không có quyền thực hiện chức năng này.', 16, 1)
    Return
End
```

---

### Quy tắc đặt thứ tự kiểm tra

```
1. Kiểm tra quyền hệ thống (@sys_SystemRight)    ← luôn đầu tiên
2. Kiểm tra quyền module (getSystemRight)         ← nếu cần 2 tầng
3. Kiểm tra quyền chức năng (@sys_FunctionRight)  ← nếu dùng FunctionRight
4. Kiểm tra ràng buộc nghiệp vụ                   ← sau cùng, trước khi ghi
```

### Quy ước thông báo lỗi

| Tình huống | Message chuẩn |
|---|---|
| Thiếu quyền global | `N'Bạn không có quyền trên chức năng này.'` |
| Thiếu quyền module | `N'Bạn không có quyền trên Module này.'` |
| Vi phạm ràng buộc | Mô tả cụ thể: `N'Phải xóa X trước khi xóa Y.'` |
| Dữ liệu không hợp lệ | `N'Dữ liệu không hợp lệ.'` hoặc mô tả cụ thể |

**Format `RAISERROR` bắt buộc:**
```sql
Raiserror(N'Thông báo lỗi tiếng Việt.', 16, 1)
```
- Severity `16` → HTTP 500, client nhận `{ "Message": "..." }`
- Prefix `N` bắt buộc cho Unicode tiếng Việt
- Luôn có `Return` sau `Raiserror` để dừng SP

---

## 6. Quy tắc thiết kế SP tốt

### Đặt tên SP

```
spAPI_{Entity}{Action}
```

| Action | Mô tả |
|---|---|
| `Select` / `List` | Truy vấn danh sách |
| `Get` | Lấy chi tiết một bản ghi |
| `Insert` / `Add` | Thêm mới |
| `Update` / `Edit` | Cập nhật |
| `Delete` / `Remove` | Xoá |
| `AUTH_Select` | Truy vấn công khai (không cần token) |

**Ví dụ chuẩn:**

```sql
spAPI_StudentList          -- GET danh sách sinh viên
spAPI_StudentGet           -- GET chi tiết (url1 = StudentID)
spAPI_StudentInsert        -- POST thêm mới
spAPI_StudentUpdate        -- POST cập nhật
spAPI_StudentDelete        -- POST xoá (url1 = StudentID)
spAPI_AUTH_CourseList      -- Danh sách môn học công khai
```

### Wiring trong FUI module.json

```json
"fetchStudents": {
  "API": "/me/StudentList",
  "IN": { "Keyword": "vueData.keyword", "ClassID": "vueData.selectedClass" },
  "OUT": "studentList"
},
"addStudent": {
  "API": "/me/StudentInsert",
  "IN": {
    "StudentID":  "vueData.form.StudentID",
    "FullName":   "vueData.form.FullName",
    "ClassID":    "vueData.form.ClassID"
  },
  "CALLBACK": { "CALL": "vueData.fetchStudents", "MESS": "Đã thêm thành công" }
},
"deleteStudent": {
  "API": "/me/StudentDelete/`{{vueData.selectedID}}",
  "CONFIRM": "Bạn có chắc muốn xoá?",
  "CALLBACK": { "CALL": "vueData.fetchStudents" }
}
```

---

## 7. File API

### GET file

SP phải SELECT đúng 3 cột bắt buộc:

| Cột | Ý nghĩa |
|---|---|
| `FileName` | Tên file trả về |
| `ContentType` | MIME type (vd: `application/pdf`) |
| `fileContent` | Binary content — alias từ cột lưu trữ thực tế |

```sql
CREATE PROCEDURE spAPIFILE_Document
    @FileID varchar(50),
    @sys_UserID varchar(9)
AS BEGIN
    SELECT FileName, ContentType, fileContent = BinaryContent
    FROM tblDocument WHERE FileID = @FileID
END
```

**4 route pattern hỗ trợ:**

```
{domain}/{alias}/{spName}/{FileID}
{domain}/{alias}/{spName}/{FileID}/{FileName}
{domain}/{alias}/download/{spName}/{FileID}/{FileName}
{domain}/{alias}/viewer/{spName}/{FileID}/{FileName}
```

Route `/viewer/` dùng để xem trực tiếp trong browser (inline), `/download/` để tải về.

### Upload file

**Params đặc biệt do tAPI tự inject khi upload:**

| Param | Kiểu | Mô tả |
|---|---|---|
| `@sys_FileContent` | varbinary(max) | Binary content của file |
| `@sys_FileName` | nvarchar(200) | Tên file gốc |
| `@sys_FileContentType` | varchar(100) | MIME type |
| `@sys_FileSize` | int | Kích thước file (bytes) |
| `@sys_UploadData` | nvarchar(max) | JSON data bổ sung truyền qua header |

Ngoài ra toàn bộ `@sys_` auth params cũng available: `@sys_UserID`, `@sys_UserName`, `@sys_SessionID`, `@sys_GroupID`, `@sys_DepartmentID`, `@sys_SystemRight`, `@sys_FunctionRight`.

```sql
CREATE PROCEDURE spAPIFILE_UPLOAD_Attachment
    @url1_SessionID      varchar(36),
    @url2_Mode           varchar(20),
    @sys_UserID          varchar(9),
    @sys_FileContent     varbinary(max),
    @sys_FileName        nvarchar(200),
    @sys_FileContentType varchar(100),
    @sys_FileSize        int
AS BEGIN
    INSERT INTO tblAttachFiles(FileName, Capacity, SessionID, CreateUser)
    VALUES(@sys_FileName, @sys_FileSize, @url1_SessionID, @sys_UserID)
END
```

Route: `POST {domain}/{alias}/upload/{spName}/{url1}/{url2}...`

---

## 8. Checklist khi thiết kế SP

1. Prefix `spAPI_` bắt buộc — thiếu là API không gọi được
2. Thêm `AUTH_` nếu endpoint công khai (login page, lookup data)
3. `@sys_UserID` luôn có trong SP có ghi dữ liệu (audit trail)
4. Không dùng `SELECT *` — liệt kê cột cụ thể
5. Kiểm tra quyền ở đầu SP nếu cần, dùng `RAISERROR` + `RETURN`
6. Nhiều SELECT → client đọc theo index `data[0]`, `data[1]`
7. Một record duy nhất → dùng `convert_to_object` thay vì `data[0][0]`
8. Sau khi `CREATE PROCEDURE` → phải `GRANT EXECUTE ON [spName] TO [public]`
9. **Không đưa tham số `sys_*` vào `IN` của module.json** — tAPI tự inject, truyền vào là thừa
