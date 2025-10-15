import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('cat') || 'All')
  const q = (params.get('q') || '').toLowerCase()

  const filtered = useMemo(()=>{
    return products.filter(p => {
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      const matchesC = category === 'All' || p.category === category
      return matchesQ && matchesC
    })
  }, [q, category])

  // Update URL param and state on category change
  const setCat = (c) => {
    setCategory(c)
    const next = new URLSearchParams(params)
    if (c==='All') next.delete('cat'); else next.set('cat', c)
    setParams(next, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-64 card p-4 h-max">
          <h3 className="font-display text-lg">Categories</h3>
          <div className="mt-3 flex flex-wrap md:flex-col gap-2">
            <button onClick={()=>setCat('All')} className={`pill ${category==='All' ? 'bg-ice-500/20 text-ice-300' : 'text-white/80'}`}>All</button>
            {categories.map(c => (
              <button key={c} onClick={()=>setCat(c)} className={`pill ${category===c ? 'bg-ice-500/20 text-ice-300' : 'text-white/80'}`}>{c}</button>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl">Products</h1>
            <Link to="/cart" className="pill">Go to Cart</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </main>
      </div>
    </div>
  )
}
