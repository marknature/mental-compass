export function HealingAvatar() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect x="0" y="0" width="200" height="200" rx="30" fill="#EC4899" />
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        rx="20"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
      />
      <rect x="70" y="70" width="60" height="60" rx="12" fill="#FBCFE8" />
      <path
        d="M85,100 L115,100 M100,85 L100,115"
        stroke="#EC4899"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
