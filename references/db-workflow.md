# DB Connection Workflow

Hướng dẫn toàn diện về kết nối database cho một FUI project — từ tìm thông tin kết nối, build token, đến quản lý schema và SP.

---

## 1. Thông tin kết nối lưu ở đâu

Mỗi project có thư mục `_db/` riêng trong workspace:

```
{FUI_MCP_WORKDIR}/{projectId}/
└── _db/
    ├── config.json                        ← thông tin kết nối
    ├── schema.json                        ← cache schema từ DB
    ├── sp/{name}.sql                      ← SP đã fetch về local
    └── sp-history/{name}_{timestamp}.sql  ← auto-backup trước mỗi lần deploy
```

**Cấu trúc `_db/config.json`:**

```json
{
  "apiDomain": "api.fap.vn",
  "apiAlias":  "acc",
  "sqlServer": "172.0.0.101",
  "database":  "AccountUser",
  "dbToken":   "<base64-encoded connection string>",
  "userToken": "<bearer token — tùy chọn>"
}
```

| Field | Bắt buộc | Mô tả |
|---|---|---|
| `apiDomain` | ✅ | Domain tAPI, ví dụ `api.fap.vn` |
| `apiAlias` | ❌ | Alias app trong tAPI, ví dụ `acc` |
| `sqlServer` | ❌* | Host SQL Server — cần có để dùng `db_token_rebuild` |
| `database` | ❌* | Tên database — cần có để dùng `db_token_rebuild` |
| `dbToken` | ✅ | Chuỗi kết nối SQL Server đã base64-encode |
| `userToken` | ❌ | Bearer token để test `spAPI_*` sau khi deploy |

*Nên truyền khi `db_connect` để sau này có thể `db_token_rebuild` mà không cần hỏi lại.

---

## 2. Tìm thông tin kết nối của một project

### 2a. Đọc `apiDomain` từ project.json

`project.json` của mỗi project thường có trường `data.apiDomain` — đây là base URL của tAPI server kèm alias:

```json
"data": {
  "apiDomain": "https://tapi.lhu.edu.vn/acc/",
  ...
}
```

Từ URL này:
- **`apiDomain`** → `tapi.lhu.edu.vn`
- **`apiAlias`** → `acc` (phần path đầu tiên sau domain)

Một số project có nhiều domain, mỗi domain dùng một tAPI server riêng:

```json
"domainSetting": {
  "sec.lhu.edu.vn": {
    "apiDomain": "https://tapi.lhu.edu.vn/acc/"
  },
  "sec.fap.vn": {
    "apiDomain": "https://api.fap.vn/acc/"
  }
}
```

→ Hỏi user đang làm việc với domain nào để chọn `apiDomain` đúng.

### 2b. Tra cứu SQLServer + DatabaseName qua API Security Manager

Khi biết `apiAlias` nhưng chưa biết `SQLServer` và `DatabaseName`, gọi SM API để tra cứu.

**URL theo group:**

| Group | SM API URL |
|---|---|
| LHU | `https://tapi.lhu.edu.vn/acc/SM_Modules_ManagerSelect` |
| LHBS | `https://tapi.lhbs.vn/acc/SM_Modules_ManagerSelect` |
| FP/FAP | `https://api.fap.vn/acc/SM_Modules_ManagerSelect` |
| ZEN | `https://api.zentea.vn/acc/SM_Modules_ManagerSelect` |

**Cần Bearer token** — lấy từ bất kỳ project nào đã có `userToken` trong cùng group (userToken dùng chung trong group).

**Gọi bằng PowerShell:**
```powershell
$token = "<userToken từ project cùng group>"
$headers = @{ "Authorization" = "Bearer $token" }
$r = Invoke-WebRequest -Uri "https://tapi.lhu.edu.vn/acc/SM_Modules_ManagerSelect" -Headers $headers -UseBasicParsing
$data = ($r.Content | ConvertFrom-Json).data
$data | Where-Object { $_.APIName -like "*<alias>*" } | ConvertTo-Json
```

