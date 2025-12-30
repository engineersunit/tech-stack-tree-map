# Product Context — Tech Stack Treemap

Why This Project Exists
- Communicate the relative “impact” of technologies in a single, glanceable visualization.
- Provide a lightweight, dependency-minimal demo of Oracle JET 19’s Treemap with custom node content.
- Serve as a reference implementation for JET 19 AMD/KO apps loading CSV data.

Problems It Solves
- Avoids slideware/manual charts; generates a live treemap directly from CSV.
- Centralizes tech-impact data (simple CSV) to streamline iteration and discussion.
- Demonstrates pragmatic JET 19 patterns for teams still on AMD/KO stacks.

How It Should Work (User Experience)
- Start local dev server (ojet serve) and load http://localhost:8000.
- Treemap renders immediately from src/data/tech_2025.csv.
- Each node shows the technology label and numeric impact.
- Editing the CSV triggers live reload and updates the treemap.

User Experience Goals
- Zero-config local run with clear README instructions.
- Fast edit-refresh loop on CSV changes.
- Minimal UI chrome; focus on the treemap data itself.
- Predictable mapping: higher impact = larger node size.

Non-Goals (Initial)
- Deep interactivity (drilldown/zoom).
- Theme customization beyond defaults.
- Authoring/editing CSV within the UI.
- Complex data modeling or hierarchy.
