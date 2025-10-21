import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateSmoothie from './pages/CreateSmoothie';
import ViewAllSmoothies from './pages/ViewAllSmoothies';
import EditSmoothie from './pages/EditSmoothie';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreateSmoothie />} />
          <Route path="/smoothies" element={<ViewAllSmoothies />} />
          <Route path="/edit/:id" element={<EditSmoothie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;