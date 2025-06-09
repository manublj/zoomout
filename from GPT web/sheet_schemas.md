## 🔹 1.1 Timelines Sheet

| Field | Type | Description |
|-------|------|-------------|
| timeline_id | String | Unique identifier for the timeline. |
| title | String | Name of the timeline arc. |
| description | Long Text | Overview including thematic or historical scope. |
| linked_phases | Linked Field | List of phase_ids from Timeline Registry. |
| linked_grid_rows | Auto-Generated | Pulled from linked_phase_id entries in Timeline Grid Sheet. |
| category | Dropdown | e.g., historical_arc, thematic_sequence. |
| is_public | Boolean | Visibility in frontend. |
| contradiction_id | Linked Field | Contradiction this timeline belongs to. |
| structure_ids | Linked Field | Base/superstructural systems involved. |
| event_ids | Linked Field | All events in the timeline. |
| period_range | Date Range | Time span of the timeline. |
| core_theme | Dropdown | Central theme or question. |
| flashpoints | Linked Field | Key turning points (events). |
| status | Dropdown | Active, closed, evolving. |
| timeline_type | Dropdown | e.g., Legislative Timeline, Protest Timeline. |
| narrative_ids | Linked Field | Narratives generated or split. |

## 🔹 1.2 Timeline Registry Sheet

| Field | Type | Description |
|-------|------|-------------|
| phase_id | String | Unique ID. |
| phase_label | String | Title of the phase. |
| date_range | Date Range | Start and end. |
| temporal_phase | Date Range | Time period or era. |
| current_phase | Boolean | Whether active. |
| description | Long Text | Defines phase's contradictions and context. |
| cluster_theme | Dropdown | Central idea captured. |
| timeline_cluster_title | String | Narrative-level cluster name. |
| timeline_ids | Linked Field | All timelines in this cluster. |
| anchor_contradiction | Linked Field | Central contradiction. |
| linked_struggles | Linked Field | Core struggles. |
| linked_events | Linked Field | Key events. |
| structure_ids | Linked Field | Affected structures. |
| linked_entities | Linked Field | Key actors. |
| narrative_ids | Linked Field | Narratives emerging. |
| rupture_rating | Dropdown | High, Medium, Low. |

## 🔹 1.3 Timeline Grid Sheet

| Field | Type | Description |
|-------|------|-------------|
| timeline_grid_id | String | Unique block ID. |
| linked_phase_id | Linked Field | Phase this belongs to. |
| zoom_level | Dropdown | Event / Issue / Struggle / Contradiction. |
| linked_item_id | Linked Field | The zoom-level element. |
| label | String | Display name. |
| notes | Long Text | Internal notes. |
| weight | Integer | Rendering priority. |
| color_tag | Tag | Color mapping. |
| contradiction_id | Linked Field | Linked contradiction. |
| domain | Dropdown | e.g., Education, Judiciary. |
| period | Date Range | Time block. |
| key_events | Linked Field | Major events. |
| narrative_drift | Linked Field | Narrative changes. |
| structure_ids | Linked Field | Structural shifts. |
| emergent_forces | Linked Field | New forces. |
| suppression_forces | Linked Field | Co-opting or pushback forces. |

