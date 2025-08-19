import React from 'react';

/**
 * Reusable Button component with customizable size, variant, and icon support.
 *
 * @param {object} props - Component props.
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'success'} [props.variant='primary'] - Defines the button's style.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Defines the button's size (padding, font size).
 * @param {React.ReactNode} [props.iconLeft] - Icon to be displayed on the left side of the text.
 * @param {React.ReactNode} [props.iconRight] - Icon to be displayed on the right side of the text.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes to apply.
 * @param {boolean} [props.disabled=false] - If true, the button will be disabled.
 * @param {React.HTMLAttributes<HTMLButtonElement>} [props...] - All other standard button props (onClick, type, etc.).
 * @returns {JSX.Element} The Button component.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  className = '',
  disabled = false,
  ...props
}) => {
  // Base styles applied to all buttons
  let baseClasses =
    'font-semibold rounded-md transition-colors duration-normal ease-in-out whitespace-nowrap';

  // Styles based on the 'variant' prop
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary text-charcoal hover:bg-yellow-500';
      break;
    case 'secondary':
      variantClasses =
        'bg-medium-gray text-white hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-opacity-75';
      break;
    case 'outline':
      variantClasses =
        'border border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75';
      break;
    case 'ghost':
      variantClasses =
        'text-charcoal hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75';
      break;
    case 'success':
      variantClasses =
        'bg-mint-green text-white hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-mint-green focus:ring-opacity-75';
      break;
    // Add more variants as needed (e.g., 'danger', 'info')
    default:
      variantClasses =
        'bg-gray-200 text-charcoal hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-opacity-75';
  }

  // Styles based on the 'size' prop
  let sizeClasses = '';
  let iconSizeClasses = ''; // For adjusting icon size if needed
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1.5 text-sm gap-1.5';
      iconSizeClasses = 'h-4 w-4'; // Smaller icon for small button
      break;
    case 'md':
      sizeClasses = 'px-4 py-2 text-base gap-2';
      iconSizeClasses = 'h-5 w-5'; // Default icon size
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg gap-2.5';
      iconSizeClasses = 'h-6 w-6'; // Larger icon for large button
      break;
    default:
      sizeClasses = 'px-4 py-2 text-base gap-2';
      iconSizeClasses = 'h-5 w-5';
  }

  // Disabled state styling
  const disabledClasses = disabled
    ? 'opacity-60 cursor-not-allowed pointer-events-none'
    : '';

  // Combine all classes
  const combinedClasses =
    `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`.trim();

  // Clone icons to add dynamic size classes
  const renderIcon = icon => {
    if (!icon) return null;
    return React.cloneElement(icon, {
      className: `${icon.props.className || ''} ${iconSizeClasses}`.trim(),
    });
  };

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {iconLeft && renderIcon(iconLeft)}
      {children}
      {iconRight && renderIcon(iconRight)}
    </button>
  );
};

export default Button;
