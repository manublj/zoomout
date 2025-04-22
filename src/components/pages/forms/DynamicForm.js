import React from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const DynamicForm = ({ sheetName, config, onSubmit, loading = false }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const formElements = e.target.elements;

    Object.entries(config.fields).forEach(([fieldName, fieldConfig]) => {
      if (!fieldConfig.auto) {
        formData[fieldName] = formElements[fieldName]?.value || '';
      }
    });

    onSubmit(formData);
  };

  const renderField = (fieldName, fieldConfig) => {
    const commonProps = {
      name: fieldName,
      required: fieldConfig.required,
      disabled: loading,
      className: 'mb-2',
    };

    switch (fieldConfig.type) {
      case 'textarea':
        return <Form.Control as="textarea" rows={3} {...commonProps} />;
      case 'select':
        return (
          <Form.Select {...commonProps}>
            <option value="">Select...</option>
            {fieldConfig.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      case 'date':
        return <Form.Control type="date" {...commonProps} />;
      case 'boolean':
        return <Form.Check type="checkbox" {...commonProps} />;
      case 'tags':
        return <Form.Control type="text" placeholder="Comma-separated tags" {...commonProps} />;
      case 'linked':
        return <Form.Control type="text" placeholder="Linked ID(s)" {...commonProps} />;
      default:
        return <Form.Control type={fieldConfig.type || 'text'} {...commonProps} />;
    }
  };

  const getFieldCategory = (fieldName, sheetName) => {
    const fieldMappings = {
      EVENTS: {
        Metadata: [
          'event_id', 'date', 'reporting_date', 'platform', 'src_type', 'source_link',
          'event_type_tag', 'item_category', 'event_motion', 'event_relevance',
          'macro_micro', 'historical_flag', 'timeline_id'
        ],
        Description: ['event_title', 'description', 'multi_headline_view', 'location'],
        LinkedItem: ['contradiction_id', 'struggle_id', 'issue_ids', 'entity_ids']
      },
      CONTRADICTIONS: {
        Metadata: [
          'contradiction_id', 'contradiction_type', 'status', 'subtype', 'rupture_date',
          'contradiction_intensity', 'contradiction_priority'
        ],
        Description: ['contradiction_name', 'contradiction_description', 'historical_motion'],
        LinkedItem: [
          'root_structure', 'first_major_flashpoint_event_id', 'struggle_ids',
          'linked_issues', 'theory_ids'
        ]
      },
      STRUGGLES: {
        Metadata: ['struggle_id', 'form', 'scale', 'sector', 'period', 'current_status'],
        Description: [
          'struggle_name', 'struggle_description', 'historical_development', 'outcome'
        ],
        LinkedItem: ['root_contradiction', 'event_ids', 'linked_issues', 'entity_ids']
      },
      ISSUES: {
        Metadata: ['issue_id', 'issue_status', 'issue_timeline'],
        Description: [
          'issue_title', 'description', 'stance_1_headlines', 'stance_2_headlines',
          'stance_3_headlines', 'stance_1_description', 'stance_2_description',
          'stance_3_description'
        ],
        LinkedItem: [
          'issue_event_id', 'contradiction_ids', 'stance_1_events', 'stance_2_events',
          'stance_3_events'
        ]
      },
      ENTITIES: {
        Metadata: [
          'entity_id', 'entity_type', 'ideological_category', 'entity_stance_role', 'active_period'
        ],
        Description: [
          'entity_name', 'bio', 'political_role', 'stances_history', 'entity_stance_role'
        ],
        LinkedItem: [
          'SPECTRUM', 'struggle_ids', 'linked_events', 'linked_issues', 'relationship_ids'
        ]
      },
      THEORY_OBJECTS: {
        Metadata: [
          'theory_object_id', 'theory_object_type', 'theory_entry_type', 'category_origin',
          'ism_origin_type', 'ism_function', 'ideological_motion_status', 'primary_domain',
          'validation_status', 'political_spectrum', 'publication_date'
        ],
        Description: ['title', 'abstract', 'proposition', 'author', 'key_excerpts'],
        LinkedItem: [
          'tags', 'keywords', 'example_terms', 'contradiction_ids', 'event_ids'
        ]
      },
      RELATIONSHIPS: {
        Metadata: ['relationship_id', 'relationship_type', 'relationship_timeline'],
        Description: ['contradiction_implication', 'historical_context'],
        LinkedItem: ['entity_1', 'entity_2', 'struggle_id', 'linked_events']
      },
      TIMELINE_REGISTRY: {
        Metadata: ['phase_id', 'date_range', 'current_phase'],
        Description: ['phase_label', 'description'],
        LinkedItem: ['anchor_contradiction', 'linked_struggle', 'linked_events', 'linked_entities']
      },
      TIMELINE_GRID: {
        Metadata: ['timeline_grid_id', 'zoom_level', 'weight', 'color_tag'],
        Description: ['label', 'notes'],
        LinkedItem: ['linked_phase_id', 'linked_item_id']
      },
      THEORY_INSTANCES: {
        Metadata: [
          'theory_instance_id', 'origin_type', 'content_object_type', 'publication_date',
          'src_type', 'url'
        ],
        Description: ['title', 'author', 'message_text', 'platform'],
        LinkedItem: [
          'origin_entity_id', 'linked_theory_object_ids', 'linked_contradiction_ids',
          'linked_event_ids', 'linked_stance_ids', 'tags'
        ]
      },
      STRUCTURES: {
        Metadata: [
          'structure_id', 'structure_type', 'subtype', 'historical_range', 'confidence'
        ],
        Description: [
          'structure_name', 'description', 'structure_evolution'
        ],
        LinkedItem: [
          'embedded_contradictions', 'linked_struggles', 'linked_entities'
        ]
      },
      TIMELINES: {
        Metadata: ['timeline_id', 'category', 'is_public'],
        Description: ['title', 'description'],
        LinkedItem: ['linked_phases', 'linked_grid_rows'],
      },
    };

    const categories = fieldMappings[sheetName];
    if (categories) {
      if (categories.Metadata.includes(fieldName)) return 'Metadata';
      if (categories.Description.includes(fieldName)) return 'Description';
      if (categories.LinkedItem.includes(fieldName)) return 'Linked Item';
    }

    throw new Error(`Field "${fieldName}" in sheet "${sheetName}" is not mapped to a category in forms.md.`);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <h2 className="mb-4">{sheetName} Form</h2>
      <Row>
        {Object.entries(config.fields).map(([fieldName, fieldConfig]) => (
          <Col key={fieldName} xs={12} md={6} lg={4} className="mb-3">
            <Form.Group>
              <Form.Label className="fw-bold">
                {fieldConfig.label} ({fieldConfig.type}) ({getFieldCategory(fieldName, sheetName)}) {/* Display field type and category */}
                {fieldConfig.required && <span className="text-danger ms-1">*</span>}
              </Form.Label>
              {renderField(fieldName, fieldConfig)}
            </Form.Group>
          </Col>
        ))}
      </Row>
      <div className="mt-4 d-flex justify-content-end">
        <Button type="submit" variant="primary" disabled={loading} className="px-4">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </Form>
  );
};

export default DynamicForm;