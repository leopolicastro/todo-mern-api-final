const validateLoginForm = (formData) => {
  let errors = {};
  if (!formData.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!formData.password) {
    errors.password = 'Password is required';
    //TODO add a check for a special character
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be longer than 6 characters';
  }
  return errors;
};
export default validateLoginForm;
