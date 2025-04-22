# forms.md

Defines how data is entered, validated, and routed to frontend.

Each form corresponds to a core sheet and enforces schema-level recursion, conditional UI logic, and validation rules as outlined in the dialectical ontology.

---

## Global Form Behaviors

### 🛠️ Auto-Generated Fields

Some fields across forms are auto-generated or prefilled by internal logic and **do not require user input** via the frontend:

- `_id` fields like `event_id`, `struggle_id`, `entity_id`, etc. — auto-generated as slugs or UUIDs.
- `item_category` — always fixed for Events (`event`), should be prefilled.
- `timeline_id`, `phase_id`, `timeline_grid_id` — can be derived from labels or dates.
- `current_phase` — should be toggled via UI, not input manually.
- `date_range` — can be computed from earliest and latest `linked_events` in some forms.

These should be handled programmatically within `googleSheetsApi.js` or form submission logic.

> 💡 Auto-generated fields may still appear in schemas and data rows, but are not editable by end-users.
> 

---

### 🔄 Linked Field Behavior

- All linked fields use `_id` references and should support autocomplete.
- Validation must ensure linked entries exist in their respective sheets.
- Linked fields can support single or multiple selections (array of IDs), depending on schema.

---

### 🧠 UI Logic & Recursion Awareness

- Forms are schema-aware: fields can be conditionally shown/hidden.
- Dropdowns validate against hardcoded vocab lists (see `validation.js`).
- Some fields dynamically appear based on other field values (e.g., `contradiction_type = Ideological` triggers `theory_ids`).
- All recursion constraints should be enforced at validation time (e.g., no contradiction without a structure).

---

## Field Visibility by Type

### 🧩 Metadata Fields

Used for internal IDs, status, categorization, timestamps.

- Examples: `_id`, `status`, `type`, `scale`, `timeline_id`, `publication_date`

### ✏️ Descriptive Fields

Free-form or structured text that explains the purpose, content, or logic.

- Examples: `title`, `description`, `historical_motion`, `abstract`, `message_text`, `stance_description`

### 🔗 Linked-Item Fields

References to other sheets in the system that support recursion.

- Examples: `linked_theory_object_ids`, `event_ids`, `root_structure`, `contradiction_ids`, `entity_ids`

---

The following sections define each form in full, based on the above global rules.

---

## Contradictions Form

> 💡 contradiction_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Captures deep structural tensions that drive historical motion. This form is foundational — every contradiction must be rooted in a structure and ripple outward to struggles, issues, events, and theory.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `contradiction_id` | system slug | ❌ Auto-generated |
| Metadata | `contradiction_type` | Dropdown | ✅ Visible |
| Metadata | `status` | Dropdown | ✅ Visible |
| Metadata | `subtype` | Dropdown (optional) | ✅ Visible |
| Metadata | `rupture_date` | Date picker (optional) | ✅ Visible |
| Metadata | `contradiction_intensity` | Dropdown (optional) | ✅ Visible |
| Metadata | `contradiction_priority` | Dropdown (optional) | ✅ Visible |
| Description | `contradiction_name` | Text input | ✅ Visible |
| Description | `contradiction_description` | Long text | ✅ Visible |
| Description | `historical_motion` | Long text (optional) | ✅ Visible |
| Linked Item | `root_structure` | Linked dropdown | ✅ Visible |
| Linked Item | `first_major_flashpoint_event_id` | Linked dropdown | ✅ Visible |
| Linked Item | `struggle_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_issues` | Linked multi-select | ✅ Visible |
| Linked Item | `theory_ids` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `contradiction_id` — Unique ID for internal linking
- [x]  `contradiction_name` — Short name (e.g., “Merit vs Representation”)
- [x]  `contradiction_type` — Choose from dropdown: Ideological / Material / Political
- [x]  `root_structure` — Must link to a valid entry in the Structures sheet
- [x]  `contradiction_description` — Core explanation of the contradiction
- [x]  `status` — Active / Resolved / Dormant