- 🔹 2. Structures Sheet
    
    
    | Field | Type | Notes |
    | --- | --- | --- |
    | `structure_id` | String | Unique identifier. |
    | `structure_name` | String | Name of the structure (e.g., Indian Bureaucracy). |
    | `region` | Dropdown (Single Select) | states in India (ex. Tamil Nadu, Kerala, Karnataka .etc) |
    | `parent_structure` | Dropdown (Single Select) | ‘subtype’ field from master taxonomy tables |
    | `category` | Dropdown (Single Select) | Economic / Political / Social / Cultural  |
    | `lifespan` | Dropdown (Single Select) | Ancient / Colonial / Post-Independence / Ongoing |
    | `transformation_status` | Dropdown (Single Select) | Active / Transforming / Dormant |
    | `structure_type` | Dropdown (Single Select) | Tells you the *macro-zone* (economic, social, political, etc.) — values: `Base`, `Social Superstructure`, `Political Superstructure`, `Legal-Judicial Superstructure`, `Religious Superstructure`, `Informational Superstructure`.  (Instead of current messy `structure_type`.) |
    | `subtype` | Multi-Select Dropdown | Tell you the *broad themes*. — choose multiple: `Caste`, `Capital`, `Labor`, `Land`, `Welfare`, `Law`, `Religion`, `Patriarchy / Gender`, `Bureaucracy`, `Surveillance / Tech`, `Education`, `Media / Narrative`, `Federalism`, `Environment / Extraction`. |
    | `timeline_registry_ids` | Linked Field | Llinking structures to timeline_registry lets you trace their motion across contradictions and historical periods. |
    | `structure_description` | Long Text | Structural function and history. |
    | `historical_range` | Date Range | Period it was active. |
    | `structure_evolution` | Long Text | How structure evolved over time |
    | `embedded_contradictions` | Linked Field | Contradictions that emerge from this structure. |
    | `linked_struggles` | Linked Field | Struggles shaped by or against this structure. |
    | `issue_ids` | Linked Field | Linking to issues exposes what contradictions arise within the structure. |
    | `linked_entities` | Linked Field | Entities upholding or opposing this structure. |
    | `structure_evolution` | Long Text | How it changed, resisted change, or got reformed. |
    | `confidence` | Dropdown | High / Medium / Low + source context. |
    | `narrative(s)_shaped_by_structure` | Linked Field | Captures how particular structures (e.g., economic, political, social) shape or reinforce certain narratives. This can track the interplay between macro-level structures and narratives. |

## 🔹 3. Contradictions Sheet

| Field | Type | Description |
|-------|------|-------------|
| contradiction_id | String | Unique ID. |
| contradiction_name | String | Name or shorthand. |
| contradiction_cluster | Dropdown | e.g., Capital vs Labor. |
| contradiction_type | Dropdown | Ideological / Material / Political. |
| subtype | Dropdown | Optional refinement. |
| primary_domain | Dropdown | Societal sector. |
| root_structure | Linked Field | Origin structure. |
| category_of_root_structure | Dropdown | Structure type. |
| dominant_side | Linked Field | Dominant actor. |
| dominated_side | Linked Field | Dominated actor. |
| contradiction_description | Long Text | Detailed explanation. |
| rupture_date | Date | First rupture. |
| first_major_flashpoint_event_id | Linked Field | Key event. |
| timeline_ids | Linked Field | Relevant timelines. |
| timeline_registry_ids | Linked Field | Historical phases. |
| struggle_ids | Linked Field | Related struggles. |
| linked_issues | Linked Field | Issues manifesting contradiction. |
| entity_ids | Linked Field | Enacting entities. |
| contradiction_intensity | Dropdown | Low / Medium / High. |
| contradiction_priority | Dropdown | Peripheral / Secondary / Core. |
| historical_motion | Long Text | Narrative arc. |
| status | Dropdown | Active / Resolved / Dormant. |
| theory_ids | Linked Field | Theories involved. |
| timeline_relevance | Linked Field | Timeline-based relevance. |
| narrative(s)_highlighted_by_contradiction | Linked Field | Related narratives. |

## 🔹 4. Struggles Sheet

| Field | Type | Description |
|-------|------|-------------|
| struggle_id | String | Unique ID. |
| struggle_name | String | Campaign name. |
| struggle_type | Dropdown | Electoral, Legal, etc. |
| subtype | Dropdown | Specific struggle form. |
| struggle_description | Long Text | Analytical framing. |
| active_range | Date Range | Active duration. |
| parent_structure | Linked Field | Parent structural domain. |
| primary_terrain | Dropdown | Domain (e.g., Caste). |
| root_contradiction | Linked Field | Related contradiction. |
| linked_contradictions | Linked Field | Related contradictions. |
| linked_structures | Linked Field | Involved structures. |
| linked_entities | Linked Field | Involved actors. |
| linked_events | Linked Field | Related events. |
| linked_issues | Linked Field | Issues at stake. |
| flashpoints | Linked Field | Intense moments. |
| form | Dropdown | Protest, Litigation, etc. |
| scale | Dropdown | Local to National. |
| sector | Dropdown | Land / Law / etc. |
| historical_development | Long Text | Evolution over time. |
| period | Date Range | Duration. |
| current_status | Dropdown | Ongoing / Resolved. |
| outcome | Long Text | Results. |
| narrative(s)_shaping_struggle | Linked Field | Shaping narratives. |

