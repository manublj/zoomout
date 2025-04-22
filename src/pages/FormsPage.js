import React, { useState } from 'react';
import { Container, Row, Col, Form, Toast, Modal } from 'react-bootstrap';
import DynamicForm from '../components/pages/forms/DynamicForm';
import { formConfigs } from '../utils/formUtils';

const FormsPage = () => {
  const [selectedSheet, setSelectedSheet] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSheetSelect = (e) => {
    const sheetName = e.target.value;
    setSelectedSheet(sheetName);
    if (sheetName) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSheet('');
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      const formConfig = formConfigs[selectedSheet];

      Object.entries(formConfig.fields).forEach(([fieldName, fieldConfig]) => {
        if (fieldConfig.auto) {
          formData[fieldName] = fieldConfig.transform
            ? fieldConfig.transform()
            : new Date().toISOString();
        }
      });

      console.log('Form submitted:', formData);

      setToastMessage({
        type: 'success',
        message: 'Form submitted successfully!',
      });
      setShowToast(true);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      setToastMessage({
        type: 'error',
        message: 'Failed to submit form. Please try again.',
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">Data Entry Forms</h1>

          <Form.Group className="mb-4">
            <Form.Label>Select a sheet:</Form.Label>
            <Form.Select
              value={selectedSheet}
              onChange={handleSheetSelect}
              className="w-full md:w-64"
            >
              <option value="">Choose...</option>
              {Object.keys(formConfigs).map((sheetName) => (
                <option key={sheetName} value={sheetName}>
                  {sheetName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedSheet} Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSheet && (
            <DynamicForm
              sheetName={selectedSheet}
              config={formConfigs[selectedSheet]}
              onSubmit={handleFormSubmit}
              loading={loading}
            />
          )}
        </Modal.Body>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className={`position-fixed bottom-0 end-0 m-4 ${
          toastMessage.type === 'error' ? 'bg-danger' : 'bg-success'
        }`}
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastMessage.type === 'error' ? 'Error' : 'Success'}
          </strong>
        </Toast.Header>
        <Toast.Body className={toastMessage.type === 'error' ? 'text-white' : ''}>
          {toastMessage.message}
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default FormsPage;