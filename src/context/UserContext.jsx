import { createContext, useContext, useEffect, useState } from 'react'
import { seedUsers } from '../data/users'

const UserContext = createContext(null)

function hashPassword(pw){
  // simple deterministic hash for frontend-only mock (NOT secure)
  try { return btoa(`${pw}::salt`) } catch(e){ return `${pw}::salt` }
}

function makeToken(payload){
  // fake JWT-like token (base64 payload + signature)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  const sig = btoa('signature')
  return `${header}.${body}.${sig}`
}

function parseToken(token){
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    return JSON.parse(atob(parts[1]))
  } catch(e){ return null }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(()=>{
    try {
      const raw = localStorage.getItem('mock_users')
      if (raw) return JSON.parse(raw)
    } catch(e){}
    return seedUsers
  })

  const [orders, setOrders] = useState(()=>{
    // merge orders from users for convenience
    try {
      const raw = localStorage.getItem('mock_orders')
      if (raw) return JSON.parse(raw)
    } catch(e){}
    // gather orders from seed users
    const all = []
    users.forEach(u=>{
      if (Array.isArray(u.orders)) all.push(...u.orders)
    })
    return all
  })

  useEffect(()=>{
    try { localStorage.setItem('mock_users', JSON.stringify(users)) } catch(e){}
  },[users])

  useEffect(()=>{
    try { localStorage.setItem('mock_orders', JSON.stringify(orders)) } catch(e){}
  },[orders])

  useEffect(()=>{
    // restore session from token if present
    try{
      const token = localStorage.getItem('auth_token')
      const payload = token ? parseToken(token) : null
      if (payload && payload.email){
        const found = users.find(u=>u.email===payload.email)
        if (found) setUser(found)
      }
    }catch(e){}
  },[])

  const register = ({ name, email, password, address, paymentMethods }) => {
    if (!email || !password) throw new Error('Email and password required')
    const exists = users.find(u=>u.email===email)
    if (exists) throw new Error('Email already registered')
    const id = `usr-${Date.now()}`
    const newUser = { id, name, email, passwordHash: hashPassword(password), address: address||{}, paymentMethods: paymentMethods||[], profilePicture: '', orders: [] }
    setUsers(u=>[newUser, ...u])
    const token = makeToken({ email, name, iat: Date.now() })
    localStorage.setItem('auth_token', token)
    setUser(newUser)
    return newUser
  }

  const login = ({ email, password }) => {
    const found = users.find(u=>u.email===email)
    if (!found) throw new Error('User not found')
    if (found.passwordHash !== hashPassword(password)) throw new Error('Invalid credentials')
    const token = makeToken({ email: found.email, name: found.name, iat: Date.now() })
    localStorage.setItem('auth_token', token)
    setUser(found)
    return found
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const updateProfile = (updates) => {
    if (!user) throw new Error('Not logged in')
    setUsers(us => us.map(u => u.email===user.email ? { ...u, ...updates } : u))
    const updated = { ...user, ...updates }
    setUser(updated)
    return updated
  }

  const addPaymentMethod = (pm) => {
    if (!user) throw new Error('Not logged in')
    const id = `pm_${Date.now()}`
    const newPm = { id, ...pm }
    setUsers(us => us.map(u => u.email===user.email ? { ...u, paymentMethods: [...(u.paymentMethods||[]), newPm] } : u))
    const updated = { ...user, paymentMethods: [...(user.paymentMethods||[]), newPm] }
    setUser(updated)
    return newPm
  }

  const removePaymentMethod = (id) => {
    if (!user) throw new Error('Not logged in')
    setUsers(us => us.map(u => u.email===user.email ? { ...u, paymentMethods: (u.paymentMethods||[]).filter(p=>p.id!==id) } : u))
    const updated = { ...user, paymentMethods: (user.paymentMethods||[]).filter(p=>p.id!==id) }
    setUser(updated)
    return true
  }

  const addOrder = (order) => {
    const o = { id: `ORD-${Date.now()}`, date: new Date().toISOString().slice(0,10), ...order }
    setOrders(os => [o, ...os])
    if (user) {
      setUsers(us => us.map(u => u.email===user.email ? { ...u, orders: [o, ...(u.orders||[])] } : u))
      setUser(prev => prev ? { ...prev, orders: [o, ...(prev.orders||[])] } : prev)
    }
    return o
  }

  const isAdmin = (u = user) => {
    return !!(u && u.email === 'deshan@gmail.com')
  }

  return (
    <UserContext.Provider value={{ user, users, register, login, logout, updateProfile, addPaymentMethod, removePaymentMethod, addOrder, orders, isAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
