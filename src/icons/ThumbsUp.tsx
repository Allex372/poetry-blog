import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const ThumbsUp = ({ className }: CloseProps) => {
  return (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 42C33.046 42 42 33.046 42 22C42 10.954 33.046 2 22 2C10.954 2 2 10.954 2 22C2 33.046 10.954 42 22 42Z"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M29 16V17" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 16V17" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M29 29C29 29 27 33 22 33C17 33 15 29 15 29"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
