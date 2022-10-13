import React from 'react';

interface CloseProps {
  className?: string;
  onClick?: () => void;
}

export const SettingsIcon = ({ className, onClick }: CloseProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.284 41.1709C12.9761 40.1833 9.98018 38.356 7.588 35.8669C8.35768 34.954 8.83747 33.8323 8.96599 32.6451C9.09451 31.458 8.86591 30.2596 8.30944 29.2031C7.75298 28.1467 6.89395 27.2803 5.84229 26.7148C4.79063 26.1493 3.59417 25.9105 2.406 26.0289C2.13532 24.703 1.9993 23.3531 2 21.9999C2 19.9099 2.32 17.8939 2.916 15.9999H3C4.01976 16.0002 5.02277 15.7406 5.91434 15.2456C6.8059 14.7507 7.55659 14.0366 8.09553 13.1709C8.63447 12.3052 8.94387 11.3164 8.99452 10.2979C9.04517 9.27941 8.8354 8.2648 8.385 7.3499C10.7296 5.16672 13.5651 3.57973 16.652 2.7229C17.1544 3.7093 17.9198 4.5375 18.8637 5.11585C19.8076 5.69421 20.893 6.00017 22 5.9999C23.107 6.00017 24.1924 5.69421 25.1363 5.11585C26.0802 4.5375 26.8456 3.7093 27.348 2.7229C30.4349 3.57973 33.2704 5.16672 35.615 7.3499C35.1613 8.27121 34.9517 9.29355 35.0062 10.3191C35.0608 11.3446 35.3776 12.3389 35.9264 13.2069C36.4752 14.0749 37.2376 14.7876 38.1407 15.2766C39.0437 15.7656 40.0572 16.0147 41.084 15.9999C41.693 17.9416 42.0018 19.9649 42 21.9999C42 23.3799 41.86 24.7279 41.594 26.0289C40.4058 25.9105 39.2094 26.1493 38.1577 26.7148C37.1061 27.2803 36.247 28.1467 35.6906 29.2031C35.1341 30.2596 34.9055 31.458 35.034 32.6451C35.1625 33.8323 35.6423 34.954 36.412 35.8669C34.0198 38.356 31.0239 40.1833 27.716 41.1709C27.3276 39.9602 26.5647 38.9041 25.5374 38.1548C24.5102 37.4056 23.2715 37.0018 22 37.0018C20.7285 37.0018 19.4899 37.4056 18.4626 38.1548C17.4353 38.9041 16.6725 39.9602 16.284 41.1709Z"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M22 29C22.9193 29 23.8295 28.8189 24.6788 28.4672C25.5281 28.1154 26.2997 27.5998 26.9497 26.9497C27.5998 26.2997 28.1154 25.5281 28.4672 24.6788C28.8189 23.8295 29 22.9193 29 22C29 21.0807 28.8189 20.1705 28.4672 19.3212C28.1154 18.4719 27.5998 17.7003 26.9497 17.0503C26.2997 16.4002 25.5281 15.8846 24.6788 15.5328C23.8295 15.1811 22.9193 15 22 15C20.1435 15 18.363 15.7375 17.0503 17.0503C15.7375 18.363 15 20.1435 15 22C15 23.8565 15.7375 25.637 17.0503 26.9497C18.363 28.2625 20.1435 29 22 29V29Z"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
};
