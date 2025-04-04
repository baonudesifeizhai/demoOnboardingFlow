import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import OnboardingPage from './pages/OnboardingPage';
import DataTable from './components/DataTable';

function App() {
  return (
    <Routes>  
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/step1" element={<OnboardingPage step="step1" />} />
      <Route path="/step2" element={<OnboardingPage step="step2" />} />
      <Route path="/step3" element={<OnboardingPage step="step3" />} />
      <Route path="/data" element={<DataTable />} />
    </Routes>
  );
}

export default App;
