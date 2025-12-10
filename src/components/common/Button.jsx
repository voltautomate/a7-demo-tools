import { motion } from 'framer-motion';

// Exact Wix site button styles
const variants = {
  // Primary: Orange fill, white text → Hover: White fill, orange text
  primary: 'bg-[#C45308] text-white border border-[#C45308] hover:bg-white hover:text-[#C45308]',
  // Secondary: White fill, orange text → Hover: Orange fill, white text
  secondary: 'bg-white text-[#C45308] border border-[#C45308] hover:bg-[#C45308] hover:text-white',
  // Outline: Transparent, white border → Hover: White fill, black text
  outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
  // Ghost: Transparent → Hover: Dark background
  ghost: 'bg-transparent hover:bg-[#141414] text-gray-300',
  // Success: Green
  success: 'bg-[#10b981] hover:bg-emerald-400 text-white',
  // Accent: Same as primary
  accent: 'bg-[#C45308] text-white border border-[#C45308] hover:bg-white hover:text-[#C45308]',
  // Black: Black with subtle border
  black: 'bg-black border border-white/20 hover:border-[#C45308] text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        font-semibold tracking-wide transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[#C45308]/50 focus:ring-offset-2 focus:ring-offset-black
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#808080] disabled:border-[#808080] disabled:text-white disabled:hover:bg-[#808080]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
}