### Optional Enhancers

- [ ]  `subtype`
- [ ]  `rupture_date`
- [ ]  `first_major_flashpoint_event_id`
- [ ]  `struggle_ids`
- [ ]  `linked_issues`
- [ ]  `contradiction_intensity`
- [ ]  `contradiction_priority`
- [ ]  `historical_motion`
- [ ]  `theory_ids`

### Recursion Constraints

- Cannot be submitted without a linked `root_structure`
- If `status = Resolved`, at least one `struggle_id` or `event_id` must be linked
- If `contradiction_intensity = High`, `historical_motion` is recommended
- If `contradiction_type = Ideological`, `theory_ids` is encouraged

### UI Logic

- Show `theory_ids` and `contradiction_priority` when type is Ideological
- Show `rupture_date`, `contradiction_intensity` for Material type
- Auto-suggest `first_major_flashpoint_event_id` based on recent Events
- Tag input for all linked fields

---

## ✊ Struggles Form

> 💡 struggle_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Captures organized historical efforts to resolve or escalate contradictions — protests, movements, campaigns, or legal battles that actively engage structural tension.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `struggle_id` | system slug | ❌ Auto-generated |
| Metadata | `form` | Dropdown | ✅ Visible |
| Metadata | `scale` | Dropdown | ✅ Visible |
| Metadata | `sector` | Dropdown | ✅ Visible |
| Metadata | `period` | Date range picker | ✅ Visible |
| Metadata | `current_status` | Dropdown | ✅ Visible |
| Description | `struggle_name` | Text input | ✅ Visible |
| Description | `struggle_description` | Long text | ✅ Visible |
| Description | `historical_development` | Long text (optional) | ✅ Visible |
| Description | `outcome` | Long text (optional) | ✅ Visible |
| Linked Item | `root_contradiction` | Linked dropdown | ✅ Visible |
| Linked Item | `event_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_issues` | Linked multi-select | ✅ Visible |
| Linked Item | `entity_ids` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `struggle_id`
- [x]  `struggle_name`
- [x]  `root_contradiction`
- [x]  `struggle_description`
- [x]  `form`
- [x]  `scale`
- [x]  `sector`
- [x]  `period`
- [x]  `current_status`

### Optional Enhancers

- [ ]  `event_ids`
- [ ]  `linked_issues`
- [ ]  `entity_ids`
- [ ]  `historical_development`
- [ ]  `outcome`

### Recursion Constraints

- Must link to `root_contradiction`
- If `current_status = Resolved`, require either `outcome` or one `event_id`
- If `scale = Statewide+`, at least one `entity_id` recommended
- Prompt for `linked_issues` if empty

### UI Logic

- Tag input for `entity_ids`, `event_ids`, `linked_issues`
- Timeline logic for `period` based on event range
- Contextual field behavior for form = Litigation

---

## ⚡ Events Form (ReportingForm)

> 💡 event_id, timeline_id, and item_category are auto-generated or prefilled — users do not need to input these fields manually.
> 

### Purpose

