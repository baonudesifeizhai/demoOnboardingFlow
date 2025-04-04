import React from 'react';
import ReactDOM from 'react-dom/client';  // 使用 react-dom/client 导入

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染应用
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
