import { STRUCTURE_TYPES, CONTRADICTION_TYPES, STRUGGLE_TYPES } from '../lib/taxonomy';

/**
 * Returns subtypes for a given type from the taxonomy.
 * @param {string} type - The high-level type (e.g. "Caste-Based Contradictions")
 * @param {string} dialectic - "structure", "contradiction", or "struggle"
 */
export function getSubtypes(type, dialectic) {
  switch (dialectic) {
    case 'structure':
      return STRUCTURE_TYPES[type] ? Object.keys(STRUCTURE_TYPES[type]) : [];
    case 'contradiction':
      return CONTRADICTION_TYPES[type] ? Object.keys(CONTRADICTION_TYPES[type]) : [];
    case 'struggle':
      return STRUGGLE_TYPES[type] ? Object.keys(STRUGGLE_TYPES[type]) : [];
    default:
      return [];
  }
}

/**
 * Returns sub-subtypes for a given type + subtype combo.
 * @param {string} type - Top-level type
 * @param {string} subtype - Mid-level subtype
 * @param {string} dialectic - "structure", "contradiction", or "struggle"
 */
export function getSubsubtypes(type, subtype, dialectic) {
  let source;
  if (dialectic === 'structure') source = STRUCTURE_TYPES;
  if (dialectic === 'contradiction') source = CONTRADICTION_TYPES;
  if (dialectic === 'struggle') source = STRUGGLE_TYPES;

  return source?.[type]?.[subtype] || [];
}

/**
 * Returns all top-level types for a given dialectical category.
 * e.g. ["Caste-Based Contradictions", "State vs Market Contradictions"]
 */
export function getAllTopLevelTypes(dialectic) {
  switch (dialectic) {
    case 'structure':
      return Object.keys(STRUCTURE_TYPES);
    case 'contradiction':
      return Object.keys(CONTRADICTION_TYPES);
    case 'struggle':
      return Object.keys(STRUGGLE_TYPES);
    default:
      return [];
  }
}

