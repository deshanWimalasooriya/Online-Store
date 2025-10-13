import React, { createContext, useContext, useEffect, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try { const raw = localStorage.getItem('notifications'); if (raw) return JSON.parse(raw) } catch(e) {}
    return []
  })

  useEffect(() => { try { localStorage.setItem('notifications', JSON.stringify(notifications)) } catch(e) {} }, [notifications])

  const addNotification = (n) => {
    const item = { id: `n_${Date.now()}`, title: n.title || '', message: n.message || '', date: new Date().toISOString(), read: false, type: n.type || 'info', url: n.url || '' }
    setNotifications(s => [item, ...s])
  }

  const clearUnread = () => {
    setNotifications(s => s.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => setNotifications(s => s.map(n => n.id === id ? { ...n, read: true } : n))
  const removeNotification = (id) => setNotifications(s => s.filter(n => n.id !== id))

  const unreadCount = notifications.reduce((c,n)=> c + (n.read ? 0 : 1), 0)

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearUnread, unreadCount, markRead, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
