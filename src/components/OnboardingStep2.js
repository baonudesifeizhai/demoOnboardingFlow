import { useNavigate } from "react-router-dom";
import '../assets/styles/OnboardingStep2.css';

const OnboardingStep2 = ({ componentType, formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (componentType === 'birthdate') {
      setFormData({ ...formData, birthdate: e.target.value });
    } else if (componentType === 'aboutMe') {
      setFormData({ ...formData, aboutMe: e.target.value });
    }
  };

  const getValue = () => {
    if (componentType === 'birthdate') {
      return formData.birthdate || '';
    } else if (componentType === 'aboutMe') {
      return formData.aboutMe || '';
    }
    return '';
  };

  return (
    <div className="step2-component">
      {componentType === 'birthdate' ? (
        <div>
          <h3>Birthdate</h3>
          <input
            type="date"
            value={getValue()}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <h3>About Me</h3>
          <textarea
            placeholder="Tell us about yourself"
            value={getValue()}
            onChange={handleChange}
          />
        </div>
      )}
      <button onClick={() => navigate("/step3")}>Next</button>
    </div>
  );
};

export default OnboardingStep2;
