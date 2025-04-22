import React, { useState, useEffect } from 'react';
import { getStructures } from '../api/googleSheetsApi';
import StructureCard from '../components/pages/structures/StructureCard';
import ContradictionListMini from '../components/pages/structures/ContradictionListMini';
import StruggleListMini from '../components/pages/structures/StruggleListMini';
import StructureDetailModal from '../components/pages/structures/StructureDetailModal';
import StructureFilters from '../components/pages/structures/StructureFilters';
import './StructuresPage.css';

const StructuresPage = () => {
  const [structures, setStructures] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedStructure, setSelectedStructure] = useState(null);

  // Fetch structures data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStructures(filters);
        setStructures(data);
      } catch (error) {
        console.error('Error fetching structures:', error);
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

  // Handle structure selection
  const handleStructureClick = (structure) => {
    setSelectedStructure(structure);
  };

  // Close the detail modal
  const closeDetailModal = () => {
    setSelectedStructure(null);
  };

  return (
    <div className="structures-page">
      {/* Header Section */}
      <header className="structures-header">
        <h1>Structures</h1>
        <p>
          Explore the material structures (economic, political, social, cultural) that underlie and generate contradictions.
        </p>
      </header>

      {/* Filters Section */}
      <StructureFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Main Body: Four-Column Grid Layout */}
      <main className="structures-main">
        {loading ? (
          <p>Loading structures...</p>
        ) : structures.length === 0 ? (
          <p>No structures match these filters.</p>
        ) : (
          <div className="structures-grid">
            {['economic', 'political', 'social', 'cultural'].map((type) => (
              <div key={type} className={`structures-column ${type}`}>
                <h2 className="column-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                {structures
                  .filter((structure) => structure.type === type)
                  .map((structure) => (
                    <StructureCard
                      key={structure.structure_id}
                      structure={structure}
                      onClick={() => handleStructureClick(structure)}
                    />
                  ))}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedStructure && (
        <StructureDetailModal
          structure={selectedStructure}
          onClose={closeDetailModal}
        >
          <div className="modal-content">
            <ContradictionListMini structureId={selectedStructure.structure_id} />
            <StruggleListMini structureId={selectedStructure.structure_id} />
          </div>
        </StructureDetailModal>
      )}
    </div>
  );
};

export default StructuresPage;