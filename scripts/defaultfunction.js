$isMobile = navigator.userAgent.match(/mobile|touch|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i) != null;
$isPhone = navigator.userAgent.match(/mobile|touch|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (phone)|xda|xiino|playbook|silk/i) != null;
$isApple = navigator.userAgent.match(/ip(ad|hone|od)/i) != null;
//===========================================================================
var Loader = function () { }
Loader.prototype = {
    require: function (scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function (evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function (src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = false;
        s.src = src;
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
};
//===================================================================================
//===================================================================================
//===========================================================================================
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
//===========================================================================================
const getDomainWithoutSubdomain = url => {
    const urlParts = new URL(url).hostname.split('.')

    return urlParts
        .slice(0)
        .slice(-(urlParts.length === 4 ? 3 : 2))
        .join('.')
}
//===========================================================================================
function loadScripts(scriptsArray, callbackFunc) {
    var scriptsArray = scriptsArray || new Array();
    var callbackFunc = callbackFunc || function () { };

    if (scriptsArray.length == 0) {
        callbackFunc();
        return;
    }

    var loadScript = new Loader();
    loadScript.require(scriptsArray, callbackFunc);
}
//===================================================================================
function pushRouter(router) {
    var curPath = window.location.pathname;
    if (curPath != router || curPath == '/') {
        window.history.pushState({ id: router }, document.title, router);
    }
}
//===================================================================================
function CALL(obj, includeData) {
    runAction(obj, includeData);
}
//===================================================================================
function windowSendMessage(window, cmd, data) {
    //console.log("windowSendMessage", cmd, data);
    if (_.isObject(window)) {
        window.postMessage({ cmd: cmd, value: JSON.parse(JSON.stringify(data)) }, '*');
    } else
        if (window == "#PARENT") {
            parent.postMessage({ cmd: cmd, value: JSON.parse(JSON.stringify(data)) }, '*');
        } else {
            var win = document.getElementById(window.slice(1, window.length));
            if (win) win.contentWindow.postMessage({ cmd: cmd, value: JSON.parse(JSON.stringify(data)) }, '*');
            else console.log("send DATA: Window ID not found")
        }
}
//===========================================================================================
function appCommand(cmdData) {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(cmdData);
    else if (window.webkit) window.webkit.messageHandlers["scriptHandler"].postMessage(cmdData);
    else if (window.scriptHandler) window.scriptHandler.postMessage(cmdData);
}
//===========================================================================================
function buildHeader(obj, mapCol) {
    var datatable = {};
    var header = [];

    if (mapCol) {
        _.forEach(obj, function (o) {
            header.push({ "text": o[mapCol.text], "value": o[mapCol.value], "divider": true });
        });
    } else {
        if (obj && _.isArray(obj)) datatable = obj[0];
        else if (obj && _.isArray(obj.data)) datatable = obj.data[0];

        if (datatable) {
            _.forEach(datatable, function (value, key) {
                if (_.isNumber(value)) header.push({ "el": "t-num", "text": key, "value": key, "divider": true });
                else header.push({ "text": key, "value": key, "divider": true });
            });
        }
    }

    console.log("Build Header: ", header)
    return header;
}
//===========================================================================================
function fillData(obj) {
    if (!obj.key && !obj.src) { // FILL ALL DATA
        var mapD = {};
        _.forEach(obj.map, function (value, key) {
            mapD[key] = bindData(value);
        });

        _.forEach(obj.des, function (desObj) {
            _.forEach(mapD, function (value, key) {
                desObj[key] = value;
            });
        });
        return
    }

    var GroupKeySRC = _.groupBy(obj.src, obj.key);
    _.forEach(obj.map, function (value, key) {
        _.forEach(obj.des, function (desObj) {
            var val = GroupKeySRC[desObj[obj.key]];
            if (_.isString(value)) {
                if (_.isArray(val)) val = val[0][value];
                else val = null;
            }
            else if (_.isPlainObject(value)) {
                if (_.isArray(val)) val = val[0];
                else val = null;
            }
            desObj[key] = val;
        });
    });
}
//===========================================================================================
function groupBy(arrayObj, groupField, sumArr) { // vi du: groupBy(dsSinhVien, 'Khoa', ['SL Nghỉ Học','SL Tốt Nghiệp'])
    var gArr = _.groupBy(arrayObj, groupField);
    var returnArr = [];
    var sumObj = {};
    if (!_.isArray(sumArr)) sumArr = [sumArr];
    //---------------------------------
    _.forEach(gArr, function (fieldValue, fieldKey) {
        var n = 0;
        _.forEach(sumArr, function (v) {
            sumObj[v] = 0;
        });
        _.forEach(fieldValue, function (value) {
            n++;
            _.forEach(sumArr, function (v) {
                sumObj[v] = sumObj[v] + value[v];
            });
        });
        var o = {};
        o[groupField] = fieldKey;
        o["count"] = n;
        o = $.extend(o, sumObj);
        returnArr.push(o);
    });
    return returnArr;
}
//===========================================================================================
function chartDataBuild(obj) {
    if (obj.dataChart) {
        var chartData = [];
        var dataInput = obj.dataChart.data;

        if (_.isUndefined(dataInput)) dataInput = obj.dataChart;

        if (_.isArray(dataInput[0])) {
            var chartName = JSON.parse(obj.dataChart.chartName);
            _.forEach(dataInput, function (d, k) {
                chartData.push({
                    name: chartName[k],
                    data: _.map(dataInput[k], function (n) {
                        return [n.label, n.value];
                    })
                });
            });
        } else {
            chartData.push({
                name: (obj.dataChart.chartName ? obj.dataChart.chartName : null),
                data: _.map(dataInput, function (n) {
                    return [n.label, n.value];
                })
            });
        }
        //---------------------
        if (obj.allInOne) return [{ name: "", data: chartData }];
        else return chartData;
    }
}
//===========================================================================================
function chartQABuild(obj) {
    if (obj.dataChart) {
        var chartData = [];

        _.forEach(obj.dataChart[0], function (v, i) { // Duyet tung cau hoi
            if (v.QType == 'TextArea') {

            } else {
                chartData.push({
                    name: v.QText,
                    data: _.map(_.filter(obj.dataChart[1], ['QID', v.QID]), function (n) {
                        return [n.label, n.val];
                    })
                });
            }
        });
        return chartData;
    }
}
//===========================================================================================
function confirm(obj) {
    $.confirm({
        icon: (obj.icon ? obj.icon : 'mdi mdi-help-circle-outline'),
        title: obj.title,
        content: (obj.message ? obj.message : ''),
        type: (obj.type ? obj.type : 'blue'),
        columnClass: 'col-xs-12 col-sm-8 col-md-6 col-lg-4',
        animateFromElement: false,
        buttons: {
            ok: {
                text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: obj.action
            },
            cancel: (obj.cancel ? obj.cancel : function () { })
        }
    });
}
//===========================================================================================
function showMessage(obj) {
    $.dialog({
        icon: (obj.icon ? obj.icon : 'mdi mdi-information-variant-circle-outline'),
        title: (obj.title ? obj.title : ''),
        backgroundDismiss: true,
        content: (obj.message ? obj.message : ''),
        type: (obj.type ? obj.type : 'blue'),
        columnClass: 'col-xs-12 col-sm-8 col-md-6 col-lg-4',
        animateFromElement: false,
        closeIcon: true,
        buttons: {
            ok: {
                text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                btnClass: 'btn-' + (obj.type ? obj.type : 'blue')
            }
        },
        onClose: function () {
            if (obj.onclose) {
                runAction(obj.onclose, { $row: obj.$row, item: obj.item });
            }
        },
    });
}
//===========================================================================================
function rightTest(rightObject) {
    var returnVal = true
    _.forEach(rightObject, function (rV, rK) {
        if (!returnVal) return;
        var A1 = [];
        var A2 = [];

        if (_.isArray(rV)) A1 = rV;
        else A1 = [rV];

        if (_.isArray(vueData.user[rK])) A2 = vueData.user[rK];
        else A2 = [vueData.user[rK]];

        if (_.intersection(A1, A2).length <= 0) returnVal = false;
    });
    return returnVal;
}
//===========================================================================================
function openWindow(obj) {
    if (window === top) {
        setTimeout(function () {
            if (obj.id != undefined && vueData[obj.id] != undefined) {
                console.log("Cửa sổ bị trùng tên: ", obj.id)
                return;
            }
            
            if (!vueData.v_windowVM) vueData.v_windowVM = {};
            if (_.isString(obj)) obj = { url: obj };

            if (!obj.id) obj.id = "Window" + generateID();
            obj.open = true;
            vueData[obj.id] = obj;
            vueData.v_windowVM[obj.id] = new Vue({
                vuetify: new Vuetify(),
                render: Vue.compile("<f-window id=\"" + obj.id + "\"></f-window>").render,
            }).$mount();
        }, 10);
    }
    else {
        windowSendMessage('#PARENT', 'openWindow', obj);
    }
}
//===========================================================================================
function redirect(obj, query) {
    let Q = '';
    if (obj && obj.url) Q = obj.url;
    else Q = obj;

    if ((query || (obj && obj.query)) && vueData.p_params != " ") {
        if (Q.indexOf("?") < 0) Q = Q + vueData.p_params;
        else Q = Q + vueData.p_params.replace("?", "");
    }

    location.assign(Q);
}
//===========================================================================================
function reload() {
    location.assign(window.location.href);
}
//===========================================================================================
function findInArray(obj) {
    if (_.isString(obj.value)) obj.value = JSON.parse(obj.value);
    return _.find(obj.array, obj.value);
}
//===========================================================================================
function fixURL(url) {
    if (url.indexOf('http') == 0) return url;
    else return vueData.v_Set.apiDomain + url
}

//===========================================================================================
function stringAttrToJson(str, removeVueEvent) {
    var jObj = {}

    if (typeof str == 'undefined') str = "";

    if (_.isPlainObject(str)) return { ...str };

    $(`<div ${str} >`).each(function () {
        $.each(this.attributes, function (i, a) {
            if (removeVueEvent && (typeof a.name == "string" && (a.name.substring(0, 1) == ":" || a.name.substring(0, 1) == "@" || a.name.substring(0, 2) == "v-"))) return;
            jObj[a.name] = a.value;
        })
    })
    return jObj
}

//===========================================================================================
function json_data_parse(obj, level) {
    //--- convert to json data array --------
    if (level > 3) return;

    level++;
    if (_.isArray(obj) && obj.length > 0) {
        //console.log("json_data_parse", level)
        if (_.isArray(obj[0])) {
            _.forEach(obj, function (value) {
                json_data_parse(value, level);
            });
        } else if (_.isPlainObject(obj[0])) {
            var R = obj[0];
            var nameOfJson = [];
            _.forEach(R, function (value, key) {
                if (key.substring(0, 10) == 'json_data:') nameOfJson.push(key);
            });
            _.forEach(obj, function (row) {
                _.forEach(nameOfJson, function (key) {
                    row[key.replace('json_data:', '')] = JSON.parse(row[key]);
                    delete row[key];
                });
            });
        }
    } else if (_.isPlainObject(obj)) {
        _.forEach(obj, function (value, key) {
            if (key.substring(0, 10) == 'json_data:') {
                obj[key.replace('json_data:', '')] = JSON.parse(value);
                delete obj[key];
            } else {
                if (_.isObject(value)) json_data_parse(value, level);
            }
        });
    }
}
//===========================================================================================
function ajaxCALL(URL, DATA, callBack, errorCallBack, header) {
    let loadingID = generateID();
    vueData.v_LoadingOverlay.push(loadingID);
    vueData.v_Loading = true;

    $.ajax({
        type: "POST",
        headers: (header ? header : {
            authorization: $awt
        }),
        url: fixURL(URL),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        data: JSON.stringify(DATA),
        success: function (d) {
            json_data_parse(d, 0);
            if (callBack) callBack(d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("API:", URL, "IN:", DATA);
            console.log("Error XHR:", xhr);

            if (errorCallBack) {
                errorCallBack(xhr);
                return
            }

            showMessage({
                icon: 'mdi mdi-alert-circle-outline',
                title: '',
                message: (xhr.responseJSON ? xhr.responseJSON.Message : (xhr.responseText ? xhr.responseText : "")),
                type: 'red',
            });
        },
        complete: function (data) {
            vueData.v_LoadingOverlay = _.without(vueData.v_LoadingOverlay, loadingID);
            if (vueData.v_LoadingOverlay.length == 0) vueData.v_Loading = false;
        }
    });
}
//===========================================================================================
function capacityText(numb) {
    if (numb < 1048576) return Math.round(numb / 1024 * 100 / 100) + ' Kb';
    else return Math.round(numb / 1048576 * 100) / 100 + ' Mb';
}
//===========================================================================================
function generateID() {
    var d = new Date();
    var k = d.getTime();
    var str = k.toString(16).slice(1)
    var UUID = 'idxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        v = c == 'x' ? r : (r & 3 | 8);
        return v.toString(16);
    });
    var newString = UUID.replace(/[z]/, str)
    return newString;
}
//===========================================================================================
function printPDF(obj) {
    pdfMake.fonts = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        },
        TimesNewRoman: {
            normal: 'times.ttf',
            bold: 'timesbd.ttf',
            italics: 'timesi.ttf',
            bolditalics: 'timesbi.ttf'
        }
    }

    if (obj.download) {
        pdfMake.createPdf(obj.data).download('fp_pdf_' + generateID() + '.pdf');
    } else if (obj.viewer) {
        pdfMake.createPdf(obj.data).getDataUrl(function (outDoc) {
            $(obj.viewer).attr("src", outDoc);
        });
    } else {
        pdfMake.createPdf(obj.data).getBase64(function (outDoc) {
            printJS({ printable: outDoc, type: 'pdf', base64: true });
        });
    }
    //-------------------------------------------------------
    if (_.isFunction(obj.callBack)) obj.callBack();
}

