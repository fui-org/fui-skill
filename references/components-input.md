# FUI Input & Interaction Components

Components dùng để nhận input hoặc tương tác với người dùng. Xem prefix/binding rules tại [components-display.md](components-display.md).

## f-radiobox

- Props (source): `label`, `items`, `itemValue`, `itemText`
- Emit: `input` on change
- Example:

```json
{
  "el": "f-radiobox",
  "w": "6",
  "attr": {
    "label": "Loai",
    "v-model": "formData.loai",
    ":items": "loaiOptions",
    "item-value": "value",
    "item-text": "text"
  }
}
```

## f-menu

- Props (source): `items`, `label`, `iconText`, `menuAttr`
- Behavior: dropdown button với danh sách menu items
- Nếu `label` rỗng hoặc undefined → hiển thị icon-only button
- `items` format: mảng `{ text, visible, color, "icon-text", action, href, target }`
  - `action`: FUI action object — chạy qua `runAction`
  - `href` + `target`: điều hướng như thẻ `<a>`
  - `visible`: ẩn/hiện item (default `true`)
- Example:

```json
{
  "el": "f-menu",
  "w": "3",
  "attr": {
    "label": "Tac vu",
    "icon-text": "mdi-dots-vertical",
    ":items": [
      { "text": "Xem chi tiết", "icon-text": "mdi-eye", "action": { "CALL": "vueData.viewDetail" } },
      { "text": "Xuất Excel", "icon-text": "mdi-file-excel", "action": { "CALL": "vueData.exportExcel" } },
      { "text": "Trang chủ", "icon-text": "mdi-home", "href": "/", "target": "_blank" }
    ]
  }
}
```

## f-search

- Props (source): `api`, `apiData`, `items`
- Emit: `input` when selection changes
- Behavior: debounced API search (500ms), bỏ qua keyword < 2 ký tự
- Example:

```json
{
  "el": "f-search",
  "w": "6",
  "attr": {
    "v-model": "filter.userID",
    "api": "/api/user/search",
    ":api-data": { "Keyword": "TEXT", "GroupID": "vueData.groupID" },
    "item-text": "UserName",
    "item-value": "UserID"
  }
}
```

## f-button

- Props (source): `label`, `checkvalid`, `ctrlhotkey`, `iconText`, `action`, `includeData`
- Behavior:
  - debounced click (500ms, leading)
  - validates form khi `checkvalid=true`
  - nếu `$attrs.target == 'dialog'`, mở window theo attrs (`wid`, `title`, `url`, `onclose`)
- Example:

```json
{
  "el": "f-button",
  "w": "3",
  "attr": {
    "label": "Luu",
    "color": "primary",
    ":action": { "CALL": "handleSubmit" }
  }
}
```

## f-date

- Props (source): `value`, `label`, `dateAdd`, `required`
- Emit: `input` with normalized date (hoặc `null`)
- Behavior:
  - hỗ trợ typed mask và picker
  - chấp nhận nhiều định dạng input khi khởi tạo
  - `dateAdd` tự set ngày tương đối so với hôm nay
- Example:

```json
{
  "el": "f-date",
  "w": "6",
  "attr": {
    "v-model": "filter.fromDate",
    "label": "Tu ngay",
    ":required": false,
    ":date-add": -7
  }
}
```

## f-time

- Props (source): `value`, `label`, `timeAdd`, `required`
- Emit: `input` with `HH:mm` (hoặc `null`)
- Behavior: typed mask + time picker
- Example:

```json
{
  "el": "f-time",
  "w": "6",
  "attr": {
    "v-model": "formData.startTime",
    "label": "Gio bat dau",
    ":required": false,
    ":time-add": 30
  }
}
```

## f-time-counter

