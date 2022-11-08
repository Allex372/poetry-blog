import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const UserIcon = ({ className, onClick }: CloseProps) => {
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
        d="M24 22C18.5 22 14 17.5 14 12C14 6.5 18.5 2 24 2C29.5 2 34 6.5 34 12C34 17.5 29.5 22 24 22ZM24 6C20.7 6 18 8.7 18 12C18 15.3 20.7 18 24 18C27.3 18 30 15.3 30 12C30 8.7 27.3 6 24 6ZM44 44C44 33 35 24 24 24C13 24 4 33 4 44C4 45.1 4.9 46 6 46C7.1 46 8 45.1 8 44C8 35.2 15.2 28 24 28C32.8 28 40 35.2 40 44C40 45.1 40.9 46 42 46C43.1 46 44 45.1 44 44Z"
        fill="black"
      />
    </svg>
  );
};
