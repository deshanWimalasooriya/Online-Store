import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function Auth(){
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name:'', email:'', password:'', address:'' })
  const { login, register } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try{
      setError('')
      if (mode==='login'){
        await login({ email: form.email, password: form.password })
        navigate('/profile')
      } else {
        await register({ name: form.name, email: form.email, password: form.password, address: { line1: form.address } })
        navigate('/profile')
      }
    }catch(err){ setError(err.message || String(err)) }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">{mode==='login' ? 'Sign in' : 'Create account'}</h2>
          <div className="text-sm">
            <button onClick={()=>setMode(mode==='login'?'register':'login')} className="pill">{mode==='login' ? 'Create account' : 'Have an account?'}</button>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode==='register' && (
            <div>
              <label className="text-sm text-white/70">Full name</label>
              <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
            </div>
          )}
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} type="email" required className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-white/70">Password</label>
            <input value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))} type="password" required className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
          </div>
          {error && <div className="text-sm text-fire-300">{error}</div>}
          <div className="flex gap-2">
            <button className="btn-primary">{mode==='login' ? 'Sign in' : 'Create account'}</button>
            <button type="button" className="pill" onClick={()=>setForm({ name:'', email:'', password:'', address:'' })}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}
