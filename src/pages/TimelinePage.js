import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getTimelines, getContradictions, getStructures, getStruggles } from '../api/googleSheetsApi';
import ContradictionSummaryBox from '../components/pages/timeline/ContradictionSummaryBox';
import TimelineCanvas from '../components/pages/timeline/TimelineCanvas';
import TimelineRow from '../components/pages/timeline/TimelineRow';
import FilterPanel from '../components/pages/timeline/FilterPanel';
import LegendBox from '../components/pages/timeline/LegendBox';
import EventOverlayModal from '../components/pages/timeline/EventOverlayModal';
import PhaseInfoPanel from '../components/pages/timeline/PhaseInfoPanel';
import './TimelinePage.css';

const TimelinePage = () => {
  const [timelines, setTimelines] = useState([]);
  const [contradictions, setContradictions] = useState([]);
  const [structures, setStructures] = useState([]);
  const [struggles, setStruggles] = useState([]);
  const [filters, setFilters] = useState({
    searchText: '',
    category: 'all',
    contradiction: 'all',
    zoomLevel: 'phase' // 'year', 'decade', 'phase'
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Starting to load data...');
        const [timelinesData, contradictionsData, structuresData, strugglesData] = await Promise.all([
          getTimelines(filters),
          getContradictions(),
          getStructures(),
          getStruggles()
        ]);

        console.log('Timelines data received:', timelinesData);
        console.log('Contradictions data received:', contradictionsData);
        console.log('Structures data received:', structuresData);
        console.log('Struggles data received:', strugglesData);

        setTimelines(timelinesData);
        setContradictions(contradictionsData);
        setStructures(structuresData);
        setStruggles(strugglesData);
      } catch (error) {
        console.error('Error loading data:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
    setSelectedPhase(null);
  };

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
    setSelectedEvent(null);
  };

  const handleTimelineSelect = (timeline) => {
    setSelectedTimeline(timeline);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleClosePhasePanel = () => {
    setSelectedPhase(null);
  };

  const handleCloseTimelineDetails = () => {
    setSelectedTimeline(null);
  };

  const handleToggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="timeline-page">
      {/* Header / Title Block */}
      <header className="timeline-header">
        <h1>Timeline Master View</h1>
        <p>Explore and analyze political timelines through a dialectical lens</p>
      </header>

      {/* Top Controls Bar */}
      <section className="timeline-controls">
        <FilterPanel 
          filters={filters}
          onFilterChange={handleFilterChange}
          contradictions={contradictions}
        />
      </section>

      {/* Legend / Color Key */}
      <CSSTransition
        in={showLegend}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <section className="timeline-legend">
          <div className="legend-header">
            <h3>Timeline Legend</h3>
            <button 
              className="btn btn-icon"
              onClick={handleToggleLegend}
            >
              {showLegend ? "−" : "+"}
            </button>
          </div>
          <LegendBox />
        </section>
      </CSSTransition>

      {/* Core Contradiction Summary */}
      <CSSTransition
        in={!!filters.contradiction && filters.contradiction !== 'all'}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <section className="contradiction-summary">
          <ContradictionSummaryBox 
            contradictions={contradictions}
            selectedContradiction={filters.contradiction}
          />
        </section>
      </CSSTransition>

      {/* Timeline Canvas Section */}
      <section className="timeline-main">
        <TimelineCanvas 
          zoomLevel={filters.zoomLevel}
          onZoomChange={(level) => handleFilterChange({ zoomLevel: level })}
          startYear={1900}
          endYear={2025}
        >
          {timelines.map(timeline => (
            <TimelineRow
              key={timeline.id}
              timeline={timeline}
              onEventClick={handleEventClick}
              onPhaseClick={handlePhaseClick}
              onSelect={handleTimelineSelect}
              zoomLevel={filters.zoomLevel}
              isSelected={selectedTimeline?.id === timeline.id}
            />
          ))}
        </TimelineCanvas>
      </section>

      {/* Phase Info Panel */}
      <CSSTransition
        in={!!selectedPhase}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <aside className="phase-info-sidebar">
          {selectedPhase && (
            <PhaseInfoPanel
              phase={selectedPhase}
              structures={structures}
              contradictions={contradictions}
              struggles={struggles}
              onClose={handleClosePhasePanel}
            />
          )}
        </aside>
      </CSSTransition>

      {/* Selected Timeline Details Panel */}
      <CSSTransition
        in={!!selectedTimeline}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="timeline-details">
          {selectedTimeline && (
            <div className="timeline-details-content">
              <div className="timeline-details-header">
                <h3>{selectedTimeline.title}</h3>
                <button 
                  className="btn btn-icon"
                  onClick={handleCloseTimelineDetails}
                >
                  ×
                </button>
              </div>
              <p>{selectedTimeline.description}</p>
              <div className="timeline-details-actions">
                <button className="btn btn-primary">View Full Timeline</button>
                <button className="btn btn-secondary">Export Timeline</button>
                <button className="btn btn-outline">Add Event</button>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>

      {/* Event Detail Modal */}
      <CSSTransition
        in={showEventModal}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="modal-overlay">
          {showEventModal && selectedEvent && (
            <EventOverlayModal
              event={selectedEvent}
              structures={structures}
              contradictions={contradictions}
              struggles={struggles}
              onClose={handleCloseEventModal}
            />
          )}
        </div>
      </CSSTransition>

      {/* Footer */}
      <footer className="timeline-footer">
        <p>© 2024 Zoomout Project — Dialectical Political Timelines</p>
        <button 
          className="about-link"
          onClick={() => {/* Show about modal */}}
        >
          About this Tool
        </button>
      </footer>
    </div>
  );
};

export default TimelinePage;