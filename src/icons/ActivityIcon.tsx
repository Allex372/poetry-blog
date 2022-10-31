import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const ActivityIcon = ({ className, onClick }: CloseProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4C7.10457 4 8 4.89543 8 6V40H42C43.1046 40 44 40.8954 44 42C44 43.1046 43.1046 44 42 44H6C4.89543 44 4 43.1046 4 42V6C4 4.89543 4.89543 4 6 4ZM30 4C31.1046 4 32 4.89543 32 6V34C32 35.1046 31.1046 36 30 36C28.8954 36 28 35.1046 28 34V6C28 4.89543 28.8954 4 30 4ZM38 12C39.1046 12 40 12.8954 40 14V34C40 35.1046 39.1046 36 38 36C36.8954 36 36 35.1046 36 34V14C36 12.8954 36.8954 12 38 12ZM22 20C23.1046 20 24 20.8954 24 22V34C24 35.1046 23.1046 36 22 36C20.8954 36 20 35.1046 20 34V22C20 20.8954 20.8954 20 22 20ZM14 28C15.1046 28 16 28.8954 16 30V34C16 35.1046 15.1046 36 14 36C12.8954 36 12 35.1046 12 34V30C12 28.8954 12.8954 28 14 28Z"
        fill="black"
      />
    </svg>
  );
};
