// Example utility function for form data validation
export const validateFormData = (formData) => {
    if (!formData.email || !formData.password) {
      return "Email and Password are required!";
    }
    // Add other validation checks as needed
    return null;
  };
  