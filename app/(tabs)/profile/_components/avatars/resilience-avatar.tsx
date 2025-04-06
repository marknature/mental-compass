export function ResilienceAvatar() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect x="0" y="0" width="200" height="200" rx="30" fill="#F59E0B" />
      <path
        d="M100,40 L100,160"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M70,70 L130,130"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M70,130 L130,70"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="75" y="75" width="50" height="50" rx="10" fill="#FEF3C7" />
      <rect x="85" y="85" width="30" height="30" rx="6" fill="#F59E0B" />
    </svg>
  );
}
