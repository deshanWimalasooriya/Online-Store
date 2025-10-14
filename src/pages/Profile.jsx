import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Profile(){
  const { user, updateProfile, addPaymentMethod, removePaymentMethod, orders } = useUser()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name||'', line1: user?.address?.line1||'', city: user?.address?.city||'' })
  const [picPreview, setPicPreview] = useState(user?.profilePicture||'')

  if (!user) return <div className="mx-auto max-w-md px-4 py-8">Please sign in to view your profile.</div>

  const save = async () => {
    const updates = { name: form.name, address: { ...user.address, line1: form.line1, city: form.city } }
    if (picPreview) updates.profilePicture = picPreview
    updateProfile(updates)
    setEditing(false)
  }

  const onFile = (f) => {
    const fr = new FileReader()
    fr.onload = () => setPicPreview(fr.result)
    fr.readAsDataURL(f)
  }

  const addCard = () => {
    const brand = prompt('Card brand (e.g., Visa)')
    const last4 = prompt('Last 4 digits')
    const exp = prompt('Expiry (MM/YY)')
    if (!brand || !last4) return
    addPaymentMethod({ brand, last4, exp, type: 'card' })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="card p-4 lg:col-span-1">
        <div className="flex flex-col items-center">
          {picPreview ? <img src={picPreview} alt="avatar" className="w-28 h-28 rounded-full object-cover" /> : <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-2xl">{(user.name||user.email||'U').slice(0,1).toUpperCase()}</div>}
          <div className="mt-3 text-center">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-white/60">{user.email}</div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm text-white/70">Payment methods</h4>
          <div className="mt-2 space-y-2">
            {(user.paymentMethods||[]).length===0 ? <div className="text-white/60 text-sm">No payment methods</div> : (user.paymentMethods||[]).map(pm=> (
              <div key={pm.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium">{pm.brand} •••• {pm.last4}</div>
                  <div className="text-xs text-white/60">{pm.exp}</div>
                </div>
                <div className="flex gap-2">
                  <button className="pill" onClick={()=>alert('Payment details would be shown here')}>Details</button>
                  <button className="pill text-fire-300" onClick={()=>removePaymentMethod(pm.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="mt-2">
              <button className="btn-primary w-full" onClick={addCard}>Add Card</button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg">Profile</h3>
            <div>
              <button className="pill" onClick={()=>{ setEditing(e=>!e); setForm({ name: user.name || '', line1: user.address?.line1||'', city: user.address?.city||'' }) }}>{editing ? 'Cancel' : 'Edit'}</button>
              {editing && <button className="btn-primary ml-2" onClick={save}>Save</button>}
            </div>
          </div>

          {!editing ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-white/60">Full name</div>
                <div className="font-medium">{user.name}</div>
              </div>
              <div>
                <div className="text-sm text-white/60">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-white/60">Address</div>
                <div className="font-medium">{user.address?.line1 || '—'}</div>
                <div className="text-sm text-white/60">{user.address?.city || ''}</div>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Full name</label>
                <input value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-white/70">Profile picture</label>
                <input type="file" accept="image/*" onChange={e=>onFile(e.target.files[0])} className="mt-1 w-full text-sm" />
              </div>
              <div>
                <label className="text-sm text-white/70">Address line</label>
                <input value={form.line1} onChange={e=>setForm(f=>({...f, line1: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-white/70">City</label>
                <input value={form.city} onChange={e=>setForm(f=>({...f, city: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
              </div>
            </div>
          )}
        </div>

        <div className="card p-4">
          <h3 className="font-display text-lg">Orders</h3>
          <div className="mt-3 space-y-3">
            {(user.orders||[]).length===0 ? <div className="text-white/60">No orders yet.</div> : (user.orders||[]).map(o=> (
              <div key={o.id} className="p-3 border rounded flex items-start justify-between">
                <div>
                  <div className="font-medium">{o.id} <span className="text-sm text-white/60">{o.date}</span></div>
                  <div className="text-sm text-white/60">Total: ${Number(o.total||0).toFixed(2)}</div>
                  <div className="mt-2 text-sm">{(o.items||[]).map(it=> <div key={it.id}>{it.qty}× {it.name} �� ${it.price}</div>)}</div>
                </div>
                <div className="text-sm text-white/60">Status: <strong>{o.status||'pending'}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
