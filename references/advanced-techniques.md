# Advanced FUI Techniques

This document captures advanced patterns and techniques for FUI development, extracted from real-world implementations.

## 2. Advanced Logic & Scripting

FUI's JSON-based logic has limitations. Use `script.js` for complex operations.

### Computed Properties Workaround
FUI `module.json` does not natively support computed properties. 
**Solution:** Define calculation functions in `script.js` and call them directly in `module.json`.

**script.js**:
```javascript
function getTongTien() {
    return vueData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
}
```

**module.json**:
```json
{
  "innerHTML": "Total: {{getTongTien().toLocaleString()}} VNĐ"
}
```

### Complex Validation
Avoid writing long logic strings in JSON. Move validation logic to `script.js`.

**script.js**:
```javascript
function validateStep1() {
    const d = vueData;
    if (!d.name || !d.email) {
        alert("Missing required fields!");
        return false;
    }
    return true;
}

function nextStep() {
    if (vueData.step === 1 && !validateStep1()) return;
    vueData.step++;
}
```

**module.json**:
```json
"v-on:click": "nextStep()"
```

### Action Binding
You can bind direct JS functions to events instead of using the `CALL` action protocol if needed for simple UI logic.

```json
"v-on:click": "prevBuoc()"
```

