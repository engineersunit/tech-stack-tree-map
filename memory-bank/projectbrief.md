# Project Brief — Tech Stack Treemap (Oracle JET 19)

Summary
- A lightweight Oracle JET 19 web app that renders a Treemap of technologies and their impact from a CSV dataset.
- Data source: src/data/tech_2025.csv (flat list of leaf nodes).
- Purpose: Quickly visualize and compare technologies by impact, with a minimal JET 19 AMD/KO setup and live-reload dev server.

Primary Goals
- Render an <oj-treemap> fed by ArrayTreeDataProvider built from the CSV.
- Use nodeContentTemplate for custom label/value rendering.
- Keep the implementation simple, dependency-light, and aligned with JET Cookbook patterns.
- Provide a smooth local dev experience via ojet serve at http://localhost:8000.

Scope
- CSV → parsed in ViewModel (root.js) to nodes: { id, label, value, icon, badge, shortDesc }.
- Flat treemap (no nested hierarchy) sized by numeric impact.
- UI displays each node’s label and value using the nodeContentTemplate slot.
- README documents run/build, structure, and troubleshooting.

Out of Scope (Initial)
- Deep interactivity (zooming/drilldown).
- Hierarchical CSV parsing.
- Advanced theming beyond basic CSS.
- Accessibility audits beyond JET defaults.
- Testing/CI/CD, deployment automation.
- Persisting edits back to CSV from UI.

Users and Value
- Engineers/architects wanting a quick snapshot of tooling priorities.
- Stakeholders needing a visual to communicate tech influence.
- Demo/reference for JET 19 treemap node content pattern.

Success Criteria
- Starts locally with npx ojet serve and renders a treemap without console errors.
- CSV updates live-reload into the visualization.
- Clear README and simple contribution path.
- Memory Bank established to preserve project intent, patterns, and current status.

Assumptions and Constraints
- Node >= 16 (tested on Node 25.x).
- Oracle JET 19 with RequireJS and KO bindings (AMD).
- ojet CLI used for serve/build.
- Browser served at http://localhost:8000.

Future Enhancements (Nice to Have)
- Icons/badges per node (CSV columns exist).
- Tooltips/shortDesc enhancements.
- Accessibility improvements and keyboard navigation patterns.
- Add tests and CI workflow.
- Hierarchical data support and additional data transforms.
