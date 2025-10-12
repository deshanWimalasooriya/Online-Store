import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Profile() {
  const { user, createAccount, orders } = useUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl">User Profile</h1>
      {!user ? (
        <form onSubmit={(e)=>{e.preventDefault(); createAccount({ name, email })}} className="mt-6 card p-4 grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm text-white/70">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
          </div>
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
          </div>
          <div className="flex justify-end"><button className="btn-primary">Create Account</button></div>
        </form>
      ) : (
        <div className="mt-6 card p-4">
          <div className="font-display text-xl">Welcome, {user.name}</div>
          <div className="text-white/70">{user.email}</div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-display text-xl">Past Orders</h2>
        <div className="mt-3 grid gap-3">
          {orders.map(o => (
            <div key={o.id} className="card p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{o.id}</div>
                <div className="text-white/60 text-sm">{o.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${o.total.toFixed(2)}</div>
                <div className="text-white/60 text-sm">{o.items} items</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