export const formConfigs = {
  EVENTS: {
    fields: {
      event_id: { label: 'Event ID', type: 'text', required: true, auto: true },
      event_title: { label: 'Event Title', type: 'text', required: true },
      multi_headline_view: { label: 'Multi Headline View', type: 'textarea' },
      date: { label: 'Date', type: 'date', required: true },
      reporting_date: { label: 'Reporting Date', type: 'date' },
      location: { label: 'Location', type: 'text', required: true },
      platform: { label: 'Platform', type: 'text' },
      src_type: { label: 'Source Type', type: 'select', options: ['Testimonial', 'Archival', 'Investigative', 'Official'] },
      source_link: { label: 'Source Link', type: 'url' },
      description: { label: 'Description', type: 'textarea', required: true },
      item_category: { label: 'Item Category', type: 'select', options: ['Event'], required: true },
      event_type_tag: { label: 'Event Type Tag', type: 'tags' },
      contradiction_id: { label: 'Contradiction ID', type: 'linked', linkedSheet: 'CONTRADICTIONS' },
      issue_ids: { label: 'Issue IDs', type: 'linked', linkedSheet: 'ISSUES', multiple: true },
      entity_ids: { label: 'Entity IDs', type: 'linked', linkedSheet: 'ENTITIES', multiple: true },
      struggle_id: { label: 'Struggle ID', type: 'linked', linkedSheet: 'STRUGGLES' },
      event_motion: { label: 'Event Motion', type: 'select', options: ['Sharpened', 'Neutralized', 'Transformed'] },
      event_relevance: { label: 'Event Relevance', type: 'select', options: ['Long-Term', 'Short-Term'] },
      macro_micro: { label: 'Macro/Micro', type: 'select', options: ['Macro', 'Micro'] },
      historical_flag: { label: 'Historical Flag', type: 'boolean' },
      timeline_id: { label: 'Timeline ID', type: 'linked', linkedSheet: 'TIMELINES' },
    },
  },
  ISSUES: {
    fields: {
      issue_id: { label: 'Issue ID', type: 'text', required: true, auto: true },
      issue_title: { label: 'Issue Title', type: 'text', required: true },
      issue_event_id: { label: 'Issue Event ID', type: 'linked', linkedSheet: 'EVENTS' },
      contradiction_ids: { label: 'Contradiction IDs', type: 'linked', linkedSheet: 'CONTRADICTIONS', multiple: true },
      description: { label: 'Description', type: 'textarea' },
      issue_timeline: { label: 'Issue Timeline', type: 'dateRange' },
      issue_status: { label: 'Issue Status', type: 'select', options: ['Developing', 'Peaking', 'Resolving'] },
      stance_1_headlines: { label: 'Stance 1 Headlines', type: 'textarea' },
      stance_2_headlines: { label: 'Stance 2 Headlines', type: 'textarea' },
      stance_3_headlines: { label: 'Stance 3 Headlines', type: 'textarea' },
      stance_1_description: { label: 'Stance 1 Description', type: 'textarea' },
      stance_2_description: { label: 'Stance 2 Description', type: 'textarea' },
      stance_3_description: { label: 'Stance 3 Description', type: 'textarea' },
      stance_1_events: { label: 'Stance 1 Events', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      stance_2_events: { label: 'Stance 2 Events', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      stance_3_events: { label: 'Stance 3 Events', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
    },
  },
  STRUGGLES: {
    fields: {
      struggle_id: { label: 'Struggle ID', type: 'text', required: true, auto: true },
      struggle_name: { label: 'Struggle Name', type: 'text', required: true },
      root_contradiction: { label: 'Root Contradiction', type: 'linked', linkedSheet: 'CONTRADICTIONS' },
      struggle_description: { label: 'Struggle Description', type: 'textarea' },
      event_ids: { label: 'Event IDs', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      linked_issues: { label: 'Linked Issues', type: 'linked', linkedSheet: 'ISSUES', multiple: true },
      entity_ids: { label: 'Entity IDs', type: 'linked', linkedSheet: 'ENTITIES', multiple: true },
      form: { label: 'Form', type: 'select', options: ['Protest', 'Litigation', 'Cultural'] },
      scale: { label: 'Scale', type: 'select', options: ['Local', 'Regional', 'Statewide', 'National'] },
      sector: { label: 'Sector', type: 'select', options: ['Land', 'Law', 'Language'] },
      historical_development: { label: 'Historical Development', type: 'textarea' },
      period: { label: 'Period', type: 'dateRange' },
      current_status: { label: 'Current Status', type: 'select', options: ['Ongoing', 'Dormant', 'Resolved'] },
      outcome: { label: 'Outcome', type: 'textarea' },
    },
  },
  CONTRADICTIONS: {
    fields: {
      contradiction_id: { label: 'Contradiction ID', type: 'text', required: true, auto: true },
      contradiction_name: { label: 'Contradiction Name', type: 'text', required: true },
      contradiction_type: { label: 'Contradiction Type', type: 'select', options: ['Ideological', 'Material', 'Political'] },
      subtype: { label: 'Subtype', type: 'select', options: [] }, // Add options dynamically if needed
      root_structure: { label: 'Root Structure', type: 'linked', linkedSheet: 'STRUCTURES' },
      contradiction_description: { label: 'Contradiction Description', type: 'textarea' },
      rupture_date: { label: 'Rupture Date', type: 'date' },
      first_major_flashpoint_event_id: { label: 'First Major Flashpoint Event ID', type: 'linked', linkedSheet: 'EVENTS' },
      struggle_ids: { label: 'Struggle IDs', type: 'linked', linkedSheet: 'STRUGGLES', multiple: true },
      linked_issues: { label: 'Linked Issues', type: 'linked', linkedSheet: 'ISSUES', multiple: true },
      contradiction_intensity: { label: 'Contradiction Intensity', type: 'select', options: ['Low', 'Medium', 'High'] },
      contradiction_priority: { label: 'Contradiction Priority', type: 'select', options: ['Peripheral', 'Secondary', 'Core'] },
      historical_motion: { label: 'Historical Motion', type: 'textarea' },
      status: { label: 'Status', type: 'select', options: ['Active', 'Resolved', 'Dormant'] },
      theory_ids: { label: 'Theory IDs', type: 'linked', linkedSheet: 'THEORY_OBJECTS', multiple: true },
    },
  },
  ENTITIES: {
    fields: {
      entity_id: { label: 'Entity ID', type: 'text', required: true, auto: true },
      entity_name: { label: 'Entity Name', type: 'text', required: true },
      entity_type: { label: 'Entity Type', type: 'select', options: ['Movement', 'Party', 'State Org', 'Media', 'NGO'] },
      bio: { label: 'Bio', type: 'textarea' },
      political_role: { label: 'Political Role', type: 'textarea' },
      ideological_category: { label: 'Ideological Category', type: 'select', options: ['Ambedkarite', 'Hindutva', 'ML', 'Liberal'] },
      SPECTRUM: { label: 'Spectrum', type: 'tags' },
      entity_stance_role: { label: 'Entity Stance Role', type: 'select', options: ['Agitator', 'Defender', 'Target', 'Victim'] },
      struggle_ids: { label: 'Struggle IDs', type: 'linked', linkedSheet: 'STRUGGLES', multiple: true },
      linked_events: { label: 'Linked Events', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      linked_issues: { label: 'Linked Issues', type: 'linked', linkedSheet: 'ISSUES', multiple: true },
      relationship_ids: { label: 'Relationship IDs', type: 'linked', linkedSheet: 'RELATIONSHIPS', multiple: true },
      stances_history: { label: 'Stances History', type: 'textarea' },
      active_period: { label: 'Active Period', type: 'dateRange' },
    },
  },
  THEORY_OBJECTS: {
    fields: {
      theory_object_id: { label: 'Theory Object ID', type: 'text', required: true, auto: true },
      title: { label: 'Title', type: 'text', required: true },
      abstract: { label: 'Abstract', type: 'textarea' },
      proposition: { label: 'Proposition', type: 'textarea' },
      theory_object_type: { label: 'Theory Object Type', type: 'select', options: ['ideological_system', 'concept', 'identity_frame', 'descriptor'] },
      theory_entry_type: { label: 'Theory Entry Type', type: 'select', options: ['ism', 'identity', 'descriptor'] },
      category_origin: { label: 'Category Origin', type: 'select', options: ['caste', 'capital', 'gender', 'religion'] },
      ism_origin_type: { label: 'ISM Origin Type', type: 'select', options: [] }, // Add options dynamically if needed
      ism_function: { label: 'ISM Function', type: 'select', options: ['Dominant', 'Counter', 'Transitional', 'Assimilated'] },
      ideological_motion_status: { label: 'Ideological Motion Status', type: 'select', options: ['Emerging', 'Active', 'Declining'] },
      primary_domain: { label: 'Primary Domain', type: 'select', options: ['Political', 'Cultural', 'Economic', 'Legal'] },
      tags: { label: 'Tags', type: 'tags' },
      keywords: { label: 'Keywords', type: 'tags' },
      contradiction_ids: { label: 'Contradiction IDs', type: 'linked', linkedSheet: 'CONTRADICTIONS', multiple: true },
      event_ids: { label: 'Event IDs', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      validation_status: { label: 'Validation Status', type: 'select', options: ['Validated', 'Contested', 'Refuted'] },
      political_spectrum: { label: 'Political Spectrum', type: 'select', options: ['Ambedkarite', 'Marxist', 'Liberal'] },
      author: { label: 'Author', type: 'text' },
      publication_date: { label: 'Publication Date', type: 'date' },
      key_excerpts: { label: 'Key Excerpts', type: 'textarea' },
      example_terms: { label: 'Example Terms', type: 'tags' },
    },
  },
  THEORY_INSTANCES: {
    fields: {
      theory_instance_id: { label: 'Theory Instance ID', type: 'text', required: true, auto: true },
      title: { label: 'Title', type: 'text', required: true },
      origin_type: { label: 'Origin Type', type: 'select', options: ['entity_produced', 'independent_theory', 'media_analysis'] },
      origin_entity_id: { label: 'Origin Entity ID', type: 'linked', linkedSheet: 'ENTITIES' },
      author: { label: 'Author', type: 'text' },
      publication_date: { label: 'Publication Date', type: 'date' },
      content_object_type: { label: 'Content Object Type', type: 'select', options: ['Tweet', 'IG Post', 'YouTube Video', 'Speech', 'Essay'] },
      platform: { label: 'Platform', type: 'text' },
      src_type: { label: 'Source Type', type: 'select', options: ['Social Media', 'Editorial', 'Academic'] },
      message_text: { label: 'Message Text', type: 'textarea' },
      url: { label: 'URL', type: 'url' },
      linked_theory_object_ids: { label: 'Linked Theory Object IDs', type: 'linked', linkedSheet: 'THEORY_OBJECTS', multiple: true },
      linked_contradiction_ids: { label: 'Linked Contradiction IDs', type: 'linked', linkedSheet: 'CONTRADICTIONS', multiple: true },
      linked_event_ids: { label: 'Linked Event IDs', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      linked_stance_ids: { label: 'Linked Stance IDs', type: 'linked', linkedSheet: 'ISSUES', multiple: true },
      tags: { label: 'Tags', type: 'tags' },
    },
  },
  STRUCTURES: {
    fields: {
      structure_id: { label: 'Structure ID', type: 'text', required: true, auto: true },
      structure_name: { label: 'Structure Name', type: 'text', required: true },
      structure_type: { label: 'Structure Type', type: 'select', options: ['State', 'Caste', 'Kinship', 'Market'] },
      subtype: { label: 'Subtype', type: 'text' },
      description: { label: 'Description', type: 'textarea' },
      historical_range: { label: 'Historical Range', type: 'dateRange' },
      embedded_contradictions: { label: 'Embedded Contradictions', type: 'linked', linkedSheet: 'CONTRADICTIONS', multiple: true },
      linked_struggles: { label: 'Linked Struggles', type: 'linked', linkedSheet: 'STRUGGLES', multiple: true },
      linked_entities: { label: 'Linked Entities', type: 'linked', linkedSheet: 'ENTITIES', multiple: true },
      structure_evolution: { label: 'Structure Evolution', type: 'textarea' },
      confidence: { label: 'Confidence', type: 'select', options: ['High', 'Medium', 'Low'] },
    },
  },
  RELATIONSHIPS: {
    fields: {
      relationship_id: { label: 'Relationship ID', type: 'text', required: true, auto: true },
      entity_1: { label: 'Entity 1', type: 'linked', linkedSheet: 'ENTITIES' },
      entity_2: { label: 'Entity 2', type: 'linked', linkedSheet: 'ENTITIES' },
      relationship_type: { label: 'Relationship Type', type: 'select', options: ['Alliance', 'Rivalry', 'Co-optation'] },
      struggle_id: { label: 'Struggle ID', type: 'linked', linkedSheet: 'STRUGGLES' },
      linked_events: { label: 'Linked Events', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      contradiction_implication: { label: 'Contradiction Implication', type: 'textarea' },
      relationship_timeline: { label: 'Relationship Timeline', type: 'dateRange' },
      historical_context: { label: 'Historical Context', type: 'textarea' },
    },
  },
  TIMELINE_REGISTRY: {
    fields: {
      phase_id: { label: 'Phase ID', type: 'text', required: true, auto: true },
      phase_label: { label: 'Phase Label', type: 'text', required: true },
      description: { label: 'Description', type: 'textarea' },
      anchor_contradiction: { label: 'Anchor Contradiction', type: 'linked', linkedSheet: 'CONTRADICTIONS' },
      linked_struggle: { label: 'Linked Struggle', type: 'linked', linkedSheet: 'STRUGGLES' },
      linked_events: { label: 'Linked Events', type: 'linked', linkedSheet: 'EVENTS', multiple: true },
      linked_entities: { label: 'Linked Entities', type: 'linked', linkedSheet: 'ENTITIES', multiple: true },
      date_range: { label: 'Date Range', type: 'dateRange' },
      current_phase: { label: 'Current Phase', type: 'boolean' },
    },
  },
  TIMELINE_GRID: {
    fields: {
      timeline_grid_id: { label: 'Timeline Grid ID', type: 'text', required: true, auto: true },
      linked_phase_id: { label: 'Linked Phase ID', type: 'linked', linkedSheet: 'TIMELINE_REGISTRY' },
      zoom_level: { label: 'Zoom Level', type: 'select', options: ['Event', 'Issue', 'Struggle', 'Contradiction'] },
      linked_item_id: { label: 'Linked Item ID', type: 'linked', linkedSheet: 'EVENTS' }, // Adjust linkedSheet dynamically
      label: { label: 'Label', type: 'text' },
      notes: { label: 'Notes', type: 'textarea' },
      weight: { label: 'Weight', type: 'number' },
      color_tag: { label: 'Color Tag', type: 'tags' },
    },
  },
  TIMELINES: {
    fields: {
      timeline_id: { label: 'Timeline ID', type: 'text', required: true, auto: true },
      title: { label: 'Title', type: 'text', required: true },
      description: { label: 'Description', type: 'textarea', required: true },
      linked_phases: { label: 'Linked Phases', type: 'linked', linkedSheet: 'TIMELINE_REGISTRY', multiple: true },
      linked_grid_rows: { label: 'Linked Grid Rows', type: 'linked', linkedSheet: 'TIMELINE_GRID', multiple: true },
      category: { label: 'Category', type: 'select', options: ['Historical', 'Current'], required: true },
      is_public: { label: 'Is Public', type: 'boolean', required: true },
    },
  },
};