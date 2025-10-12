import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 rounded-md bg-gradient-to-br from-ice-400 to-fire-500 shadow-glowIce"></span>
      <span className="font-display text-xl tracking-wider">IceFire Tech</span>
    </Link>
  )
}

export default function Header() {
  const { count } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(()=>{ setQ(params.get('q') || '') },[params])

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
            <Link className="hover:text-white" to="/">Home</Link>
            <Link className="hover:text-white" to="/products">Products</Link>
            <Link className="hover:text-white" to="/about">About</Link>
            <Link className="hover:text-white" to="/contact">Contact</Link>
            <Link className="hover:text-white" to="/admin">Admin</Link>
          </nav>
        </div>
        <form onSubmit={onSearch} className="hidden sm:flex items-center gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tech or power..." className="w-64 rounded-md border border-white/10 bg-[#111727] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ice-500" />
          <button className="btn-primary">Search</button>
        </form>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative inline-flex">
            <svg className="h-7 w-7 text-ice-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-12-9h14.036c.64 0 1.108.593.98 1.22l-1.35 6.75a1.125 1.125 0 0 1-1.1.88H7.5m0 0L5.25 6.75m2.25 7.5L4.136 5.272M9 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/></svg>
            <span className="absolute -right-2 -top-2 rounded-full bg-fire-500 px-2 py-0.5 text-xs font-bold shadow-glowFire">{count}</span>
          </Link>
        </div>
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
