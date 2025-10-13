import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [orders] = useState([
    { id: 'ORD-1001', date: '2025-09-12', total: 1299.99, items: 2 },
    { id: 'ORD-1002', date: '2025-10-01', total: 179.99, items: 1 },
  ])

  const createAccount = ({ name, email }) => {
    setUser({ id: 'USR-001', name, email })
  }

  return (
    <UserContext.Provider value={{ user, createAccount, orders }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
