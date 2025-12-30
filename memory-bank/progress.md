# Progress — Tech Stack Treemap

Current Status
- Hierarchical Treemap implemented (2 levels): Area (group) → Technology (leaf).
- CSV updated with Area as first column; data drives hierarchy.
- Icons rendered on leaf nodes via nodeContentTemplate overlay.
- DataProvider switched to hierarchical mode with childrenAttribute.
- Icons sourced via Simple Icons, copied into src for serving.

What Works
- CSV parsing to hierarchical groups in src/js/root.js:
  - Output shape: [{ id: 'area:<Area>', label, color, nodes: [{ id: 'tech:<tech>', label, value, icon, color, shortDesc }]}]
  - Stable color per Area using palette with wrap-around.
  - Icon mapping (iconMap) for known technologies + default.
- Data provider:
  - ArrayTreeDataProvider(groups, { keyAttributes: 'id', childrenAttribute: 'nodes' })
- UI (src/index.html):
  - oj-treemap with nodeTemplate for base nodes.
  - nodeContentTemplate overlays absolute-positioned icon + label on leaf nodes.
  - Icons loaded from css/images/tech/*.svg
- Assets:
  - Icons downloaded into docs/images and copied to src/css/images/tech.

Remaining / Next Tasks
- Visual QA:
  - Verify scaling in very small leaf nodes (icon may be clipped).
  - Adjust font size/contrast of labels for readability if needed.
- Expand icon coverage:
  - Add more brand icons as new technologies are added; update iconMap accordingly.
- Accessibility:
  - Confirm short-desc text is descriptive and unique.
- Optional:
  - Conditional label display based on node area (hide on small nodes).
  - Tooltip enhancements, color legend by Area.

Known Issues and Decisions
- Parent node values:
  - We do not set explicit values on Area nodes; Treemap derives from children. Binding value on parent nodes is omitted when undefined by KO, which is acceptable.
- Branding/licensing:
  - Icons are from Simple Icons; usage subject to brand owner guidelines.

Changelog (recent)
- Added Area column to CSV and populated values.
- Implemented hierarchical parseCsv with Area grouping and icon mapping.
- Switched DataProvider to hierarchical mode with keyAttributes 'id' and childrenAttribute 'nodes'.
- Added nodeContentTemplate overlay with backgroundImage icons.
- Downloaded and packaged icons; updated paths to css/images/tech.
- Updated README to document hierarchy, icons, and run instructions.
