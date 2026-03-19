# Module Assessment & Quality Assurance

This guide defines the protocol for critiquing, assessing, and optimizing FUI modules. Use this skill when the user asks to "Review", "Assess", or "Critique" a module.

## Assessment Protocol

When assessing a module, perform the following 3-step analysis:

### 1. Code Quality & Architecture Review

- **Structure**: Does the module follow the standard directory structure (`module.json`, `script.js`, `_info.json`)?
- **JSON Standards**: Are `module.json` keys valid? Are `attr` and `col` used correctly?
- **Separation of Concerns**: Is complex logic moved to `script.js` instead of cluttering JSON?
- **Clean Code**: Are variable names consistent? Is dead code removed?

### 2. Logic & Edge Case Analysis

Identify potential failures in real-world scenarios.

- **Data Validation**: Are required fields checked before submission? What happens if fields are empty?
- **State Management**: Does the module handle loading states? Is there a risk of race conditions?
- **User Flow**:
  - _Scenario_: User clicks "Back" mid-process. Does data persist?
  - _Scenario_: User inputs invalid numbers/dates. Is it handled gracefully?
- **Security**: Are permissions checked? Is sensitive data exposed?

### 3. Best Practice Proposals

Propose optimization based on FUI standards.

- **Performance**: Can big lists become virtualized? Are there unnecessary re-renders?
- **UX**: Can steps be combined? Are error messages clear?
- **Maintainability**: Can repetitive validation be refactored into a helper function?

## Output Format

When delivering an assessment, structure your response as follows:

```markdown
## Module Assessment Report

### 🚨 Critical Issues

- [Logic] Missing validation on "Amount" field allows negative numbers.
- [UX] "Submit" button remains active during loading, allowing double submission.

### ⚠️ Improvements

- [Architecture] Move the 50-line validation logic from JSON to `script.js`.
- [UI] Use `f-date` instead of text input for date fields.

### 💡 Best Practice Proposals

- **Refactor**: Create a `validateForm()` function to handle all checks centrally.
- **UX**: Add a progress spinner when calling `apiLuu`.

### 🧪 Edge Cases to Verify

1.  User deletes a row from `dsDienGiai` then tries to submit.
2.  User uploads a file larger than 20MB.
```
