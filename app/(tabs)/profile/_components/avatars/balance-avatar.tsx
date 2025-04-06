export function BalanceAvatar() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect x="0" y="0" width="200" height="200" rx="30" fill="#0EA5E9" />
      <rect x="40" y="120" width="120" height="10" rx="5" fill="#FFFFFF" />
      <rect
        x="92"
        y="117"
        width="16"
        height="16"
        rx="4"
        fill="#0EA5E9"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <path
        d="M70,120 L70,80 L130,80 L130,120"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="50" y="40" width="40" height="40" rx="8" fill="#BAE6FD" />
      <rect x="110" y="40" width="40" height="40" rx="8" fill="#BAE6FD" />
    </svg>
  );
}
