import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const HomeIcon = ({ className, onClick }: CloseProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="44"
      height="40"
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 38V14L2 18L22 2L42 18L37 14V38H7Z"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 25V38H27V25H17Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
      <path d="M7 38H37" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};
