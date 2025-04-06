import { useNavigate } from "react-router-dom";
import '../assets/styles/OnboardingStep3.css';
import { useState } from "react";

const OnboardingStep3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Reset form data
      setFormData({
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

      // Navigate to data table
      navigate('/data');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Step 3: Address & Birthdate</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Street Address"
        value={formData.address?.street || ''}
        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
      />
      <input
        type="text"
        placeholder="City"
        value={formData.address?.city || ''}
        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
      />
      <input
        type="text"
        placeholder="State"
        value={formData.address?.state || ''}
        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
      />
      <input
        type="text"
        placeholder="Zip Code"
        value={formData.address?.zip || ''}
        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zip: e.target.value } })}
      />
      <input
        type="date"
        value={formData.birthdate}
        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default OnboardingStep3;
