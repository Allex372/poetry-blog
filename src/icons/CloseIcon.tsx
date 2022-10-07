import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const CloseIcon = ({ className, onClick }: CloseProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 14L34 34" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 34L34 14" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
