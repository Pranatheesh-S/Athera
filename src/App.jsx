import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Athera from './components/Athera.jsx';         // Adjust path if file is in src root
import EventsPage from './components/EventsPage.jsx'; // Adjust path if file is in src root

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Athera />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;