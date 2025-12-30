# Progress — Tech Stack Treemap

Current Status
- Oracle JET 19 treemap app scaffolded with CSV-driven data.
- Treemap renders via nodeTemplate and <oj-treemap-node> (per src/index.html).
- Cline Memory Bank initialized:
  - .clinerules created (global project rules and workflows)
  - memory-bank/: projectbrief.md, productContext.md, activeContext.md, systemPatterns.md, techContext.md, progress.md (this file)

What Works (per repository docs/code review)
- CSV parsing to nodes: { id, label, value, color, shortDesc } in src/js/root.js
- Data provider created and bound to <oj-treemap data="[[dataProvider]]">
- Animations enabled (display + data change)
- Live reload expected with OJET dev server

Remaining / Next Tasks
- Align DataProvider keyAttributes with node keys (see Known Issues):
  - Change { keyAttributes: 'technology' } → { keyAttributes: 'id' }
- Fix color indexing variable scope and palette wrap-around
- Decide on template strategy and align README with implementation:
  - Current implementation: nodeTemplate + <oj-treemap-node>
  - README mentions nodeContentTemplate in sections; choose one approach and update docs consistently
- Optional enhancements:
  - Tooltips/shortDesc improvements
  - Support icon/badge columns
  - Consider hierarchical data transformation if ever needed

Known Issues and Decisions
- Key mismatch:
  - DataProvider constructed with { keyAttributes: 'technology' } but nodes use id = label.
  - Recommended fix: { keyAttributes: 'id' } to match nodes.
- Global variable:
  - color_num is assigned without var/let → becomes global. Prefer: let colorIndex = 0.
- Palette bounds:
  - 20-color palette; no modulo when more than 20 items. Add wrap-around: color = palette[colorIndex++ % palette.length].
- Documentation discrepancy:
  - README references nodeContentTemplate in multiple places while index.html uses nodeTemplate with <oj-treemap-node>.
  - Decide final template approach and update README accordingly.

Session Notes
- Memory Bank set up to preserve context across sessions.
- See activeContext.md for immediate next steps and preferences.
- See systemPatterns.md for architecture and data flow details.

Changelog (recent)
- Added Memory Bank core files and .clinerules
- Captured system patterns and tech context
- Documented current status, next steps, and known issues here
