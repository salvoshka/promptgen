
import React from 'react';
import { SelectOption } from '../types';

interface SelectFieldProps {
  label: string;
  id: string;
  name?: string; // Added name prop
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, id, name, value, onChange, options, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name || id} // Use name prop, fallback to id
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
      >
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.value === "" && required}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
