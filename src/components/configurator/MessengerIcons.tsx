"use client";

interface IconProps {
  className?: string;
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.2 4.8 18 19.9c-.2.9-.7 1.1-1.5.7L11.6 17l-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L5.8 13.4.9 11.9c-1-.3-1-.9.2-1.4L20 3.2c.9-.3 1.6.2 1.2 1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MaxIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="max-icon-base" x1="117.847" y1="760.536" x2="1000" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4CF" />
          <stop offset="0.662" stopColor="#53E" />
          <stop offset="1" stopColor="#93D" />
        </linearGradient>
        <linearGradient id="max-icon-glow">
          <stop offset="0" stopColor="#00F" />
          <stop offset="1" stopOpacity="0" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="max-icon-overlay"
          cx="-87.392"
          cy="1166.116"
          r="500"
          fx="-87.392"
          fy="1166.116"
          gradientTransform="rotate(51.356 1551.478 559.3) scale(2.42703433 1)"
          gradientUnits="userSpaceOnUse"
          href="#max-icon-glow"
        />
      </defs>
      <rect width="1000" height="1000" rx="249.681" fill="url(#max-icon-base)" />
      <rect width="1000" height="1000" rx="249.681" fill="url(#max-icon-overlay)" />
      <path
        d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z"
        fill="#FFF"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
