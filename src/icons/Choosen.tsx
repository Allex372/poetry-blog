import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const ChoosenIcon = ({ className }: CloseProps) => {
  return (
    <svg
      className={className}
      width="34"
      height="24"
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 24C11.5 24 11 23.8 10.6 23.4L0.6 13.4C-0.2 12.6 -0.2 11.4 0.6 10.6C1.4 9.8 2.6 9.8 3.4 10.6L12 19.2L30.6 0.6C31.4 -0.2 32.6 -0.2 33.4 0.6C34.2 1.4 34.2 2.6 33.4 3.4L13.4 23.4C13 23.8 12.5 24 12 24Z"
        fill="black"
      />
    </svg>
  );
};
