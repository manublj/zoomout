import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import TheoryPage from './pages/TheoryPage';
import EntitiesPage from './pages/EntitiesPage';
import ReportingPage from './pages/ReportingPage';
import TimelinePage from './pages/TimelinePage';
import StructuresPage from './pages/StructuresPage';
import ContradictionsPage from './pages/ContradictionsPage';
import StrugglesPage from './pages/StrugglesPage';
import FormsPage from './pages/FormsPage';
import TimelineComponentsTest from './pages/TimelineComponentsTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/root.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container fluid className="p-0 main-content">
          <Routes>
            <Route path="/timelines" element={<TimelinePage />} />
            <Route path="/structures" element={<StructuresPage />} />
            <Route path="/contradictions" element={<ContradictionsPage />} />
            <Route path="/struggles" element={<StrugglesPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/theory" element={<TheoryPage />} />
            <Route path="/wiki" element={<EntitiesPage />} />
            <Route path="/reporting" element={<ReportingPage />} />
            <Route path="/timeline-test" element={<TimelineComponentsTest />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;