**Response trả về:**
```json
{
  "APIName":      "basic",
  "SQLServer":    "172.0.0.20",
  "DatabaseName": "BasicData",
  "ModuleName":   "Basic Data"
}
```

> ⚠️ Field `Password` trong response là **hash nội bộ của tAPI**, không phải SQL Server password thực — không dùng được để build dbToken.

### 2c. Lấy UID/PWD và build dbToken mới từ project cùng group

Trong cùng một group (ví dụ LHU), các server thường dùng **cùng UID/PWD**. Quy trình an toàn (không hiện password ra màn hình):

**Bước 1:** Đọc dbToken từ `_db/config.json` của project đã có config trong cùng group:
```
{FUI_MCP_WORKDIR}/{projectId}/_db/config.json  → lấy field "dbToken"
```

**Bước 2:** Decode + build dbToken mới bằng PowerShell — chỉ thay `Server` và `Database`, giữ nguyên `UID`/`PWD`:
```powershell
$existing = [System.Text.Encoding]::UTF8.GetString(
    [Convert]::FromBase64String("<dbToken của project cùng group>")
)
$uid = ($existing -split ";") | Where-Object { $_ -match "UID=" } | ForEach-Object { ($_ -split "=",2)[1].Trim() }
$pwd = ($existing -split ";") | Where-Object { $_ -match "PWD=" } | ForEach-Object { ($_ -split "=",2)[1].Trim() }

$newConn = "Server=<SQLServer>; Database=<DatabaseName>; UID=$uid; PWD=$pwd; Encrypt=True; TrustServerCertificate=True;"
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($newConn))
```

**Bước 3:** Dùng token vừa build để gọi `db_connect` (xem mục 4).

### 2d. Workflow đầy đủ — kết nối DB lần đầu cho project mới trong cùng group

```
1. project_get_data(projectId)
      → lấy apiDomain từ data.apiDomain
      → tách apiAlias từ path URL (phần sau domain, trước dấu / thứ 2)

2. Tìm userToken từ workspace:
      → Glob "{FUI_MCP_WORKDIR}/**/_db/config.json"
      → Đọc file của project cùng GroupName có "userToken" set

3. Gọi SM_Modules_ManagerSelect với userToken
      → Lọc theo APIName == alias
      → Lấy SQLServer + DatabaseName

4. Đọc dbToken từ _db/config.json của project cùng group
      → Decode → extract UID + PWD (bằng PowerShell, không hiển thị plain text)
      → Build dbToken mới với SQLServer + DatabaseName mới

5. db_connect(projectId, apiDomain, apiAlias, sqlServer, database, dbToken, userToken)
      → Schema tự động fetch và lưu
      → KHÔNG gọi db_schema_fetch thêm
```

---

## 3. Build dbToken

`dbToken` là chuỗi kết nối SQL Server được **base64-encode**. Chuỗi gốc:

```
Server={sqlServer};Database={database};UID={uid};PWD={pwd};Encrypt=True;TrustServerCertificate=True;
```

**Build bằng JavaScript:**
```js
Buffer.from("Server=172.0.0.101;Database=AccountUser;UID=sa;PWD=MyPass;Encrypt=True;TrustServerCertificate=True;").toString("base64")
```

**Build bằng PowerShell:**
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("Server=172.0.0.101;Database=AccountUser;UID=sa;PWD=MyPass;Encrypt=True;TrustServerCertificate=True;"))
```

---

## 4. Workflow kết nối lần đầu

### Xác định projectId trước khi kết nối

Thông tin kết nối DB được lưu vào `{FUI_MCP_WORKDIR}/{projectId}/_db/config.json`. **`projectId` thường tương ứng với `apiAlias` của database** (ví dụ alias `acc` → projectId `security-manager` hoặc project nào dùng alias đó).

**Quy tắc bắt buộc:** Nếu user không chỉ rõ projectId, hoặc alias/database chưa rõ thuộc project nào → **phải hỏi xác nhận** trước khi gọi `db_connect`:

> _"Thông tin kết nối DB này sẽ được lưu vào project nào? (projectId)"_

Không tự đoán projectId rồi gọi luôn — lưu sai project sẽ khiến schema/SP bị đặt nhầm chỗ và khó tìm lại.

```
db_connect(apiDomain, dbToken, [sqlServer, database, apiAlias, userToken])
  → schema tự động được fetch và lưu vào _db/schema.json
  → KHÔNG gọi db_schema_fetch thêm sau bước này
