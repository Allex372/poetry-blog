import { IconProps } from '../types';

export const MenuIcon = ({ className, onClick }: IconProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="36"
      height="22"
      viewBox="0 0 36 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.10352e-05 2C6.10352e-05 0.89543 0.895491 0 2.00006 0H34.0001C35.1046 0 36.0001 0.89543 36.0001 2C36.0001 3.10457 35.1046 4 34.0001 4H2.00006C0.895491 4 6.10352e-05 3.10457 6.10352e-05 2Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.10352e-05 11C6.10352e-05 9.89543 0.895491 9 2.00006 9H34.0001C35.1046 9 36.0001 9.89543 36.0001 11C36.0001 12.1046 35.1046 13 34.0001 13H2.00006C0.895491 13 6.10352e-05 12.1046 6.10352e-05 11Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.10352e-05 20C6.10352e-05 18.8954 0.895491 18 2.00006 18H34.0001C35.1046 18 36.0001 18.8954 36.0001 20C36.0001 21.1046 35.1046 22 34.0001 22H2.00006C0.895491 22 6.10352e-05 21.1046 6.10352e-05 20Z"
        fill="black"
      />
    </svg>
  );
};
