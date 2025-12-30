# System Patterns — Tech Stack Treemap

Architecture Overview
- Oracle JET 19 app using AMD modules (RequireJS) and Knockout bindings.
- Single-page static app served by ojet tooling; no backend.
- Data source is a CSV bundled/served with the app.

Key Components
- src/index.html
  - Hosts the application root (#app).
  - Uses <oj-treemap id="techTreemap" data="[[dataProvider]]" ...>.
  - Uses the nodeTemplate slot with an <oj-treemap-node> child for rendering:
    - label, value, color, short-desc are bound from node.data.
    - label-style configured for larger bold labels.
  - Animations enabled on display and data change.

- src/js/root.js
  - AMD require() loads:
    - ojs/ojbootstrap, ojs/ojcontext (busy context)
    - knockout and ojs/ojknockout (binding provider)
    - ojs/ojtreemap (component registration)
    - ojs/ojarraytreedataprovider (DataProvider)
    - text!../data/tech_2025.csv (CSV text at serve/build time)
  - AppViewModel
    - Parses CSV → array of node objects:
      { id, label, value, color, shortDesc }
    - Color palette: fixed discrete palette (20 colors), assigned sequentially.
    - Creates ArrayTreeDataProvider over the array and assigns to self.dataProvider.
  - Initialization
    - ko.applyBindings(vm, #app)
    - Handles hybrid deviceReady if applicable.
    - Context.getPageContext().getBusyContext().applicationBootstrapComplete() to release JET bootstrap busy state.

Data Flow
- CSV text loaded at startup via RequireJS text plugin.
- parseCsv() splits headers/rows, extracts:
  - technology → label/id
  - impact → numeric value (NaN coerced to 0)
- Nodes fed into ArrayTreeDataProvider; consumed by <oj-treemap> via data attribute.
- In the template, each node is rendered with <oj-treemap-node> component props.

Important Patterns & Decisions
- Keep AMD/KO stack consistent with JET 19 defaults.
- Template strategy: nodeTemplate with <oj-treemap-node> (not custom HTML overlay).
- Sizing strictly by numeric impact; flat list only (no hierarchy).
- Label styling via label-style prop to improve readability.

JET/RequireJS Patterns
- Use text! plugin path to inline/serve CSV as a module dependency.
- Prefer resolving ArrayTreeDataProvider in both AMD namespace and global (defensive).
- Release BusyContext when bootstrap is complete.

Caveats / Known Issues (to track in progress.md)
- keyAttributes mismatch: DataProvider is initialized with { keyAttributes: 'technology' } but nodes use id = label. Should be keyAttributes: 'id' to match.
- color_num is used without var/let; becomes a global; prefer let colorIndex = 0.
- Palette has 20 entries; no wrap-around if data length > 20. Consider modulo indexing.

Extensibility Hooks
- Future: Introduce tooltips/icons via additional CSV columns (icon, badge).
- Consider switching to nodeContentTemplate for fully custom HTML overlays if richer content is needed.
- Support hierarchical data by transforming CSV into parent/child relationships and configuring keyAttributes/keyPath.
