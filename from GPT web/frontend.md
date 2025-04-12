**Zoomout Frontend: The Interface of Dialectical Recursion**

> Design isn’t just how it looks. In Zoomout, design is how the dialectic thinks.
> 

---

## Purpose

Zoomout’s frontend is not just a user interface. It is the visual, navigable expression of a contradiction engine. Every view, every click, and every surface is part of a system that reveals motion—not just data.

Where most UIs ask, "What happened?", Zoomout asks:

- What contradiction caused this rupture?
- What structure birthed that contradiction?
- What struggles emerged to confront it?
- What ideological positions formed around it?
- Who moved, who resisted, and why?

This document captures the complete frontend architecture of Zoomout. Every planned view is defined in terms of:

- The dialectical layer it renders
- Its narrative and analytical function
- The recursive zoom relationships it enables
- Its internal interactions and schema dependencies

This is not a dev checklist. This is a consciousness map.

---

## Core Views

### ✨ `ReportingPage` — *Event Feed + Logging Interface*

- **Layer Rendered**: Events
- **Function**: Captures the immediate ruptures in the world. This is where contradiction motion breaks into visibility.
- **UI Structure**:
    - Infinite scroll feed of events (reverse chronology)
    - Grouped views for one-off vs timeline-linked events
    - Event tiles show title, multi-headline perspective, contradiction badge, and stance tag
- **Backend Schema**: Writes to `Events Sheet` (with links to contradiction, struggle, timeline, entities)
- **Recursive Pathways**:
    - Event → Issue → Contradiction
    - Event → Struggle → Structure
    - Event → Entity → Historical stance evolution

### ⚖️ `IssuesPage` — *Stance Arena + Flashpoint Tracker*

- **Layer Rendered**: Issues
- **Function**: Renders the ideological terrain where contradictions become publicly debated. Issues are not just topics; they are contested meanings.
- **UI Structure**:
    - List of **Issue Cards**, each with:
        - Title, Description (from initiating event)
        - Embedded **Three-Column Stance Model** (headlines, descriptions, events)
        - Linked contradiction + timeline tags
- **Backend Schema**: Writes to `Issues Sheet`, with `issue_event_id`, `contradiction_ids`, stance fields, and `linked_entities`
- **Recursive Pathways**:
    - Issue → Contradiction → Structure
    - Issue → Events → Timeline
    - Issue → Entities (stance roles)

### 🏰 `WikiPage` — *Entity Archive + Stance Tracker*

- **Layer Rendered**: Entities
- **Function**: Profiles the agents of history. Who acted? Who defended power? Who shifted sides? Every actor is tracked as a historical force.
- **UI Structure**:
    - Grid of **Entity Cards**, filterable by type (Party, Movement, State Org, etc.)
    - Clicking reveals:
        - Bio, ideological category, spectrum position
        - Timeline of linked events and issues
        - Historical stance evolution (e.g., from passive to agitator)
- **Backend Schema**: Writes to `Entities Sheet`, linking to events, issues, struggles, relationships
- **Recursive Pathways**:
    - Entity → Event → Contradiction
    - Entity → Issue → Stance Spectrum
    - Entity → Relationship Map (optional future view)

### 🔄 `TimelinePage` — *Historical Motion Scaffold*

- **Layer Rendered**: Contradictions + Zoom Levels (event, issue, struggle)
- **Function**: This is the zoomout. Users see the historical arc of contradiction motion, structured not by years but by tension.
- **UI Structure**:
    - Rendered from `timeline_registry_sheet` + `timeline_grid_sheet`
    - Each phase block shows:
        - Anchor contradiction
        - Linked struggles, entities, issues
        - Zoom-level blocks (e.g., "Mandai Verdict 1992" = Event)
    - Clicking any block opens a detail preview or routes into recursive view
- **Backend Schema**: Reads from `timeline_registry`, `timeline_grid`, and all linked items
- **Recursive Pathways**:
    - Timeline Phase → Contradiction → Structure
    - Zoom Block → Issue / Event / Struggle → Entity / Theory

---

## Views in Review (Planned After Core Build)

These are fully specced, schema-backed, and conceptually locked. They will move into execution after the above 4 views are implemented.

### 📄 `FormsPage` — *All Sheet Inputs*

- Centralized access to forms for all dialectical layers: Theory, Contradictions, Struggles, Structures, etc.
- Smart dropdowns and tag inputs support recursive linking.

### ⚔️ `StruggleDetailPage` — *Campaign as Historical Praxis*

- Displays a struggle's evolution, linked issues, events, sectors, and status.
- Shows what form of praxis was used (direct action, legal, cultural).

### ⚡ `TheoryView` — *Ideological System Explorer*

- Split into two views:
    - **Theory Object View**: Concepts, identity frames, ideological systems
    - **Theory Instance View**: Posts, essays, reels, manifestos
- Tracks how theory is expressed, tested, refuted, or validated.

### ❓ `ContradictionView` — *Core Dialectical Node*

- Shows the contradiction’s flashpoints, motion, intensity, linked structures, struggles, and issues.
- Central reference point for Zoomout’s learning arc.

### ♻️ `StructureView` — *Systemic Foundations View*

- Graph or tree-based rendering of structures (e.g., caste, market, kinship).
- Shows their evolution, embedded contradictions, linked struggles.

### ⚛️ `PolygraphPage` — *Simulation + Completion Engine*

- Renders contradiction pathways
- Alerts users to incomplete chains (e.g., contradiction with no flashpoint, struggle with no event)
- Visual recursion trails

### 🔧 `OpsDashboardPage` — *Admin + Integrity Checks*

- Internal page for schema syncing, backfill validation, recursion audit, and data depth tracker.
- Optional coverage maps, form sync indicators, and sheet health flags.

---

## Zoom Logic

Every view is part of a zoom graph. Users may start from a tweet, protest, or entity profile and end up inside a contradiction, across a timeline.

**Bidirectional motion is hardcoded into design**:

- Event → Issue → Contradiction → Structure
- Contradiction → Theory → Events that support/refute
- Struggle → Events → Entity shifts

Navigation is not linear. It's **recursive, intentional, and motion-oriented**.

---

## Final Note

Zoomout’s frontend is not just the delivery mechanism of a database.
It is a *consciousness engine*, scaffolding the user’s political memory.

It should always:

- Render contradiction visibly
- Invite historical recursion
- Show ideology as a contested field
- Reveal structure where others show noise

What a user clicks is not a node.
It’s an entry point into a system in motion.