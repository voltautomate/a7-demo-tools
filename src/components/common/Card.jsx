import { motion } from 'framer-motion';

const variants = {
  default: 'bg-a7-dark-800/90 border-a7-dark-600/50',
  elevated: 'bg-a7-dark-800 border-a7-dark-600 shadow-xl shadow-black/40',
  glass: 'bg-a7-dark-800/60 backdrop-blur-xl border-a7-dark-600/40',
  gradient: 'bg-gradient-to-br from-a7-dark-800 to-a7-dark-900 border-a7-dark-600/50',
  glow: 'bg-a7-dark-800/80 border-a7-primary/30 shadow-lg shadow-a7-primary/10',
  dark: 'bg-black/80 border-a7-dark-700/50',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  animate = false,
  className = '',
  onClick,
  ...props
}) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = animate ? motion.div : 'div';
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  const hoverProps = hover
    ? {
        whileHover: { scale: 1.02, y: -4 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <Component
      className={`
        rounded-xl border transition-all duration-300
        ${variants[variant]}
        ${paddingSizes[padding]}
        ${hover ? 'cursor-pointer hover:border-a7-primary/50 hover:shadow-lg hover:shadow-a7-primary/10' : ''}
        ${className}
      `}
      onClick={onClick}
      {...animateProps}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
}