```

**Tham số đầy đủ nên truyền:**

```json
{
  "projectId":  "my-project",
  "apiDomain":  "tapi.lhu.edu.vn",
  "apiAlias":   "acc",
  "sqlServer":  "172.0.0.101",
  "database":   "MyDatabase",
  "dbToken":    "<base64>",
  "userToken":  "<bearer token nếu có>"
}
```

Truyền `sqlServer` + `database` ngay từ đầu để sau này dùng được `db_token_rebuild` mà không cần hỏi lại.

---

## 5. Khi đổi mật khẩu — db_token_rebuild

Khi UID hoặc PWD thay đổi nhưng Server và Database vẫn giữ nguyên:

**Bước 1:** Xác nhận config đã có `sqlServer` và `database`
```
db_config_get(projectId)
```

**Bước 2:** Rebuild token — server tự lấy `sqlServer`/`database` từ config, chỉ cần truyền thông tin thay đổi
```
db_token_rebuild({ projectId, uid, password })
```

Tool sẽ tự build lại `dbToken`, test kết nối, và lưu. Nếu `sqlServer`/`database` chưa có trong config → phải dùng `db_connect` đầy đủ thay thế.

---

## 6. userToken — Mục đích và chia sẻ

### Mục đích

`userToken` là **Bearer token của người dùng** — dùng để gọi các `spAPI_*` endpoint sau khi deploy, nhằm test API như một user thực. Khác với `dbToken` là kết nối trực tiếp vào SQL Server.

```
dbToken   → kết nối SQL Server để chạy schema/SP
userToken → gọi REST API của tAPI như một end-user (test spAPI_*)
```

### Chia sẻ userToken giữa các project

**userToken có thể dùng chung** cho các project trong cùng một **GroupName** (xem trong `_projectInfo.json`):

```json
{ "GroupName": "LHU" }
```

Nếu đã có `userToken` từ project LHU khác → có thể set thẳng cho project mới mà không cần đăng nhập lại:

```
db_user_token_set(projectId, userToken)
```

Hoặc bỏ qua `userToken` khi gọi tool — MCP sẽ tự scan workspace tìm token từ project cùng group.

### Set userToken sau khi kết nối

Nếu chưa có lúc `db_connect`, set riêng sau:
```
db_user_token_set({ projectId, userToken })
```

---

## 7. Refresh schema

| Khi nào | Tool |
|---|---|
| Sau `db_connect` | **Không cần** — schema đã tự fetch |
| User yêu cầu refresh | `db_schema_fetch(projectId)` |
| Vừa tạo/đổi tên/xóa table hoặc SP | `db_schema_fetch(projectId)` |
| Schema local trông cũ/thiếu | `db_schema_fetch(projectId)` |

Đọc schema đã cache (nhanh, không gọi DB):
```
db_schema_get(projectId, objectType?)
```
`objectType`: `Table`, `View`, `API`, `API File`, `Procedure`, `Function`

---

## 8. Workflow làm việc với SP

```
1. db_sp_list(projectId)              → xem danh sách SP từ schema local
2. db_sp_get(name, projectId)         → fetch định nghĩa SP từ DB → lưu _db/sp/{name}.sql
3. [sửa file _db/sp/{name}.sql]
4. db_sp_save(name, sql, projectId)   → lưu SQL vào local, chưa deploy
5. db_sp_deploy(name, projectId)      → deploy lên DB
                                         (auto-backup vào sp-history/ trước khi ghi)
