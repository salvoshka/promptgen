
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = 'button', variant = 'primary', disabled = false, className = '', children }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-150";
  
  let variantClasses = "";
  switch (variant) {
    case 'primary':
      variantClasses = "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
      break;
    case 'secondary':
      variantClasses = "text-indigo-400 bg-gray-700 hover:bg-gray-600 focus:ring-indigo-500 border-gray-600";
      break;
    case 'danger':
      variantClasses = "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500";
      break;
    case 'icon':
      variantClasses = "p-2 text-gray-400 hover:text-gray-200 bg-gray-700 hover:bg-gray-600 focus:ring-indigo-500";
      break;
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
