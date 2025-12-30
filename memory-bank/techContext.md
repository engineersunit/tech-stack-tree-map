# Tech Context — Tech Stack Treemap

Stack and Versions
- Oracle JET: 19.x
  - @oracle/oraclejet ~19.0.0
  - @oracle/oraclejet-core-pack ~19.0.0
- JET CLI: @oracle/ojet-cli ^16.1.0 (used via npx)
- Runtime: Node >= 16 (tested with Node 25.x)
- Module system: AMD (RequireJS) with Knockout bindings
- Data provider: ojs/ojarraytreedataprovider (ArrayTreeDataProvider)

Key Files
- src/index.html
  - Hosts <oj-treemap id="techTreemap" data="[[dataProvider]]">
  - Uses a nodeTemplate slot with <oj-treemap-node> (label, value, color, short-desc, label-style)
  - animation-on-display="auto", animation-on-data-change="auto"
- src/js/root.js
  - Requires:
    - ojs/ojbootstrap, ojs/ojcontext
    - knockout, ojs/ojknockout
    - ojs/ojtreemap
    - ojs/ojarraytreedataprovider
    - text!../data/tech_2025.csv
  - parseCsv(): builds node array { id, label, value, color, shortDesc }
  - Creates ArrayTreeDataProvider and assigns to self.dataProvider
  - Applies KO bindings to #app and releases BusyContext
- src/js/main.js
  - RequireJS configuration (paths, bundles) injected by OJET tooling
- src/js/path_mapping.json
  - Library/CDN mappings used by OJET tooling
- oraclejetconfig.json
  - OJET 19 app configuration for serve/build
- src/data/tech_2025.csv
  - Primary dataset used by the treemap

Commands
- Install: npm ci
- Serve (dev): npx ojet serve
  - Dev server at http://localhost:8000
  - Live reload on file changes
- Build (dev): npx ojet build
- Build (release): npx ojet build --release

Data Assumptions
- CSV columns: technology, impact, icon, badge
  - technology → used as label (and id)
  - impact → parsed to number; NaN → 0
  - icon, badge → reserved for future UI; not used currently
- Flat list (no hierarchy). Treemap node size = impact.

UI/Binding Details
- Template: nodeTemplate with <oj-treemap-node> child
  - Provides label, value, color, short-desc, label-style
- Styling: label-style increases font size/weight for readability
- Dimensions: treemap set to width: 100%, height: 80vh
- Interactivity: handled by oj-treemap; animations enabled

Environment
- No backend; static assets served by OJET tooling
- Works offline after npm ci (no dynamic network fetch)
- Recommended IDE: VS Code with Oracle JET-friendly settings

Known Technical Notes
- DataProvider keyAttributes should match nodes:
  - Current: { keyAttributes: 'technology' }
  - Nodes: { id: label, ... }
  - Preferred: { keyAttributes: 'id' }
- Color index variable declared without let/var (becomes global). Prefer let colorIndex = 0.
- Palette has 20 colors; add wrap-around (modulo) when data has > 20 rows.

Troubleshooting Pointers
- If no data appears:
  - Confirm data="[[dataProvider]]" on <oj-treemap>
  - Ensure template slot is nodeTemplate with <oj-treemap-node>
  - Check console for CSV loading via text! plugin
- If CSV changes don’t reflect:
  - Verify editing src/data/tech_2025.csv
  - Check dev server logs for live reload

References
- JET Treemap Cookbook (node content patterns)
- OJET CLI docs and configuration
