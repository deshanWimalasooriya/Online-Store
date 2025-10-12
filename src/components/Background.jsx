import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const particles = []
    const particleCount = Math.max(50, Math.floor((w * h) / 90000))
    const maxConnect = 140
    const mouse = { x: -9999, y: -9999 }

    function rand(min, max) { return Math.random() * (max - min) + min }

    for (let i = 0; i < particleCount; i++) {
      // smaller initial velocities for slower motion
      particles.push({ x: rand(0, w), y: rand(0, h), vx: rand(-0.12, 0.12), vy: rand(-0.12, 0.12), r: rand(1, 2.5) })
    }

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }

    function distance(a, b) { const dx = a.x - b.x; const dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy) }

    let raf
    function draw() {
      ctx.clearRect(0, 0, w, h)

      // background tint
      ctx.fillStyle = 'rgba(6,10,16,0.25)'
      ctx.fillRect(0,0,w,h)

      // connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = distance(p, q)
          if (d < maxConnect) {
            const midx = (p.x + q.x) / 2
            const midy = (p.y + q.y) / 2
            const md = Math.hypot(midx - mouse.x, midy - mouse.y)
            const proximity = Math.max(0, 1 - md / 250)
            const alpha = (1 - d / maxConnect) * 0.6 + proximity * 0.6
            const grad = ctx.createLinearGradient(p.x, p.y, q.x, q.y)
            grad.addColorStop(0, `rgba(26,167,255,${alpha})`)
            grad.addColorStop(1, `rgba(255,106,20,${alpha})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        const glow = Math.max(0, 1 - md / 220)
        ctx.fillStyle = `rgba(26,167,255,${0.25 + 0.5 * glow})`
        ctx.arc(p.x, p.y, p.r + glow * 1.8, 0, Math.PI * 2)
        ctx.fill()

        // move
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // respond to mouse
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const mdist = Math.sqrt(dx*dx + dy*dy)
        if (mdist < 120) {
          p.vx += dx * 0.0008
          p.vy += dy * 0.0008
        }
      }

      raf = requestAnimationFrame(draw)
    }

    function onMove(e) {
      const ev = e.touches ? e.touches[0] : e
      mouse.x = ev.clientX
      mouse.y = ev.clientY
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999 }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('resize', resize)

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
