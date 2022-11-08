import React, { useEffect } from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const DeleteIcon = ({ className, onClick }: CloseProps) => {
  useEffect(() => {
    console.log(onClick);
  }, [onClick]);
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
        d="M31 12.3L30.1 7H17.9L17 12.3L13 11.7L14.2 4.7C14.4 3.7 15.2 3 16.2 3H31.8C32.8 3 33.6 3.7 33.8 4.7L35 11.7L31 12.3ZM44 12C44 10.9 43.1 10 42 10H6C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14H42C43.1 14 44 13.1 44 12ZM37 43.1L39 12.1C39 11.5 38.8 11 38.5 10.6C38.1 10.2 37.6 10 37 10H11C10.4 10 9.9 10.2 9.5 10.6C9.2 11 9 11.6 9 12.1L11 43.1C11.1 44.2 11.9 45 13 45H35C36.1 45 36.9 44.2 37 43.1ZM13.1 14H34.8L33.1 41H14.9L13.1 14ZM31 35C31 33.9 30.1 33 29 33H19C17.9 33 17 33.9 17 35C17 36.1 17.9 37 19 37H29C30.1 37 31 36.1 31 35Z"
        fill="black"
      />
    </svg>
  );
};