Captures rupture moments — when contradictions surface through action or crisis. Entry point into recursion.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `event_id` | system slug | ❌ Auto-generated |
| Metadata | `date` | Date picker | ✅ Visible |
| Metadata | `reporting_date` | Date picker (optional) | ✅ Visible |
| Metadata | `platform` | Text input (optional) | ✅ Visible |
| Metadata | `src_type` | Dropdown (optional) | ✅ Visible |
| Metadata | `source_link` | URL input (optional) | ✅ Visible |
| Metadata | `event_type_tag` | Tag selector (optional) | ✅ Visible |
| Metadata | `item_category` | "event" | ❌ Static value |
| Metadata | `event_motion` | Dropdown (optional) | ✅ Visible |
| Metadata | `event_relevance` | Dropdown (optional) | ✅ Visible |
| Metadata | `macro_micro` | Dropdown (optional) | ✅ Visible |
| Metadata | `historical_flag` | Checkbox (optional) | ✅ Visible |
| Metadata | `timeline_id` | based on date | ❌ Auto-suggested |
| Description | `event_title` | Text input | ✅ Visible |
| Description | `description` | Long text | ✅ Visible |
| Description | `multi_headline_view` | Long text (optional) | ✅ Visible |
| Description | `location` | Text input (optional) | ✅ Visible |
| Linked Item | `contradiction_id` | Linked dropdown | ✅ Visible |
| Linked Item | `struggle_id` | Linked dropdown | ✅ Visible |
| Linked Item | `issue_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `entity_ids` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `event_id`
- [x]  `event_title`
- [x]  `date`
- [x]  `description`
- [x]  `contradiction_id` (or `struggle_id`)

### Optional Enhancers

- [ ]  `multi_headline_view`
- [ ]  `reporting_date`
- [ ]  `location`
- [ ]  `platform`
- [ ]  `src_type`
- [ ]  `source_link`
- [ ]  `event_type_tag`
- [ ]  `item_category`
- [ ]  `issue_ids`
- [ ]  `entity_ids`
- [ ]  `struggle_id`
- [ ]  `event_motion`
- [ ]  `event_relevance`
- [ ]  `macro_micro`
- [ ]  `historical_flag`
- [ ]  `timeline_id`

### Recursion Constraints

- Must have either `contradiction_id` or `struggle_id`
- `event_motion = Transformed` → prompt `issue_ids` or `entity_ids`
- `historical_flag = true` → require `src_type` + `source_link`
- Macro events recommended to link to timeline

### UI Logic

- `src_type` tooltip hints
- Markdown in `multi_headline_view`
- Auto-suggest `timeline_id` from date
- Tag input for all linkables

---

## 🧭 Issues Form

> 💡 issue_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Public framing space where contradictions get named and debated. Site of ideological stances.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `issue_id` | system slug | ❌ Auto-generated |
| Metadata | `issue_timeline` | Date range picker | ✅ Visible |
| Metadata | `issue_status` | Dropdown | ✅ Visible |
| Description | `issue_title` | Text input | ✅ Visible |
| Description | `description` | Long text | ✅ Visible |
| Description | `stance_1_headlines` | Long text | ✅ Visible |
| Description | `stance_2_headlines` | Long text | ✅ Visible |
| Description | `stance_3_headlines` | Long text (optional) | ✅ Visible |
| Description | `stance_1_description` | Long text | ✅ Visible |
| Description | `stance_2_description` | Long text | ✅ Visible |
| Description | `stance_3_description` | Long text (optional) | ✅ Visible |
| Linked Item | `issue_event_id` | Linked dropdown | ✅ Visible |
| Linked Item | `contradiction_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `stance_1_events` | Linked multi-select | ✅ Visible |
| Linked Item | `stance_2_events` | Linked multi-select | ✅ Visible |
| Linked Item | `stance_3_events` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `issue_id`
- [x]  `issue_title`
- [x]  `issue_event_id`
- [x]  `contradiction_ids`
- [x]  `description`

### Optional Enhancers

- [ ]  `issue_timeline`
- [ ]  `issue_status`
- [ ]  `stance_1/2/3_headlines`
- [ ]  `stance_1/2/3_description`
- [ ]  `stance_1/2/3_events`

### Recursion Constraints

- Must link both `issue_event_id` and one `contradiction_id`
- `stance_description` requires `stance_headlines`
- `stance_1_events` > 2 → prompt `entity_ids`
- `issue_status = Resolving` → prompt for linked struggles

### UI Logic

- Collapsible stance blocks
- Markdown support for all text fields
- Optional stance 3 toggle

---

## 🧑‍🤝‍🧑 Entities Form

