import { useEffect, useState, useRef } from 'react'

export default function ImageSlider({ images = [], interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!images || images.length === 0) return
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [images, interval])

  const prev = () => {
    clearInterval(timerRef.current)
    setIndex(i => (i - 1 + images.length) % images.length)
  }
  const next = () => {
    clearInterval(timerRef.current)
    setIndex(i => (i + 1) % images.length)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="relative h-64 sm:h-80 md:h-96">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionTimingFunction: 'ease-in-out' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
        <button onClick={prev} aria-label="previous" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60">
          ‹
        </button>
        <button onClick={next} aria-label="next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60">
          ›
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={()=>setIndex(i)} className={`h-2 w-8 rounded-full ${i===index ? 'bg-ice-400' : 'bg-white/20'}`}></button>
        ))}
      </div>
    </div>
  )
}
