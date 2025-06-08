
import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name?: string; // Added name prop
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  rows?: number;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, name, value, onChange, placeholder, type = 'text', rows = 3, required = false }) => {
  const commonClasses = "w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400";
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name || id} // Use name prop, fallback to id
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={commonClasses}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name || id} // Use name prop, fallback to id
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default InputField;
