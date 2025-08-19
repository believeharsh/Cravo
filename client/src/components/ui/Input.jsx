import React from 'react';
// Assuming your Icon component is robust enough to accept specific icons
// import Icon from '../Icon'; // Adjust path if needed

/**
 * Reusable Input component with label, icon, and error handling.
 *
 * @param {object} props - Component props.
 * @param {string} props.id - Unique ID for the input and label association.
 * @param {string} [props.label] - Text label for the input.
 * @param {React.ReactNode} [props.iconLeft] - Icon to be displayed on the left side of the input.
 * @param {React.ReactNode} [props.iconRight] - Icon to be displayed on the right side of the input.
 * @param {string} [props.error] - Error message to display below the input.
 * @param {string} [props.type='text'] - HTML input type (e.g., 'text', 'email', 'password', 'number').
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the input element.
 * @param {string} [props.labelClassName=''] - Additional Tailwind CSS classes for the label element.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [props...] - All other standard HTML input props (name, value, onChange, placeholder, etc.).
 * @returns {JSX.Element} The Input component.
 */
const Input = ({
  id,
  label,
  iconLeft,
  iconRight,
  error,
  type = 'text',
  className = '',
  labelClassName = '',
  ...props
}) => {
  // Base input styling
  const baseInputClasses = `
    block w-full py-3 border border-cream rounded-lg focus:ring-1 focus:ring-yellow-400 text-charcoal placeholder-medium-gray
    transition-all duration-200
    ${iconLeft ? 'pl-10' : 'pl-3'}
    ${iconRight ? 'pr-10' : 'pr-3'}
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
  `.trim();

  // Combined classes for the input element
  const combinedInputClasses = `${baseInputClasses} ${className}`.trim();

  // Classes for the label element
  const combinedLabelClasses =
    `block text-sm font-medium text-coffee mb-2 ${labelClassName}`.trim();

  // For dynamically sizing icons within the input
  const iconSizeClasses = 'h-5 w-5';

  const renderIcon = icon => {
    if (!icon) return null;
    // Clone the icon to add specific styling for the input context
    return React.cloneElement(icon, {
      className: `${icon.props.className || ''} ${iconSizeClasses}`.trim(),
    });
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className={combinedLabelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {renderIcon(iconLeft)}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={combinedInputClasses}
          {...props} // Pass all other standard input props like name, value, onChange, placeholder
        />
        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {renderIcon(iconRight)}
          </div>
        )}
        {/*
          IMPORTANT: The "Show Password" button should NOT be pointer-events-none.
          If you want an interactive icon, you'd place it outside this static iconRight div
          or make iconRight a render prop. For now, let's keep iconLeft/Right as static.
          The Password toggle button is a special case (see usage below).
        */}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;
