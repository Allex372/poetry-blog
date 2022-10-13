import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const CustomizingIcon = ({ className, onClick }: CloseProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 2H16V13H2V2Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 27H38V38H24V27Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 2H38V19H24V2Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
      <path d="M2 21H16V38H2V21Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
};