```

**Rollback SP:**
1. Đọc file trong `_db/sp-history/{name}_{timestamp}.sql`
2. `db_sp_save(name, oldSql)` — ghi lại bản cũ vào local
3. `db_sp_deploy(name)` — deploy lại

---

## 9. Kiểm tra nhanh config hiện tại

```
db_config_get(projectId)
```

Trả về tất cả metadata (`apiDomain`, `apiAlias`, `sqlServer`, `database`) và trạng thái token (có/không — **không trả giá trị token**).

---

## 10. Cheat sheet — Tool theo tình huống

| Tình huống | Tool cần dùng |
|---|---|
| Kết nối DB lần đầu | `db_connect` |
| Kiểm tra config đang có | `db_config_get` |
| Đổi UID/PWD, server/database giữ nguyên | `db_token_rebuild` |
| Set userToken sau khi connect | `db_user_token_set` |
| Xem danh sách tables/SPs | `db_sp_list` |
| Lấy nội dung SP từ DB | `db_sp_get` |
| Refresh schema từ DB thực | `db_schema_fetch` |
| Đọc schema đã cache | `db_schema_get` |
| Lưu SQL chỉnh sửa vào local | `db_sp_save` |
| Deploy SP lên DB | `db_sp_deploy` |
| Xóa SP khỏi DB | `db_sp_delete` |
| Đổi tên SP | `db_sp_rename` |
| Tìm SQLServer + DatabaseName của alias | Gọi SM API (xem mục 2b) |
| Build dbToken từ project cùng group | Decode dbToken cũ + đổi Server/DB (xem mục 2c) |

---

## 11. Quy tắc thiết kế bảng (Table Design Conventions)

### Đặt tên bảng

| Nhóm | Quy tắc | Ví dụ |
|---|---|---|
| Bảng hệ thống / danh mục bổ trợ | Chữ thường, không tiền tố | `syslog`, `syslogtype`, `syspermission` |
| Bảng nghiệp vụ / thực thể chính | Tiền tố `tbl` + PascalCase | `tblUsers`, `tblDepartments`, `tblSession` |

**Khóa chính:** `[TênThựcThể]ID` — ghép tên thực thể + `ID`

| Bảng | Khóa chính |
|---|---|
| `tblUsers` | `UserID` |
| `tblDepartments` | `DepartmentID` |
| `tblSession` | `SessionID` |

> Nhất quán: FK ở bảng con dùng cùng tên với PK bảng cha — `UserID` không đổi thành `CreatorID` hay `OwnerID`.

---

### Trường thời gian (Timestamp)

Mỗi bảng nên có ít nhất một trường timestamp để truy vết mốc thời gian:

```sql
[CreateTime]  [datetime]  DEFAULT (getdate())
[UpdateTime]  [datetime]  DEFAULT (getdate())
```

- Kiểu dữ liệu: `datetime`  
- `DEFAULT (getdate())` — SQL Server **tự điền** khi INSERT, không cần truyền từ code  
- Dùng `CreateTime` cho bảng chỉ ghi một lần; `UpdateTime` cho bảng cập nhật thường xuyên; cả hai khi cần phân biệt ngày tạo vs ngày sửa cuối

---

### Trường định danh người thực hiện (User Tracking)

```sql
[CreateUser]  [char](9)  NULL
[UpdateUser]  [char](9)  NULL
```

- Kiểu dữ liệu: `char(9)` hoặc `varchar(20)` — **đồng bộ với kiểu dữ liệu của `UserID` trong `tblUsers`**
- **Không có DEFAULT** — ứng dụng bắt buộc phải truyền `UserID` của user đang đăng nhập
- SQL Server không tự biết user nào đang thao tác qua FUI/tAPI — trách nhiệm thuộc về code
- Trong SP: nhận qua `@sys_UserID` (tAPI auto-inject), lưu vào `[CreateUser]` / `[UpdateUser]`

```sql
CREATE PROCEDURE spAPI_EntityInsert
    @Name        nvarchar(100),
    @sys_UserID  int              -- tAPI auto-inject UserID
AS
    INSERT INTO tblEntity (Name, CreateUser, CreateTime)
    VALUES (@Name, @sys_UserID, DEFAULT)
```

---

### Template cột audit — copy-paste khi tạo bảng mới

```sql
[CreateUser]  [char](9)   NULL,
[CreateTime]  [datetime]  DEFAULT (getdate()),
[UpdateUser]  [char](9)   NULL,
[UpdateTime]  [datetime]  DEFAULT (getdate()),
```
