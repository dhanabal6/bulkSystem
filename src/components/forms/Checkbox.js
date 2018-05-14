import React from 'react';
import InputValidationError from './InputValidationError';

export default field => (
  <div className="checkboxWrap">
    <input {...field.input} type="checkbox" checked={field.input.value} />
    <InputValidationError field={field} />
    <p htmlFor={field.name}>{field.label}</p>
  </div>
);
