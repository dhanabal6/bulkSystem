export function validate(values) {
  const errors = {};
  const requiredFields = ['mailId', 'password', 'subject', 'message'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
