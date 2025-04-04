import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  // Load initial state from localStorage or use defaults
  const [page2Components, setPage2Components] = useState(() => {
    const saved = localStorage.getItem('page2Components');
    return saved ? JSON.parse(saved) : ['birthdate', 'aboutMe'];
  });
  
  const [page3Components, setPage3Components] = useState(() => {
    const saved = localStorage.getItem('page3Components');
    return saved ? JSON.parse(saved) : ['address'];
  });

  // Save to localStorage whenever components change
  useEffect(() => {
    localStorage.setItem('page2Components', JSON.stringify(page2Components));
  }, [page2Components]);

  useEffect(() => {
    localStorage.setItem('page3Components', JSON.stringify(page3Components));
  }, [page3Components]);

  const handleComponentChange = (page, component, checked) => {
    if (page === 2) {
      // Prevent removing the last component
      if (!checked && page2Components.length <= 1) {
        return;
      }
      setPage2Components(prev =>
        checked ? [...prev, component] : prev.filter(item => item !== component)
      );
    } else if (page === 3) {
      // Prevent removing the last component
      if (!checked && page3Components.length <= 1) {
        return;
      }
      setPage3Components(prev =>
        checked ? [...prev, component] : prev.filter(item => item !== component)
      );
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <h3>Page 2 Components</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={page2Components.includes('birthdate')}
            onChange={(e) => handleComponentChange(2, 'birthdate', e.target.checked)}
          />
          Birthdate
        </label>
        <label>
          <input
            type="checkbox"
            checked={page2Components.includes('aboutMe')}
            onChange={(e) => handleComponentChange(2, 'aboutMe', e.target.checked)}
          />
          About Me
        </label>
      </div>

      <h3>Page 3 Components</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={page3Components.includes('address')}
            onChange={(e) => handleComponentChange(3, 'address', e.target.checked)}
          />
          Address
        </label>
      </div>
    </div>
  );
};

export default AdminPage;
