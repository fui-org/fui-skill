# PDF Generation với pdfmake

Kỹ thuật tạo PDF phức tạp bằng thư viện `pdfmake` trong FUI (dùng qua component `f-pdfmake`).

## Dynamic Tables

Map mảng dữ liệu thành rows trong bảng:

```javascript
body: [
    [{ text: 'STT', bold: true }, { text: 'Name', bold: true }],
    ...data.items.map(item => ([
        item.index,
        item.name
    ]))
]
```

## SVG Checkboxes

Ký tự Unicode (☑/☐) có thể không render được trong một số font PDF. Dùng SVG path thay thế:

```javascript
const checkedSvg = '<svg ...>...</svg>';
const uncheckedSvg = '<svg ...>...</svg>';

{
    svg: item.isChecked ? checkedSvg : uncheckedSvg,
    width: 14
}
```

## Complex Layouts

Dùng `columns` cho layout mà table thông thường không xử lý được (ví dụ checkbox cạnh text):

```javascript
{
    columns: [
        { svg: checkedSvg, width: 14 },
        { text: ' Label text', width: '*' }
    ]
}
```

## Signature Section Table

Dùng nested table để tạo khối chữ ký căn chỉnh đúng:

```javascript
table: {
    widths: ['16%', '16%', '16%', '16%', '16%', '16%'],
    body: [
        [{ text: 'Title', colSpan: 3 }, {}, {}, { text: 'Title', colSpan: 3 }, {}, {}],
        ['Sign 1', 'Sign 2', 'Sign 3', 'Sign 4', 'Sign 5', 'Sign 6']
    ]
}
```
