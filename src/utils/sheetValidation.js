import Joi from 'joi';
import { formConfigs } from './formUtils';
import { validateDynamicForm } from './validation';

export const eventValidationSchema = Joi.object({
  event_id: Joi.string().required(),
  headline: Joi.string().required(),
  event_date: Joi.date().required(),
  location: Joi.string().allow(''), // Changed from .allow([])
  contradiction_id: Joi.string().required(),
  // Fix array validation
  struggle_id: Joi.array().items(Joi.string()).single(), // Changed from .allow([])
  impact: Joi.string().valid('Low', 'Medium', 'High').when('event_type_tag', {
    is: 'action',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
  // Add other fields as needed...
});

// Sheet configuration constants
export const SHEET_CONFIG = {
  ENTITIES: {
    fields: {
      entity_id: {
        type: 'string',
        required: true,
        auto: true,
        transform: () => Date.now().toString(),
        label: 'Entity ID'
      },
      WHO: {
        type: 'multiSelect',
        required: true,
        transform: (value) => {
          if (!Array.isArray(value)) return '';
          return value.join(', ');
        },
        label: 'WHO'
      },
      bio: {
        type: 'text',
        required: true,
        label: 'Bio'
      },
      entity_type: {
        type: 'select',
        required: true,
        options: ['Character', 'Party', 'Movement'],
        label: 'Entity Type'
      },
      SPECTRUM: {
        type: 'select',
        required: true,
        options: ['LEFT', 'CENTRE', 'RIGHT'],
        label: 'Spectrum'
      },
      created_at: {
        type: 'timestamp',
        required: true,
        auto: true,
        transform: () => new Date().toISOString(),
        label: 'Created At'
      }
    },
    displayOrder: ['WHO', 'bio', 'entity_type', 'SPECTRUM']
  },
  THEORY: {
    fields: {
      url: { 
        type: 'url', 
        required: true, 
        label: 'URL' 
      },
      title: { 
        type: 'string', 
        required: true, 
        label: 'Title' 
      },
      description: { 
        type: 'text', 
        required: true, 
        label: 'Description' 
      },
      src_type: {
        type: 'select',
        required: true,
        options: ['post', 'article', 'book', 'pdf'],
        label: 'Source Type'
      },
      keywords: {
        type: 'multiSelect',
        required: false,
        options: [], // Will be populated from API
        label: 'Keywords',
        transform: (value) => Array.isArray(value) ? value.join(', ') : ''
      },
      author: {
        type: 'multiSelect',
        required: true,
        options: [], // Will be populated from API
        label: 'Author',
        transform: (value) => Array.isArray(value) ? value.join(', ') : ''
      },
      platform: {
        type: 'select',
        required: false,
        condition: (formData) => formData.src_type === 'post',
        options: ['twitter', 'facebook', 'telegram'],
        label: 'Platform'
      },
      domain: {
        type: 'string',
        required: false,
        condition: (formData) => formData.src_type === 'article',
        label: 'Domain'
      },
      WHO: {
        type: 'multiSelect',
        required: true,
        options: [], // Will be populated from API
        label: 'WHO',
        transform: (value) => Array.isArray(value) ? value.join(', ') : ''
      },
      spectrum: {
        type: 'select',
        required: true,
        options: ['Left', 'Centre', 'Right'],
        label: 'Spectrum'
      },
      publication_date: {
        type: 'date',
        required: true,
        label: 'Date Published'
      }
    },
    displayOrder: [
      'url',
      'title',
      'description',
      'src_type',
      'keywords',
      'author',
      'platform',
      'domain',
      'WHO',
      'spectrum',
      'publication_date'
    ]
  },
  REPORTING: {
    fields: {
      headline: { type: 'string', required: true, label: 'Headline' },
      POST_CONTENT: { type: 'text', required: true, label: 'Post Content' },
      event_date: { type: 'date', required: true, label: 'Event Date' },
      src_type: {
        type: 'select',
        required: true,
        options: ['post', 'article'],
        label: 'Source Type'
      },
      platform: {
        type: 'select',
        required: false,
        condition: (formData) => formData.src_type === 'post',
        options: ['twitter', 'facebook', 'telegram'],
        label: 'Platform'
      },
      WHO: {
        type: 'multiSelect',
        required: true,
        transform: (value) => Array.isArray(value) ? value.join(', ') : '',
        label: 'WHO'
      },
      event_type_tag: {
        type: 'select',
        required: true,
        options: ['statement', 'action', 'analysis'],
        label: 'Event Type Tag'
      },
      REGION: {
        type: 'multiSelect',
        required: false,
        condition: (formData) => formData.event_type_tag === 'action',
        transform: (value) => Array.isArray(value) ? value.join(', ') : '',
        label: 'Region'
      },
      URL: { type: 'url', required: true, label: 'URL' },
      AUTHOR: {
        type: 'multiSelect',
        required: true,
        transform: (value) => Array.isArray(value) ? value.join(', ') : '',
        label: 'Author'
      }
    },
    displayOrder: [
      'src_type',
      'platform',
      'headline',
      'POST_CONTENT',
      'event_date',
      'WHO',
      'event_type_tag',
      'REGION',
      'URL',
      'AUTHOR'
    ]
  },
  EVENTS: {
    fields: {
      event_id: { type: 'text', label: 'Event ID', auto: true },
      headline: { type: 'text', label: 'Headline', required: true },
      description: { type: 'textarea', label: 'Description', required: true },
      event_date: { type: 'date', label: 'Event Date', required: true },
      location: { type: 'text', label: 'Location', required: true },
      source_link: { type: 'url', label: 'Source Link', required: true },
      contradiction_id: { type: 'text', label: 'Contradiction ID', required: true },
      struggle_id: { type: 'text', label: 'Struggle ID', required: true },
      timeline_id: { 
        type: 'multiSelect', 
        label: 'Timeline IDs', 
        required: true,
        options: [] // Will be populated dynamically
      },
      multi_headline_view: { type: 'textarea', label: 'Multi Headline View' },
      item_category: { 
        type: 'select', 
        label: 'Category',
        required: true,
        options: ['Event', 'Issue', 'Structural Change']
      },
      reporting_date: { type: 'date', label: 'Reporting Date', required: true },
      src_type: { 
        type: 'select', 
        label: 'Source Type',
        required: true,
        options: ['article', 'post']
      },
      platform: { 
        type: 'text', 
        label: 'Platform',
        condition: (formData) => formData.src_type === 'post'
      },
      SPECTRUM: {
        type: 'select',
        label: 'Political Spectrum',
        required: true,
        options: ['Left', 'Center', 'Right']
      },
      entity_name: { 
        type: 'multiSelect', 
        label: 'Entity Names', 
        required: true,
        options: [] // Will be populated dynamically
      },
      event_type_tag: { 
        type: 'select', 
        label: 'Event Type', 
        required: true,
        options: ['Policy Change', 'Protest', 'Crackdown', 'Repression', 'Co-optation']
      },
      event_motion: {
        type: 'select',
        label: 'Event Motion',
        options: ['Sharpens', 'Neutralizes', 'Transforms']
      },
      historical_flag: { type: 'boolean', label: 'Historical Event', required: true },
      macro_micro: {
        type: 'select',
        label: 'Scale',
        required: true,
        options: ['Macro', 'Micro']
      },
      event_relevance: {
        type: 'select',
        label: 'Relevance',
        required: true,
        options: ['Long-Term', 'Short-Term']
      }
    },
    displayOrder: [
      'headline',
      'description',
      'event_date',
      'location',
      'source_link',
      'contradiction_id',
      'struggle_id',
      'timeline_id',
      'multi_headline_view',
      'item_category',
      'reporting_date',
      'src_type',
      'platform',
      'SPECTRUM',
      'entity_name',
      'event_type_tag',
      'event_motion',
      'historical_flag',
      'macro_micro',
      'event_relevance'
    ]
  },
  TIMELINES: {
    fields: {
      timeline_id: { type: 'text', required: true, auto: true, label: 'Timeline ID' },
      title: { type: 'text', required: true, label: 'Title' },
      description: { type: 'textarea', required: true, label: 'Description' },
      linked_phases: { type: 'linked', linkedSheet: 'TIMELINE_REGISTRY', multiple: true, label: 'Linked Phases' },
      linked_grid_rows: { type: 'linked', linkedSheet: 'TIMELINE_GRID', multiple: true, label: 'Linked Grid Rows', autoGenerated: true },
      category: { type: 'select', required: true, options: ['historical_arc', 'thematic_sequence'], label: 'Category' },
      is_public: { type: 'boolean', required: true, label: 'Is Public' },
      contradiction_id: { type: 'linked', linkedSheet: 'CONTRADICTIONS', label: 'Contradiction' },
      structure_ids: { type: 'linked', linkedSheet: 'STRUCTURES', multiple: true, label: 'Structures' },
      event_ids: { type: 'linked', linkedSheet: 'EVENTS', multiple: true, label: 'Events' },
      period_range: { type: 'dateRange', label: 'Period Range' },
      core_theme: { type: 'select', label: 'Core Theme' },
      flashpoints: { type: 'linked', linkedSheet: 'EVENTS', multiple: true, label: 'Flashpoints' },
      status: { type: 'select', options: ['Active', 'Closed', 'Evolving'], label: 'Status' },
      timeline_type: { type: 'select', options: ['Legislative Timeline', 'Protest Timeline'], label: 'Timeline Type' },
      narrative_ids: { type: 'linked', linkedSheet: 'NARRATIVES', multiple: true, label: 'Narratives' }
    },
    displayOrder: [
      'timeline_id', 'title', 'description', 'linked_phases', 'linked_grid_rows', 'category', 'is_public',
      'contradiction_id', 'structure_ids', 'event_ids', 'period_range', 'core_theme', 'flashpoints',
      'status', 'timeline_type', 'narrative_ids'
    ]
  },
  TIMELINE_REGISTRY: {
    fields: {
      phase_id: { type: 'text', required: true, auto: true, label: 'Phase ID' },
      phase_label: { type: 'text', required: true, label: 'Phase Label' },
      date_range: { type: 'dateRange', required: true, label: 'Date Range' },
      temporal_phase: { type: 'dateRange', label: 'Temporal Phase' },
      current_phase: { type: 'boolean', label: 'Current Phase' },
      description: { type: 'textarea', required: true, label: 'Description' },
      cluster_theme: { type: 'select', label: 'Cluster Theme' },
      timeline_cluster_title: { type: 'text', label: 'Timeline Cluster Title' },
      timeline_ids: { type: 'linked', linkedSheet: 'TIMELINES', multiple: true, label: 'Timelines' },
      anchor_contradiction: { type: 'linked', linkedSheet: 'CONTRADICTIONS', label: 'Anchor Contradiction' },
      linked_struggles: { type: 'linked', linkedSheet: 'STRUGGLES', multiple: true, label: 'Linked Struggles' },
      linked_events: { type: 'linked', linkedSheet: 'EVENTS', multiple: true, label: 'Linked Events' },
      structure_ids: { type: 'linked', linkedSheet: 'STRUCTURES', multiple: true, label: 'Structures' },
      linked_entities: { type: 'linked', linkedSheet: 'ENTITIES', multiple: true, label: 'Entities' },
      narrative_ids: { type: 'linked', linkedSheet: 'NARRATIVES', multiple: true, label: 'Narratives' },
      rupture_rating: { type: 'select', options: ['High', 'Medium', 'Low'], label: 'Rupture Rating' }
    },
    displayOrder: [
      'phase_id', 'phase_label', 'date_range', 'temporal_phase', 'current_phase', 'description', 'cluster_theme',
      'timeline_cluster_title', 'timeline_ids', 'anchor_contradiction', 'linked_struggles', 'linked_events',
      'structure_ids', 'linked_entities', 'narrative_ids', 'rupture_rating'
    ]
  },
  TIMELINE_GRID: {
    fields: {
      timeline_grid_id: { type: 'text', required: true, auto: true, label: 'Timeline Grid ID' },
      linked_phase_id: { type: 'linked', linkedSheet: 'TIMELINE_REGISTRY', label: 'Linked Phase ID' },
      zoom_level: { type: 'select', required: true, options: ['Event', 'Issue', 'Struggle', 'Contradiction'], label: 'Zoom Level' },
      linked_item_id: { type: 'linked', linkedSheet: 'EVENTS', label: 'Linked Item ID' },
      label: { type: 'text', required: true, label: 'Label' },
      notes: { type: 'textarea', label: 'Notes' },
      weight: { type: 'number', label: 'Weight' },
      color_tag: { type: 'tags', label: 'Color Tag' },
      contradiction_id: { type: 'linked', linkedSheet: 'CONTRADICTIONS', label: 'Contradiction' },
      domain: { type: 'select', label: 'Domain' },
      period: { type: 'dateRange', label: 'Period' },
      key_events: { type: 'linked', linkedSheet: 'EVENTS', multiple: true, label: 'Key Events' },
      narrative_drift: { type: 'linked', linkedSheet: 'NARRATIVES', multiple: true, label: 'Narrative Drift' },
      structure_ids: { type: 'linked', linkedSheet: 'STRUCTURES', multiple: true, label: 'Structures' },
      emergent_forces: { type: 'linked', linkedSheet: 'ENTITIES', multiple: true, label: 'Emergent Forces' },
      suppression_forces: { type: 'linked', linkedSheet: 'ENTITIES', multiple: true, label: 'Suppression Forces' }
    },
    displayOrder: [
      'timeline_grid_id', 'linked_phase_id', 'zoom_level', 'linked_item_id', 'label', 'notes', 'weight', 'color_tag',
      'contradiction_id', 'domain', 'period', 'key_events', 'narrative_drift', 'structure_ids', 'emergent_forces', 'suppression_forces'
    ]
  },
  STRUCTURES: {
    fields: {
      structure_id: { type: 'text', required: true, auto: true, label: 'Structure ID' },
      structure_name: { type: 'text', required: true, label: 'Structure Name' },
      structure_type: { 
        type: 'select', 
        required: true, 
        options: ['Base', 'Social Superstructure', 'Political Superstructure', 'Legal-Judicial Superstructure', 'Religious Superstructure', 'Informational Superstructure'],
        label: 'Structure Type'
      },
      region: { 
        type: 'select', 
        required: true, 
        options: ['Tamil Nadu', 'Kerala', 'Karnataka'],
        label: 'Region'
      },
      parent_structure: { type: 'text', label: 'Parent Structure' },
      category: { 
        type: 'select', 
        required: true, 
        options: ['Economic', 'Political', 'Social', 'Cultural'],
        label: 'Category'
      },
      lifespan: { 
        type: 'select', 
        required: true, 
        options: ['Ancient', 'Colonial', 'Post-Independence', 'Ongoing'],
        label: 'Lifespan'
      },
      transformation_status: { 
        type: 'select', 
        required: true, 
        options: ['Active', 'Transforming', 'Dormant'],
        label: 'Transformation Status'
      },
      subtype: { 
        type: 'multiSelect', 
        required: true, 
        options: ['Caste', 'Capital', 'Labor', 'Land', 'Welfare', 'Law', 'Religion', 'Patriarchy / Gender', 'Bureaucracy', 'Surveillance / Tech', 'Education', 'Media / Narrative', 'Federalism', 'Environment / Extraction'],
        label: 'Subtypes'
      },
      timeline_registry_ids: { type: 'linked', linkedSheet: 'TIMELINE_REGISTRY', multiple: true, label: 'Timeline Registry IDs' },
      structure_description: { type: 'textarea', required: true, label: 'Structure Description' },
      historical_range: { type: 'dateRange', label: 'Historical Range' },
      structure_evolution: { type: 'textarea', label: 'Structure Evolution' },
      embedded_contradictions: { type: 'linked', linkedSheet: 'CONTRADICTIONS', multiple: true, label: 'Embedded Contradictions' },
      linked_struggles: { type: 'linked', linkedSheet: 'STRUGGLES', multiple: true, label: 'Linked Struggles' },
      issue_ids: { type: 'linked', linkedSheet: 'ISSUES', multiple: true, label: 'Issue IDs' },
      linked_entities: { type: 'linked', linkedSheet: 'ENTITIES', multiple: true, label: 'Linked Entities' },
      confidence: { 
        type: 'select', 
        required: true, 
        options: ['High', 'Medium', 'Low'],
        label: 'Confidence'
      },
      narratives_shaped_by_structure: { type: 'linked', linkedSheet: 'NARRATIVES', multiple: true, label: 'Narratives Shaped by Structure' }
    },
    displayOrder: [
      'structure_id',
      'structure_name',
      'structure_type',
      'region',
      'parent_structure',
      'category',
      'lifespan',
      'transformation_status',
      'subtype',
      'timeline_registry_ids',
      'structure_description',
      'historical_range',
      'structure_evolution',
      'embedded_contradictions',
      'linked_struggles',
      'issue_ids',
      'linked_entities',
      'confidence',
      'narratives_shaped_by_structure'
    ]
  },
};

export const validateFormData = (formType, formData) => {
  const config = SHEET_CONFIG[formType];
  const errors = {};
  let isValid = true;

  if (!config) {
    console.error(`No configuration found for form type: ${formType}`);
    return { isValid: false, errors: { general: 'Invalid form configuration' } };
  }

  Object.entries(config.fields).forEach(([fieldName, fieldConfig]) => {
    if (fieldConfig.condition && !fieldConfig.condition(formData)) {
      return;
    }

    if (fieldConfig.required) {
      const value = formData[fieldName];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        errors[fieldName] = `${fieldConfig.label} is required`;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

export const transformFormDataForSheet = (formType, formData) => {
  const config = SHEET_CONFIG[formType];
  const transformedData = { ...formData };

  Object.entries(config.fields).forEach(([fieldName, fieldConfig]) => {
    if (fieldConfig.transform && transformedData[fieldName] !== undefined) {
      transformedData[fieldName] = fieldConfig.transform(transformedData[fieldName]);
    }
  });

  return transformedData;
};

export const validateEvent = (event) => {
  const errors = {};
  
  if (!event.headline?.trim()) errors.headline = 'Headline is required';
  if (!event.description?.trim()) errors.description = 'Description is required';
  if (!event.event_date) errors.event_date = 'Event date is required';
  if (!event.location?.trim()) errors.location = 'Location is required';
  if (!event.source_link?.trim()) errors.source_link = 'Source link is required';
  if (!event.contradiction_id?.trim()) errors.contradiction_id = 'Contradiction ID is required';
  if (!event.struggle_id?.trim()) errors.struggle_id = 'Struggle ID is required';
  if (!event.timeline_id?.length) errors.timeline_id = 'Timeline ID is required';
  if (!event.item_category) errors.item_category = 'Category is required';
  if (!event.reporting_date) errors.reporting_date = 'Reporting date is required';
  if (!event.src_type) errors.src_type = 'Source type is required';
  if (!event.SPECTRUM) errors.SPECTRUM = 'Spectrum is required';
  if (!event.entity_name?.length) errors.entity_name = 'Entity name is required';
  if (!event.event_type_tag) errors.event_type_tag = 'Event type is required';
  if (!event.macro_micro) errors.macro_micro = 'Macro/Micro classification is required';
  if (typeof event.historical_flag !== 'boolean') errors.historical_flag = 'Historical flag is required';
  if (!event.event_relevance) errors.event_relevance = 'Event relevance is required';

  return errors;
};

// Validate form data based on sheet type
export function validateFormByType(sheetType, formData) {
  // For new schema-driven forms
  if (formData.useDynamicForm) {
    return validateDynamicForm(formData.formConfig, formData);
  }
  
  // For legacy sheet-based forms
  const formConfig = formConfigs[sheetType];
  if (!formConfig) {
    throw new Error(`No form configuration found for sheet: ${sheetType}`);
  }

  return validateFormData(formConfig, formData);
}

// Export sheet names for use in UI
export const SHEET_NAMES = Object.keys(SHEET_CONFIG);

const schemas = {
    ENTITIES: {
        entity_id: "string",
        entity_name: "string",
        entity_type: "string",
        bio: "string",
        entity_stance_role: "string",
        SPECTRUM: "string",
        ideological_category: "string",
        linked_struggles: "array",
        linked_issues: "array",
        linked_events: "array",
        relations: "array",
        stances_history: "array",
    },
    THEORY: {
        theory_id: "string",
        title: "string",
        description: "string",
        author: "string",
        abstract: "string",
        publication_date: "date",
        src_type: "string",
        platform: "string",
        domain: "string",
        keywords: "array",
        entity_name: "array",
        linked_contradictions: "array",
        political_spectrum: "string",
        key_excerpts: "string",
        url: "string",
    },
    ISSUES: {
        issue_id: "string",
        issue_title: "string",
        issue_description: "string",
        issue_event_id: "string",
        contradiction_id: "string",
        struggle_id: "string",
        issue_status: "string",
        issue_timeline_events: "array",
        stance_1_headlines: "array",
        stance_1_description: "string",
        stance_1_events: "array",
        stance_2_headlines: "array",
        stance_2_description: "string",
        stance_2_events: "array",
        stance_3_headlines: "array",
        stance_3_description: "string",
        stance_3_events: "array",
    },
    STRUGGLES: {
        struggle_id: "string",
        struggle_name: "string",
        struggle_description: "string",
        contradiction_id: "string",
        linked_issues: "array",
        scale: "string",
        form: "string",
        sector: "string",
        historical_development: "string",
        current_status: "string",
    },
    CONTRADICTIONS: {
        contradiction_id: "string",
        first_major_flashpoint_event_id: "string",
        contradiction_type: "string",
        contradiction_description: "string",
        contradiction_status: "string",
        contradiction_intensity: "string",
        root_structure: "string",
        linked_struggles: "array",
        linked_issues: "array",
        contradiction_priority: "string",
        historical_motion: "string",
    },
    STRUCTURES: {
        structure_id: "string",
        structure_name: "string",
        structure_type: "string",
        description: "string",
        linked_contradictions: "array",
        linked_struggles: "array",
        linked_entities: "array",
        structure_evolution: "array", // Array of objects with Date, Transformation Type, and Description
    },
    RELATIONSHIP: {
        relationship_id: "string",
        entity_1: "string",
        entity_2: "string",
        relationship_type: "string",
        contradiction_id: "string",
        struggle_id: "string",
        linked_events: "array",
        relationship_timeline: "array", // Array of objects with Date, Shift Type, and Description
        historical_context: "string",
    },
    TIMELINES: {
        timeline_id: "string",
        title: "string",
        description: "string",
        linked_phases: "array",
        linked_grid_rows: "array",
        category: "string",
        is_public: "boolean",
        contradiction_id: "string",
        structure_ids: "array",
        event_ids: "array",
        period_range: "string",
        core_theme: "string",
        flashpoints: "array",
        status: "string",
        timeline_type: "string",
        narrative_ids: "array"
    },
    TIMELINE_REGISTRY: {
        phase_id: "string",
        phase_label: "string",
        date_range: "string",
        temporal_phase: "string",
        current_phase: "boolean",
        description: "string",
        cluster_theme: "string",
        timeline_cluster_title: "string",
        timeline_ids: "array",
        anchor_contradiction: "string",
        linked_struggles: "array",
        linked_events: "array",
        structure_ids: "array",
        linked_entities: "array",
        narrative_ids: "array",
        rupture_rating: "string"
    },
    TIMELINE_GRID: {
        timeline_grid_id: "string",
        linked_phase_id: "string",
        zoom_level: "string",
        linked_item_id: "string",
        label: "string",
        notes: "string",
        weight: "number",
        color_tag: "string",
        contradiction_id: "string",
        domain: "string",
        period: "string",
        key_events: "array",
        narrative_drift: "array",
        structure_ids: "array",
        emergent_forces: "array",
        suppression_forces: "array"
    },
};

export default schemas;