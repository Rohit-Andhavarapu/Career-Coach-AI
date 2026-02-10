import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm tracking-wide";
  
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-900 shadow-lg shadow-zinc-900/10 active:scale-[0.98]",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-300 active:scale-[0.98]",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-200 active:scale-[0.98]",
    outline: "border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 bg-transparent focus:ring-zinc-200",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};