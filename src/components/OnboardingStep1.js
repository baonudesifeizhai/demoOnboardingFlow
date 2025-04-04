import { useNavigate } from "react-router-dom";
import '../assets/styles/OnboardingStep1.css';

const OnboardingStep1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  // 确保 formData 是已初始化的对象
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,   
    }));
  };

  return (
    <div>
      <h2>Step 1: Login</h2>
      <input
        type="email"
        name="email"   
        placeholder="Email"
        value={formData.email || ''}  
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"   
        placeholder="Password"
        value={formData.password || ''}  
        onChange={handleInputChange}
      />
      <button onClick={() => navigate("/step2")}>Next</button>
    </div>
  );
};

export default OnboardingStep1;
