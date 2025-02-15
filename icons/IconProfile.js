import { palette } from 'theme/palette';

export function IconProfile({ size = 22, hexColor = palette.primary.main }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9849 14.3462C7.11731 14.3462 3.81445 14.931 3.81445 17.2729C3.81445 19.6148 7.09636 20.2205 10.9849 20.2205C14.8525 20.2205 18.1545 19.6348 18.1545 17.2938C18.1545 14.9529 14.8735 14.3462 10.9849 14.3462Z"
        stroke={hexColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9849 11.0059C13.523 11.0059 15.5801 8.94779 15.5801 6.40969C15.5801 3.8716 13.523 1.81445 10.9849 1.81445C8.44679 1.81445 6.3887 3.8716 6.3887 6.40969C6.38013 8.93922 8.42394 10.9973 10.9525 11.0059H10.9849Z"
        stroke={hexColor}
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
