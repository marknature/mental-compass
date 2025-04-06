export function MindfulnessAvatar() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect x="0" y="0" width="200" height="200" rx="30" fill="#8B5CF6" />
      <rect x="20" y="20" width="160" height="160" rx="24" fill="#A78BFA" />
      <rect x="40" y="40" width="120" height="120" rx="18" fill="#C4B5FD" />
      <rect x="60" y="60" width="80" height="80" rx="12" fill="#EDE9FE" />
      <rect x="80" y="80" width="40" height="40" rx="6" fill="#FFFFFF" />
      <rect x="90" y="90" width="20" height="20" rx="3" fill="#8B5CF6" />
      <g transform="translate(70, 70)">
        <rect
          x="0"
          y="0"
          width="60"
          height="60"
          rx="10"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