> 💡 entity_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Actors in history: movements, parties, collectives, individuals. They move contradictions.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `entity_id` | system slug | ❌ Auto-generated |
| Metadata | `entity_type` | Dropdown | ✅ Visible |
| Metadata | `ideological_category` | Dropdown | ✅ Visible |
| Metadata | `entity_stance_role` | Dropdown | ✅ Visible |
| Metadata | `active_period` | Date range picker | ✅ Visible |
| Description | `entity_name` | Text input | ✅ Visible |
| Description | `bio` | Long text | ✅ Visible |
| Description | `political_role` | Long text (optional) | ✅ Visible |
| Description | `stances_history` | Long text (optional) | ✅ Visible |
| Linked Item | `SPECTRUM` | Tag selector | ✅ Visible |
| Linked Item | `struggle_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_events` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_issues` | Linked multi-select | ✅ Visible |
| Linked Item | `relationship_ids` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `entity_id`
- [x]  `entity_name`
- [x]  `entity_type`
- [x]  `bio`
- [x]  `ideological_category`

### Optional Enhancers

- [ ]  `political_role`
- [ ]  `SPECTRUM`
- [ ]  `entity_stance_role`
- [ ]  `struggle_ids`
- [ ]  `linked_events`
- [ ]  `linked_issues`
- [ ]  `relationship_ids`
- [ ]  `stances_history`
- [ ]  `active_period`

### Recursion Constraints

- Must link to at least one: `linked_event`, `linked_issue`, or `struggle_id`
- `entity_stance_role = Agitator` or `Defender` → prompt for `issue_ids`
- `entity_type = Movement` → should link to `struggle_ids`

### UI Logic

- Multi-tag input for SPECTRUM, issues, events
- Markdown in `stances_history`
- If Ambedkarite, auto-suggest caste-linked contradictions

---

## 🧠 Theory Object Form

> 💡 theory_object_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Defines systems of ideology, identity, and thought — durable logic structures.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `theory_object_id` | system slug | ❌ Auto-generated |
| Metadata | `theory_object_type` | Dropdown | ✅ Visible |
| Metadata | `theory_entry_type` | Dropdown (optional) | ✅ Visible |
| Metadata | `category_origin` | Dropdown | ✅ Visible |
| Metadata | `ism_origin_type` | Dropdown (optional) | ✅ Visible |
| Metadata | `ism_function` | Dropdown (optional) | ✅ Visible |
| Metadata | `ideological_motion_status` | Dropdown (optional) | ✅ Visible |
| Metadata | `primary_domain` | Dropdown (optional) | ✅ Visible |
| Metadata | `validation_status` | Dropdown (optional) | ✅ Visible |
| Metadata | `political_spectrum` | Dropdown (optional) | ✅ Visible |
| Metadata | `publication_date` | Date picker (optional) | ✅ Visible |
| Description | `title` | Text input | ✅ Visible |
| Description | `abstract` | Long text | ✅ Visible |
| Description | `proposition` | Long text | ✅ Visible |
| Description | `author` | Text input (optional) | ✅ Visible |
| Description | `key_excerpts` | Long text (optional) | ✅ Visible |
| Linked Item | `tags` | Tag selector | ✅ Visible |
| Linked Item | `keywords` | Tag selector | ✅ Visible |
| Linked Item | `example_terms` | Tag selector (optional) | ✅ Visible |
| Linked Item | `contradiction_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `event_ids` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `theory_object_id`
- [x]  `title`
- [x]  `abstract`
- [x]  `proposition`
- [x]  `theory_object_type`
- [x]  `category_origin`

### Optional Enhancers

- [ ]  `theory_entry_type` — Dropdown: ism / identity / descriptor / category / concept
- [ ]  `ism_origin_type`
- [ ]  `ism_function`
- [ ]  `ideological_motion_status`
- [ ]  `primary_domain`
- [ ]  `tags`
- [ ]  `keywords`
- [ ]  `contradiction_ids`
- [ ]  `event_ids`
- [ ]  `validation_status`
- [ ]  `political_spectrum`
- [ ]  `author`
- [ ]  `publication_date`
- [ ]  `key_excerpts`
- [ ]  `example_terms`

### Recursion Constraints

