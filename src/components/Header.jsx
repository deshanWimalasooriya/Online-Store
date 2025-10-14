import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useNotifications } from '../context/NotificationContext'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <svg className="h-8 w-8 text-ice-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.12" />
        <path d="M2 10h3M2 14h3M19 10h3M19 14h3M10 2v3M14 2v3M10 19v3M14 19v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-xl tracking-wider">CircuitChic</span>
    </Link>
  )
}

export default function Header() {
  const { count, total } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const { notifications, unreadCount, clearUnread, removeNotification } = useNotifications()
  const [open, setOpen] = useState(false)

  useEffect(()=>{ setQ(params.get('q') || '') },[params])

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  const toggleNotifications = () => {
    setOpen(v=>!v)
    if (!open) clearUnread()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        <div className="flex items-center gap-4 relative">
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <Link className="hover:text-white" to="/">Home</Link>
            <Link className="hover:text-white" to="/products">Products</Link>
            <Link className="hover:text-white" to="/about">About</Link>
            <Link className="hover:text-white" to="/contact">Contact</Link>
            <Link className="hover:text-white" to="/admin">Admin</Link>
          </nav>

          <div className="relative">
            <button onClick={toggleNotifications} className="relative p-2 rounded hover:bg-white/5">
              <svg className="h-6 w-6 text-ice-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {unreadCount>0 && <span className="absolute -top-1 -right-1 rounded-full bg-fire-500 px-2 py-0.5 text-xs font-bold shadow-glowFire">{unreadCount}</span>}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-80 bg-[#061221] border border-white/5 rounded shadow-lg z-50">
                <div className="p-3 border-b border-white/5 flex items-center justify-between">
                  <div className="font-medium">Notifications</div>
                  <button className="text-sm text-white/60" onClick={(e)=>{ e.stopPropagation(); clearUnread() }}>Mark all read</button>
                </div>
                <div className="max-h-64 overflow-auto p-2 space-y-2">
                  {notifications.length===0 ? (
                    <div className="text-white/60 text-sm p-3">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`p-2 rounded hover:bg-white/2 flex items-start gap-2 ${n.read? 'opacity-60':''}`}>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{n.title}</div>
                          <div className="text-xs text-white/60">{n.message}</div>
                          <div className="text-xs text-white/50 mt-1">{new Date(n.date).toLocaleString()}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={(e)=>{ e.stopPropagation(); removeNotification(n.id) }} className="text-xs text-fire-300">Dismiss</button>
                          {n.url && <a href={n.url} className="text-xs text-ice-300">Open</a>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative inline-flex">
            <svg className="h-7 w-7 text-ice-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-12-9h14.036c.64 0 1.108.593.98 1.22l-1.35 6.75a1.125 1.125 0 0 1-1.1.88H7.5m0 0L5.25 6.75m2.25 7.5L4.136 5.272M9 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/></svg>
            <span className="absolute -right-2 -top-2 rounded-full bg-fire-500 px-2 py-0.5 text-xs font-bold shadow-glowFire">{count}</span>
          </Link>
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-center px-4 pb-3">
        <form onSubmit={onSearch} className="flex items-center gap-2 w-full max-w-2xl">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tech or power..." className="w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ice-500" />
          <button className="btn-primary">Search</button>
        </form>
      </div>
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={onSearch} className="flex items-center gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tech or power..." className="flex-1 rounded-md border border-white/10 bg-[#111727] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ice-500" />
          <button className="btn-primary">Go</button>
        </form>
      </div>
    </header>
  )
}
