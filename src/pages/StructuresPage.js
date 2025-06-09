import React, { useState, useEffect, useRef } from 'react';
import { getSheetData } from '../api/googleSheetsApi';
import StructureCard from '../components/pages/structures/StructureCard';
import StructureDetailModal from '../components/pages/structures/StructureDetailModal';
import './StructuresPage.css';

const SHEET_NAME = 'STRUCTURES';

const StructuresPage = () => {
  const [structures, setStructures] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [connections, setConnections] = useState([]);
  const baseLayerRef = useRef(null);
  const superstructureRef = useRef(null);

  const filterOptions = [
    { name: 'Structure Type', options: ['Base', 'Social Superstructure', 'Political Superstructure', 'Legal-Judicial Superstructure', 'Religious Superstructure', 'Informational Superstructure'] },
    { name: 'Region', options: ['Tamil Nadu', 'Kerala', 'Karnataka'] },
    { name: 'Lifespan', options: ['Ancient', 'Colonial', 'Post-Independence', 'Ongoing'] },
    { name: 'Transformation Status', options: ['Active', 'Transforming', 'Dormant'] }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSheetData(SHEET_NAME, filters);
        setStructures(data);
        updateConnections(data);
      } catch (error) {
        console.error('[StructuresPage] Error fetching structures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const updateConnections = (data) => {
    const baseStructures = data.filter(s => s.structure_type === 'Base');
    const superStructures = data.filter(s => s.structure_type !== 'Base');
    
    const newConnections = superStructures.map(superStructure => {
      const base = baseStructures.find(baseStructure => 
        superStructure.parent_structure === baseStructure.structure_id
      );
      if (base) {
        return {
          from: base.structure_id,
          to: superStructure.structure_id
        };
      }
      return null;
    }).filter(Boolean);

    setConnections(newConnections);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleStructureClick = (structure) => {
    setSelectedStructure(structure);
  };

  const closeDetailModal = () => {
    setSelectedStructure(null);
  };

  const renderBaseLayer = () => {
    const baseStructures = structures.filter(s => s.structure_type === 'Base');
    return (
      <div className="base-layer" ref={baseLayerRef}>
        <div className="base-structures">
          {baseStructures.map(structure => (
            <div key={structure.structure_id} className="base-structure">
              <h3>{structure.structure_name}</h3>
              <p>{structure.structure_description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSuperstructureLayer = () => {
    const superStructures = structures.filter(s => s.structure_type !== 'Base');
    const categories = ['Economic', 'Political', 'Social', 'Cultural'];

    return (
      <div className="superstructure-layer" ref={superstructureRef}>
        {categories.map(category => (
          <div key={category} className="superstructure-column">
            <h2 className="column-title">{category}</h2>
            <div className="column-content">
              {superStructures
                .filter(structure => structure.category === category)
                .map(structure => (
                  <StructureCard
                    key={structure.structure_id}
                    structure={structure}
                    onClick={() => handleStructureClick(structure)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderConnectionLines = () => {
    return connections.map((connection, index) => (
      <div
        key={index}
        className="connection-line"
        style={{
          top: `${connection.fromTop}px`,
          left: `${connection.fromLeft}px`,
          height: `${connection.height}px`,
          transform: `rotate(${connection.angle}deg)`
        }}
      />
    ));
  };

  return (
    <div className="structures-page">
      <header className="structures-header">
        <div className="header-title">STRUCTURESPAGE — HEADER</div>
        <div className="filters-container">
          {filterOptions.map(filter => (
            <select
              key={filter.name}
              className="filter-select"
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            >
              <option value="">{filter.name}</option>
              {filter.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      </header>

      {loading ? (
        <p>Loading structures...</p>
      ) : (
        <>
          {renderBaseLayer()}
          {renderSuperstructureLayer()}
          {renderConnectionLines()}
        </>
      )}

      {selectedStructure && (
        <StructureDetailModal
          structure={selectedStructure}
          onClose={closeDetailModal}
          position="right"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Structure Title: {selectedStructure.structure_name}</h2>
              <p className="structure-meta">
                Type: {selectedStructure.structure_type} | 
                Region: {selectedStructure.region} | 
                Status: {selectedStructure.transformation_status}
              </p>
            </div>
            
            <div className="detail-tabs">
              {['Overview', 'Contradictions', 'Struggles', 'Timeline'].map(tab => (
                <button 
                  key={tab}
                  className={`tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-section">
                  <h3>Overview:</h3>
                  <p>{selectedStructure.structure_description}</p>
                  <div className="structure-details">
                    <p><strong>Category:</strong> {selectedStructure.category}</p>
                    <p><strong>Lifespan:</strong> {selectedStructure.lifespan}</p>
                    <p><strong>Subtypes:</strong> {selectedStructure.subtype?.join(', ')}</p>
                    <p><strong>Historical Range:</strong> {selectedStructure.historical_range}</p>
                    <p><strong>Confidence:</strong> {selectedStructure.confidence}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'contradictions' && (
                <div className="contradictions-section">
                  <h3>Linked Contradictions:</h3>
                  <ul>
                    {selectedStructure.embedded_contradictions?.map(c => (
                      <li key={c.id}>- {c.name} [{c.status}]</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'struggles' && (
                <div className="struggles-section">
                  <h3>Active Struggles:</h3>
                  <ul>
                    {selectedStructure.linked_struggles?.map(s => (
                      <li key={s.id}>- {s.name} [{s.status}]</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'timeline' && (
                <div className="timeline-section">
                  <h3>Timeline:</h3>
                  <p>{selectedStructure.structure_evolution}</p>
                  <div className="timeline-visualization">
                    <div className="timeline-track">
                      <span className="timeline-event">Reform</span>
                      <span className="timeline-event">Protest</span>
                      <span className="timeline-event">Repression</span>
                      <span className="timeline-event">Rupture</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </StructureDetailModal>
      )}
    </div>
  );
};

export default StructuresPage;