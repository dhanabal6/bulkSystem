export function validate(values) {
  const errors = {};
  const requiredFields = ['number', 'message'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
