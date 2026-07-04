# FUI Script Map (Quick Lookup)

Mục tiêu: tra cứu nhanh "hàm nào dùng để làm gì" theo từng file runtime trong `scripts/`.

Lưu ý dùng đúng chuẩn FUI:
- Metadata chính là `module.json` (không dùng `controls.json`).
- Logic action gọi qua `CALL(vueData.actionName)` hoặc Action Protocol.
- Layout trong `controls` luôn theo grid wrapper `container > rows > cols`.
- Event trong JSON dùng `v-on:...` (không dùng `@...`).
- Literal forcing (`` ` `` or `'...'`) is for Action `IN` mapping, not normal static component props.

## Table of Contents
- [1) scripts/fastproject.js](#1-scriptsfastprojectjs)
- [2) scripts/defaultfunction.js](#2-scriptsdefaultfunctionjs)
- [3) scripts/component.js](#3-scriptscomponentjs)
- [4) scripts/componentTable.js](#4-scriptscomponenttablejs)
- [5) Tra cứu theo tác vụ](#5-tra-cuu-theo-tac-vu)

## 1) scripts/fastproject.js

Vai trò: core engine để khởi tạo module, dựng DOM từ `module.json.controls`, chạy action, map data và gọi API.

Luồng khởi tạo chính:
1. `$(document).ready` -> `loadModuleInfo()`
2. `loadModuleInfo()` -> merge config + đọc URL/user info
3. `createModuleDom()` -> `runAction($moduleUI.data)` + render controls
4. `createWatch()` -> gắn watcher từ `$moduleUI.watch`
5. Vue instance mount và module chạy

| Line | Hàm | Dùng để làm gì |
|---:|---|---|
| 65 | `buildParamURL()` | Đọc query string và đẩy params vào `vueData`. |
| 77 | `loadModuleInfo()` | Nạp config project/module, user info, chuẩn bị tạo app. |
| 122 | `createModuleDom()` | Tạo layout Vue chính, render controls, init watch. |
| 210 | `buildModuleUI(controlsList, target)` | Recursively build UI từ JSON controls. |
| 233 | `buildControl(controlsList, flex, target)` | Render từng control, bind attr/event/import. |
| 299 | `addImport(importArr)` | Nạp script/css phụ thuộc theo control. |
| 310 | `createWatch_Data(obj)` | Khởi tạo dữ liệu cho watch config. |
| 320 | `createWatch(obj)` | Gắn watcher Vue theo config `watch`. |
| 345 | `buildVisualValForObj(controlAttr, target)` | Bind giá trị động vào attr control. |
| 373 | `runAction(obj, includeData)` | Action engine tổng: chạy object/array action. |
| 407 | `vueAction(objAction, includeData, callBack)` | Chạy 1 action cụ thể (IF/API/CALL/EXE/...). |
| 485 | `mapData(map, target, src, includeData)` | Map dữ liệu giữa object theo rule FUI. |
| 527 | `defProp(obj)` | Chuẩn hoá property object theo context. |
| 537 | `bindData(obj)` | Resolve biến động (string/object) từ context hiện tại. |
| 542 | `getVueData(key, src)` | Lấy value theo path (`vueData.x.y`, `item.x`, template...). Literal forcing is for `IN` mapping; static component props without `:` are already plain strings. |
| 578 | `setValue(target, key, value, srcData, index)` | Gán dữ liệu theo path vào target object/window. |
| 612 | `bindDataToString(str, data)` | Resolve template string với dữ liệu runtime. |
| 619 | `templateCompiled(str, data)` | Compile template lodash-style cho chuỗi động. |
| 624 | `getWindowData(value)` | Lấy dữ liệu từ window/iframe context. |
| 638 | `setWindowData(key, value)` | Set dữ liệu cho window/iframe context. |
| 657 | `runFunction(obj, callback)` | Gọi function JS đã khai báo theo action config. |
| 665 | `tableActionEvent(ctrl)` | Xử lý action event liên quan table/control. |
| 687 | `callAPI(objApi, callBack, includeData)` | Gọi API theo cấu hình action (`IN/OUT/CALLBACK`). |
| 743 | `loginFUN()` | Luồng đăng nhập/chuyển hướng login. |
| 761 | `errorMess(code, message)` | Hiển thị lỗi chuẩn theo status/message. |

## 2) scripts/defaultfunction.js

Vai trò: utility layer dùng chung cho runtime (router, messaging, data transform, AJAX, export, auth, websocket...).

| Line | Hàm | Dùng để làm gì |
|---:|---|---|
| 35 | `extractHostname(url)` | Lấy hostname từ URL. |
| 53 | `getDomainWithoutSubdomain(url)` | Lấy domain gốc không subdomain. |
| 62 | `loadScripts(scriptsArray, callbackFunc)` | Nạp nhiều script động rồi callback. |
| 75 | `pushRouter(router)` | Push route vào browser history. |
| 82 | `CALL(obj, includeData)` | Alias gọi `runAction(...)`. |
| 86 | `windowSendMessage(window, cmd, data)` | `postMessage` sang parent/window/iframe. |
| 100 | `appCommand(cmdData)` | Gửi lệnh về native wrapper (RN/WebKit). |
| 106 | `buildHeader(obj, mapCol)` | Tạo header table từ dataset/map cột. |
| 130 | `fillData(obj)` | Fill/map dữ liệu từ source sang destination. |
| 162 | `groupBy(arrayObj, groupField, sumArr)` | Group mảng theo field + cộng tổng cột. |
| 188 | `chartDataBuild(obj)` | Chuẩn hoá data cho chart tổng quát. |
| 219 | `chartQABuild(obj)` | Build data chart chuyên QA/report. |
| 239 | `confirm(obj)` | Hiển thị dialog confirm. |
| 259 | `showMessage(obj)` | Hiển thị dialog/toast message. |
| 283 | `rightTest(rightObject)` | Kiểm tra quyền theo user rights. |
| 301 | `openWindow(obj)` | Mở popup/dialog window FUI. |
| 326 | `redirect(obj, query)` | Điều hướng trang theo URL/config. |
| 339 | `reload()` | Reload trang hiện tại. |
| 343 | `findInArray(obj)` | Tìm phần tử theo điều kiện giá trị. |
| 348 | `fixURL(url)` | Chuẩn hoá URL (ghép domain API nếu cần). |
| 354 | `stringAttrToJson(str, removeVueEvent)` | Parse chuỗi attr HTML thành JSON object. |
| 371 | `json_data_parse(obj, level)` | Parse đệ quy field có prefix `json_data:`. |
| 407 | `ajaxCALL(URL, DATA, callBack, errorCallBack, header)` | Gọi AJAX POST helper. |
| 449 | `capacityText(numb)` | Format dung lượng bytes -> KB/MB text. |
| 454 | `generateID()` | Sinh ID ngẫu nhiên. |
| 467 | `printPDF(obj)` | Render/in/download PDF bằng `pdfMake`. |
| 499 | `colorLib(color)` | Bộ công cụ convert/manipulate màu. |
| 645 | `transparentize(value, opacity)` | Tạo màu trong suốt (alpha). |
| 745 | `jsonToExcel(Obj)` | Xuất dữ liệu JSON ra Excel. |
| 841 | `copyToClipboard(textToCopy)` | Copy text vào clipboard. |
| 865 | `fileNameClear(fname)` | Làm sạch tên file không hợp lệ. |
| 870 | `hashCode(s)` | Sinh hash code từ string. |
| 880 | `getCookie(cname)` | Đọc cookie theo tên. |
| 895 | `setCookie(name, value, days, domain)` | Set cookie có expiry/domain. |
| 909 | `logout(cookiesName, domain, url)` | Xoá cookie và logout/redirect. |
| 922 | `webSocketJoinGroup(groupObj, timeout, callBackFunc)` | Join WS group theo payload. |
| 946 | `webSocketConnection(wsURL, WS, wsState)` | Khởi tạo/duy trì WS connection. |
| 987 | `webSocket_Send(obj)` | Gửi payload qua websocket hiện tại. |

## 3) scripts/component.js

Vai trò: đăng ký FUI base components và các component nghiệp vụ (dialog, editor, PDF, excel, chart, media...).

Ghi chú:
- File này cũng chứa `defaultControlAttr` để set attr mặc định theo từng `el`.
- Nhiều component yêu cầu import ngoài (CKEditor, pdfMake, cropper, chart, ...).

| Line | Component | Dùng để làm gì |
|---:|---|---|
| 317 | `f-label` | Hiển thị label/text theo format FUI. |
| 332 | `f-box` | Khối hiển thị dữ liệu dạng box/card đơn giản. |
| 390 | `f-header` | Header block nhẹ cho section/module. |
| 399 | `f-title` | Title component chuẩn UI. |
| 408 | `f-radiobox` | Radio group wrapper. |
| 438 | `f-menu` | Menu list/navigation control. |
| 485 | `f-search` | Input tìm kiếm dùng lại. |
| 549 | `f-button` | Button wrapper chuẩn attr FUI. |
| 620 | `f-slider` | Slider input/display. |
| 631 | `f-file-upload` | Upload file cơ bản. |
| 781 | `f-qrcode` | Render QR code. |
| 856 | `f-qrcode-reader` | Quét/đọc QR code. |
| 927 | `f-image-update` | Dialog crop/rotate/upload ảnh. |
| 1174 | `f-date` | Date picker wrapper. |
| 1447 | `f-time` | Time picker wrapper. |
| 1652 | `f-time-counter` | Counter/countdown/clock hiển thị thời gian. |
| 1788 | `fp-profile` | User profile menu trên header. |
| 2033 | `header-bar` | Thanh header/menu chính của app/module. |
| 2290 | `f-chart` | Wrapper chart. |
| 2401 | `f-chart-data-viewer` | Viewer cho dữ liệu chart. |
| 2429 | `f-window` | Dynamic window/dialog host. |
| 2493 | `f-editor` | WYSIWYG editor wrapper (CKEditor). |
| 2631 | `f-editor-dialog` | Dialog chứa editor toàn màn hình. |
| 2727 | `f-dialog` | Dialog dynamic dựng form từ `controls`. |
| 2939 | `f-pdfmake` | Viewer/render PDF bằng `printPDF`. |
| 2974 | `f-excel-reader` | Upload/đọc Excel, emit action xử lý data. |

## 4) scripts/componentTable.js

Vai trò: table system cho FUI, gồm component table chính và cell renderer `t-*`.

| Line | Component | Dùng để làm gì |
|---:|---|---|
| 2 | `f-table` | Data table chính: search, select, CRUD (`update-api`, `update-form`), export. |
| 366 | `f-table-view` | Phiên bản table view/read-only đơn giản hơn. |
| 448 | `t-html` | Render ô dạng HTML. |
| 452 | `t-label` | Render text label thường. |
| 456 | `t-num` | Render/format số. |
| 474 | `t-time` | Render/format thời gian. |
| 484 | `t-boolean` | Render bool bằng icon/màu. |
| 505 | `t-check` | Cell checkbox có thể tương tác. |
| 533 | `t-text` | Cell text input inline. |
| 555 | `t-select` | Cell select inline. |
| 576 | `t-combobox` | Cell combobox/autocomplete inline. |
| 648 | `t-menu` | Cell menu action. |
| 686 | `t-link` | Cell link điều hướng/open dialog. |
| 710 | `t-button` | Cell button action custom. |

## 5) Tra cứu theo tác vụ

| Tác vụ cần làm | Mở file trước | Xem mục chính |
|---|---|---|
| Module không render đúng layout | `scripts/fastproject.js` | `buildModuleUI`, `buildControl`, `bindData`. |
| Action không chạy hoặc chạy sai nhánh | `scripts/fastproject.js` | `runAction`, `vueAction`, `mapData`, `getVueData`. |
| API không ra dữ liệu `OUT` | `scripts/fastproject.js` + `scripts/defaultfunction.js` | `callAPI`, `fixURL`, `ajaxCALL`. |
| Table CRUD lỗi Add/Edit/Delete | `scripts/componentTable.js` | `f-table` + `update-api`, `update-form`. |
| Dialog dynamic không bind dữ liệu | `scripts/component.js` | `f-dialog`, `buildModuleUI` (ở fastproject). |
| Upload ảnh, crop, lưu file | `scripts/component.js` | `f-image-update`. |
| Export Excel/PDF | `scripts/defaultfunction.js` + `scripts/component.js` | `jsonToExcel`, `printPDF`, `f-pdfmake`, `f-excel-reader`. |
| Sự cố đăng nhập/quyền/menu | `scripts/fastproject.js` + `scripts/defaultfunction.js` | `loadModuleInfo`, `loginFUN`, `rightTest`. |
