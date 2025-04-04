import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import OnboardingStep1 from '../components/OnboardingStep1';
import OnboardingStep2 from '../components/OnboardingStep2';
import OnboardingStep3 from '../components/OnboardingStep3';

const OnboardingPage = () => {
  const location = useLocation();
  
  // 定义 formData 和 setFormData，用于处理表单数据
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthdate: '',
    aboutMe: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  // 定义 stepComponents 用来管理当前步骤所需的组件
  const [stepComponents, setStepComponents] = useState([]);

  useEffect(() => {
    // 根据路径动态设置组件
    switch (location.pathname) {
      case '/step1':
        setStepComponents(['step1']);
        break;
      case '/step2':
        // 从 localStorage 读取 page2 的组件配置
        const savedPage2Components = localStorage.getItem('page2Components');
        const page2Components = savedPage2Components ? JSON.parse(savedPage2Components) : ['birthdate', 'aboutMe'];
        setStepComponents(page2Components);
        break;
      case '/step3':
        // 从 localStorage 读取 page3 的组件配置
        const savedPage3Components = localStorage.getItem('page3Components');
        const page3Components = savedPage3Components ? JSON.parse(savedPage3Components) : ['address'];
        setStepComponents(page3Components);
        break;
      default:
        setStepComponents([]);
        break;
    }
  }, [location]);

  // 渲染当前步骤的组件
  const renderStepContent = () => {
    if (location.pathname === '/step1') {
      return <OnboardingStep1 formData={formData} setFormData={setFormData} />;
    } else if (location.pathname === '/step2') {
      return (
        <div>
          {stepComponents.includes('birthdate') && (
            <OnboardingStep2 
              componentType="birthdate" 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
          {stepComponents.includes('aboutMe') && (
            <OnboardingStep2 
              componentType="aboutMe" 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
        </div>
      );
    } else if (location.pathname === '/step3') {
      return stepComponents.includes('address') ? <OnboardingStep3 formData={formData} setFormData={setFormData} /> : null;
    }
    return null;
  };

  return (
    <div className="onboarding-page">
      {renderStepContent()}
    </div>
  );
};

export default OnboardingPage;