//===========================================================================================
function colorLib(color) {
    // Hàm hỗ trợ phân tích và chuyển đổi màu
    function parseColor(input) {
        let r, g, b, a = 1;

        // Xử lý HEX (3 hoặc 6 ký tự)
        if (typeof input === 'string' && input.startsWith('#')) {
            let hex = input.replace('#', '');
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
            return { r, g, b, a };
        }

        // Xử lý RGB/RGBA
        if (typeof input === 'string' && input.startsWith('rgb')) {
            const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match) {
                r = parseInt(match[1]);
                g = parseInt(match[2]);
                b = parseInt(match[3]);
                a = match[4] ? parseFloat(match[4]) : 1;
                return { r, g, b, a };
            }
        }

        // Xử lý HSL
        if (typeof input === 'string' && input.startsWith('hsl')) {
            const match = input.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
            if (match) {
                const h = parseInt(match[1]) / 360;
                const s = parseInt(match[2]) / 100;
                const l = parseInt(match[3]) / 100;
                a = match[4] ? parseFloat(match[4]) : 1;
                return hslToRgb(h, s, l, a);
            }
        }

        // Mặc định trả về màu đen nếu không phân tích được
        return { r: 0, g: 0, b: 0, a: 1 };
    }

    // Chuyển HSL sang RGB
    function hslToRgb(h, s, l, a) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // Grayscale
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
            a
        };
    }

    // Chuyển RGB sang HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Grayscale
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h, s, l };
    }

    // Hàm chuyển đổi số thành chuỗi hex 2 chữ số
    function toHex(value) {
        const hex = Math.round(value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    // Phân tích màu đầu vào
    const { r, g, b, a } = parseColor(color);

    // Đối tượng trả về với các phương thức
    return {
        // Trả về chuỗi HEX
        hexString() {
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        },

        // Trả về chuỗi RGB hoặc RGBA
        rgbString() {
            return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
        },

        // Trả về chuỗi HSL hoặc HSLA
        hslString() {
            const { h, s, l } = rgbToHsl(r, g, b);
            return a < 1
                ? `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`
                : `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        },

        // Làm sáng màu (factor: 0 đến 1)
        lighten(factor) {
            const { h, s, l } = rgbToHsl(r, g, b);
            const newL = Math.min(1, l + l * factor);
            return colorLib(hslToRgb(h, s, newL, a).rgbString());
        },

        // Làm tối màu (factor: 0 đến 1)
        darken(factor) {
            const { h, s, l } = rgbToHsl(r, g, b);
            const newL = Math.max(0, l - l * factor);
            return colorLib(hslToRgb(h, s, newL, a).rgbString());
        },

        // Đặt độ trong suốt
        alpha(value) {
            return colorLib(`rgba(${r}, ${g}, ${b}, ${value})`);
        }
    };
}
//===========================================================================================
function transparentize(value, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
}
//===========================================================================================
// function jsonToExcel(Obj) {
//     if (typeof ExcelJS == 'undefined') {
//         var loadScript = new Loader();
//         loadScript.require(["/include/excel/exceljs.min.js"], function () {
//             writeExcelFile(Obj);
//         });
//     } else writeExcelFile(Obj);
//     function writeExcelFile(inputObj) {
//         var props = {
//             data: null, // Json to download (for single sheet - backward compatibility)
//             filename: "dataFP.xlsx", // filename to export
//             worksheet: "SheetFP", // sheet name for single sheet
//             sheets: null // New property for multiple sheets
//         }
//         Object.assign(props, inputObj);
//         // Check if using new multi-sheet format
//         if (props.sheets && Array.isArray(props.sheets)) {
//             // Multi-sheet mode
//             if (!props.sheets.length) {
//                 showMessage({ title: "Sheets data is empty" })
//                 return;
//             }
//             createMultiSheetWorkbook(props);
//         } else {
//             // Single sheet mode (backward compatibility)
//             if (!props.data || !props.data.length) {
//                 showMessage({ title: "Data Null" })
//                 return;
//             }
//             createSingleSheetWorkbook(props);
//         }
//         function createSingleSheetWorkbook(props) {
//             const workbook = new ExcelJS.Workbook();
//             const worksheet = workbook.addWorksheet(props.worksheet);
//             // Create header
//             let myHeader = []
//             props.data.forEach(function (o, index) {
//                 if (index == 0) {
//                     Object.keys(o).forEach(function (k) {
//                         let myObject = {};
//                         myObject.header = k.replace(' ', '');
//                         myObject.key = k;
//                         myHeader.push(myObject);
//                     });
//                 }
//             });
//             worksheet.columns = myHeader
//             props.data.forEach(item => {
//                 worksheet.addRow(item);
//             });
//             saveWorkbook(workbook, props.filename);
//         }
//         function createMultiSheetWorkbook(props) {
//             const workbook = new ExcelJS.Workbook();
//             props.sheets.forEach(sheetConfig => {
//                 if (!sheetConfig.data || !sheetConfig.data.length) {
//                     console.warn(`Sheet "${sheetConfig.name}" has no data, skipping...`);
//                     return;
//                 }
//                 const worksheet = workbook.addWorksheet(sheetConfig.name || 'Sheet');
//                 // Create header for this sheet
//                 let myHeader = []
//                 sheetConfig.data.forEach(function (o, index) {
//                     if (index == 0) {
//                         Object.keys(o).forEach(function (k) {
//                             let myObject = {};
//                             myObject.header = k.replace(' ', '');
//                             myObject.key = k;
//                             myHeader.push(myObject);
//                         });
//                     }
//                 });
//                 worksheet.columns = myHeader
//                 sheetConfig.data.forEach(item => {
//                     worksheet.addRow(item);
//                 });
//             });
//             saveWorkbook(workbook, props.filename);
//         }
//         function saveWorkbook(workbook, filename) {
//             const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//             workbook.xlsx.writeBuffer().then(data => {
//                 const blob = new Blob([data], { type: blobType });
//                 let a = document.createElement('a')
//                 document.body.appendChild(a)
//                 a.style = 'display: none'
//                 const url = window.URL.createObjectURL(blob)
//                 a.href = url
//                 a.download = filename
//                 a.click()
//                 window.URL.revokeObjectURL(url)
//             });
//         }
//     }
// }
function jsonToExcel(Obj) {
    if (typeof ExcelJS == 'undefined') {
        var loadScript = new Loader();
        loadScript.require(["/include/excel/exceljs.min.js"], function () {
            writeExcelFile(Obj);
        });
    } else writeExcelFile(Obj);
    function writeExcelFile(inputObj) {
        var props = {
            data: null, // Json to download (for single sheet - backward compatibility)
            filename: "dataFP.xlsx", // filename to export
            worksheet: "SheetFP", // sheet name for single sheet
            sheets: null // New property for multiple sheets
        }
        Object.assign(props, inputObj);
        // Check if using new multi-sheet format
        if (props.sheets && Array.isArray(props.sheets)) {
            // Multi-sheet mode
            if (!props.sheets.length) {
                showMessage({ title: "Sheets data is empty" })
                return;
            }
            createMultiSheetWorkbook(props);
        } else {
            // Single sheet mode (backward compatibility)
            if (!props.data || !props.data.length) {
                showMessage({ title: "Data Null" })
                return;
            }
            createSingleSheetWorkbook(props);
        }
        function createSingleSheetWorkbook(props) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet(props.worksheet);
            // Create header
            let myHeader = []
            props.data.forEach(function (o, index) {
                if (index == 0) {
                    Object.keys(o).forEach(function (k) {
                        let myObject = {};
                        myObject.header = k;
                        myObject.key = k;
                        myHeader.push(myObject);
                    });
                }
            });
            worksheet.columns = myHeader
            props.data.forEach(item => {
                worksheet.addRow(item);
            });
            saveWorkbook(workbook, props.filename);
        }
        function createMultiSheetWorkbook(props) {
            const workbook = new ExcelJS.Workbook();
            props.sheets.forEach(sheetConfig => {
                if (!sheetConfig.data || !sheetConfig.data.length) {
                    console.warn(`Sheet "${sheetConfig.name}" has no data, skipping...`);
                    return;
                }
                const worksheet = workbook.addWorksheet(sheetConfig.name || 'Sheet');
                // Create header for this sheet
                let myHeader = []
                sheetConfig.data.forEach(function (o, index) {
                    if (index == 0) {
                        Object.keys(o).forEach(function (k) {
                            let myObject = {};
                            myObject.header = k;
                            myObject.key = k;
                            myHeader.push(myObject);
                        });
                    }
                });
                worksheet.columns = myHeader
                sheetConfig.data.forEach(item => {
                    worksheet.addRow(item);
                });
            });
            saveWorkbook(workbook, props.filename);
        }
        function saveWorkbook(workbook, filename) {
            const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            workbook.xlsx.writeBuffer().then(data => {
                const blob = new Blob([data], { type: blobType });
                let a = document.createElement('a')
                document.body.appendChild(a)
                a.style = 'display: none'
                const url = window.URL.createObjectURL(blob)
                a.href = url
                a.download = filename
                a.click()
                window.URL.revokeObjectURL(url)
            });
        }
    }
}
//===========================================================================================
function copyToClipboard(textToCopy) {
    if (navigator.clipboard && window.isSecureContext) {
        console.log("Navigator copy: ", textToCopy);
        return navigator.clipboard.writeText(textToCopy);
    } else {
        let textArea = document.createElement("div");
        textArea.innerText = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "0px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);

        var range = document.createRange();
        range.selectNode(textArea);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            console.log("Command copy: ", textToCopy);
            textArea.remove();
        });
    }
};
//===========================================================================================
function fileNameClear(fname) {
    if (fname) return fname.replace(/[\!\@\#\$\^\&\%\*\(\)\+\=\-\[\]\\\/\{\}\|\:\<\>\?\,\.\`\"\'\~\;]/gi, '');
    return fname;
}
//===========================================================================================
function hashCode(s) {
    var h = 0,
        l = s.length,
        i = 0;
    if (l > 0)
        while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
};
//===========================================================================================
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name, value, days, domain) {
    var expires = "";
    var domainString = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    if (domain) {
        domainString = "; domain=" + domain
    }
    document.cookie = name + "=" + (value || "") + expires + domainString + ";path=/";
}
//===================================================================================
function logout(cookiesName, domain, url) {
    if (!cookiesName) cookiesName = 'awt';
    if (typeof domain == "undefined" && vueData.v_Set.authDomain) domain = vueData.v_Set.authDomain;

    setCookie(cookiesName, '', 0, domain);

    if (!url) location.assign(location.href);
    else location.assign(url);
}

//===========================================================================================
//                                      WEBSOCKET
//===========================================================================================
function webSocketJoinGroup(groupObj, timeout, callBackFunc) {
    groupObj = _.cloneDeep(groupObj)
    _.forEach(groupObj, function (v, k) {
        if (!vueData.webSocket.hasOwnProperty(k)) {
            Vue.set(vueData.webSocket, k, v);
        }
    });

    setTimeout(function () {
        try {
            $.connection.hub.start().done(function () {
                _.forEach(groupObj, function (v, k) {
                    $.connection.chatHub.server.joinGroup(k);
                });
                if (_.isFunction(callBackFunc)) callBackFunc();
            }).fail(function (e) {
            });
        }
        catch (err) {

        }
    }, (timeout ? timeout : 0));
}

function webSocketConnection(wsURL, WS, wsState) {
    $.connection.hub.url = wsURL;

    //=====================================================================
    $.connection.hub.stateChanged(function (change) {
        wsState.code = change.newState;
        if (change.newState === $.signalR.connectionState.reconnecting) {
            console.log("Websocket Reconnecting")
            wsState.text = "Reconnecting";
        }
        else if (change.newState === $.signalR.connectionState.connected) {
            console.log("Websocket Connected")
            wsState.text = "Connected";
        }
        else if (change.newState === $.signalR.connectionState.disconnected) {
            console.log("Websocket Disconnected")
            wsState.text = "Disconnected";

            webSocketJoinGroup(WS, 5000);
        }
    });

    $.connection.chatHub.client.onError = function (Mess) {
        console.log('Server error: ', Mess);
    };

    $.connection.chatHub.client.onJoinGroup = function (mess) {
        console.log("Group", mess)
    };

    $.connection.chatHub.client.messageReceived = function (group, message) {
        console.log("Message Received: ", group, message)
        if (_.isArray(WS[group])) WS[group].push(message);
        else WS[group] = message;
    };

    $.connection.chatHub.client.messageSendLog = function (group, message) {
        console.log("Message Sent: ", group, message)
    };
}

function webSocket_Send(obj) {
    if (_.isPlainObject(obj.data)) $.connection.chatHub.server.messageSendObject(obj.group, obj.data);
    else if (_.isArray(obj.data)) $.connection.chatHub.server.messageSendArray(obj.group, obj.data);
    else $.connection.chatHub.server.messageSend(obj.group, obj.data);
}
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
