import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-1">
        {label}
      </label>
      <input
        className={`w-full px-5 py-3 bg-zinc-50 border-none rounded-xl text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-200 focus:bg-white transition-all outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-1">
        {label}
      </label>
      <textarea
        className={`w-full px-5 py-3 bg-zinc-50 border-none rounded-xl text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-200 focus:bg-white transition-all outline-none resize-none ${className}`}
        {...props}
      />
    </div>
  );
};