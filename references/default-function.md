# Default Functions

This document references the global utility functions and variables defined in `defaultfunction.js`.

## Global Variables

| Variable | Description |
| :--- | :--- |
| `$isMobile` | Boolean indicating if the user agent matches a mobile device. |
| `$isPhone` | Boolean indicating if the user agent matches a phone device (excluding tablets). |
| `$isApple` | Boolean indicating if the user agent is an Apple device (iPad, iPhone, iPod). |

## Classes

### Loader
A utility class for dynamically loading scripts.

**Methods:**
- `require(scripts, callback)`: Loads an array of script URLs and executes the callback when all are loaded.
- `loaded(evt)`: Internal method called when a script loads.
- `writeScript(src)`: Internal method to inject a script tag.

## Utility Functions

### extractHostname(url)
Extracts the hostname from a given URL.
- **Parameters:** `url` (String)
- **Returns:** Hostname (String)

### getDomainWithoutSubdomain(url)
Extracts the domain name without subdomains from a URL.
- **Parameters:** `url` (String)
- **Returns:** Domain (String)

### loadScripts(scriptsArray, callbackFunc)
Helper function to use the `Loader` class to load multiple scripts.
- **Parameters:**
  - `scriptsArray` (Array<String>): List of script URLs.
  - `callbackFunc` (Function): Function to execute after loading.

### pushRouter(router)
Pushes a new state to the browser history.
- **Parameters:** `router` (String) - The new path.

### CALL(obj, includeData)
Alias for `runAction`.
- **Parameters:**
  - `obj` (Object): The action object.
  - `includeData` (Object): Additional data to merge into context.

### windowSendMessage(window, cmd, data)
Sends a postMessage to a specific window or iframe.
- **Parameters:**
  - `window` (Object|String): Target window object or ID (prefixed with `#` for ID, or `#PARENT`).
  - `cmd` (String): Command name.
  - `data` (Object): Data payload.

### appCommand(cmdData)
Sends a message to the native app wrapper (ReactNative, WebKit, etc.).
- **Parameters:** `cmdData` (Object)

### buildHeader(obj, mapCol)
Builds a header array for data tables based on an object key set or specification.
- **Parameters:**
  - `obj` (Array): Data source.
  - `mapCol` (Object): Optional mapping for headers.
- **Returns:** Array of header objects.

### fillData(obj)
Fills data from a source array into a destination object based on a key and mapping.
- **Parameters:** `obj` (Object) - { src, des, key, map }

### groupBy(arrayObj, groupField, sumArr)
Groups an array of objects by a field and sums specified columns.
- **Parameters:**
  - `arrayObj` (Array): Input array.
  - `groupField` (String): Field to group by.
  - `sumArr` (Array<String>): Fields to sum.
- **Returns:** Grouped array with counts and sums.

### chartDataBuild(obj)
Formats data for Chart.js based on the `dataChart` property.
- **Parameters:** `obj` (Object)
- **Returns:** Formatted chart data array.

### chartQABuild(obj)
Formats data for QA charts specifically.
- **Parameters:** `obj` (Object)
- **Returns:** Formatted chart data.

### confirm(obj)
Displays a confirmation dialog using `$.confirm`.
- **Parameters:** `obj` (Object) - { title, message, action, cancel, icon, type }

### showMessage(obj)
Displays a message dialog using `$.dialog`.
- **Parameters:** `obj` (Object) - { title, message, icon, type, onclose }

### rightTest(rightObject)
Checks if the current user has the required rights specified in `rightObject`.
- **Parameters:** `rightObject` (Object) - Key-value pairs of required rights.
- **Returns:** Boolean.

### openWindow(obj)
Opens a new FUI window/dialog.
- **Parameters:** `obj` (Object|String) - Window configuration or URL string.
  - `id`: Window ID (optional, generated if missing).
  - `url`: Content URL.
  - `title`: Window title.

### redirect(obj, query)
Redirects the current page.
- **Parameters:**
  - `obj` (Object|String): Target URL or configuration object.
  - `query` (Boolean): Whether to preserve current params.

### reload()
Reloads the current page.

### findInArray(obj)
Finds an item in an array matching a value.
- **Parameters:** `obj` (Object) - { array, value }
- **Returns:** Found item.

### fixURL(url)
Prepends the API domain if the URL is relative.
- **Parameters:** `url` (String)
- **Returns:** Absolute URL.
- **Lưu ý:** Hàm này được `ajaxCALL` gọi nội bộ — không cần gọi thủ công.

### stringAttrToJson(str, removeVueEvent)
Parses a string of HTML attributes into a JSON object.
- **Parameters:**
  - `str` (String): HTML attribute string.
  - `removeVueEvent` (Boolean): If true, removes Vue events (v-*, @, :).
- **Returns:** JSON Object.

### json_data_parse(obj, level)
Recursively parses `json_data:` prefixed string values in an object structure into JSON.
- **Parameters:**
  - `obj` (Object): The object to parse.
  - `level` (Number): Recursion depth.

### ajaxCALL(URL, DATA, callBack, errorCallBack, header)
Performs an AJAX POST request. URL không cần ghi đầy đủ domain — chỉ cần truyền path của API, hệ thống tự ghép domain thông qua `fixURL` trước khi gọi.
- **Parameters:**
  - `URL` (String): Path của API, ví dụ `"/SM_Modules_ManagerSelect"`. Không cần ghép domain đầy đủ như `https://api.fui.vn/...`
  - `DATA` (Object): Request payload.
  - `callBack` (Function): Success callback.
  - `errorCallBack` (Function): Error callback.
  - `header` (Object): Custom headers.
- **Ví dụ:**
  ```js
  // Đúng — chỉ cần path
  ajaxCALL("/SM_Modules_ManagerSelect", data, callback);

  // Sai — không cần ghép domain thủ công
  ajaxCALL("https://api.fui.vn/fp//SM_Modules_ManagerSelect", data, callback);
  ```

### capacityText(numb)
Formats a number of bytes into Kb or Mb.
- **Parameters:** `numb` (Number)
- **Returns:** Formatted string.

### generateID()
Generates a random unique ID string.
- **Returns:** String.

### printPDF(obj)
Generates and prints/downloads a PDF using `pdfMake`.
- **Parameters:** `obj` (Object) - { data, download, viewer, callBack }

### colorLib(color)
Utility for color manipulation (hex, rgb, hsl).
- **Parameters:** `color` (String)
- **Returns:** Object with methods `hexString`, `rgbString`, `hslString`, `lighten`, `darken`, `alpha`.

### transparentize(value, opacity)
Creates a transparent version of a color.
- **Parameters:**
  - `value` (String): Color code.
  - `opacity` (Number): Opacity (0-1).
- **Returns:** RGBA string.

### jsonToExcel(Obj)
Exports JSON data to an Excel file using `ExcelJS`.
- **Parameters:** `Obj` (Object) - { data, filename, worksheet, sheets }

## Security Considerations

When using the utilities documented above, please adhere to the following secure coding practices to prevent vulnerabilities:

1. **Input Validation**: Ensure all data provided to functions like `openWindow`, `redirect`, and `ajaxCALL` is strictly validated and sanitized to prevent XSS or unvalidated redirects.
2. **postMessage Security**: When using `windowSendMessage` and listening for messages, always verify the `origin` of incoming messages against a whitelist of trusted domains. Do not accept messages from wildcard (`*`) or unknown origins.
3. **Safe Script Loading**: The `Loader` class and `loadScripts` should only be used to load scripts from trusted, explicitly whitelisted domains. Do not pass untrusted user input directly into script URLs.