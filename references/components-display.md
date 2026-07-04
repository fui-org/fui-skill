# FUI Display & Presentation Components

Components dùng để hiển thị thông tin, chart, media. File này cũng chứa prefix/binding rules áp dụng cho tất cả f-* components.

## Prefix và Binding Rules

- `f-*`: FUI components (định nghĩa trong FUI runtime)
- `v-*`: Vuetify components
- `uc-*`: Custom module components từ `components/`
- Trong `module.json`, truyền props qua `attr`
- Dùng kebab-case trong JSON cho custom props (`api-upload`, `item-value`)
- Giá trị động dùng `:prop`
- Dùng `v-on:*` trong JSON (không dùng `@*`)
- Props không có `:` (ví dụ `url`, `api-upload`) là plain string mặc định
- Literal-string forcing (backtick/quote) chỉ dùng trong Action `IN` mapping, không dùng cho static props

## Minimal Control Pattern

```json
{
  "el": "f-date",
  "w": "6",
  "attr": {
    "v-model": "formData.fromDate",
    "label": "From date"
  }
}
```

---

## f-label

- Props (source): `items`, `text`, `color`, `iconText`
- Behavior: render `v-chip` từ `text` và/hoặc `items`
- Example:

```json
{
  "el": "f-label",
  "w": "12",
  "attr": {
    "text": "Trang thai",
    "icon-text": "mdi-information"
  }
}
```

## f-box

- Props (source): `rowFormat`, `items`, `label`, `edit`, `saveclick`
- Emit: `input` khi dữ liệu nội bộ thay đổi
- Behavior: hiển thị/chỉnh sửa key-value rows, tự build row format từ data nếu thiếu
- `rowFormat`: mảng `{ text, value, noEdit }` — `noEdit: true` khóa cột đó khi `edit=true`
- `items`: object hoặc array; object tự động wrap thành array 1 phần tử
- Example:

```json
{
  "el": "f-box",
  "w": "12",
  "attr": {
    "label": "Thong tin",
    ":items": "detailData",
    ":edit": "isEditMode",
    ":row-format": [
      { "text": "Mã", "value": "StudentID", "noEdit": true },
      { "text": "Họ tên", "value": "FullName" },
      { "text": "Ngày sinh", "value": "BirthDate" }
    ]
  }
}
```

## f-header

- Props (source): `label`
- Example:

```json
{
  "el": "f-header",
  "w": "12",
  "attr": { "label": "Bao cao tong hop" }
}
```

## f-title

- Props (source): `label`
- Example:

```json
{
  "el": "f-title",
  "w": "12",
  "attr": { "label": "Danh sach ho so" }
}
```

## f-slider

- Props (source): `items`, `itemAttr`
- Behavior: bọc `v-carousel` và `v-carousel-item`
- Example:

```json
{
  "el": "f-slider",
  "w": "12",
  "attr": {
    ":items": "slideItems",
    ":item-attr": { "contain": true }
  }
}
```

## f-echart

FUI wrapper cho **Apache ECharts V5** — hỗ trợ nhiều loại biểu đồ, auto schema detection, multi Y-axis, theme, realtime refresh, và drilldown.

### Props

| Prop | Type | Mô tả |
|---|---|---|
| `data` | Array | Mảng row objects (ECharts tự analyze schema) |
| `config` | Object | Cấu hình FUI mở rộng (xem bảng bên dưới) |
| `option` | Object | ECharts option gốc — deep merge sau `config` |

### config keys

| Key | Type | Default | Mô tả |
|---|---|---|---|
| `type` | string | `'auto'` | `bar` `line` `area` `pie` `doughnut` `scatter` `radar` `gauge` |
| `height` | number\|string | `400` | Chiều cao (`px` hoặc `'50vh'`) |
| `theme` | string | | `'lhu'` `'lhu-dark'` hoặc theme tự đăng ký |
| `title` | string | | Tiêu đề chart |
| `subtitle` | string | | Phụ đề |
| `categoryField` | string | auto | Cột danh mục (string) |
| `numericFields` | string[] | auto | Giới hạn cột số dùng |
| `series` | Array | auto | Override series: `[{ field, name, type, smooth, area, color, yAxisIndex }]` |
| `yAxis` | Object\|Object[] | | Một hoặc nhiều trục Y |
| `xAxis` | Object | | Override trục X |
| `xAxisType` | string | `'category'` | `'category'` `'time'` `'value'` |
| `radar` | Object | | Config radar (indicator overrides) |
| `legend` | false\|Object | | `false` để ẩn |
| `toolbox` | false | | `false` để ẩn toolbox |
| `zoom` | boolean | | Bật dataZoom (inside + slider) |
| `smooth` | boolean | | Làm mượt tất cả line series |
| `showLabel` | boolean | | Hiện label trên data point |
| `tooltipFormat` | string | `'auto'` | `'number'` `'percent'` `'currency'` `'short'` |
| `tooltipFormatter` | Function | | Custom tooltip formatter |
| `visualMap` | Object | | ECharts visualMap config |
| `transforms` | Array | | ECharts dataset transforms |
| `refreshInterval` | number | | Auto refresh (ms) — realtime charts |
| `gaugeMin` / `gaugeMax` | number | 0 / 100 | Range cho gauge |

