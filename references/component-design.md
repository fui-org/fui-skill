# FUI Vue Component Design Rules

Quy tắc bắt buộc khi viết bất kỳ Vue component nào (`uc-*.vue`) trong hệ thống FUI. Áp dụng cho cả component thông thường lẫn dialog component.

---

## 1. Đặt tên và cấu trúc file

- **Prefix bắt buộc**: `uc-` (User Component) — phân biệt với `f-*` (FUI runtime) và `v-*` (Vuetify)
- **Format**: kebab-case — ví dụ `uc-trangthai-sukien.vue`, `uc-user-profile.vue`
- **Vị trí**: chỉ đặt trong `components/` ở root module hoặc root project, không tạo subfolder
- **Registry**: khai báo trong `components/_components.json` (chỉ cần `comName`, không tự đặt `comID`)

---

## 2. Đăng ký component — KHÔNG dùng `components: {}`

FUI tự động scan và đăng ký toàn bộ `uc-*.vue` ở cấp **global**. Tuyệt đối không khai báo `components: { ... }` bên trong một component — nó không hoạt động trong môi trường FUI.

```js
// ❌ SAI — không dùng trong FUI
export default {
  components: { 'uc-user-card': UcUserCard },
}

// ✅ ĐÚNG — dùng trực tiếp tag trong template
// <uc-user-card :data="data" />
```

---

## 3. Props

- Khai báo trong `script`: camelCase (`userName`, `itemList`)
- Dùng trong `template`: kebab-case (`:user-name="userName"`)
- Default của Array/Object phải dùng `function()`, không dùng arrow function:

```js
// ❌ SAI
props: { items: { default: () => [] } }

// ✅ ĐÚNG
props: { items: { default: function() { return [] } } }
```

- Ưu tiên tên props trung lập và tái sử dụng được: `items`, `value`, `label`, `loading`, `readonly`, `disabled`, `options`, `config`
- Không đặt tên props gắn chặt với một màn hình cụ thể nếu component có thể dùng lại

---

## 4. Emits

- Luôn emit lên parent thay vì mutate trực tiếp state của parent
- Các event chuẩn: `input`, `change`, `select`, `submit`, `remove`, `action`
- Dialog component luôn emit `('input', false)` để đóng — tương thích với `v-model` Vue 2

---

## 5. Template syntax — các ràng buộc bắt buộc

### Không dùng backtick trong `<template>`

Template strings (backtick) không hoạt động đúng trong Vue 2 template. Dùng string concatenation:

```html
<!-- ❌ SAI -->
:label="`Total (${items.length})`"

<!-- ✅ ĐÚNG -->
:label="'Total (' + items.length + ')'"
```

### Không dùng `@` shorthand cho events trong JSON

Trong `module.json` luôn dùng `v-on:click`, không dùng `@click`. Trong `.vue` template thì `@click` vẫn hợp lệ.

### Vue 2 yêu cầu một root element duy nhất

```html
<!-- ✅ ĐÚNG -->
<template>
  <div>
    <!-- nội dung -->
  </div>
</template>
```

---

## 6. Style — KHÔNG dùng `<style>` trong file `.vue`

Không được dùng `<style>` hoặc `<style scoped>` trong component. Tất cả CSS phải đặt trong `header.html` của module.

```html
<!-- ❌ SAI -->
<style scoped>
.my-class { color: red; }
</style>

<!-- ✅ ĐÚNG: đặt trong header.html -->
<style>
.my-class { color: red; }
</style>
```

Ưu tiên Vuetify utility classes (`ma-2`, `pa-0`, `d-flex`, `primary--text`) trước khi viết CSS tùy chỉnh.

---

## 7. Dialog trong Vue component (`uc-*.vue`)

Dùng `v-dialog` của Vuetify trực tiếp trong template. Cấu trúc cơ bản:

```html
<v-dialog v-model="showDialog" width="650">
    <v-card tile>
        <v-toolbar dense flat>
            <v-toolbar-title>Tên dialog</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="showDialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <!-- nội dung -->
    </v-card>
</v-dialog>
```

Ví dụ fullscreen:

```html
<v-dialog v-model="showApiTest" fullscreen>
    <v-card tile>
        <v-toolbar dense flat color="primary" dark>
            <v-icon small class="mr-2">mdi-api</v-icon>
            <v-toolbar-title>API Tester</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="showApiTest = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-container class="grid-list-md">
            <v-layout>
                <!-- nội dung -->
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>
```

---

## 8. Thiết kế cho tái sử dụng

- Kiểm tra xem component có thể là: list, card, dialog body, filter panel, summary block, form section không
- Expose loading/empty/disabled/readonly qua props hoặc slots thay vì hardcode một workflow
- Giữ API calls, routing, permissions trong `module.json` hoặc parent — component chỉ lo presentation
- Khi module.json `controls` vượt ~200 dòng: extract UI sang Vue component, giữ module.json chỉ có data/API

---

## 9. Không nhúng `f-dialog` vào template component

`f-dialog` chỉ hoạt động khi khai báo trực tiếp trong `controls` JSON của module. Nếu cần dialog trong một `uc-*.vue`, dùng cấu trúc v-dialog ở mục 7 thay thế.

---

## 10. Giới hạn cú pháp trong `<script>` của component

### Không dùng `async / await / finally`

FUI parser không hỗ trợ các keyword này bên trong file `.vue`. Dùng callback thay thế:

```js
// ❌ SAI
async mounted() {
    const res = await fetch(url)
}

// ✅ ĐÚNG
mounted() {
    ajaxCALL(url, {}, function(res) { ... })
}
```

### Không dùng template literals (backtick) trong `<script>`

Backtick chỉ hoạt động trong `script.js` độc lập, không dùng được trong file `.vue`:

```js
// ❌ SAI — trong .vue <script>
var url = `/api/Student/${this.studentID}`

// ✅ ĐÚNG
var url = '/api/Student/' + this.studentID
```

---

## 11. Dùng `ajaxCALL` thay vì `fetch` trong `<script>`

Không dùng `fetch` trực tiếp trong component — `fetch` bị lỗi CORS / credentials khi gọi sang domain khác. Dùng `ajaxCALL` do FUI cung cấp:

```js
// ❌ SAI
fetch(url, { method: 'POST', body: JSON.stringify(data) })
    .then(r => r.json()).then(res => { ... })

// ✅ ĐÚNG
ajaxCALL(url, data, function(res) {
    // xử lý kết quả
}, function(err) {
    // xử lý lỗi
})
```

`ajaxCALL` tự xử lý credentials, token, và base domain — không cần ghép domain vào URL.
