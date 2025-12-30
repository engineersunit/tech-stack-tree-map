# Active Context — Tech Stack Treemap

Current Focus
- Maintain and update Cline Memory Bank per user request (“update memory bank”)
- Ensure custom instructions are followed (“follow your custom instructions”) at the start of each task
- Keep architecture/tech context accurate and actionable for the Oracle JET 19 treemap app

Recent Changes
- Memory Bank validated and expanded:
  - Added: systemPatterns.md, techContext.md, progress.md
  - Updated README with a “Cline Memory Bank” section (usage and file locations)
  - Documented known technical items (keyAttributes mismatch, color indexing scope, palette wrap-around)
- Confirmed current UI template: nodeTemplate with <oj-treemap-node> in src/index.html
- Captured system architecture and data flow in systemPatterns.md

Next Steps
- Decide final template strategy and align README and code accordingly:
  - Current implementation: nodeTemplate + <oj-treemap-node>
  - README previously referenced nodeContentTemplate in sections; reconcile for consistency
- Plan code quality fixes:
  - Set ArrayTreeDataProvider keyAttributes to 'id' (nodes use { id, ... })
  - Scope color index variable with let and add modulo wrap-around for palette
- Continue to update the Memory Bank after significant changes (especially activeContext.md and progress.md)
- Optional backlog:
  - Consider displaying icon/badge from CSV
  - Add tooltip/shortDesc enhancements
  - Explore hierarchical data support (future)

Decisions & Preferences
- Keep JET 19 AMD + KO setup (RequireJS-based)
- Use nodeTemplate with <oj-treemap-node> for now; consider nodeContentTemplate if richer custom HTML is needed
- Treemap nodes sized by numeric “impact” (non-numeric → 0)
- Maintain minimal UI chrome and a fast edit-refresh loop

Notes & Learnings
- When using custom HTML overlays via nodeContentTemplate, apply pointer-events: none to preserve interactivity; current implementation uses <oj-treemap-node> so this is not required
- DataProvider keys: keyAttributes should be 'id' to match node objects (currently set to 'technology')
- CSV loaded via RequireJS text loader ('text!../data/tech_2025.csv')
- Keep README authoritative for run/serve/build and troubleshooting