- Props (source): `value`, `type`, `labelFormat`, `format`
- `value`: số giây (Number) hoặc datetime string (`"yyyy-MM-dd HH:mm:ss"`)
- `type`:
  - `0` — đếm ngược, hiển thị ngày/giờ/phút/giây đầy đủ
  - `1` — đếm ngược, chỉ hiển thị tổng số giây còn lại
  - `2` — đồng hồ thời gian thực (hiển thị giờ hiện tại)
- `format`: `{ label, day, hour, minute, second }` — nhãn đơn vị
- Emit:
  - `input` (số giây còn lại) khi đếm từ seconds (value là Number)
  - `time-end` khi timer về 0
- Example:

```json
{
  "el": "f-time-counter",
  "w": "4",
  "attr": {
    ":value": 300,
    ":type": 0,
    ":format": { "label": "Còn lại: ", "day": " ngày", "hour": " giờ", "minute": " phút", "second": " giây" }
  }
}
```

## f-qrcode

- Props (source): `value`, `logo`, `color`, `size`
- Behavior: render QR image từ value
- Example:

```json
{
  "el": "f-qrcode",
  "w": "4",
  "attr": {
    "v-model": "formData.qrText",
    ":size": 200,
    "color": "#1e90ff"
  }
}
```

## f-qrcode-reader

- Props (source): `value`, `label`, `width`
- Emit: `input` (đóng dialog), `update` (decoded content)
- Example:

```json
{
  "el": "f-qrcode-reader",
  "w": "12",
  "attr": {
    "v-model": "scanDialog",
    "label": "Doc ma QR",
    "v-on:update": "CALL(vueData.handleScanResult, { item: $event })"
  }
}
```

## f-image-update

- Props (source): `value`, `label`, `title`, `apiUpload`, `iconText`, `imageType`, `size`, `quality`, `dialogWidth`, `dialogHeight`, `imageBoxAttr`, `imageAttr`, `buttonAttr`, `croperAttr`
- Emit: `update` sau khi upload thành công (`{ returnData, imageData }`)
- Example:

```json
{
  "el": "f-image-update",
  "w": "4",
  "attr": {
    "v-model": "formData.avatar",
    "label": "Anh dai dien",
    "api-upload": "/api/upload/avatar",
    ":dialog-width": 600,
    ":dialog-height": 420
  }
}
```

## f-file-upload

- Props (source): `label`, `url`, `autoclose`, `iconText`, `filters`, `resize`, `onclose`
- Emit: `input` on upload complete
- Behavior:
  - dùng Plupload
  - tự upload khi chọn file
  - chạy `onclose` action khi dialog đóng
- Example:

```json
{
  "el": "f-file-upload",
  "w": "4",
  "attr": {
    "label": "Tai tep",
    "url": "/api/upload/file",
    ":filters": {
      "max_file_size": "20mb",
      "mime_types": [{ "title": "PDF", "extensions": "pdf" }]
    },
    ":onclose": { "CALL": "handleUploadClosed" }
  }
}
```

## f-excel-reader

- Props (source): `dateFormat`, `headerFormat`, `rawFormat`, `action`, `label`, `iconText`
- Emit: `input` with parsed sheet JSON (array of objects)
- Behavior: đọc sheet đầu tiên của file Excel/CSV, tùy chọn `CALL(action)` sau khi parse; thư viện XLSX được lazy-load khi cần
- `headerFormat`: `null` (dùng header từ hàng đầu), `1` (dùng số thứ tự cột)
- `rawFormat`: `false` (parse số/ngày), `true` (giữ nguyên raw string)
- `dateFormat`: format ngày, default `"FMT 14"` (dd/mm/yyyy)
- Example:

```json
{
  "el": "f-excel-reader",
  "w": "4",
  "attr": {
    "label": "Doc Excel",
    "icon-text": "mdi-microsoft-excel",
    ":header-format": 1,
    ":raw-format": false,
    ":action": { "CALL": "vueData.handleExcelImported" },
    "v-model": "excelRows"
  }
}
```
