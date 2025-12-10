import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    helper,
    icon,
    iconPosition = 'left',
    disabled = false,
    className = '',
    ...props
  },
  ref
) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-a7-dark-700/50 border border-a7-dark-500
            text-white placeholder-gray-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-a7-primary/50 focus:border-a7-primary
            hover:border-a7-dark-400
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon && iconPosition === 'left' ? 'pl-12' : ''}
            ${icon && iconPosition === 'right' ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
          `}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {helper && !error && <p className="mt-2 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});

export default Input;
