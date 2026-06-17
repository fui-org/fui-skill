# UI Templates Guide

Use templates from `examples/` as starting points for common UI patterns.

## Available Templates

### form-basic.json
**When to use**: Simple data entry forms with text fields, selects, checkboxes.

```
examples/form-basic.json
```

**Key sections to modify:**
- `formData`: Change field names and default values
- `submitForm.API`: Set your API endpoint
- `submitForm.IN`: Map form fields to API params
- Add/remove form controls in `controls`

---

### table-crud.json
**When to use**: Data tables with Create, Read, Update, Delete operations.

```
examples/table-crud.json
```

**Key sections to modify:**
- `apiLoadData.API`: Your list API endpoint
- `headers`: Column definitions
- `update-form`: Edit form fields
- `update-api.new/edit/delete`: CRUD API endpoints

---

### dialog-form.json
**When to use**: Modal popups with forms (e.g., quick edit, confirmation with input).

```
examples/dialog-form.json
```

**Key sections to modify:**
- `dialogData`: Fields for your form
- `f-dialog.controls`: Form controls inside dialog
- `f-dialog.button[].action`: Submit API and callbacks

## Usage Pattern

1. Copy template content to your `module.json`
2. Replace placeholder APIs with real endpoints
3. Adjust field names and labels
4. Add to existing `data` and `controls` arrays
