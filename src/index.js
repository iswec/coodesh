import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
    </Routes>
  </Router>,
);
