// src/pages/OnboardingPage.js

import React, { useState } from 'react';
import OnboardingStep1 from '../components/OnboardingStep1';  // 确保路径正确

const OnboardingPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <OnboardingStep1 formData={formData} setFormData={setFormData} />
  );
};

export default OnboardingPage;
