import React, { useState, useEffect } from 'react';
import { Container, Spinner, Modal, Button } from 'react-bootstrap';
import { getTimelines } from '../api/googleSheetsApi';
import TimelineEventCard from '../components/pages/timeline/TimelineEventCard';
import TimelineFilters from '../components/pages/timeline/TimelineFilters';
import TimelineThreadConnector from '../components/pages/timeline/TimelineThreadConnector';
import './TimelinePage.css';

const TimelinePage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level

  // Fetch timeline data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTimelines(filters);
        console.log('Fetched timeline events:', data); // Debug log
        setEvents(data);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  // Handle filter updates
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  // Close event detail modal
  const handleCloseEventDetail = () => {
    setSelectedEvent(null);
    setShowEventDetail(false);
  };

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 5)); // Max zoom level is 5
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 1, 1)); // Min zoom level is 1
  };

  return (
    <Container fluid className="timeline-page">
      {/* Header Section */}
      <header className="timeline-header">
        <h1>Timeline</h1>
        <p>
          Explore the chronological flow of historical motion through events, contradictions, and struggles.
        </p>
        <div className="timeline-controls">
          <Button variant="outline-primary" onClick={handleZoomOut} disabled={zoomLevel === 1}>
            Zoom Out
          </Button>
          <Button variant="outline-primary" onClick={handleZoomIn} disabled={zoomLevel === 5}>
            Zoom In
          </Button>
        </div>
      </header>

      {/* Filters Section */}
      <TimelineFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Main Timeline Section */}
      <main className="timeline-main">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading timeline data...</span>
            </Spinner>
          </div>
        ) : events.length === 0 ? (
          <p className="text-center">No events match these filters yet.</p>
        ) : (
          <div className={`timeline-view zoom-level-${zoomLevel}`}>
            {events.map((event, index) => (
              <React.Fragment key={event.timeline_id}>
                <TimelineEventCard event={event} onClick={() => handleEventClick(event)} />
                {index < events.length - 1 && <TimelineThreadConnector />}
              </React.Fragment>
            ))}
          </div>
        )}
      </main>

      {/* Event Detail Modal */}
      <Modal show={showEventDetail} onHide={handleCloseEventDetail} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Linked Phases:</strong> {selectedEvent.linked_phases.map((phase) => phase.phase_label).join(', ')}</p>
              <p><strong>Linked Grid Rows:</strong> {selectedEvent.linked_grid_rows.map((row) => row.label).join(', ')}</p>
              <p><strong>Contradictions:</strong> {selectedEvent.registry?.contradictions?.join(', ')}</p>
              <p><strong>Struggles:</strong> {selectedEvent.registry?.struggles?.join(', ')}</p>
              <p><strong>Entities:</strong> {selectedEvent.grid?.entities?.join(', ')}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TimelinePage;