### Events

| Event | Payload | Mô tả |
|---|---|---|
| `chart-click` | params | Click vào data point |
| `drilldown` | params | Alias của chart-click |
| `legend-change` | params | Chọn/bỏ legend |
| `rendered` | — | Sau mỗi lần render xong |

### Exposed methods (qua `$refs`)

```js
this.$refs.myChart.getInstance()      // ECharts instance
this.$refs.myChart.refresh()          // Force re-render
this.$refs.myChart.exportImage('chart.png')
this.$refs.myChart.resizeChart()
```

### Ví dụ

**Bar chart cơ bản:**

```json
{
  "el": "f-echart",
  "w": "12",
  "attr": {
    ":data": "vueData.statsRows",
    ":config": "{ type: 'bar', title: 'Doanh thu' }"
  }
}
```

**Multi Y-axis + mixed series:**

```json
{
  "el": "f-echart",
  "w": "12",
  "attr": {
    ":data": "vueData.kpiRows",
    ":config": "{ type: 'line', title: 'KPI Tháng', series: [{ field: 'doanhThu', name: 'Doanh thu', type: 'bar', yAxisIndex: 0 }, { field: 'tangTruong', name: 'Tăng trưởng', type: 'line', yAxisIndex: 1, smooth: true }], yAxis: [{ name: 'VNĐ' }, { name: '%', position: 'right' }] }"
  }
}
```

**Pie với theme LHU:**

```json
{
  "el": "f-echart",
  "w": "8",
  "attr": {
    ":data": "vueData.tyleData",
    ":config": "{ type: 'pie', theme: 'lhu', categoryField: 'khoa', height: 350 }"
  }
}
```

**Gauge realtime:**

```json
{
  "el": "f-echart",
  "w": "6",
  "attr": {
    ":data": "vueData.kpiData",
    ":config": "{ type: 'gauge', gaugeMax: 100, gaugeName: 'CPU %', refreshInterval: 2000 }"
  }
}
```

**Drilldown event:**

```json
{
  "el": "f-echart",
  "w": "12",
  "attr": {
    ":data": "vueData.summaryData",
    ":config": "{ type: 'bar' }",
    "v-on:drilldown": "CALL(vueData.loadDetail, { item: $event })"
  }
}
```

**Tooltip tiền tệ:**

```json
{
  "el": "f-echart",
  "w": "12",
  "attr": {
    ":data": "vueData.rows",
    ":config": "{ type: 'bar', tooltipFormat: 'currency', symbol: '₫', decimals: 0 }"
  }
}
```

**Zoom + smooth + showLabel:**

```json
{
  "el": "f-echart",
  "w": "12",
  "attr": {
    ":data": "vueData.rows",
    ":config": "{ type: 'line', zoom: true, showLabel: true, smooth: true }"
  }
}
```

## f-pdfmake

- Props (source): `data`
- Behavior: render PDF trong iframe, re-render khi `data` thay đổi (deep watch)
- Example:

```json
{
  "el": "f-pdfmake",
  "w": "12",
  "attr": {
    ":data": "pdfDefinition",
    "height": "550"
  }
}
```

---

## Practical Notes

1. Hầu hết `f-*` components forward unknown attrs qua `v-bind="$attrs"` — Vuetify attrs vẫn hoạt động nếu child là Vuetify control.
2. Literal-string rule chỉ áp dụng khi truyền API/path strings trong Action `IN` mapping.
3. Xem `references/component-table.md` cho `f-table` và `f-table-view`.
