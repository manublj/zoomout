import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Modal } from 'react-bootstrap';
import StruggleCard from '../components/pages/struggles/StruggleCard';
import LinkedContradictionsBar from '../components/pages/struggles/LinkedContradictionsBar';
import EventThreadMini from '../components/pages/struggles/EventThreadMini';
import EntityInvolvementTags from '../components/common/EntityInvolvementTags';
import StructureImpactSummary from '../components/pages/struggles/StructureImpactSummary';
import SearchBar from '../components/common/SearchBar';
import FloatingButton from '../components/common/FloatingButton';
import { getSheetData } from '../api/googleSheetsApi';
import StruggleFilters from '../components/pages/struggles/StruggleFilters';

// Define SHEET_NAMES directly in this file
const SHEET_NAMES = {
  STRUGGLES: 'Struggles',
};

const StrugglesPage = () => {
  const [struggles, setStruggles] = useState([]);
  const [filteredStruggles, setFilteredStruggles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStruggle, setSelectedStruggle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchStruggles();
  }, []);

  const fetchStruggles = async () => {
    setLoading(true);
    try {
      const data = await getSheetData(SHEET_NAMES.STRUGGLES);
      setStruggles(data);
      setFilteredStruggles(data);
    } catch (error) {
      console.error('Error fetching struggles:', error);
    }
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = struggles.filter((struggle) =>
      struggle.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStruggles(filtered);
  };

  const handleStruggleClick = (struggle) => {
    setSelectedStruggle(struggle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStruggle(null);
    setShowModal(false);
  };

  const renderStruggles = () => {
    if (filteredStruggles.length === 0) {
      return <p className="text-center">No struggles found.</p>;
    }

    return (
      <Row>
        {filteredStruggles.map((struggle) => (
          <Col key={struggle.id} md={4} className="mb-4">
            <StruggleCard struggle={struggle} onClick={() => handleStruggleClick(struggle)} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Struggles</h1>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        renderStruggles()
      )}

      <FloatingButton onClick={() => console.log('Add new struggle')} />

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStruggle?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStruggle && (
            <>
              <LinkedContradictionsBar contradictions={selectedStruggle.contradictions} />
              <EventThreadMini events={selectedStruggle.events} />
              <EntityInvolvementTags entities={selectedStruggle.entities} />
              <StructureImpactSummary structures={selectedStruggle.structures} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default StrugglesPage;