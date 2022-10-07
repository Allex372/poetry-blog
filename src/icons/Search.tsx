import React from 'react';

import { IconProps } from '../types';

export const SearchIcon = ({ className, onClick }: IconProps) => {
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
      <path
        d="M21 38C30.389 38 38 30.389 38 21C38 11.611 30.389 4 21 4C11.611 4 4 11.611 4 21C4 30.389 11.611 38 21 38Z"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M33.222 33.222L41.707 41.707"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