## 🔹 5. Events Sheet

| Field | Type | Description |
|-------|------|-------------|
| event_id | String | Unique ID. |
| event_title | String | Summary title. |
| multi_headline_view | Long Text | Different ideological framings. |
| date | Date | Date of occurrence. |
| reporting_date | Date | Coverage date. |
| location | String | Place. |
| platform | String | Source platform. |
| src_type | Dropdown | Source type. |
| source_link | URL | Link to source. |
| description | Long Text | Event summary. |
| item_category | Dropdown | Defaults to 'event'. |
| event_type_tag | Tag | Type tag (e.g., Protest). |
| structure_ids | Linked Field | Related structures. |
| contradiction_id | Linked Field | Linked contradiction. |
| issue_ids | Linked Field | Related issues. |
| entity_ids | Linked Field | Involved entities. |
| struggle_id | Linked Field | Linked struggle. |
| event_motion | Dropdown | Sharpened / Neutralized. |
| event_relevance | Dropdown | Long-Term / Short-Term. |
| macro_micro | Dropdown | Structural or incident-level. |
| historical_flag | Boolean | Validated historically. |
| linked_timeline_id | Linked Field | Parent timeline. |
| narrative(s)_framed_by_event | Linked Field | Ideological framings. |

## 🔹 6. Entities Sheet

| Field | Type | Description |
|-------|------|-------------|
| entity_id | String | Unique ID. |
| entity_name | String | Actor or organization name. |
| entity_type | Dropdown | e.g., Party, Movement. |
| bio | Long Text | Brief description. |
| political_role | Long Text | Relation to contradiction. |
| ideological_category | Dropdown | e.g., Ambedkarite. |
| SPECTRUM | Tag | Ideological axis. |
| entity_stance_role | Dropdown | Agitator / Defender etc. |
| contradiction_ids | Linked Field | Related contradictions. |
| struggle_ids | Linked Field | Related struggles. |
| linked_events | Linked Field | Events involving this entity. |
| linked_issues | Linked Field | Public stances. |
| relationship_ids | Linked Field | Links to other entities. |
| stances_history | Long Text | Ideological evolution. |
| active_period | Date Range | Active years. |

## 🔹 7. Issues Sheet

| Field | Type | Description |
|-------|------|-------------|
| issue_id | String | Unique ID. |
| issue_title | String | Name of the issue. |
| issue_event_id | Linked Field | Foundational event. |
| contradiction_ids | Linked Field | Linked contradictions. |
| linked_struggles | Linked Field | Relevant struggles. |
| description | Long Text | Ideological framing. |
| issue_timeline | Date Range | Visibility period. |
| issue_status | Dropdown | Developing / Peaking. |
| stance_1/2/3_headlines | Long Text | Representative headlines. |
| stance_1/2/3_description | Long Text | Ideological descriptions. |
| stance_1/2/3_events | Linked Field | Supporting events. |
| narrative(s)_linked | Linked Field | Shaping narratives. |

## 🔹 8.1 Theory Object Sheet

| Field | Type | Description |
|-------|------|-------------|
| theory_object_id | String | Unique ID. |
| title | String | Name of ideology/concept. |
| abstract | Long Text | Summary. |
| proposition | Long Text | Core claim. |
| theory_object_type | Dropdown | ideological_system, concept, etc. |
| theory_entry_type | Dropdown | ism, descriptor, identity. |
| category_origin | Dropdown | caste, capital, gender, etc. |
| ism_origin_type | Dropdown | For ideological systems. |
| ism_function | Dropdown | Dominant, Counter. |
| ideological_motion_status | Dropdown | Emerging, Active, Declining. |
| primary_domain | Dropdown | Political, Cultural, Legal. |
| tags | Tag List | Classifiers. |
| keywords | Tag List | Associated ideas. |
| contradiction_ids | Linked Field | Engaged contradictions. |
| event_ids | Linked Field | Validating events. |
| validation_status | Dropdown | Validated, Contested. |
| political_spectrum | Dropdown | Ideological category. |
| author | String | Thinker or movement. |
| publication_date | Date | When emerged. |
| key_excerpts | Long Text | Quotes, slogans. |
| example_terms | Tag List | Aliases or related terms. |

