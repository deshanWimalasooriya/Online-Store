import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      let items
      if (existing) {
        items = state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + (action.qty || 1) } : i)
      } else {
        items = [...state.items, { ...action.item, qty: action.qty || 1 }]
      }
      return { ...state, items }
    }
    case 'INC': return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) }
    case 'DEC': return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) }
    case 'REMOVE': return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'CLEAR': return { ...state, items: [] }
    default: return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  const value = useMemo(() => {
    const count = state.items.reduce((s,i)=>s+i.qty,0)
    const total = state.items.reduce((s,i)=>s+i.qty*i.price,0)
    return {
      items: state.items,
      count,
      total,
      add: (item, qty=1) => dispatch({ type: 'ADD', item, qty }),
      inc: (id) => dispatch({ type: 'INC', id }),
      dec: (id) => dispatch({ type: 'DEC', id }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
