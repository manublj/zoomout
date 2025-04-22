import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DynamicForm from '../components/pages/forms/DynamicForm';
import { SHEET_CONFIG } from '../utils/sheetValidation';
import { getSheetData, addRowToSheet } from '../api/googleSheetsApi';

const TheoryPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getSheetData('THEORY');
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await addRowToSheet('THEORY', formData);
      setShowForm(false);
      await fetchArticles(); // Refresh the list
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <h1>Theory Database</h1>
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add New Theory Entry'}
      </Button>

      {showForm && (
        <Row className="mb-4">
          <Col>
            <DynamicForm
              sheetName="THEORY"
              config={SHEET_CONFIG.THEORY}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </Col>
        </Row>
      )}

      {/* Display articles list here */}
      {/* ...existing display code... */}
    </Container>
  );
};

export default TheoryPage;