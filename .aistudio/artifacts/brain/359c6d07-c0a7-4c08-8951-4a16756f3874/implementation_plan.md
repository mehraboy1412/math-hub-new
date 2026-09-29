# Fix Production Deployment Build: Module Script Bundling

Fix the issue causing the application to fail after deployment on the shared URL while functioning in development.

## User Review & Critical Decisions

> [!IMPORTANT]
> The root cause was identified: `index.html` had `<script src="/src/app.js"></script>` without `type="module"`. In development, Vite serves static root files directly; however, during the production build (`vite build`), Vite emitted:
> `"<script src="/src/app.js"> in "/index.html" can't be bundled without type="module" attribute"`
> As a result, `src/app.js` was completely omitted from the deployed `dist/` directory, causing a 404 error when deployed.

- **Confirmed Decision 1**: Add `type="module"` to the script tag in `index.html` so Vite compiles, bundles, minifies, and outputs the JavaScript bundle into `dist/assets/`.
- **Confirmed Decision 2**: Update `src/app.js` initialization to run immediately if DOM is already parsed (`document.readyState !== 'loading'`) or on `DOMContentLoaded`, ensuring instant execution in both bundled and unbundled modes.
- **Confirmed Decision 3**: Update `vite.config.ts` alias to use `import.meta.dirname` to clear build warnings.

---

## 1. Root Cause Analysis

1. In Dev Server (`npm run dev`):
   - Vite acts as an HTTP server that maps `/src/app.js` on demand.
2. In Production Deployment (`npm run build` ➔ Cloud Run serving `dist/`):
   - Vite parses `index.html`. Because `<script src="/src/app.js">` lacked `type="module"`, Vite ignored it and did not bundle it into `dist/`.
   - `dist/index.html` was generated with a dead reference to `/src/app.js`.
   - On the deployed URL, requests to `/src/app.js` failed with a 404 (or served fallback HTML), preventing any script from executing.

---

## 2. Technical Implementation Plan

1. **`index.html`**:
   - Change:
     ```html
     <script type="module" src="/src/app.js"></script>
     ```
2. **`src/app.js`**:
   - Ensure the app instantiates whether the module script executes before or after `DOMContentLoaded`:
     ```javascript
     if (document.readyState === 'loading') {
       document.addEventListener('DOMContentLoaded', () => { window.__mathApp = new MathHubApp(); });
     } else {
       window.__mathApp = new MathHubApp();
     }
     ```
3. **`vite.config.ts`**:
   - Replace `__dirname` with `import.meta.dirname` to adhere to modern Vite config standards.
4. **Verification**:
   - Run `npm run build` and inspect `dist/` to verify that `dist/assets/index-*.js` is produced and referenced in `dist/index.html`.
   - Run `compile_applet` and `lint_applet`.
