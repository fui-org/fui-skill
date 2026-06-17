# FastProject (Core Framework)

This document references the core framework logic defined in `fastproject.js`. This script is responsible for initializing the application, building the UI from JSON configurations, and handling the logic engine.

## Global State

### vueData
The central reactive state object for the application.
- `p_domain`, `p_routers`, `p_params`: Routing and environment info.
- `user`: Current user information.
- `v_Set`: Application settings (title, menu, attributes).
- `v_Loading`: Global loading state.

### vueOBJ
The Vue instance configuration object.

## Core Functions

### loadModuleInfo()
Initializes the module by:
1. Loading project and module settings.
2. Building URL parameters.
3. Fetching user info (if configured).
4. Calling `createModuleDom()`.

### createModuleDom()
Builds the Vue application structure:
1. Executes initial data actions (`$moduleUI.data`).
2. Generates the HTML structure using `buildModuleUI`.
3. Initializes Vue watchers and WebSocket connections.
4. Mounts the Vue instance.

### buildModuleUI(controlsList, target)
Recursively builds the DOM structure from a JSON list of controls.
- **Parameters:**
  - `controlsList` (Array): List of control definitions.
  - `target` (Object): Target object for data binding (usually `vueData`).
- **Returns:** jQuery object containing the generated HTML.

### buildControl(controlsList, flex, target)
Helper function for `buildModuleUI` to generate individual controls.
- Supports grid layout (`v-layout`, `v-flex`) and nested components.
- Handles attribute binding and event mapping.

### runAction(obj, includeData)
The central logic engine. Executes a sequence of actions defined in JSON.
- **Parameters:**
  - `obj` (Object|Array): The action(s) to execute.
  - `includeData` (Object): Context data.
- **Supported Action Types:**
  - `CONFIRM`: Show confirmation dialog.
  - `API`: Call an API.
  - `CALL`: Recursive call to another action.
  - `EXE`: Execute raw JavaScript.
  - `FUN`: Call a global function.
  - `IF/THEN/ELSE`: Conditional logic.
  - `MESS`/`MESSBOX`: Show messages.
  - `IN`/`OUT`: Data mapping.

### vueAction(objAction, includeData, callBack)
Internal function used by `runAction` to execute a single action step.

### callAPI(objApi, callBack, includeData)
Executes an API call defined in a JSON action object.
- Handles `BEFORE`, `AFTER` actions, and success/error callbacks.
- Automatically maps response data to `vueData` if `OUT` is specified.

### mapData(map, target, src, includeData)
Maps data from a source object to a target object based on a mapping definition.
- Supports cross-window data mapping using `#PARENT` or window IDs.
- **Parameters:**
  - `map` (Object|String): Mapping definition.
  - `target` (Object): Destination object.
  - `src` (Object): Source object.

### getVueData(key, src)
Resolves a value from a key string, supporting deep paths and template syntax (e.g., `{{user.Name}}`).

### bindData(obj)
Resolves all dynamic values within an object.

### createWatch(obj)
Sets up Vue watchers based on a JSON configuration.
- Supports deep watching.
- Executes actions when watched values change.

### loginFUN()
Handles user login redirection.
- Opens a login window or redirects to the login page.

### errorMess(code, message)
Displays standard error messages based on HTTP status codes.
- **Parameters:**
  - `code` (String|Number): HTTP status code.
  - `message` (String): Custom error message.