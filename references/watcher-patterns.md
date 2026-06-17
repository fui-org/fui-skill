# Watcher Patterns (FUI Best Practice)

Hướng này dùng cho các case:
- Form phụ thuộc nhiều cấp (Tỉnh/Thành -> Quận/Huyện -> Phường/Xã)
- Bộ lọc theo thuộc tính (status, loại, ngày, keyword, ...)

Mục tiêu:
- Đúng cấu trúc FUI (`module.json`: `data`, `watch`, `controls`, `set`)
- Tránh vòng lặp watcher
- Giảm gọi API thừa
- Dễ bảo trì khi module lớn

## 1. Nguyên tắc chuẩn

1. Chỉ watch key đầu vào nhỏ nhất
- Watch ID hoặc field filter (`provinceID`, `districtID`, `filter.status`), không watch cả object lớn nếu không cần.

2. Tách action theo tầng
- `handleProvinceChange` chỉ reset dữ liệu phụ thuộc và gọi `apiLoadDistricts`.
- `handleDistrictChange` chỉ reset cấp dưới và gọi `apiLoadWards`.
- `applyFilters` gom logic tải list cuối.

3. Dùng `deep-watch` có chọn lọc
- Chỉ dùng cho object filter nhỏ (ví dụ `filter`).
- Không deep-watch mảng lớn như `items`, `tableData`.

4. Không để watcher tự tạo loop
- Không watch biến output của chính action đó.
- Không watch `items` rồi trong callback lại ghi `items`.

5. Gắn điều kiện trước khi gọi API
- Dùng `IF/THEN/ELSE` để kiểm tra đầu vào hợp lệ (ví dụ chưa chọn tỉnh thì không gọi huyện).

6. Tách debounce/race-control sang `script.js`
- Watcher giữ vai trò điều phối.
- Debounce hoặc chống response cũ ghi đè response mới đặt trong helper JS.

7. Literal string chỉ ép khi truyền qua `IN`
- Trong action có `IN`, chuỗi không có khoảng trắng có thể bị core hiểu là expression.
- Dùng `` `value`` hoặc `"'value'"` cho các giá trị text cần giữ nguyên trong `IN`.

## 2. Pattern A: Cascading địa giới hành chính

```json
{
  "data": [
    {
      "formData": {
        "provinceID": null,
        "districtID": null,
        "wardID": null
      },
      "provinceList": [],
      "districtList": [],
      "wardList": []
    },
    {
      "apiLoadProvinces": {
        "API": "/api/location/provinces",
        "OUT": "provinceList"
      },
      "apiLoadDistricts": {
        "API": "/api/location/districts",
        "IN": { "ProvinceID": "formData.provinceID" },
        "OUT": "districtList"
      },
      "apiLoadWards": {
        "API": "/api/location/wards",
        "IN": { "DistrictID": "formData.districtID" },
        "OUT": "wardList"
      }
    },
    {
      "handleProvinceChange": [
        {
          "districtList": [],
          "wardList": [],
          "formData.districtID": null,
          "formData.wardID": null
        },
        {
          "IF": "formData.provinceID",
          "THEN": { "CALL": "apiLoadDistricts" }
        }
      ],
      "handleDistrictChange": [
        {
          "wardList": [],
          "formData.wardID": null
        },
        {
          "IF": "formData.districtID",
          "THEN": { "CALL": "apiLoadWards" }
        }
      ]
    },
    {
      "CALL": "apiLoadProvinces"
    }
  ],
  "watch": {
    "formData.provinceID": { "CALL": "handleProvinceChange" },
    "formData.districtID": { "CALL": "handleDistrictChange" }
  }
}
```

Điểm chính:
- Watch theo key cụ thể.
- Reset cấp dưới trước khi gọi API cấp dưới.
- Có điều kiện tránh gọi API khi null.

## 3. Pattern B: Filter object + deep-watch

```json
{
  "data": [
    {
      "filter": {
        "keyword": "",
        "status": null,
        "fromDate": null,
        "toDate": null
      },
      "items": []
    },
    {
      "apiLoadItems": {
        "API": "/api/items/search",
        "IN": {
          "Keyword": "filter.keyword",
          "Status": "filter.status",
          "FromDate": "filter.fromDate",
          "ToDate": "filter.toDate"
        },
        "OUT": "items"
      }
    },
    {
      "handleFilterChanged": {
        "CALL": "apiLoadItems"
      }
    }
  ],
  "watch": {
    "deep-watch": {
      "filter": { "CALL": "handleFilterChanged" }
    }
  }
}
```

Khi dùng pattern này:
- `filter` nên nhỏ và ổn định.
- Nếu có text search nhập liên tục, nên debounce trong `script.js`.

## 4. Debounce khuyến nghị (script.js)

```javascript
var filterTimer = null;

function debounceFilter(input) {
    var callActionName = input && input.callActionName;
    var waitMs = input && input.waitMs;
    clearTimeout(filterTimer);
    filterTimer = setTimeout(function () {
        CALL(vueData[callActionName]);
    }, waitMs || 350);
}
```

Ví dụ action trong `module.json`:

```json
{
  "handleFilterChanged": {
    "FUN": "debounceFilter",
    "IN": {
      "callActionName": "'apiLoadItems'",
      "waitMs": 350
    }
  }
}
```

## 5. Checklist QA cho watcher

1. Watch key có đủ nhỏ chưa (ID/field thay vì object lớn)?
2. Có reset đúng dữ liệu phụ thuộc trước khi gọi API?
3. Có guard `IF` trước API khi input null/rỗng?
4. Có nguy cơ loop watcher không?
5. Có cần debounce cho input text không?
6. Nếu action có `IN`, đã áp dụng literal string rule cho giá trị text không khoảng trắng chưa?
