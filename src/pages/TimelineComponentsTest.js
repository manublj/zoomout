import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FilterPanel from '../components/pages/timeline/FilterPanel';
import LegendBox from '../components/pages/timeline/LegendBox';
import ContradictionSummaryBox from '../components/pages/timeline/ContradictionSummaryBox';
import TimelineCanvas from '../components/pages/timeline/TimelineCanvas';
import TimelineRow from '../components/pages/timeline/TimelineRow';
import EventOverlayModal from '../components/pages/timeline/EventOverlayModal';
import PhaseInfoPanel from '../components/pages/timeline/PhaseInfoPanel';
import './TimelineComponentsTest.css';

const TimelineComponentsTest = () => {
  // Sample data matching design specs
  const sampleFilters = {
    search: '',
    contradiction: 'caste-democracy',
    category: 'Historical Arc',
    zoomLevel: 'phase' // 'decade', 'phase', 'year'
  };

  const sampleContradictions = [
    {
      id: 'caste-democracy',
      name: 'Caste vs Democracy',
      description: 'Casteism remains a core contradiction shaping Indian democracy, manifesting in the tension between traditional hierarchical structures and modern democratic citizenship.'
    }
  ];

  const sampleTimeline = {
    id: 'timeline-1',
    title: 'Caste vs Democracy (Historical Arc)',
    category: 'Historical Arc',
    contradiction_id: 'caste-democracy',
    timeline_type: 'Historical Arc',
    status: 'Active',
    linked_phases: [
      {
        id: 'phase-1',
        date_range: '1947-1977',
        title: 'Early Democratic Phase',
        summary: 'Initial phase of democratic consolidation',
        events: [
          { id: 'event-1', date: '1950', title: 'Constitution Adoption' },
          { id: 'event-2', date: '1967', title: 'First Non-Congress Government' }
        ],
        issues: [
          { id: 'issue-1', title: 'Reservation Policy Formation' },
          { id: 'issue-2', title: 'Caste-based Political Mobilization' }
        ],
        linked_structures: ['struct-1', 'struct-2'],
        linked_struggles: ['struggle-1']
      },
      {
        id: 'phase-2',
        date_range: '1977-1990',
        title: 'Mandal Commission Phase',
        summary: 'Rise of OBC assertion and political mobilization',
        events: [
          { id: 'event-3', date: '1990', title: 'Mandal Commission Implementation' }
        ],
        issues: [
          { id: 'issue-3', title: 'Reservation vs Merit Debate' },
          { id: 'issue-4', title: 'Caste Violence in North India' }
        ],
        linked_structures: ['struct-1', 'struct-3'],
        linked_struggles: ['struggle-1', 'struggle-2']
      }
    ],
    event_ids: ['event-1', 'event-2', 'event-3'],
    structures: [
      { id: 'struct-1', name: 'Reservation Policy', type: 'superstructure' },
      { id: 'struct-2', name: 'VHP-RSS Network', type: 'ideological apparatus' },
      { id: 'struct-3', name: 'Democratic Citizenship', type: 'superstructure' }
    ]
  };

  const sampleEvent = {
    id: 'event-3',
    title: 'Mandal Commission Implemented',
    multi_headline: 'OBC Reservations Change Indian Politics Forever',
    date: '1990-08-07',
    reporting_date: '1990-08-07',
    location: 'India-Wide',
    platform: 'Newspapers',
    source_type: 'Report',
    link: 'https://example.com/article',
    description: 'The V.P. Singh government implemented the Mandal Commission recommendations, triggering widespread protests and fundamentally altering the landscape of Indian politics.',
    linked_structures: ['struct-1'],
    linked_contradictions: ['caste-democracy'],
    linked_struggles: ['struggle-1'],
    linked_entities: ['entity-1', 'entity-2'],
    motion_type: 'Escalation',
    relevance: 'High',
    scale: 'Macro',
    linked_phase_id: 'phase-2'
  };

  const sampleStructures = [
    { id: 'struct-1', name: 'Reservation Policy', type: 'superstructure' },
    { id: 'struct-2', name: 'VHP-RSS Network', type: 'ideological apparatus' },
    { id: 'struct-3', name: 'Democratic Citizenship', type: 'superstructure' }
  ];

  const sampleStruggles = [
    { id: 'struggle-1', name: 'Bahujan Assertion' },
    { id: 'struggle-2', name: 'Secular vs Hindutva Conflicts' }
  ];

  const sampleEntities = [
    { id: 'entity-1', name: 'V.P. Singh', type: 'Character' },
    { id: 'entity-2', name: 'Janata Dal', type: 'Party' }
  ];

  // State for testing interactions
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [showLegend, setShowLegend] = useState(true);

  // Handlers for testing
  const handleFilterChange = (newFilters) => {
    console.log('Filter changed:', newFilters);
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    setShowEventModal(true);
  };

  const handlePhaseClick = (phase) => {
    console.log('Phase clicked:', phase);
    setSelectedPhase(phase);
  };

  const handleTimelineSelect = (timeline) => {
    console.log('Timeline selected:', timeline);
    setSelectedTimeline(timeline);
  };

  const handlePhaseHover = (phase) => {
    console.log('Phase hover:', phase);
  };

  return (
    <Container className="timeline-test-page">
      <h1>Timeline Components Test Page</h1>
      
      {/* Test FilterPanel */}
      <section className="test-section">
        <h2>Filters / Controls</h2>
        <FilterPanel 
          filters={sampleFilters}
          onFilterChange={handleFilterChange}
          contradictions={sampleContradictions}
        />
      </section>

      {/* Test LegendBox */}
      <section className="test-section">
        <h2>Timeline Legend / Color Key</h2>
        <div className="legend-header">
          <h3>Timeline Legend</h3>
          <button 
            className="btn btn-icon"
            onClick={() => setShowLegend(!showLegend)}
          >
            {showLegend ? "−" : "+"}
          </button>
        </div>
        {showLegend && <LegendBox />}
      </section>

      {/* Test ContradictionSummaryBox */}
      <section className="test-section">
        <h2>Core Contradiction Summary Box</h2>
        <ContradictionSummaryBox 
          summary={sampleContradictions[0].description}
        />
      </section>

      {/* Test TimelineCanvas with TimelineRow */}
      <section className="test-section">
        <h2>Timeline Canvas + Phase & Event Panels</h2>
        <TimelineCanvas zoomLevel={sampleFilters.zoomLevel}>
          <TimelineRow
            timeline={sampleTimeline}
            onEventClick={handleEventClick}
            onPhaseClick={handlePhaseClick}
            onPhaseHover={handlePhaseHover}
            onSelect={handleTimelineSelect}
            zoomLevel={sampleFilters.zoomLevel}
            isSelected={selectedTimeline?.id === sampleTimeline.id}
          />
        </TimelineCanvas>
      </section>

      {/* Test PhaseInfoPanel */}
      <section className="test-section">
        <h2>Phase Detail Panel</h2>
        {selectedPhase ? (
          <PhaseInfoPanel
            phase={selectedPhase}
            structures={sampleStructures}
            contradictions={sampleContradictions}
            struggles={sampleStruggles}
            onClose={() => setSelectedPhase(null)}
          />
        ) : (
          <p>Click on a phase in the timeline to see details</p>
        )}
      </section>

      {/* Test EventOverlayModal */}
      <section className="test-section">
        <h2>Event Detail Panel</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowEventModal(true)}
        >
          Show Sample Event
        </button>
        {showEventModal && (
          <EventOverlayModal
            event={sampleEvent}
            structures={sampleStructures}
            contradictions={sampleContradictions}
            struggles={sampleStruggles}
            entities={sampleEntities}
            onClose={() => setShowEventModal(false)}
          />
        )}
      </section>
    </Container>
  );
};

export default TimelineComponentsTest;
