import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const ImageIcon = ({ className, onClick }: CloseProps) => {
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
      <path
        d="M35 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V35C2 35.7956 2.31607 36.5587 2.87868 37.1213C3.44129 37.6839 4.20435 38 5 38H35C35.7956 38 36.5587 37.6839 37.1213 37.1213C37.6839 36.5587 38 35.7956 38 35V5C38 4.20435 37.6839 3.44129 37.1213 2.87868C36.5587 2.31607 35.7956 2 35 2Z"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 19C15.3261 19 16.5979 18.4732 17.5355 17.5355C18.4732 16.5979 19 15.3261 19 14C19 12.6739 18.4732 11.4021 17.5355 10.4645C16.5979 9.52678 15.3261 9 14 9C12.6739 9 11.4021 9.52678 10.4645 10.4645C9.52678 11.4021 9 12.6739 9 14C9 15.3261 9.52678 16.5979 10.4645 17.5355C11.4021 18.4732 12.6739 19 14 19V19Z"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 32L27 22L17 31L10 25L2 31"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
