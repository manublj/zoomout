import React, { useState, useEffect } from 'react';
import { getContradictions } from '../api/googleSheetsApi';
import ContradictionCard from '../components/pages/contradictions/ContradictionCard';
import ContradictionTimelineMini from '../components/pages/contradictions/ContradictionTimelineMini';
import LinkedStrugglesList from '../components/pages/contradictions/LinkedStrugglesList';
import EntityStanceCluster from '../components/pages/contradictions/EntityStanceCluster';
import ContradictionDetailModal from '../components/pages/contradictions/ContradictionDetailModal';
import ContradictionFilters from '../components/pages/ContradictionFilters';
import './ContradictionsPage.css';

const ContradictionsPage = () => {
  const [contradictions, setContradictions] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedContradiction, setSelectedContradiction] = useState(null);

  // Fetch contradictions data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getContradictions(filters);
        setContradictions(data);
      } catch (error) {
        console.error('Error fetching contradictions:', error);
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

  // Handle contradiction selection
  const handleContradictionClick = (contradiction) => {
    setSelectedContradiction(contradiction);
  };

  // Close the detail modal
  const closeDetailModal = () => {
    setSelectedContradiction(null);
  };

  return (
    <div className="contradictions-page">
      <header className="contradictions-header">
        <h1>Contradictions</h1>
        <p>
          Explore contradictions as they evolve historically and interact with events, struggles, and entities.
        </p>
      </header>

      <ContradictionFilters filters={filters} onFilterChange={handleFilterChange} />

      <main className="contradictions-main">
        {loading ? (
          <p>Loading contradictions...</p>
        ) : contradictions.length === 0 ? (
          <p>No contradictions match these filters.</p>
        ) : (
          <div className="contradictions-list">
            {contradictions.map((contradiction) => (
              <ContradictionCard
                key={contradiction.contradiction_id}
                contradiction={contradiction}
                onClick={() => handleContradictionClick(contradiction)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedContradiction && (
        <ContradictionDetailModal
          contradiction={selectedContradiction}
          onClose={closeDetailModal}
        >
          <ContradictionTimelineMini contradiction={selectedContradiction} />
          <LinkedStrugglesList contradictionId={selectedContradiction.contradiction_id} />
          <EntityStanceCluster contradictionId={selectedContradiction.contradiction_id} />
        </ContradictionDetailModal>
      )}
    </div>
  );
};

export default ContradictionsPage;