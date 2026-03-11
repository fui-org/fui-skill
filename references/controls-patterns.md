# Controls Patterns & Logic

Guide to defining logic and layout in `module.json`.

## 1. Component Actions (`data`)

Actions are the "methods" of your module. They handle APIs, dialogs, and logic flow.

### Standard API Call
```json
"apiLoadData": {
  "API": "/api/controller/action",  // Endpoint
  "IN": {                           // Input Mapping
    "Page": 1,                      // Static value
    "Search": "vueData.searchText", // Dynamic state
    "ID": "item.ID"                 // Context item (loops)
  },
  "OUT": "items",                   // Output state variable
  "CALLBACK": {                     // Chained action
    "MESS": "Data loaded!",
    "CALL": "anotherAction"
  }
}
```

### Literal String Values (Important)

Apply this rule only for values passed inside action `IN` mapping.
If a string has no spaces, FUI can treat it like an expression/variable in `IN`.  
When you need a plain literal string, force it with:
- Backtick prefix: ``"`myValue"`` (or closed ``"`myValue`"``)
- Single quotes inside JSON string: `"'myValue'"`

Examples:
```json
{
  "openDialog": {
    "FUN": "openWindow",
    "IN": {
      "id": "`winUser",
      "url": "'/fp/module?mid=123'"
    }
  }
}
```

For component props in `attr` without `:`, value is already a plain string prop and usually does not need wrapping.

### Conditional Logic
```json
"checkStatus": {
  "IF": "vueData.status === 1",
  "THEN": { "MESS": "Active" },
  "ELSE": { "MESS": "Inactive" }
}
```

### Confirmation
```json
"deleteItem": {
  "CONFIRM": "Are you sure you want to delete this item?",
  "API": "/api/delete",
  "IN": { "id": "item.id" },
  "CALLBACK": { "CALL": "apiLoadData" }
}
```

## 2. Watchers (`watch`)

Trigger actions automatically when data changes.

For production-grade cascading and filter watcher design, see [watcher-patterns.md](watcher-patterns.md).

```json
"watch": {
  "searchText": {            // Variable to watch
    "CALL": "apiLoadData"    // Action to run (debounce is auto-handled by FUI usually)
  },
  "selectedGroup": {
    "CALL": "apiLoadUsers"
  }
}
```

## 3. Controls Layout (`controls`)

**MANDATORY**: All UI elements MUST be nested within a Grid System structure: **Container** > **Row** > **Col** > **Element**. Do NOT place elements directly at the root.

### Basic Grid Structure
```json
{
  "prop": "fluid grid-list-md", // CONTAINER (v-container)
  "rows": [
    {
      "prop": "row wrap",       // ROW (v-layout)
      "cols": [
        {
          "w": "6",             // COLUMN (v-flex) - Nested Element goes here
          "el": "v-text-field",
          "attr": { ... }
        },
        {
          "w": "6",
          "el": "v-btn",
          "innerHTML": "Submit"
        }
      ]
    }
  ]
}
```

### `innerHTML` Supports `{{ }}`
Use Vue interpolation in `innerHTML` for text pulled from `data`.

```json
{
  "el": "div",
  "w": "12",
  "innerHTML": "Xin chao {{formData.fullName}}"
}
```

### Responsive Forms
Control form width dynamically using breakpoints.

**Step 1: Define Config**
```json
"data": [
  {
    "configForm": {
      "xs": { "width": "100%" }, // Mobile
      "md": { "width": "500px" } // Desktop
    }
  }
]
```

**Step 2: Apply to Dialog/Form**
```json
"attr": {
  ":width": "$vuetify.breakpoint.mdAndUp ? configForm.md.width : configForm.xs.width"
}
```

## 4. Common Element Patterns

-   **HTML Content**: Use `innerHTML` for text or simple HTML.
-   **Events**: `v-on:click`, `v-on:change`. wrap logic in `CALL()`.
-   **Visibility**: Use `v-if` (pre-render) or `v-show` (CSS toggle).
-   **Loops**: `v-for` is rarely used directly in `module.json`. Use `f-table` for lists or recursive partials.
