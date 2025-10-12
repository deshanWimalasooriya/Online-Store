export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041026] via-[#071226] to-[#07050a] opacity-85"></div>

      {/* Circuit board SVG animation */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* subtle grid overlay */}
        <g opacity="0.03" stroke="#ffffff" strokeWidth="1">
          <path d="M0 100 H1920" />
          <path d="M0 220 H1920" />
          <path d="M0 340 H1920" />
          <path d="M0 460 H1920" />
          <path d="M0 580 H1920" />
        </g>

        {/* animated traces */}
        <g strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <path className="trace trace-ice" d="M120 180 H420 v60 H720 v120 H1200" strokeDasharray="1200" strokeDashoffset="1200" />
          <path className="trace trace-ice" d="M1600 200 h-300 v100 h-200 v60 h-400" strokeDasharray="1000" strokeDashoffset="1000" />
          <path className="trace trace-fire" d="M300 60 v140 h200 v40 h240 v80 h300" strokeDasharray="1400" strokeDashoffset="1400" />
          <path className="trace trace-fire" d="M600 800 h-200 v-80 h-160 v-60 h-120" strokeDasharray="800" strokeDashoffset="800" />
        </g>

        {/* nodes */}
        <g>
          <circle className="node node-ice" cx="120" cy="180" r="6" />
          <circle className="node node-ice" cx="420" cy="180" r="5" />
          <circle className="node node-fire" cx="720" cy="240" r="6" />
          <circle className="node node-ice" cx="1200" cy="360" r="5" />
          <circle className="node node-fire" cx="300" cy="60" r="5" />
          <circle className="node node-ice" cx="1600" cy="200" r="5" />
          <circle className="node node-fire" cx="600" cy="800" r="5" />
        </g>

      </svg>

    </div>
  )
}