- Must have at least one of: `contradiction_ids`, `event_ids`, or `keywords`
- If `validation_status = Validated`, suggest `event_ids`
- If `type = identity_frame`, require `category_origin`

### UI Logic

- Tag input for keywords, terms, tags
- Markdown for proposition and excerpts

---

## 💬 Theory Instance Form

> 💡 theory_instance_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Real-world expressions of ideology — tweets, posts, speeches, videos.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `theory_instance_id` | system slug | ❌ Auto-generated |
| Metadata | `origin_type` | Dropdown | ✅ Visible |
| Metadata | `content_object_type` | Dropdown | ✅ Visible |
| Metadata | `publication_date` | Date picker (optional) | ✅ Visible |
| Metadata | `src_type` | Dropdown (optional) | ✅ Visible |
| Metadata | `url` | URL input (optional) | ✅ Visible |
| Description | `title` | Text input | ✅ Visible |
| Description | `author` | Text input | ✅ Visible |
| Description | `message_text` | Long text | ✅ Visible |
| Description | `platform` | Text input (optional) | ✅ Visible |
| Linked Item | `origin_entity_id` | Linked dropdown | ✅ Visible |
| Linked Item | `linked_theory_object_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_contradiction_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_event_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_stance_ids` | Linked multi-select | ✅ Visible |
| Linked Item | `tags` | Tag selector (optional) | ✅ Visible |

### Required Fields

- [x]  `theory_instance_id`
- [x]  `title`
- [x]  `origin_type`
- [x]  `author`
- [x]  `content_object_type`
- [x]  `message_text`

### Optional Enhancers

- [ ]  `origin_entity_id`
- [ ]  `publication_date`
- [ ]  `platform`
- [ ]  `src_type`
- [ ]  `url`
- [ ]  `linked_theory_object_ids`
- [ ]  `linked_contradiction_ids`
- [ ]  `linked_event_ids`
- [ ]  `linked_stance_ids`
- [ ]  `tags`

### Recursion Constraints

- `origin_type = entity_produced` → must have `origin_entity_id`
- `linked_contradiction_ids` → prompt for `linked_theory_object_ids`
- `linked_event_ids` → suggest `src_type`, `platform`

### UI Logic

- Tag input for all links
- Character count for tweets
- Collapse URL unless needed

---

## 🏛️ Structures Form

> 💡 structure_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Enduring formations that produce contradiction: caste, state, kinship, market.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `structure_id` | system slug | ❌ Auto-generated |
| Metadata | `structure_type` | Dropdown | ✅ Visible |
| Metadata | `subtype` | Text input (optional) | ✅ Visible |
| Metadata | `historical_range` | Date range picker | ✅ Visible |
| Metadata | `confidence` | Dropdown (optional) | ✅ Visible |
| Description | `structure_name` | Text input | ✅ Visible |
| Description | `description` | Long text | ✅ Visible |
| Description | `structure_evolution` | Long text (optional) | ✅ Visible |
| Linked Item | `embedded_contradictions` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_struggles` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_entities` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `structure_id`
- [x]  `structure_name`
- [x]  `structure_type`
- [x]  `description`

### Optional Enhancers

- [ ]  `subtype`
- [ ]  `historical_range`
- [ ]  `embedded_contradictions`
- [ ]  `linked_struggles`
- [ ]  `linked_entities`
- [ ]  `structure_evolution`
- [ ]  `confidence`

### Recursion Constraints

- Contradictions must link to existing structures
- `structure_type = State` → prompt contradiction links
- 2+ linked struggles → suggest `structure_evolution`

### UI Logic

- Tag input for all links
- Tooltip on `confidence`
- Conditional fields based on structure_type

---

## 🔗 Relationships Form

