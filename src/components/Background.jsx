export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* subtle animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041026] via-[#071226] to-[#10050a] opacity-80"></div>

      {/* drifting glowing orbs */}
      <div className="absolute left-10 top-20 w-72 h-72 rounded-full bg-ice-400/10 blur-3xl animate-orb1" />
      <div className="absolute right-24 top-40 w-64 h-64 rounded-full bg-fire-500/10 blur-3xl animate-orb2" />
      <div className="absolute left-1/2 top-10 w-96 h-96 -translate-x-1/2 rounded-full bg-ice-500/6 blur-2xl animate-orb3" />

      {/* tech grid lines svg */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#1aa7ff" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#ff6a14" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#g1)" />
        <g stroke="#ffffff20" strokeWidth="1">
          <line x1="10%" y1="0" x2="10%" y2="100%" className="animate-line-slow" />
          <line x1="30%" y1="0" x2="30%" y2="100%" className="animate-line-reverse" />
          <line x1="50%" y1="0" x2="50%" y2="100%" className="animate-line-slow" />
          <line x1="70%" y1="0" x2="70%" y2="100%" className="animate-line-reverse" />
          <line x1="90%" y1="0" x2="90%" y2="100%" className="animate-line-slow" />
        </g>
      </svg>

      {/* small animated nodes */}
      <div className="absolute top-28 left-24 w-2 h-2 rounded-full bg-ice-400 animate-pulse-fast" />
      <div className="absolute top-52 left-[40%] w-2 h-2 rounded-full bg-fire-400 animate-pulse-slow" />
      <div className="absolute bottom-24 right-40 w-2 h-2 rounded-full bg-ice-300 animate-pulse-slow" />
    </div>
  )
}