## 🔹 8.2 Theory Instance Sheet

| Field | Type | Description |
|-------|------|-------------|
| theory_instance_id | String | Unique ID. |
| title | String | Label or summary. |
| origin_type | Dropdown | entity_produced, independent_theory. |
| origin_entity_id | Linked Field | Producing entity. |
| author | String | Author or speaker. |
| publication_date | Date | Release date. |
| content_object_type | Dropdown | Tweet, Speech, etc. |
| platform | String | Twitter, YouTube, etc. |
| src_type | Dropdown | Social Media, Academic. |
| message_text | Long Text | Transcript or caption. |
| url | URL | Link to content. |
| linked_theory_object_ids | Linked Field | Expressed theory. |
| linked_contradiction_ids | Linked Field | Engaged contradictions. |
| linked_event_ids | Linked Field | Responsive events. |
| linked_stance_ids | Linked Field | Positions on issues. |
| tags | Tag List | Framing keywords. |
| narrative(s)_represented | Linked Field | Discussed narratives. |

---

## 🔗 10. Sheet Linkage Summary

| Sheet Name | Linked Sheets | Key Linking Fields | Why These Links Exist |
|------------|---------------|--------------------|------------------------|
| Structures | Contradictions, Events, Struggles, Issues, Timeline Registry | root_structure, structure_ids, parent_structure | Structures generate contradictions, shape events and struggles, and persist across phases. |
| Contradictions | Struggles, Events, Issues, Entities, Theory Objects, Timelines, Timeline Registry | linked_contradictions, contradiction_id, contradiction_ids, entity_ids, theory_ids, timeline_ids, timeline_registry_ids | Contradictions animate all motion and are interpreted, surfaced, and fought over. |
| Struggles | Events, Issues, Entities, Timeline Registry | struggle_id, linked_issues, entity_ids, linked_struggles | Struggles express contradictions via events, are composed of issues, and involve actors. |
| Events | Issues, Entities, Theory Instances, Timelines, Structures, Relationships | issue_event_id, entity_ids, linked_event_ids, linked_timeline_id, structure_ids | Events surface contradictions, trigger issues, involve entities, and are framed ideologically. |
| Issues | Struggles, Entities, Theory Instances | linked_struggles, linked_issues, linked_stance_ids | Issues form the terrain of struggle and debate, and are shaped by ideology and actors. |
| Entities | Events, Issues, Struggles, Relationships, Contradictions, Theory Instances | linked_events, linked_issues, struggle_ids, contradiction_ids, origin_entity_id | Entities enact and respond to contradiction, participate in events and theory. |
| Theory Objects | Contradictions, Theory Instances, Events | theory_ids, linked_theory_object_ids, event_ids | Theory explains contradiction and is surfaced via events and discourse. |
| Theory Instances | Theory Objects, Events, Issues, Narratives | linked_theory_object_ids, linked_event_ids, linked_stance_ids, narrative(s)_represented | Theory is expressed through content and connects to rupture and stance. |
| Timelines | Events, Timeline Registry, Timeline Grid | linked_timeline_id, linked_phases, timeline_id | Timelines group events into arcs and organize phases of contradiction motion. |
| Timeline Registry | Structures, Contradictions, Struggles, Events | structure_ids, anchor_contradiction, linked_struggles, linked_events | Registry bundles contradiction-driven arcs into historical phases. |
| Timeline Grid | Events, Issues, Struggles, Timeline Registry | linked_item_id, linked_phase_id | Grid visualizes timeline motion at multiple zoom levels. |
| Relationships | Entities, Events | entity_1 / entity_2, linked_events | Captures relational structure (alliance, opposition, etc.) between actors. |