> 💡 relationship_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Links between actors: alliances, co-optations, rivalries. Captures motion of actors in relation.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `relationship_id` | system slug | ❌ Auto-generated |
| Metadata | `relationship_type` | Dropdown | ✅ Visible |
| Metadata | `relationship_timeline` | Date range picker | ✅ Visible |
| Description | `contradiction_implication` | Long text (optional) | ✅ Visible |
| Description | `historical_context` | Long text (optional) | ✅ Visible |
| Linked Item | `entity_1` | Linked dropdown | ✅ Visible |
| Linked Item | `entity_2` | Linked dropdown | ✅ Visible |
| Linked Item | `struggle_id` | Linked dropdown | ✅ Visible |
| Linked Item | `linked_events` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `relationship_id`
- [x]  `entity_1`
- [x]  `entity_2`
- [x]  `relationship_type`
- [x]  `relationship_timeline`

### Optional Enhancers

- [ ]  `struggle_id`
- [ ]  `linked_events`
- [ ]  `contradiction_implication`
- [ ]  `historical_context`

### Recursion Constraints

- Must link to either `struggle_id` or at least one `linked_event`
- Co-optation or Merger → contradiction implication required
- Different ideology actors → prompt contradiction check

### UI Logic

- Timeline auto-fill from events
- Collapse `contradiction_implication` unless needed

---

## 🗂️ Timeline Registry Form

> 💡 phase_id is auto-generated based on the phase label — users do not need to input this field manually.
> 

### Purpose

Defines historical phases based on contradiction arcs.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `phase_id` | system slug | ❌ Auto-generated |
| Metadata | `date_range` | Date range picker | ✅ Visible |
| Metadata | `current_phase` | Toggle (boolean) | ✅ Visible |
| Description | `phase_label` | Text input | ✅ Visible |
| Description | `description` | Long text | ✅ Visible |
| Linked Item | `anchor_contradiction` | Linked dropdown | ✅ Visible |
| Linked Item | `linked_struggle` | Linked dropdown | ✅ Visible |
| Linked Item | `linked_events` | Linked multi-select | ✅ Visible |
| Linked Item | `linked_entities` | Linked multi-select | ✅ Visible |

### Required Fields

- [x]  `phase_id`
- [x]  `phase_label`
- [x]  `description`
- [x]  `anchor_contradiction`
- [x]  `date_range`

### Optional Enhancers

- [ ]  `linked_struggle`
- [ ]  `linked_events`
- [ ]  `linked_entities`
- [ ]  `current_phase`

### Recursion Constraints

- Must link to `anchor_contradiction`
- `linked_struggle` → should appear in linked events
- Only one `current_phase = true` allowed

### UI Logic

- Autocomplete timeline from event dates
- Exclusive toggle for `current_phase`

---

## 🔳 Timeline Grid Form

> 💡 timeline_grid_id is auto-generated — users do not need to input this field manually.
> 

### Purpose

Zoomable UI layer. Places elements into phases and zoom levels.

### Field Visibility

| Field Type | Field | Input Type | Visibility |
| --- | --- | --- | --- |
| Metadata | `timeline_grid_id` | system slug | ❌ Auto-generated |
| Metadata | `zoom_level` | Dropdown | ✅ Visible |
| Metadata | `weight` | Integer input (optional) | ✅ Visible |
| Metadata | `color_tag` | Tag selector (optional) | ✅ Visible |
| Description | `label` | Text input | ✅ Visible |
| Description | `notes` | Long text (optional) | ✅ Visible |
| Linked Item | `linked_phase_id` | Linked dropdown | ✅ Visible |
| Linked Item | `linked_item_id` | Linked dropdown | ✅ Visible |

### Required Fields

- [x]  `timeline_grid_id`
- [x]  `linked_phase_id`
- [x]  `zoom_level`
- [x]  `linked_item_id`
- [x]  `label`

### Optional Enhancers

- [ ]  `notes`
- [ ]  `weight`
- [ ]  `color_tag`

### Recursion Constraints

- `linked_item_id` must match `zoom_level`
- Must fall inside `linked_phase_id` date range
- Flag multiple `Contradiction` entries per phase

### UI Logic

- Grid preview
- Tag selector for color
- Sortable via weight

---